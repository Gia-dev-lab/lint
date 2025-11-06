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
import { ArrowLeft, ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
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
           <div className="space-y-2 pt-8">
            <Skeleton className="h-8 w-1/3 mb-4" />
            <Skeleton className="h-5 w-full" />
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

const symyDescription = `
<h1 class="ng-star-inserted"><span class="ng-star-inserted">SYMY - Panno in Microfibra Effetto Daino Super Assorbente</span></h1>
<p class="ng-star-inserted"><span class="ng-star-inserted">Quando cerchi un </span><strong class="ng-star-inserted"><span class="ng-star-inserted">panno super assorbente</span></strong><span class="ng-star-inserted"> che unisca la delicatezza della pelle di daino alla resistenza della microfibra moderna, SYMY è la risposta.</span></p>
<p class="ng-star-inserted"><span class="ng-star-inserted">Questo panno versatile è stato ingegnerizzato per unire il meglio di due mondi: una consistenza simile alla vera pelle di daino, ma con una scorrevolezza e una durata superiori, rendendolo lo strumento perfetto per l'asciugatura e la rifinitura di qualsiasi superficie.</span></p>
<h4 class="ng-star-inserted"><strong class="ng-star-inserted"><span class="ng-star-inserted">I Vantaggi del Tuo Nuovo Panno Super Assorbente</span></strong></h4>
<p class="ng-star-inserted"><span class="ng-star-inserted">La sua struttura unica offre performance eccezionali che lo distinguono da un normale panno in microfibra.</span></p>
<ul class="ng-star-inserted">
         <li class="ng-star-inserted">
<p class="ng-star-inserted"><strong class="ng-star-inserted"><span class="ng-star-inserted">ALTISSIMO GRADO DI ASSORBIMENTO:</span></strong><span class="ng-star-inserted"> La sua speciale composizione gli permette di trattenere un'enorme quantità d'acqua, rendendolo ideale per un'asciugatura rapida e completa.</span></p>
</li>
         <li class="ng-star-inserted">
<p class="ng-star-inserted"><strong class="ng-star-inserted"><span class="ng-star-inserted">SCORREVOLEZZA SUPERIORE:</span></strong><span class="ng-star-inserted"> A differenza della vera pelle di daino che può "attaccarsi" alla superficie, SYMY scivola senza attrito, rendendo il lavoro più veloce e piacevole.</span></p>
</li>
         <li class="ng-star-inserted">
<p class="ng-star-inserted"><strong class="ng-star-inserted"><span class="ng-star-inserted">MORBIDEZZA ESTREMA:</span></strong><span class="ng-star-inserted"> È incredibilmente morbido e piacevole al tatto, garantendo la massima sicurezza anche sulle vernici più delicate.</span></p>
</li>
</ul>
<h4 class="ng-star-inserted"><strong class="ng-star-inserted"><span class="ng-star-inserted">Perché Scegliere un Panno in Microfibra di Qualità?</span></strong></h4>
<p class="ng-star-inserted"><span class="ng-star-inserted">Mentre la pelle di daino naturale richiede una manutenzione complessa, questo panno offre tutti i vantaggi senza gli svantaggi. Come spiegato da guide autorevoli come quella di </span><a class="ng-star-inserted" href="https://www.google.com/url?sa=E&q=https%3A%2F%2Fwww.popularmechanics.com%2Fcars%2Fhow-to%2Fa6031%2Fhow-to-properly-wash-your-car%2F" target="_blank" rel="noopener"><span class="ng-star-inserted">Popular Mechanics</span></a><span class="ng-star-inserted">, una corretta asciugatura è fondamentale per prevenire macchie d'acqua. <span class="router-outlet-wrapper ng-tns-c858488690-0">Per una finitura perfetta e senza aloni su vetri e specchi, abbinalo al nostro <a class="ng-star-inserted" href="https://www.lintmicrofibercloths.it/prodotto/panno-microfibra-per-vetri/" target="_blank" rel="noopener"><strong class="ng-star-inserted">panno specifico per vetri MOMMY AMAR</strong></a>.</span>
</span></p>
<h4 class="ng-star-inserted"><strong class="ng-star-inserted"><span class="ng-star-inserted">Le Applicazioni Ideali per il Tuo Panno SYMY</span></strong></h4>
<div class="table-container ng-star-inserted">
<table>
<tbody>
<tr class="table-header ng-star-inserted">
<td class="ng-star-inserted"><span class="ng-star-inserted">Ambiente / Applicazione</span></td>
<td class="ng-star-inserted"><span class="ng-star-inserted">Vantaggio Specifico</span></td>
</tr>
<tr class="ng-star-inserted">
<td class="ng-star-inserted"><strong class="ng-star-inserted"><span class="ng-star-inserted">Asciugatura Auto</span></strong></td>
<td class="ng-star-inserted"><span class="ng-star-inserted">Perfetto per asciugare la carrozzeria e i vetri dopo il lavaggio, riducendo drasticamente il rischio di aloni. Abbinalo al nostro </span><a class="ng-star-inserted" href="https://www.lintmicrofibercloths.it/prodotto/panno-per-vetri-anti-alone/" target="_blank" rel="noopener"><strong class="ng-star-inserted"><span class="ng-star-inserted">panno per vetri CARTA BIANCA/BLU</span></strong></a><span class="ng-star-inserted"> per una finitura da concorso.</span></td>
</tr>
<tr class="ng-star-inserted">
<td class="ng-star-inserted"><strong class="ng-star-inserted"><span class="ng-star-inserted">Pulizia Casa</span></strong></td>
<td class="ng-star-inserted"><span class="ng-star-inserted">Ideale per asciugare il box doccia, le piastrelle del bagno e le superfici in acciaio della cucina.</span></td>
</tr>
<tr class="ng-star-inserted">
<td class="ng-star-inserted"><strong class="ng-star-inserted"><span class="ng-star-inserted">Uso a Secco</span></strong></td>
<td class="ng-star-inserted"><span class="ng-star-inserted">La sua morbidezza lo rende ottimo anche per spolverare mobili e superfici delicate.</span></td>
</tr>
</tbody>
</table>
</div>
<h4 class="ng-star-inserted"><strong class="ng-star-inserted"><span class="ng-star-inserted">Specifiche Tecniche del Prodotto</span></strong></h4>
<div class="table-container ng-star-inserted">
<table>
<tbody>
<tr class="table-header ng-star-inserted">
<td class="ng-star-inserted"><span class="ng-star-inserted">Caratteristica</span></td>
<td class="ng-star-inserted"><span class="ng-star-inserted">Dettagli</span></td>
</tr>
<tr class="ng-star-inserted">
<td class="ng-star-inserted"><strong class="ng-star-inserted"><span class="ng-star-inserted">Tipo di Prodotto</span></strong></td>
<td class="ng-star-inserted"><strong class="ng-star-inserted"><span class="ng-star-inserted">Panno Super Assorbente</span></strong><span class="ng-star-inserted"> Professionale</span></td>
</tr>
<tr class="ng-star-inserted">
<td class="ng-star-inserted"><strong class="ng-star-inserted"><span class="ng-star-inserted">Materiale</span></strong></td>
<td class="ng-star-inserted"><span class="ng-star-inserted">80% Poliestere, 20% Poliammide</span></td>
</tr>
<tr class="ng-star-inserted">
<td class="ng-star-inserted"><strong class="ng-star-inserted"><span class="ng-star-inserted">Manutenzione</span></strong></td>
<td class="ng-star-inserted"><span class="ng-star-inserted">Lavabile a 60°. </span><strong class="ng-star-inserted"><span class="ng-star-inserted">NON USARE AMMORBIDENTE O CANDEGGINA.</span></strong></td>
</tr>
</tbody>
</table>
</div>
<h2 class="ng-star-inserted"><strong class="ng-star-inserted"><span class="ng-star-inserted">La Tecnologia Nascosta: Come Funziona il PVA</span></strong></h2>
<p class="ng-star-inserted"><span class="ng-star-inserted">A differenza dei panni tradizionali che si affidano a fibre tessute, il cuore di questo panno è il PVA (Alcool Polivinilico), un polimero sintetico con una struttura a cellule aperte simile a una spugna a livello microscopico. Questa rete tridimensionale crea un'azione capillare incredibilmente potente. Quando il panno entra in contatto con l'acqua, non la assorbe passivamente, ma la "risucchia" attivamente all'interno della sua struttura, intrappolandola. Ecco perché un </span><strong class="ng-star-inserted"><span class="ng-star-inserted">Panno Super Assorbente</span></strong><span class="ng-star-inserted"> in PVA può contenere una quantità d'acqua sproporzionata rispetto al suo peso e perché, una volta strizzato, lascia le superfici quasi completamente asciutte al primo passaggio.</span></p>
<h2 class="ng-star-inserted"><strong class="ng-star-inserted"><span class="ng-star-inserted">Consigli per un'Asciugatura da Professionista</span></strong></h2>
<p class="ng-star-inserted"><span class="ng-star-inserted">Per ottenere il massimo dal tuo panno, segui i segreti dei professionisti:</span></p>
<ol class="ng-star-inserted">
         <li class="ng-star-inserted">
<p class="ng-star-inserted"><strong class="ng-star-inserted"><span class="ng-star-inserted">Strizzalo alla Perfezione:</span></strong><span class="ng-star-inserted"> Il panno dà il meglio di sé quando è solo leggermente umido. Dopo averlo bagnato, strizzalo con forza fino a quando non esce quasi più acqua. Un panno troppo bagnato non può assorbire altro liquido.</span></p>
</li>
         <li class="ng-star-inserted">
<p class="ng-star-inserted"><strong class="ng-star-inserted"><span class="ng-star-inserted">La Tecnica "a Trascinamento":</span></strong><span class="ng-star-inserted"> Su grandi superfici come i vetri di un box doccia o il cofano di un'auto, stendi il panno e tiralo delicatamente verso di te senza applicare pressione. Lascia che sia la sua tecnologia a fare il lavoro.</span></p>
</li>
</ol>
<h2 class="ng-star-inserted"><strong class="ng-star-inserted"><span class="ng-star-inserted">Manutenzione: il Segreto della sua Longevità</span></strong></h2>
<p class="ng-star-inserted"><span class="ng-star-inserted">Noterai che, una volta asciutto, il tuo </span><strong class="ng-star-inserted"><span class="ng-star-inserted">Panno Super Assorbente</span></strong><span class="ng-star-inserted"> diventerà rigido. Questo non è un difetto, ma una caratteristica del PVA che ne previene la formazione di muffe e cattivi odori, mantenendolo più igienico. Per riattivarlo, immergilo semplicemente in acqua per meno di un minuto e tornerà subito morbido e pronto all'uso. Lavalo periodicamente in lavatrice senza mai usare l'ammorbidente. Un </span><strong class="ng-star-inserted"><span class="ng-star-inserted">Panno Super Assorbente</span></strong><span class="ng-star-inserted"> correttamente mantenuto è uno strumento quasi eterno.</span></p>
<p class="ng-star-inserted"><span class="ng-star-inserted">Per un'asciugatura perfetta e una finitura impeccabile, scegli la tecnologia superiore del </span><strong class="ng-star-inserted"><span class="ng-star-inserted">panno super assorbente</span></strong><span class="ng-star-inserted"> SYMY.</span></p>
<p class="ng-star-inserted"><strong class="ng-star-inserted"><span class="ng-star-inserted">Completa il Tuo Arsenale per gli Interni</span></strong></p>
<p class="ng-star-inserted"><span class="ng-star-inserted">Questo panno è perfetto per la pulizia generale, ma per compiti specifici potresti aver bisogno di uno specialista. Per una pulizia igienica che rimuove il 99% dei batteri con sola acqua, scopri il nostro </span><strong class="ng-star-inserted"><a class="ng-star-inserted" href="https://www.lintmicrofibercloths.it/prodotto/panno-in-microfibra-antibatterico-2/" target="_blank" rel="noopener"><span class="ng-star-inserted">Panno Antibatterico PAVY Self</span></a></strong><span class="ng-star-inserted">. Se invece la tua sfida sono le superfici lisce, il </span><strong class="ng-star-inserted"><a class="ng-star-inserted" href="https://www.lintmicrofibercloths.it/prodotto/panno-per-finitura-senza-aloni/" target="_blank" rel="noopener"><span class="ng-star-inserted">Panno per Finitura DANY Self</span></a></strong><span class="ng-star-inserted"> con poliuretano garantisce una brillantezza senza aloni. Per raggiungere le fessure e le bocchette dell'aria, abbina il tuo panno a un </span><strong class="ng-star-inserted"><a class="ng-star-inserted" href="https://www.lintmicrofibercloths.it/prodotto/pennelli-pulizia-auto/" target="_blank" rel="noopener"><span class="ng-star-inserted">Kit di 5 Pennelli da Detailing</span></a></strong><span class="ng-star-inserted">.</span></p>
`;


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

  const { nome, immagine, descrizionebreve, descrizionecompleta, categorie, SKU } = product;

  // Use the hardcoded description for SYMY (PAN103), otherwise use from Firestore
  const finalDescrizioneCompleta = SKU === 'PAN103' ? symyDescription : descrizionecompleta;

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
              <Link href={`/prodotti?category=${encodeURIComponent(categorie)}`} className="hover:text-foreground capitalize">{categorie.toLowerCase()}</Link>
            </>
           )}
           <ChevronRight size={16} className="mx-1" />
           <span className="text-foreground">{nome}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
          <Card className="overflow-hidden sticky top-24">
            <CardContent className="p-0">
              {immagine && (
                <div className="relative aspect-square w-full bg-secondary">
                  <Image
                    src={immagine}
                    alt={nome || "Immagine Prodotto"}
                    fill
                    className="object-contain"
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
            
            <div className="text-base text-foreground/80 space-y-4 pt-4 prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: descrizionebreve || '' }} />
            
            <Dialog open={isQuoteOpen} onOpenChange={setIsQuoteOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="mt-6 w-full sm:w-auto">
                  Richiedi Informazioni o Preventivo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Richiesta per: {nome}</DialogTitle>
                  <DialogDescription>
                    Compila il modulo per ricevere un preventivo o parlare con un nostro esperto.
                  </DialogDescription>
                </DialogHeader>
                <QuoteRequestForm onSuccess={() => setIsQuoteOpen(false)} />
              </DialogContent>
            </Dialog>
            
            {finalDescrizioneCompleta && (
                <div className="pt-8 mt-8 border-t">
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <Info size={20} />
                        Descrizione Dettagliata
                    </h2>
                    <div 
                        className="prose prose-base dark:prose-invert max-w-none text-foreground/90"
                        dangerouslySetInnerHTML={{ __html: finalDescrizioneCompleta }} 
                    />
                </div>
            )}
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
}
