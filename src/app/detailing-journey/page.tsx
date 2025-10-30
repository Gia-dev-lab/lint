"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { placeholderImages } from '@/lib/data';
import Link from 'next/link';
import { SparklesCore } from '@/components/ui/sparkles';

type Step = 'start' | 'step1' | 'step2' | 'step3' | 'step4' | 'step5' | 'result-a1' | 'result-a2' | 'result-b1' | 'result-b2' | 'result-c1' | 'result-c2' | 'result-d1' | 'result-d2';

const StepIntro = ({ setStep }: { setStep: (step: Step) => void }) => (
  <div className="w-full bg-background flex flex-col items-center justify-center overflow-hidden rounded-md py-16 md:py-24">
    <h1 className="md:text-7xl text-3xl lg:text-8xl font-bold text-center text-foreground relative z-20">
      L’Arte della Pulizia Assoluta
    </h1>
    <div className="w-[40rem] h-20 relative">
      {/* Gradients */}
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-px w-3/4" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-accent to-transparent h-[5px] w-1/4 blur-sm" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-accent to-transparent h-px w-1/4" />
 
      {/* Core component */}
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={1200}
        className="w-full h-full"
        particleColor="hsl(var(--primary))"
      />
 
      {/* Radial Gradient to prevent sharp edges */}
      <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
    </div>
     <AnimateOnScroll className="text-center container">
      <h2 className="mt-4 text-2xl md:text-3xl font-semibold">Il Tuo Percorso di Detailing Interattivo con Chiara Lumina</h2>
      <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
        Benvenuto al livello GOLD del detailing! Chiara Lumina, la nostra esperta, ti guiderà attraverso una pulizia professionale in 5 fasi. Ad ogni bivio, dovrai scegliere l'attrezzo LINT più appropriato. La tua missione: ottenere un risultato che superi gli standard dello showroom.
      </p>
      <Button size="lg" className="mt-8 animate-pulse" onClick={() => setStep('step1')}>
        Inizia la Tua Missione <ArrowRight className="ml-2" />
      </Button>
    </AnimateOnScroll>
  </div>
);

const Step1 = ({ setStep }: { setStep: (step: Step) => void }) => (
  <StepCard
    stepNumber={1}
    title="La Decontaminazione Esterna"
    description="Immagina una carrozzeria sporca di fango, polvere e insetti. La priorità è rimuovere la contaminazione superficiale in sicurezza. Come effettui il prelavaggio foam?"
    choices={[
      { text: "Uso l'Idropulitrice", subtext: "Voglio una schiuma densa per minimizzare i graffi.", onClick: () => setStep('step2') },
      { text: "Uso Acqua e Aria Compressa", subtext: "Devo generare schiuma senza macchinari elettrici.", onClick: () => setStep('step3') }
    ]}
  />
);

const Step2 = ({ setStep }: { setStep: (step: Step) => void }) => (
    <StepCard
        stepNumber={2}
        title="Meccanica Anti-Graffio (Percorso A)"
        description="Hai scelto il prelavaggio ad alta pressione. Dopo il risciacquo, come garantisci che il lavaggio manuale non crei swirls (graffi circolari)?"
        choices={[
            { text: "Focus sui Dettagli", subtext: "Pulisco a fondo cerchi e angoli con accessori specifici.", onClick: () => setStep('result-a1') },
            { text: "Focus sulla Carrozzeria", subtext: "Uso il guanto più morbido e un sistema anti-contaminazione.", onClick: () => setStep('result-a2') }
        ]}
    />
);

const Step3 = ({ setStep }: { setStep: (step: Step) => void }) => (
    <StepCard
        stepNumber={3}
        title="Lavorare Sulle Incrostazioni (Percorso B)"
        description="Sei nella fase di pulizia intensa. Lo sporco è ostinato o devi rigenerare la tua attrezzatura. Qual è la tua sfida più grande?"
        choices={[
            { text: "Rimuovere Sporco Incrostato", subtext: "Ho bisogno di uno sgrassatore forte e azione meccanica.", onClick: () => setStep('result-b1') },
            { text: "Rigenerare Panni e Rimuovere Calcare", subtext: "Devo ripristinare la morbidezza delle microfibre.", onClick: () => setStep('result-b2') }
        ]}
    />
);

const Step4 = ({ setStep }: { setStep: (step: Step) => void }) => (
    <StepCard
        stepNumber={4}
        title="Pulizia e Finitura Interni"
        description="La cabina è il tuo biglietto da visita. Devi affrontare diverse superfici (pelle, plastica, schermi) senza graffiare. Qual è la tua priorità?"
        choices={[
            { text: "Tessuti e Pelle", subtext: "Devo pulire macchie profonde e agitare lo sporco.", onClick: () => setStep('result-c1') },
            { text: "Plastiche Lucide e Cruscotto", subtext: "Devo spolverare e rifinire senza lasciare micro-graffi.", onClick: () => setStep('result-c2') }
        ]}
    />
);

const Step5 = ({ setStep }: { setStep: (step: Step) => void }) => (
    <StepCard
        stepNumber={5}
        title="Asciugatura e Finitura Totale"
        description="Hai finito di pulire. Ora la fase più delicata: asciugare carrozzeria e vetri per ottenere la massima brillantezza anti-alone. Qual è la superficie da finire?"
        choices={[
            { text: "Carrozzeria", subtext: "Devo asciugare una grande superficie in una sola passata.", onClick: () => setStep('result-d1') },
            { text: "Vetri e Cromature", subtext: "Devo eliminare ogni alone, possibilmente senza detergenti.", onClick: () => setStep('result-d2') }
        ]}
    />
);

const ResultA1 = ({ setStep }: { setStep: (step: Step) => void }) => (
    <ResultCard
        title="RISULTATO: Pulizia a 360°"
        actionTitle="Azione di Chiara"
        actionDescription="Chiara inserisce la Spazzola Lavacerchi MAXI tra i raggi di un cerchio in lega, pulendo in profondità il canale interno."
        image={{ src: "https://www.lintmicrofibercloths.it/wp-content/uploads/2025/07/Cat_Accessori-Pulizia.png", alt: "Spazzola lavacerchi in azione", hint: "spazzola cerchi" }}
        products={[
            { name: "Secchio con Grata Grit Guard", description: "Intrappola i detriti sul fondo per prevenire graffi sulla vernice.", link: "/prodotti/2f8vUF6QhtDuTlHLCzca" },
            { name: "Spazzola Lavacerchi MAXI ECO", description: "Lunghezza 38 cm, setole dense e morbide, ideale per il canale interno.", link: "/prodotti/8OOyWZ0WJHdLeluzVoHE" }
        ]}
        nextStep={() => setStep('step4')}
        setStep={setStep}
    />
);

const ResultA2 = ({ setStep }: { setStep: (step: Step) => void }) => (
    <ResultCard
        title="RISULTATO: Il Cuscino di Microfibra"
        actionTitle="Azione di Chiara"
        actionDescription="Chiara usa il Guanto MATTY a pelo ultra-lungo per sollevare e isolare le particelle di sporco dalla vernice."
        image={{ src: "https://www.lintmicrofibercloths.it/wp-content/uploads/2025/08/Guanto-Lavaggio-MATTY-Pelo-Lungo-con-Elastico.png", alt: "Guanto MATTY su carrozzeria", hint: "guanto lavaggio" }}
        products={[
            { name: "Guanto MATTY", description: "Microfibra 'Plush' a pelo ultra-lungo. Crea un cuscino che isola lo sporco per il lavaggio più sicuro.", link: "/prodotti/6HZrOeQ9osxHvQcwjOUG" },
            { name: "Spugna HIPPY", description: "Guanto in microfibra 'Chenille' a multifrange, anti-graffio con presa sicura.", link: "/prodotti/IWGEIicCwd8ZL9rcogZE" }
        ]}
        nextStep={() => setStep('step4')}
        setStep={setStep}
    />
);

const ResultB1 = ({ setStep }: { setStep: (step: Step) => void }) => (
    <ResultCard
        title="RISULTATO: Potenza Concentrata"
        actionTitle="Azione di Chiara"
        actionDescription="Chiara usa un pennello con setole in KREX per sgrassare il vano motore dopo aver spruzzato l'A.P.C. 5456."
        image={{ src: "https://www.lintmicrofibercloths.it/wp-content/uploads/2025/07/Spazzola-con-Setole-Dure-per-Tappeti-e-Moquette-Auto.png", alt: "Pulizia vano motore con pennello", hint: "pulizia motore" }}
        products={[
            { name: "A.P.C. 5456", description: "Detergente universale concentrato per motori, cerchioni, grasso e sporco pesante.", link: "/prodotti/ivfZj0KIrTLjsw7LZRZl" },
            { name: "Set 3 Pennelli Detailing PRO", description: "Include il pennello in KREX, resistente agli acidi e ai chimici aggressivi.", link: "/prodotti/h9Rigug6d5B4GBwstTGb" }
        ]}
        nextStep={() => setStep('step4')}
        setStep={setStep}
    />
);

const ResultB2 = ({ setStep }: { setStep: (step: Step) => void }) => (
    <ResultCard
        title="RISULTATO: Neutralizzare il Calcare"
        actionTitle="Azione di Chiara"
        actionDescription="Chiara versa RYSOFT nella vaschetta dell'ammorbidente della lavatrice per rigenerare un carico di panni in microfibra."
        image={{ src: placeholderImages.find(i => i.id === 'product-cloth-2')?.imageUrl || '', alt: "Panni in microfibra in lavatrice", hint: "panni lavatrice" }}
        products={[
            { name: "RYSOFT", description: "Detergente acido multifunzione. Usato al posto dell'ammorbidente, neutralizza i minerali dell'acqua dura. Ottimo anche come disincrostante.", link: "/prodotti/Oidg8Df5HSWcahc5r00C" }
        ]}
        nextStep={() => setStep('step4')}
        setStep={setStep}
    />
);

const ResultC1 = ({ setStep }: { setStep: (step: Step) => void }) => (
    <ResultCard
        title="RISULTATO: Il Lavoro 2-in-1"
        actionTitle="Azione di Chiara"
        actionDescription="Chiara usa il lato grigio (scrub) del DUAL SCRUB PAD su un sedile in pelle per sollevare lo sporco, e poi il lato bianco (microfibra) per asportare i residui."
        image={{ src: "https://www.lintmicrofibercloths.it/wp-content/uploads/2025/07/Tampone-Detailing-2-in-1-per-Interni-e-Pelle.png", alt: "Pulizia sedile in pelle", hint: "pulizia interni" }}
        products={[
            { name: "DUAL SCRUB PAD", description: "Pad 2-in-1. Lato grigio per agitare lo sporco, lato bianco in microfibra per assorbire.", link: "/prodotti/8uiCXrrBDtd7cXKlJ90k" }
        ]}
        nextStep={() => setStep('step5')}
        setStep={setStep}
    />
);

const ResultC2 = ({ setStep }: { setStep: (step: Step) => void }) => (
    <ResultCard
        title="RISULTATO: Delicatezza Estrema"
        actionTitle="Azione di Chiara"
        actionDescription="Chiara usa la Spazzola LUX con setole morbidissime per spolverare la console centrale in piano black, e poi passa il panno SOFT-SOFT per la lucidatura."
        image={{ src: "https://www.lintmicrofibercloths.it/wp-content/uploads/2025/10/spazzola-detailing.png", alt: "Pulizia console piano black", hint: "pulizia console" }}
        products={[
            { name: "Spazzola LUX", description: "Setole morbidissime, anti-graffio, perfetta per schermi e superfici lucide.", link: "/prodotti/acuo5nUIETdAAME2JEkV" },
            { name: "Panno SOFT-SOFT (PAN132)", description: "Pelo Ultra-lungo 'Plush', Bordo Edgeless, ideale per finiture su nero laccato.", link: "/prodotti/AH0Qe2HGdd6tKnEeUlp3" }
        ]}
        nextStep={() => setStep('step5')}
        setStep={setStep}
    />
);

const ResultD1 = ({ setStep }: { setStep: (step: Step) => void }) => (
    <ResultCard
        title="RISULTATO: Il Re dell’Assorbenza"
        actionTitle="Azione di Chiara"
        actionDescription="Chiara tiene aperto il panno BYSONT Maxi Formato 60x90 cm sulla carrozzeria bagnata, che assorbe l'acqua per contatto."
        image={{ src: "https://www.lintmicrofibercloths.it/wp-content/uploads/2025/08/Panno-Asciugatura-Auto-1200-GSM-BYSONT.png", alt: "Asciugatura auto con panno Bysont", hint: "asciugatura auto" }}
        products={[
            { name: "BYSONT (PAN170)", description: "GSM: 1400; Tecnologia Twisted Pile. Assorbe fino a 12 volte il suo peso in acqua. Ideale per asciugare grandi superfici in una sola passata.", link: "/prodotti/I9shR7SOvaa24ko2tfuj" }
        ]}
        isFinalStep={true}
        setStep={setStep}
    />
);

const ResultD2 = ({ setStep }: { setStep: (step: Step) => void }) => (
    <ResultCard
        title="RISULTATO: Chiarezza Cristallina"
        actionTitle="Azione di Chiara"
        actionDescription="Chiara passa il panno MOMMY AMAR leggermente umido su un vetro, ispezionando il risultato per verificare l'assenza di striature."
        image={{ src: "https://www.lintmicrofibercloths.it/wp-content/uploads/2025/07/Panno-Vetri-MOMMY-AMAR-Finitura-Anti-Alone.png", alt: "Pulizia vetri auto", hint: "pulizia vetri" }}
        products={[
            { name: "MOMMY AMAR - FIBER (PAN101)", description: "Spessore 0.3mm e trama Ultra-fine. Specifico per vetri, specchi e cromature. Pulisce anche solo con acqua.", link: "/prodotti/MMKHizpcAKJhNkSjuIxg" },
            { name: "SUPER GLASSES PRO (PAN130)", description: "Consigliato per sporco ostinato e unto, con metodo a Doppio Step.", link: "/prodotti/NEorcFP1G94dzgPtETTP" }
        ]}
        isFinalStep={true}
        setStep={setStep}
    />
);


interface StepCardProps {
    stepNumber: number;
    title: string;
    description: string;
    choices: { text: string; subtext: string; onClick: () => void }[];
}

const StepCard = ({ stepNumber, title, description, choices }: StepCardProps) => (
    <AnimateOnScroll className="container py-12">
        <Card className="max-w-4xl mx-auto overflow-hidden shadow-2xl border-primary/20">
            <CardHeader className="bg-secondary p-6">
                <CardDescription>STEP {stepNumber}</CardDescription>
                <CardTitle className="text-3xl text-primary">{title}</CardTitle>
                <p className="text-muted-foreground pt-2">{description}</p>
            </CardHeader>
            <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Punto di Scelta:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {choices.map((choice, index) => (
                        <button
                            key={index}
                            onClick={choice.onClick}
                            className="text-left p-6 border rounded-lg hover:bg-secondary transition-all duration-300 group hover:shadow-lg hover:-translate-y-1"
                        >
                            <p className="font-semibold text-primary text-lg">{choice.text}</p>
                            <p className="text-sm text-muted-foreground mt-1">{choice.subtext}</p>
                            <div className="flex justify-end mt-3">
                                <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1" />
                            </div>
                        </button>
                    ))}
                </div>
            </CardContent>
        </Card>
    </AnimateOnScroll>
);


interface ResultCardProps {
    title: string;
    actionTitle: string;
    actionDescription: string;
    image: { src: string; alt: string; hint: string };
    products: { name: string; description: string; link?: string }[];
    nextStep?: () => void;
    isFinalStep?: boolean;
    setStep: (step: Step) => void;
}

const ResultCard = ({ title, actionTitle, actionDescription, image, products, nextStep, isFinalStep = false, setStep }: ResultCardProps) => (
    <AnimateOnScroll className="container py-12">
        <Card className="max-w-4xl mx-auto overflow-hidden shadow-2xl border-accent/20">
            <CardHeader className="p-6 bg-gradient-to-r from-accent/10 to-primary/10">
                <h2 className="text-2xl font-bold text-primary">{title}</h2>
            </CardHeader>
            <CardContent className="p-6 grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <h3 className="font-semibold text-xl">{actionTitle}</h3>
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
                        <Image src={image.src} alt={image.alt} fill className="object-cover" data-ai-hint={image.hint} />
                    </div>
                    <p className="text-muted-foreground">{actionDescription}</p>
                </div>
                <div className="space-y-4">
                    <h3 className="font-semibold text-xl">Prodotti Chiave Utilizzati</h3>
                    <ul className="space-y-4">
                        {products.map(product => (
                            <li key={product.name} className="p-3 bg-secondary/50 rounded-md">
                                <h4 className="font-semibold">{product.name}</h4>
                                <p className="text-sm text-muted-foreground">{product.description}</p>
                                {product.link && <Link href={product.link} className="text-sm text-primary hover:underline">Vedi prodotto <ArrowRight className="inline w-4 h-4" /></Link>}
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
            <div className="p-6 bg-secondary flex justify-center gap-4">
                {isFinalStep ? (
                    <>
                        <Button onClick={() => setStep('start')} className="animate-pulse">
                            <RefreshCw className="mr-2" />
                            Ricomincia il Percorso
                        </Button>
                         <Button variant="outline" asChild>
                           <Link href="/prodotti">Esplora tutti i prodotti</Link>
                         </Button>
                    </>
                ) : (
                    <Button onClick={nextStep} className="animate-pulse">
                        Prossimo Step <ArrowRight className="ml-2" />
                    </Button>
                )}
            </div>
        </Card>
    </AnimateOnScroll>
);


export default function DetailingJourneyPage() {
  const [step, setStep] = useState<Step>('start');

  const renderStep = () => {
    switch (step) {
      case 'start': return <StepIntro setStep={setStep} />;
      case 'step1': return <Step1 setStep={setStep} />;
      case 'step2': return <Step2 setStep={setStep} />;
      case 'step3': return <Step3 setStep={setStep} />;
      case 'step4': return <Step4 setStep={setStep} />;
      case 'step5': return <Step5 setStep={setStep} />;
      case 'result-a1': return <ResultA1 setStep={setStep} />;
      case 'result-a2': return <ResultA2 setStep={setStep} />;
      case 'result-b1': return <ResultB1 setStep={setStep} />;
      case 'result-b2': return <ResultB2 setStep={setStep} />;
      case 'result-c1': return <ResultC1 setStep={setStep} />;
      case 'result-c2': return <ResultC2 setStep={setStep} />;
      case 'result-d1': return <ResultD1 setStep={setStep} />;
      case 'result-d2': return <ResultD2 setStep={setStep} />;
      default: return <StepIntro setStep={setStep} />;
    }
  };

  return (
    <div className="bg-background w-full">
      {renderStep()}
    </div>
  );
}
