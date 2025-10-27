"use client";

import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, where, Query } from "firebase/firestore";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { placeholderImages } from "@/lib/data";

const filterCategories = [
  { label: "Tutti", tag: "all" },
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

export default function RicambiClientPage() {
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
    // We don't have filters for this page yet, so this function is ready for the future
    // router.push(pathname + '?' + createQueryString('tag', tag));
  };


  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    
    let q: Query = query(collection(firestore, "prodotti"), where("categorie", "==", "Ricambi per Attrezzature Pulizia"));

    if (activeFilter !== "all") {
      // Logic for filtering by tags can be added here in the future
      // q = query(q, where("tag", "array-contains", activeFilter));
    }
    
    return q;
  }, [firestore, activeFilter]);

  const { data: products, isLoading: isLoadingProducts } = useCollection(productsQuery);
  const heroImage = placeholderImages.find(p => p.id === 'product-equipment-1');

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
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
            />
        )}
          <div className="absolute inset-0 bg-background/70" />
        </div>
        <AnimateOnScroll className="container relative">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Ricambi per Attrezzature Pulizia</h1>
          <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
           Trova il pezzo giusto per mantenere le tue attrezzature sempre efficienti. Ricambi originali e compatibili per garantire massima durata e performance.
          </p>
        </AnimateOnScroll>
      </section>

      <div className="container py-12">
        {/*
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
        */}

        <AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {isLoadingProducts &&
              Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
            
            {!isLoadingProducts && products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {!isLoadingProducts && products?.length === 0 && (
            <div className="text-center col-span-full py-12 bg-secondary/50 rounded-lg">
              <p className="text-lg font-medium">Nessun ricambio trovato</p>
              <p className="text-muted-foreground mt-2">
                Al momento non ci sono prodotti in questa categoria. Torna a trovarci presto!
              </p>
            </div>
          )}
        </AnimateOnScroll>
      </div>
    </div>
  );
}
