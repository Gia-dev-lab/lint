
"use client";

import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query } from "firebase/firestore";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useMemo, useEffect, useCallback }from "react";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebounce } from "@/hooks/use-debounce";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

function ProductSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col">
      <Skeleton className="h-48 w-full" />
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-2/3 mt-1" />
      </CardHeader>
      <CardContent className="flex-grow">
        <Skeleton className="h-5 w-1/3 mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
      <div className="p-6 pt-0 mt-auto">
        <Skeleton className="h-10 w-full" />
      </div>
    </Card>
  );
}

const stripHtml = (html: string | undefined | null): string => {
    if (!html) return "";
    if (typeof document === "undefined") {
      return html.replace(/<[^>]+>/g, '');
    }
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

const categoryDisplayMap: Record<string, string> = {
    "Panni in Microfibra Professionali": "Panni in Microfibra",
    "Accessori per la Pulizia Professionale e Detailing": "Accessori",
    "Kit di Pulizia e Detailing Professionali": "Kit di Pulizia",
    "Detergenti per Pulizia Professionale": "Detergenti",
    "Ricambi Attrezzatura Pulizia": "Ricambi",
    "Linea Self Car Wash": "Self Car Wash",
};

const categoryOrder = [
    "Panni in Microfibra Professionali",
    "Accessori per la Pulizia Professionale e Detailing",
    "Detergenti per Pulizia Professionale",
    "Kit di Pulizia e Detailing Professionali",
    "Ricambi Attrezzatura Pulizia",
    "Linea Self Car Wash",
];

export default function ProductsClientPage() {
  const firestore = useFirestore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  const productsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, "prodotti"));
  }, [firestore]);

  const { data: products, isLoading: isLoadingProducts } = useCollection(productsQuery);
  
  const activeCategory = searchParams.get('category') || 'all';

   const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleCategoryChange = (category: string) => {
    router.replace(`${pathname}?${createQueryString('category', category)}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearchTerm) {
      params.set('q', debouncedSearchTerm);
    } else {
      params.delete('q');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedSearchTerm, pathname, router, createQueryString]);

  const productCategories = useMemo(() => {
    if (!products) return [];
    const categories = new Set(products.map(p => p.categorie).filter(Boolean));
    const sortedCategories = categoryOrder.filter(cat => categories.has(cat));
    const otherCategories = [...categories].filter(cat => !categoryOrder.includes(cat));
    return ['all', ...sortedCategories, ...otherCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    let tempProducts = products;

    // Filter by category
    if (activeCategory !== 'all') {
      tempProducts = tempProducts.filter(p => p.categorie === activeCategory);
    }

    // Filter by search term
    const lowercasedFilter = debouncedSearchTerm.toLowerCase();
    if (lowercasedFilter) {
        tempProducts = tempProducts.filter((product) => {
            const { nome, categorie, SKU, descrizionebreve, metadesc } = product;
            return (
                nome?.toLowerCase().includes(lowercasedFilter) ||
                categorie?.toLowerCase().includes(lowercasedFilter) ||
                SKU?.toLowerCase().includes(lowercasedFilter) ||
                stripHtml(descrizionebreve).toLowerCase().includes(lowercasedFilter) ||
                stripHtml(metadesc).toLowerCase().includes(lowercasedFilter)
            );
        });
    }

    return tempProducts;
  }, [products, debouncedSearchTerm, activeCategory]);

  return (
    <>
      <div className="flex flex-col items-center gap-6 mb-10">
        <div className="w-full max-w-lg relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cerca per nome, codice, categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9"
            />
        </div>
        <div className="flex flex-col items-center gap-3 w-full">
            <h3 className="text-sm font-medium text-muted-foreground">Filtra per categoria:</h3>
            <div className="flex flex-wrap justify-center items-center gap-2">
                {productCategories.map(cat => (
                    <Button
                        key={cat}
                        variant={activeCategory === cat ? "default" : "outline"}
                        onClick={() => handleCategoryChange(cat)}
                        className="capitalize"
                    >
                        {cat === 'all' ? 'Tutti' : (categoryDisplayMap[cat] || cat)}
                    </Button>
                ))}
                {activeCategory !== 'all' && (
                    <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCategoryChange('all')}
                    className="flex items-center gap-1 text-muted-foreground"
                    >
                    <X size={14}/>
                    Azzera Filtro
                    </Button>
                )}
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {isLoadingProducts
          ? Array.from({ length: 12 }).map((_, i) => <ProductSkeleton key={i} />)
          : filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
       {!isLoadingProducts && filteredProducts.length === 0 && (
        <div className="text-center col-span-full py-12 bg-secondary/50 rounded-lg">
          <p className="text-lg font-medium">Nessun prodotto trovato</p>
          <p className="text-muted-foreground mt-2">
            Prova a modificare i termini della tua ricerca o a selezionare un'altra categoria.
          </p>
        </div>
      )}
    </>
  );
}
