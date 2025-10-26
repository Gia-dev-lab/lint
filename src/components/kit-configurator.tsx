
"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getKitSuggestions } from "@/app/actions";
import { Loader2, Sparkles, Lightbulb } from "lucide-react";
import type { KitSuggestion } from "@/ai/flows/kit-suggestion-flow";
import Link from "next/link";

export function KitConfigurator() {
  const [description, setDescription] = useState("");
  const [suggestions, setSuggestions] = useState<KitSuggestion[]>([]);
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
          Configuratore Kit Intelligente
        </CardTitle>
        <CardDescription>Descrivi la tua attività e lascia che la nostra AI ti consigli i prodotti migliori.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Es: 'Gestisco un'impresa di pulizie specializzata in uffici e condomini' o 'Ho un centro di car detailing e tratto auto di lusso'."
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
                Analisi in corso...
              </>
            ) : (
              "Trova la Soluzione Ideale"
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
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Lightbulb className="text-accent"/> Kit consigliato per te:</h3>
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <Link href={`/prodotti/${suggestion.productId}`} key={index} className="block group">
                  <Card className="overflow-hidden bg-secondary/50 transition-all duration-300 group-hover:bg-secondary group-hover:shadow-md">
                      <CardContent className="p-4">
                          <h4 className="font-semibold text-primary group-hover:underline">{suggestion.productName}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{suggestion.reason}</p>
                      </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
