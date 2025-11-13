
"use client";

import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, where, Query } from "firebase/firestore";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useMemo, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X, ChevronRight, Droplets, Wind, Sparkles, GlassWater } from "lucide-react";
import { placeholderImages } from "@/lib/data";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const filterCategories = [
  { label: "Tutti", tag: "all" },
  { label: "Vetri e Specchi", tag: "vetri" },
  { label: "Asciugatura", tag: "asciugatura" },
  { label: "Multiuso", tag: "multiuso" },
  { label: "Interni Auto", tag: "interni auto" },
];

const featureHighlights = [
    {
        icon: <GlassWater className="h-8 w-8 text-primary" />,
        title: "Per Vetri e Specchi",
        description: "Trama ultra-fine per una pulizia senza aloni, anche solo con acqua."
    },
    {
        icon: <Wind className="h-8 w-8 text-primary" />,
        title: "Per Asciugatura",
        description: "Altissima densità (GSM) e fibre a spirale per assorbire enormi quantità d'acqua."
    },
    {
        icon: <Sparkles className="h-8 w-8 text-primary" />,
        title: "Per Finitura e Polish",
        description: "Pelo ultra-morbido e senza bordi (edgeless) per rimuovere cere e sigillanti in sicurezza."
    },
    {
        icon: <Droplets className="h-8 w-8 text-primary" />,
        title: "Multiuso e Igienizzanti",
        description: "Struttura robusta per la pulizia quotidiana e trattamenti antibatterici."
    }
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

export default function PanniInMicrofibraClientPage() {
  const firestore = useFirestore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get("tag") || "all";
  
  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, "prodotti"), where("categorie", "==", "Panni in Microfibra Professionali"));
  }, [firestore]);

  const { data: products, isLoading: isLoadingProducts } = useCollection(productsQuery);
  
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

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (activeFilter === "all") {
      return products;
    }
    return products.filter(product => 
      product.tag && typeof product.tag === 'string' && product.tag.toLowerCase().includes(activeFilter.toLowerCase())
    );
  }, [products, activeFilter]);


  const selectedCategoryLabel = filterCategories.find(c => c.tag === activeFilter)?.label || activeFilter;
  const heroImage = placeholderImages.find(p => p.id === 'microfiber-hero');

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
              priority
            />
          )}
          <div className="absolute inset-0 bg-background/70" />
        </div>
        <AnimateOnScroll className="container relative">
          <Badge variant="default" className="mb-4 text-sm py-1 px-4">La Nostra Selezione</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Panni in Microfibra Professionali</h1>
          <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            La migliore selezione di panni tecnici per ogni esigenza: massima efficacia, durata superiore e risultati senza compromessi per ogni superficie.
          </p>
        </AnimateOnScroll>
      </section>
      
       <AnimateOnScroll>
        <section className="py-16 lg:py-24 bg-background">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Non Tutte le Microfibre Sono Uguali</h2>
                    <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
                        Ogni panno LINT è progettato con una struttura, densità (GSM) e composizione specifica per eccellere in un compito preciso. Scopri quale fa per te.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featureHighlights.map((value) => (
                        <Card key={value.title} className="text-center p-6 border-0 shadow-none bg-secondary/50">
                           <div className="flex justify-center mb-4">{value.icon}</div>
                           <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                           <p className="text-muted-foreground text-sm">{value.description}</p>
                        </Card>
                    ))}
                </div>
                 <div className="mt-12 text-center">
                    <Button asChild variant="outline">
                        <Link href="/blog/come-lavare-i-panni-in-microfibra">
                            Scopri come mantenerli sempre efficaci <ChevronRight className="ml-2" />
                        </Link>
                    </Button>
                 </div>
            </div>
        </section>
      </AnimateOnScroll>


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

          {!isLoadingProducts && filteredProducts.length === 0 && (
            <div className="text-center col-span-full py-12 bg-secondary/50 rounded-lg">
              <p className="text-lg font-medium">Nessun panno trovato per "{selectedCategoryLabel}"</p>
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
