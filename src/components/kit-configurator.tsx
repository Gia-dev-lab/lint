
'use client';

import { useState, useMemo } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sparkles, Bot, Wand2, AlertTriangle } from 'lucide-react';
import { suggestKit, KitSuggestionOutput } from '@/ai/flows/kit-suggestion-flow';
import { ProductCard } from './product-card';
import { Skeleton } from './ui/skeleton';

function ProductSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col">
      <Skeleton className="h-40 w-full" />
      <div className="p-4">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </Card>
  );
}

export function KitConfigurator() {
  const [userNeed, setUserNeed] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<KitSuggestionOutput | null>(null);

  const firestore = useFirestore();
  const productsQuery = useMemo(() => {
    if (!firestore) return null;
    return collection(firestore, 'prodotti');
  }, [firestore]);

  const { data: productCatalog, isLoading: isLoadingCatalog } = useCollection(productsQuery);

  const suggestedProducts = useMemo(() => {
    if (!suggestion || !productCatalog) {
      return [];
    }
    // Create a map for quick lookups
    const catalogMap = new Map(productCatalog.map(p => [p.id, p]));
    // Filter and return products based on the suggestion, maintaining order
    return suggestion.suggestedProductIds.map(id => catalogMap.get(id)).filter(Boolean);
  }, [suggestion, productCatalog]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userNeed.trim() || !productCatalog) {
      setError('Per favore, descrivi la tua necessità prima di continuare.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    try {
      const result = await suggestKit({ userNeed, productCatalog });
      if (!result || !result.suggestedProductIds || result.suggestedProductIds.length === 0) {
        throw new Error("L'AI non è riuscita a trovare una combinazione adatta. Prova a essere più specifico.");
      }
      setSuggestion(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Si è verificato un errore inaspettato.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden shadow-2xl border-primary/20">
      <CardHeader className="bg-gradient-to-br from-secondary to-background p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 border border-primary/20 rounded-full">
            <Wand2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Crea il Tuo Kit Ideale</CardTitle>
            <p className="text-muted-foreground mt-1">
              Descrivi la tua esigenza e lascia che la nostra AI componha il kit perfetto per te.
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="user-need" className="block text-sm font-medium text-foreground mb-2">
              Di cosa hai bisogno?
            </label>
            <Textarea
              id="user-need"
              value={userNeed}
              onChange={(e) => setUserNeed(e.target.value)}
              placeholder="Es: 'un kit completo per la pulizia interna di un'auto con sedili in pelle' oppure 'l'attrezzatura base per un'impresa di pulizie specializzata in uffici'."
              className="min-h-[100px]"
              disabled={isLoading || isLoadingCatalog}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading || isLoadingCatalog}>
            {isLoading ? (
              <>
                <Bot className="mr-2 h-4 w-4 animate-spin" />
                Il nostro esperto AI sta lavorando...
              </>
            ) : (
               <>
                <Sparkles className="mr-2 h-4 w-4" />
                {isLoadingCatalog ? 'Caricamento catalogo...' : 'Genera il Kit Perfetto'}
              </>
            )}
          </Button>
        </form>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Oops! Qualcosa è andato storto</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading && (
            <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ProductSkeleton />
                    <ProductSkeleton />
                    <ProductSkeleton />
                </div>
            </div>
        )}

        {suggestion && suggestedProducts.length > 0 && (
          <div className="space-y-4 pt-4 border-t">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><Bot className="h-5 w-5 text-primary"/>Il consiglio del nostro esperto AI:</h3>
                <p className="text-muted-foreground">{suggestion.reasoning}</p>
            </div>
            
            <h4 className="font-semibold text-lg pt-4">Prodotti Consigliati nel Tuo Kit:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
