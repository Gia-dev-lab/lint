"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Funzione per rimuovere i tag HTML da una stringa
const stripHtml = (html: string) => {
  if (typeof window === 'undefined') {
    // Sostituzione base lato server
    return html.replace(/<[^>]+>/g, '');
  }
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

export function ProductCard({ product }: { product: any }) {
  const { nome, immagine, descrizionebreve, metadesc, SKU } = product;

  const plainDescrizioneBreve = descrizionebreve ? stripHtml(descrizionebreve) : '';

  return (
    <Card className="overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      {immagine && (
        <div className="relative aspect-square w-full bg-secondary overflow-hidden">
          <Image
            src={immagine}
            alt={nome || 'Immagine Prodotto'}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow">
        {nome && <h3 className="font-semibold text-base line-clamp-2">{nome}</h3>}
        {plainDescrizioneBreve && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2 flex-grow">
            {plainDescrizioneBreve}
          </p>
        )}
        {metadesc && (
          <p className="text-xs text-muted-foreground/80 mt-2 line-clamp-2">
            {metadesc}
          </p>
        )}
      </div>
    </Card>
  );
}
