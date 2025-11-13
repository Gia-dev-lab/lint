
"use client";

import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, where, Query } from "firebase/firestore";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { placeholderImages } from "@/lib/data";

const filterCategories = [
  { label: "Tutti", tag: "all" },
  { label: "Spazzole", tag: "spazzola" },
  { label: "Guanti", tag: "guanto" },
  { label: "Applicatori", tag: "applicatore" },
];

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

export default function AccessoriClientPage() {
  const firestore = useFirestore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get("tag") || "all";

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
  
  const handleFilterChange = (tag: string) => {
    router.replace(pathname + '?' + createQueryString('tag', tag));
  };


  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "prodotti"), where("categorie", "==", "Accessori per la Pulizia Professionale e Detailing"));
  }, [firestore]);

  const { data: products, isLoading: isLoadingProducts } = useCollection(productsQuery);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (activeFilter === "all") return products;
    
    return products.filter(product => 
      product.tag?.toLowerCase().includes(activeFilter.toLowerCase())
    );

  }, [products, activeFilter]);

  const heroImage = placeholderImages.find(p => p.id === 'product-accessory-2');

  const selectedCategoryLabel = filterCategories.find(c => c.tag === activeFilter)?.label || activeFilter;

  return (
    <div>
      <section className="relative py-20 md:py-32 bg-secondary text-foreground text-center">
        <div className="absolute inset-0 overflow-hidden">
        {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                sizes="100vw"
                className="object-cover animate-ken-burns"
                data-ai-hint={heroImage.imageHint}
            />
        )}
          <div className="absolute inset-0 bg-background/70" />
        </div>
        <AnimateOnScroll className="container relative">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Accessori per Pulizia e Detailing</h1>
          <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
           Dalle spazzole di precisione agli applicatori per cere: ogni accessorio è studiato per massimizzare l'efficacia dei prodotti e garantire risultati professionali.
          </p>
        </AnimateOnScroll>
      </section>

      <div className="container py-12">
        <div className="mb-8 flex flex-wrap justify-center items-center gap-2">
          {filterCategories.map(cat => (
            <Button
              key={cat.tag}
              variant={activeFilter === cat.tag ? "default" : "outline"}
              onClick={() => handleFilterChange(cat.tag)}
            >
              {cat.label}
            </Button>
          ))}
           {activeFilter !== 'all' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFilterChange('all')}
              className="flex items-center gap-1 text-muted-foreground"
            >
              <X size={14}/>
              Azzera Filtri
            </Button>
          )}
        </div>

        <AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {isLoadingProducts &&
              Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
            
            {!isLoadingProducts && filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {!isLoadingProducts && filteredProducts?.length === 0 && (
            <div className="text-center col-span-full py-12 bg-secondary/50 rounded-lg">
              <p className="text-lg font-medium">Nessun accessorio trovato per "{selectedCategoryLabel}"</p>
              <p className="text-muted-foreground mt-2">
                Prova a selezionare un'altra categoria o a rimuovere i filtri.
              </p>
            </div>
          )}
        </AnimateOnScroll>
      </div>
    </div>
  );
}
