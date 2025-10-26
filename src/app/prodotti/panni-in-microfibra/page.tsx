"use client";

import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, where, Query } from "firebase/firestore";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

const filterCategories = [
  { label: "Tutti", tag: "all" },
  { label: "Vetri e Specchi", tag: "vetri" },
  { label: "Asciugatura", tag: "asciugatura" },
  { label: "Multiuso", tag: "multiuso" },
  { label: "Interni Auto", tag: "interni auto" },
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

export default function PanniInMicrofibraPage() {
  const firestore = useFirestore();
  const [activeFilter, setActiveFilter] = useState("all");

  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    
    let q: Query = query(collection(firestore, "prodotti"), where("categorie", "==", "Panni in Microfibra Professionali"));

    if (activeFilter !== "all") {
      q = query(q, where("tag", "==", activeFilter));
    }
    
    return q;
  }, [firestore, activeFilter]);

  const { data: products, isLoading: isLoadingProducts } = useCollection(productsQuery);

  return (
    <div>
      <section className="relative py-20 md:py-32 bg-secondary text-foreground text-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://www.lintmicrofibercloths.it/wp-content/uploads/2025/10/Consigli-pulizia-professionale-del-blog-LINT.png"
            alt="Consigli per la pulizia professionale dal blog LINT"
            fill
            className="object-cover"
            data-ai-hint="professional cleaning blog"
          />
          <div className="absolute inset-0 bg-background/70" />
        </div>
        <AnimateOnScroll className="container relative">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Panni in Microfibra Professionali</h1>
          <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            La migliore selezione di panni tecnici per ogni esigenza: massima efficacia, durata superiore e risultati senza compromessi per ogni superficie.
          </p>
        </AnimateOnScroll>
      </section>

      <div className="container py-12">
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {filterCategories.map(cat => (
            <Button
              key={cat.tag}
              variant={activeFilter === cat.tag ? "default" : "outline"}
              onClick={() => setActiveFilter(cat.tag)}
            >
              {cat.label}
            </Button>
          ))}
        </div>

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
              <p className="text-lg font-medium">Nessun prodotto trovato per "{activeFilter}"</p>
              <p className="text-muted-foreground mt-2">
                Prova a selezionare un'altra categoria o a rimuovere i filtri per vedere tutti i nostri panni.
              </p>
            </div>
          )}
        </AnimateOnScroll>
      </div>
    </div>
  );
}
