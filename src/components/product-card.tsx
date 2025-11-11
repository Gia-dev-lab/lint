
"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Funzione per rimuovere i tag HTML da una stringa
const stripHtml = (html: string | undefined | null): string => {
  if (!html) return "";
  if (typeof document === "undefined") {
    return html.replace(/<[^>]+>/g, '');
  }
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

export function ProductCard({ product }: { product: any }) {
  const { id, nome, immagine, descrizionebreve, metadesc, SKU } = product;

  return (
    <Link href={`/prodotti/${id}`} className="flex h-full">
        <Card className="overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 w-full">
        {immagine && (
            <div className="relative aspect-square w-full bg-secondary overflow-hidden">
            <Image
                src={immagine}
                alt={nome || 'Immagine Prodotto'}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="object-contain transition-transform duration-300"
            />
            </div>
        )}
        <div className="p-4 flex flex-col flex-grow">
            <div className="flex justify-between items-start gap-2">
                {nome && <h3 className="font-semibold text-base line-clamp-2 pr-2 flex-grow">{nome}</h3>}
                {SKU && <Badge variant="outline" className="flex-shrink-0">{SKU}</Badge>}
            </div>
            
            {(descrizionebreve || metadesc) && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2 flex-grow">
                {stripHtml(descrizionebreve || metadesc)}
            </p>
            )}
        </div>
        </Card>
    </Link>
  );
}

    