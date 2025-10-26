
"use client";

import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query } from "firebase/firestore";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useMemo, useEffect }from "react";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";

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

export default function ProdottiPage() {
  const firestore = useFirestore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "prodotti"));
  }, [firestore]);

  const { data: products, isLoading: isLoadingProducts } = useCollection(productsQuery);
  
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm) {
      params.set('q', searchTerm);
    } else {
      params.delete('q');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedSearchTerm, pathname, router, searchParams, searchTerm]);


  const filteredProducts = useMemo(() => {
    if (!products) return [];
    const lowercasedFilter = debouncedSearchTerm.toLowerCase();
    return products.filter((product) => {
      const { nome, categorie, SKU, descrizionebreve, metadesc } = product;
      return (
        nome?.toLowerCase().includes(lowercasedFilter) ||
        categorie?.toLowerCase().includes(lowercasedFilter) ||
        SKU?.toLowerCase().includes(lowercasedFilter) ||
        stripHtml(descrizionebreve).toLowerCase().includes(lowercasedFilter) ||
        stripHtml(metadesc).toLowerCase().includes(lowercasedFilter)
      );
    });
  }, [products, debouncedSearchTerm]);

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-center">Tutti i Nostri Prodotti</h1>
        <p className="mt-2 text-lg text-muted-foreground text-center">
          Esplora il catalogo completo o cerca un prodotto specifico.
        </p>
         <div className="mt-6 max-w-lg mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cerca per nome, codice, categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {isLoadingProducts
          ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
          : filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
       {!isLoadingProducts && filteredProducts.length === 0 && (
        <div className="text-center col-span-full py-12 bg-secondary/50 rounded-lg">
          <p className="text-lg font-medium">Nessun prodotto trovato per "{searchTerm}"</p>
          <p className="text-muted-foreground mt-2">
            Prova a modificare i termini della tua ricerca.
          </p>
        </div>
      )}
    </div>
  );
}
