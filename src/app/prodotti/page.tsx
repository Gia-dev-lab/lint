"use client";

import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query } from "firebase/firestore";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";

function ProductSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="aspect-square w-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export default function ProdottiPage() {
  const firestore = useFirestore();

  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    // Query to retrieve all products
    return query(collection(firestore, "prodotti"));
  }, [firestore]);

  const { data: products, isLoading: isLoadingProducts } = useCollection(productsQuery);

  return (
    <div className="container py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Tutti i Nostri Prodotti</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Esplora il catalogo completo delle nostre soluzioni per la pulizia professionale.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {isLoadingProducts ? (
          Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
        ) : (
          products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
