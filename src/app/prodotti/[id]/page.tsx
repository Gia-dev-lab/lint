"use client";

import { useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { useEffect, useState } from "react";

// Funzione per rimuovere i tag HTML da una stringa
const stripHtml = (html: string | undefined | null): string => {
  if (!html) return "";
  if (typeof document === "undefined") {
    return html.replace(/<[^>]+>/g, '');
  }
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};


function ProductDetailSkeleton() {
  return (
    <div className="container py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <Skeleton className="aspect-square w-full rounded-lg" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/3" />
          <div className="space-y-2 pt-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>
          <div className="pt-4">
            <Skeleton className="h-12 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProdottoPage() {
  const { id } = useParams();
  const firestore = useFirestore();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const productId = Array.isArray(id) ? id[0] : id;

  const productRef = useMemoFirebase(() => {
    if (!firestore || !productId) return null;
    return doc(firestore, "prodotti", productId);
  }, [firestore, productId]);

  const { data: product, isLoading } = useDoc(productRef);
  
  useEffect(() => {
    if (product?.nome) {
      document.title = `${product.nome} - Lint Professional Cleaning`;
    }
  }, [product]);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <div className="container text-center py-20">
        <h1 className="text-2xl font-bold">Prodotto non trovato</h1>
        <p className="text-muted-foreground mt-2">
          Il prodotto che stai cercando non esiste o è stato rimosso.
        </p>
        <Button asChild className="mt-6">
          <Link href="/prodotti">
            <ArrowLeft className="mr-2" />
            Torna al catalogo
          </Link>
        </Button>
      </div>
    );
  }

  const { nome, immagine, descrizionebreve, categorie, SKU, metadesc } = product;

  return (
    <AnimateOnScroll>
      <div className="container py-10 md:py-16">
        <div className="mb-6 flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight size={16} className="mx-1" />
          <Link href="/prodotti" className="hover:text-foreground">Prodotti</Link>
           {categorie && (
            <>
              <ChevronRight size={16} className="mx-1" />
              <Link href={`/prodotti/panni-in-microfibra?tag=${categorie.toLowerCase()}`} className="hover:text-foreground">{categorie}</Link>
            </>
           )}
           <ChevronRight size={16} className="mx-1" />
           <span className="text-foreground">{nome}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {immagine && (
                <div className="relative aspect-square w-full bg-secondary">
                  <Image
                    src={immagine}
                    alt={nome || "Immagine Prodotto"}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            {categorie && (
              <Badge variant="secondary" className="text-base">
                {categorie}
              </Badge>
            )}
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">{nome}</h1>
            
            {SKU && <p className="text-lg text-muted-foreground">Codice: {SKU}</p>}
            
            <div className="text-base text-foreground/80 space-y-4 pt-4" dangerouslySetInnerHTML={{ __html: descrizionebreve || metadesc || '' }} />
            
            <Dialog open={isQuoteOpen} onOpenChange={setIsQuoteOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="mt-6 w-full sm:w-auto">
                  Richiedi Informazioni o Preventivo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Richiesta per: {nome}</DialogTitle>
                </DialogHeader>
                <QuoteRequestForm onSuccess={() => setIsQuoteOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
}
