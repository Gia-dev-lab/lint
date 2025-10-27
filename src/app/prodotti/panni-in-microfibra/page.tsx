import { Suspense } from "react";
import PanniInMicrofibraClientPage from "./panni-in-microfibra-client-page";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

function ProductsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card className="overflow-hidden flex flex-col" key={i}>
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
      ))}
    </div>
  );
}

export default function PanniInMicrofibraPage() {
  return (
    <Suspense fallback={
        <div className="container py-12">
            <AnimateOnScroll>
                <ProductsLoadingSkeleton />
            </AnimateOnScroll>
        </div>
    }>
      <PanniInMicrofibraClientPage />
    </Suspense>
  );
}
