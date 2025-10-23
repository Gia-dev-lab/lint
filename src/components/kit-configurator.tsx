
"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getKitSuggestions } from "@/app/actions";
import { Loader2, Sparkles, Lightbulb } from "lucide-react";
import { products } from "@/lib/data";
import Image from "next/image";

type Suggestion = {
  id: string;
  name: string;
};

export function KitConfigurator() {
  const [description, setDescription] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuggestions([]);
    
    startTransition(async () => {
      const result = await getKitSuggestions({ description });
      if (result.success && result.suggestions) {
        setSuggestions(result.suggestions);
      } else {
        setError(result.error || "Si è verificato un errore imprevisto.");
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="text-accent" />
          Configuratore Kit Personalizzato
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Descrivi le tue esigenze di pulizia, es: 'detailing auto a domicilio' o 'cucina di hotel affollata'."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full"
            disabled={isPending}
          />
          <Button type="submit" disabled={isPending || description.length < 10} className="w-full" variant="accent">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Genero Suggerimenti...
              </>
            ) : (
              "Ottieni Suggerimenti dall'IA"
            )}
          </Button>
        </form>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Errore</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {suggestions.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Lightbulb className="text-accent"/> Consigliato per te:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {suggestions.map((suggestion) => {
                const product = products.find(p => p.id === suggestion.id);
                if (!product) return null;
                return (
                    <Card key={suggestion.id} className="overflow-hidden">
                        <CardContent className="p-0 flex items-center">
                            <div className="relative w-24 h-24 flex-shrink-0">
                                <Image 
                                    src={product.image.imageUrl} 
                                    alt={product.name} 
                                    fill
                                    className="object-cover"
                                    data-ai-hint={product.image.imageHint}
                                />
                            </div>
                            <div className="p-4">
                               <h4 className="font-semibold">{product.name}</h4>
                               <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
