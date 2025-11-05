
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { placeholderImages } from "@/lib/data";
import { CheckCircle2, AlertTriangle, Droplets, Wind, Sparkles, ChevronRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const heroImage = placeholderImages.find(img => img.id === 'blog-hero-washing');

const washingMachineSteps = [
    { text: "Separare i panni per tipo di sporco (es. molto sporchi, leggermente sporchi) e colore." },
    { text: "Scuotere i panni all'aperto per rimuovere detriti grossolani." },
    { text: "Usare un detergente specifico per microfibra o un detergente liquido neutro." },
    { text: "Impostare un ciclo per capi sintetici o delicati a una temperatura massima di 40°C." },
    { text: "NON usare ammorbidente. Al suo posto, si può aggiungere aceto bianco o un prodotto specifico come RYSOFT." },
    { text: "Se possibile, fare un secondo risciacquo per eliminare ogni residuo di detergente." },
];

const handWashSteps = [
    { text: "Riempire un secchio con acqua tiepida e un po' di detergente specifico." },
    { text: "Immergere i panni e lasciarli in ammollo per 20-30 minuti." },
    { text: "Strofinare delicatamente le aree più sporche." },
    { text: "Risciacquare abbondantemente sotto acqua corrente finché l'acqua non risulta pulita." },
];

const mistakesToAvoid = [
    { icon: <AlertTriangle className="h-6 w-6 text-destructive" />, title: "Usare l'Ammorbidente", description: "Ostruisce le fibre, rendendo il panno inutilizzabile." },
    { icon: <AlertTriangle className="h-6 w-6 text-destructive" />, title: "Lavare con Cotone o Lana", description: "La microfibra attira le fibre di altri tessuti, perdendo efficacia." },
    { icon: <AlertTriangle className="h-6 w-6 text-destructive" />, title: "Temperature Elevate", description: "Il calore eccessivo può fondere le fibre sintetiche, rovinando il panno." },
    { icon: <AlertTriangle className="h-6 w-6 text-destructive" />, title: "Usare Candeggina", description: "Danneggia la struttura delle fibre e ne riduce la durata." },
];

export default function BlogPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative w-full h-[60vh] flex items-center justify-center text-center text-foreground overflow-hidden">
                {heroImage && (
                    <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        fill
                        className="object-cover -z-10"
                        data-ai-hint={heroImage.imageHint}
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-background/70 -z-10" />
                <AnimateOnScroll className="z-10 container max-w-4xl">
                    <Badge variant="default" className="mb-4 text-sm py-1 px-4">Guida Pratica</Badge>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Come Lavare i Panni in Microfibra
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-foreground/80">
                        La guida definitiva per preservare l'efficacia e la durata delle tue attrezzature di pulizia professionali.
                    </p>
                </AnimateOnScroll>
            </section>

            <AnimateOnScroll>
                <article className="container py-16 lg:py-24 max-w-4xl mx-auto prose dark:prose-invert prose-lg">
                    
                    <p className="lead">
                        I panni in microfibra sono uno strumento indispensabile per ogni professionista del pulito, dal car detailing alle imprese di pulizie. Ma per mantenerli efficaci e duraturi, è fondamentale lavarli nel modo corretto. Un lavaggio sbagliato può compromettere le loro incredibili capacità di pulizia.
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight mt-16 mb-4">Perché è importante lavare correttamente i panni in microfibra?</h2>
                    <p>
                        La microfibra è composta da fibre sintetiche (poliestere e poliammide) migliaia di volte più sottili di un capello. Questa struttura unica crea una vasta superficie in grado di catturare e trattenere sporco, polvere e liquidi. Se non vengono lavati correttamente, le fibre si ostruiscono e il panno perde la sua efficacia, diventando semplicemente un pezzo di stoffa che sposta lo sporco invece di rimuoverlo.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 my-12">
                        <Card className="bg-secondary/50 border-0">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary"/>Massima Efficacia</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Un panno pulito ha fibre libere e pronte a catturare nuovo sporco, garantendo una pulizia profonda.</p>
                            </CardContent>
                        </Card>
                         <Card className="bg-secondary/50 border-0">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Wind className="text-primary"/> Maggiore Durata</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Un lavaggio corretto previene il deterioramento delle fibre, facendo durare i panni molto più a lungo.</p>
                            </CardContent>
                        </Card>
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight mt-16 mb-4">Lavaggio in Lavatrice: Step-by-Step</h2>
                    <p>Questo è il metodo più efficace per una pulizia profonda.</p>
                    <ul className="space-y-4">
                        {washingMachineSteps.map((step, index) => (
                           <li key={index} className="flex items-start gap-3">
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mt-1">{index + 1}</div>
                                <span>{step.text}</span>
                           </li>
                        ))}
                    </ul>

                    <h2 className="text-3xl font-bold tracking-tight mt-16 mb-4">Lavaggio a Mano: Per Piccole Quantità</h2>
                    <p>Ideale per pulire pochi panni o per un lavaggio rapido.</p>
                     <ul className="space-y-4">
                        {handWashSteps.map((step, index) => (
                           <li key={index} className="flex items-start gap-3">
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold mt-1">{index + 1}</div>
                                <span>{step.text}</span>
                           </li>
                        ))}
                    </ul>
                    
                    <h2 className="text-3xl font-bold tracking-tight mt-16 mb-4">Errori Comuni da Evitare Assolutamente</h2>
                    <p>Evitare questi errori è fondamentale per non rovinare i tuoi preziosi panni.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {mistakesToAvoid.map((mistake, index) => (
                            <Card key={index} className="border-destructive/30 bg-destructive/5">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        {mistake.icon}
                                        <CardTitle className="text-lg">{mistake.title}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{mistake.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-16 bg-gradient-to-r from-accent/10 to-primary/10 p-8 rounded-lg not-prose">
                        <h2 className="text-3xl font-bold text-primary">Il Segreto per Panni Sempre "Croccanti": RYSOFT</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            L'acqua dura è nemica della microfibra: i minerali come calcio e magnesio si depositano nelle fibre, indurendole e riducendone l'assorbenza. Per questo abbiamo sviluppato <strong>RYSOFT</strong>, un detergente acido multifunzione.
                        </p>
                        <p className="mt-2 text-muted-foreground">
                            Usato al posto dell'ammorbidente, RYSOFT neutralizza i minerali dell'acqua, disgrega i residui di detergente e ripristina la morbidezza e il potere assorbente originali delle microfibre. È il segreto per avere panni sempre come nuovi.
                        </p>
                        <div className="mt-6">
                            <Button asChild>
                                <Link href="/prodotti/Oidg8Df5HSWcahc5r00C">
                                    Scopri RYSOFT <ShoppingCart className="ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight mt-16 mb-4">Conclusione</h2>
                    <p>
                        Lavare correttamente i panni in microfibra non è un'operazione complicata, ma richiede le giuste attenzioni. Seguendo questa guida, ti assicurerai che le tue attrezzature rimangano performanti a lungo, garantendoti risultati professionali ad ogni utilizzo e ottimizzando il tuo investimento.
                    </p>
                    <div className="mt-8 border-t pt-8 flex justify-center">
                        <Button variant="outline" asChild>
                            <Link href="/prodotti/panni-in-microfibra">
                                Esplora la Nostra Gamma di Panni Professionali <ChevronRight className="ml-2" />
                            </Link>
                        </Button>
                    </div>

                </article>
            </AnimateOnScroll>
        </>
    );
}
