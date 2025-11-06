
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { testimonials } from "@/lib/data";
import { placeholderImages } from "@/lib/data";
import { CheckCircle2, Building, Car, Hotel, SprayCan, Wind, Sparkles, Layers, GlassWater, CookingPot, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QuoteRequestForm } from "@/components/quote-request-form";
import Link from "next/link";
import { useState, useEffect, useMemo, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { SparklesCore } from "@/components/ui/sparkles";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { useCollection, useFirestore } from "@/firebase";
import { collection, limit, query } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/product-card";
import Autoplay from "embla-carousel-autoplay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils";

const heroImage = placeholderImages.find(img => img.id === 'hero-background');

const animatedHeadlines = [
  "Efficienza Ineguagliabile.",
  "Qualità Professionale.",
  "Supporto Dedicato.",
];

const solutionCategories = [
    {
        title: "Panni in Microfibra",
        link: "/prodotti/panni-in-microfibra",
        image: "https://www.lintmicrofibercloths.it/wp-content/uploads/2025/07/Cat_Panno-Microfibra.png",
        imageHint: "panno"
    },
    {
        title: "Accessori per Pulizia",
        link: "/prodotti/accessori",
        image: "https://www.lintmicrofibercloths.it/wp-content/uploads/2025/07/Cat_Accessori.png",
        imageHint: "accessori pulizia"
    },
    {
        title: "Parti di Ricambio",
        link: "/prodotti/ricambi",
        image: "https://www.lintmicrofibercloths.it/wp-content/uploads/2025/07/Cat_Ricambi.png",
        imageHint: "ricambi"
    },
    {
        title: "Panni Autolavaggio",
        link: "/prodotti/linea-self-car-wash",
        image: "https://www.lintmicrofibercloths.it/wp-content/uploads/2025/07/Cat_Self-Wash.png",
        imageHint: "autolavaggio"
    },
    {
        title: "Detergenti",
        link: "/prodotti/detergenti",
        image: "https://www.lintmicrofibercloths.it/wp-content/uploads/2025/07/Cat_Chimici.png",
        imageHint: "detergenti"
    },
    {
        title: "Kit di Pulizia",
        link: "/prodotti/kit-pulizia",
        image: "https://www.lintmicrofibercloths.it/wp-content/uploads/2025/07/kit-1-moto-bike-scaled.jpg",
        imageHint: "kit pulizia"
    },
];


const ctaImageDefault = {
    imageUrl: "https://www.lintmicrofibercloths.it/wp-content/uploads/2025/08/Panno-Asciugatura-Auto-1200-GSM-BYSONT.png",
    description: "Panno Asciugatura Auto 1200 GSM BYSONT",
    imageHint: "panno auto",
    link: "/prodotti/I9shR7SOvaa24ko2tfuj"
};

const ctaImageDetailing = {
    imageUrl: "https://www.lintmicrofibercloths.it/wp-content/uploads/2025/07/PAD-POLISH-3-in-1-Kit-Lucidatura-Auto-a-3-Fasi.png",
    description: "Kit Lucidatura Auto a 3 Fasi",
    imageHint: "kit lucidatura",
    link: "/prodotti/accessori" 
};

const ctaImageHoreca = {
    imageUrl: "https://www.lintmicrofibercloths.it/wp-content/uploads/2024/10/Panno-Multiuso-TNT-ETURK.png",
    description: "Panno Multiuso TNT ETURK",
    imageHint: "panno multiuso",
    link: "/prodotti/panni-in-microfibra"
}


export default function Home() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
  const [activeTabImage, setActiveTabImage] = useState(ctaImageDefault);
  const [isHeroImageBlurred, setIsHeroImageBlurred] = useState(true);

  const firestore = useFirestore();
  
  const autoplayPlugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const productsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, "prodotti"), limit(6));
  }, [firestore]);

  const { data: products, isLoading: isLoadingProducts } = useCollection(productsQuery);

  useEffect(() => {
    const headlineInterval = setInterval(() => {
      setCurrentHeadlineIndex((prevIndex) => (prevIndex + 1) % animatedHeadlines.length);
    }, 3000); 

    const blurTimeout = setTimeout(() => {
        setIsHeroImageBlurred(false);
    }, 2500);

    return () => {
        clearInterval(headlineInterval);
        clearTimeout(blurTimeout);
    };
  }, []);

  const handleTabChange = (value: string) => {
    switch (value) {
        case 'detailing':
            setActiveTabImage(ctaImageDetailing);
            break;
        case 'horeca':
            setActiveTabImage(ctaImageHoreca);
            break;
        case 'cleaning':
        default:
            setActiveTabImage(ctaImageDefault);
            break;
    }
  }

  return (
    <div className="flex flex-col">
      <main>
        {/* Sezione Eroe */}
        <section className="relative w-full h-screen flex items-center justify-center text-center text-foreground overflow-hidden">
           {heroImage && (
            <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className={cn(
                    "object-cover -z-10 transition-all duration-1000",
                    isHeroImageBlurred ? "blur-md" : "blur-0"
                )}
                data-ai-hint={heroImage.imageHint}
                priority
            />
           )}
           <div className="absolute inset-0 bg-background/70 -z-10" />
           <div className="w-full absolute inset-0 h-full">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={100}
              className="w-full h-full"
              particleColor="hsl(var(--foreground))"
            />
          </div>
          <AnimateOnScroll className="z-10 container max-w-5xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Lint: L'Ecosistema Completo per la Pulizia Professionale.
            </h1>
            <div className="text-3xl md:text-5xl font-semibold text-primary mt-4 h-16 relative">
              {animatedHeadlines.map((text, index) => (
                <span
                  key={index}
                  className={`absolute w-full left-0 transition-all duration-500 ease-in-out ${index === currentHeadlineIndex ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}
                >
                  {text}
                </span>
              ))}
            </div>
            <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
              Dalla microfibra tecnica ai ricambi essenziali, ti offriamo soluzioni integrate per elevare l'efficienza e il risultato del tuo lavoro.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
               <Dialog open={isQuoteOpen} onOpenChange={setIsQuoteOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" variant="default" className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:opacity-90">Contattaci per una Consulenza</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-background/90 backdrop-blur-lg">
                  <DialogHeader>
                    <DialogTitle>Richiedi un Preventivo Personalizzato</DialogTitle>
                  </DialogHeader>
                  <QuoteRequestForm onSuccess={() => setIsQuoteOpen(false)} />
                </DialogContent>
              </Dialog>
              <Button size="lg" variant="outline" asChild className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:opacity-90">
                <Link href="#solutions">Esplora le Soluzioni</Link>
              </Button>
            </div>
          </AnimateOnScroll>
        </section>
        
        {/* Sezione Nuova Soluzioni Professionali */}
        <AnimateOnScroll>
          <section id="solutions" className="py-16 lg:py-24 bg-secondary">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Esplora le Nostre Soluzioni Professionali</h2>
                <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
                  Trova rapidamente ciò di cui hai bisogno. Le nostre linee di attrezzature per pulizia professionale sono state selezionate per rispondere alle esigenze specifiche di ogni professionista del pulito.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {solutionCategories.map((category) => (
                    <SolutionCategoryCard
                        key={category.title}
                        title={category.title}
                        link={category.link}
                        image={category.image}
                        imageHint={category.imageHint}
                    />
                ))}
              </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* Sezione Prodotti Selezionati */}
        <AnimateOnScroll>
          <section id="products" className="py-16 lg:py-24 bg-background">
            <div className="container">
              <div className="text-center mb-12">
                 <h2 className="text-3xl md:text-4xl font-bold">Prodotti in Evidenza</h2>
                 <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Una selezione dei nostri articoli più richiesti, scelti per te.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                  {isLoadingProducts && Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)}
                  {products?.map(product => <ProductCard key={product.id} product={product} />)}
              </div>
               <div className="text-center mt-12">
                <Button asChild size="lg">
                  <Link href="/prodotti">Vedi tutti i prodotti</Link>
                </Button>
              </div>
            </div>
          </section>
        </AnimateOnScroll>
        
        {/* Sezione Perché Scegliere Lint */}
        <AnimateOnScroll>
          <section id="why-lint" className="py-16 lg:py-24 bg-secondary">
            <div className="container grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">Perché Scegliere Lint come Fornitore di Attrezzature per Pulizia Professionale</h2>
                 <p className="text-muted-foreground text-lg">
                  Affidarsi a Lint significa scegliere un partner che comprende le sfide del mondo professionale.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-primary mt-1 flex-shrink-0 transition-all duration-500 delay-300 group-data-[visible=true]:scale-100 group-data-[visible=true]:opacity-100 scale-50 opacity-0" /> 
                      <div>
                          <h4 className="font-semibold">Qualità Selezionata</h4>
                          <p className="text-muted-foreground">Ogni articolo, dal panno più tecnico al più piccolo ricambio, è testato per garantire standard elevati di performance e durata.</p>
                      </div>
                  </li>
                   <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-primary mt-1 flex-shrink-0 transition-all duration-500 delay-500 group-data-[visible=true]:scale-100 group-data-[visible=true]:opacity-100 scale-50 opacity-0" /> 
                      <div>
                          <h4 className="font-semibold">Efficienza Operativa</h4>
                          <p className="text-muted-foreground">Le nostre attrezzature per pulizia professionale sono pensate per lavorare in sinergia, ottimizzando i tempi e riducendo gli sprechi di prodotto e di energia.</p>
                      </div>
                  </li>
                   <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-primary mt-1 flex-shrink-0 transition-all duration-500 delay-700 group-data-[visible=true]:scale-100 group-data-[visible=true]:opacity-100 scale-50 opacity-0" /> 
                      <div>
                          <h4 className="font-semibold">Supporto Completo</h4>
                          <p className="text-muted-foreground">Offriamo consulenza specializzata per aiutarti a costruire il kit di pulizia perfetto per le tue esigenze, con listini dedicati a rivenditori e grandi utilizzatori.</p>
                      </div>
                  </li>
                </ul>
              </div>
               <div className="space-y-4 rounded-lg bg-background p-8 shadow-lg">
                  <h3 className="text-2xl font-bold">Ci Rivolgiamo ai Professionisti di Diversi Settori:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary/80" /> Imprese di Pulizia e Facility Management</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary/80" /> Centri di Car Detailing e Autolavaggi</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary/80" /> Settore Ho.Re.Ca. (Hotel, Ristoranti, Catering)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary/80" /> Industria e Manifattura</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary/80" /> Rivenditori di Prodotti e Attrezzature Professionali</li>
                  </ul>
                  <p className="pt-4">Sei pronto a elevare la qualità del tuo lavoro? <a href="#" onClick={(e) => { e.preventDefault(); setIsQuoteOpen(true); }} className="text-primary font-semibold hover:underline">Contattaci per una consulenza</a> e scopri le nostre soluzioni B2B.</p>
               </div>
            </div>
          </section>
        </AnimateOnScroll>

        {/* Testimonials Section */}
        <AnimateOnScroll>
          <section id="testimonials" className="py-16 lg:py-24 bg-background">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">La Parola ai Nostri Clienti</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                  Scopri perché i professionisti di tutta Italia si affidano a Lint per le loro attrezzature.
                </p>
              </div>
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full max-w-4xl mx-auto"
              >
                <CarouselContent>
                  {testimonials.map((testimonial) => (
                    <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <CardContent className="p-6 flex-grow">
                          <p className="italic">"{testimonial.quote}"</p>
                        </CardContent>
                        <CardHeader className="pt-0 flex-row items-center gap-4">
                          <div className="relative h-12 w-12 rounded-full overflow-hidden">
                            <Image
                              src={testimonial.image.imageUrl}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                              data-ai-hint={testimonial.image.imageHint}
                            />
                          </div>
                          <div>
                            <CardTitle className="text-base">{testimonial.name}</CardTitle>
                            <CardDescription>{testimonial.company}</CardDescription>
                          </div>
                        </CardHeader>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </section>
        </AnimateOnScroll>

        {/* Final CTA Section */}
        <AnimateOnScroll>
          <section id="kit-configurator" className="py-20 lg:py-32 bg-secondary text-foreground">
              <div className="container">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                      <Link href={activeTabImage.link}>
                          <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
                              {activeTabImage && (
                                  <Image
                                      src={activeTabImage.imageUrl}
                                      alt={activeTabImage.description}
                                      fill
                                      className="object-cover transition-transform duration-300 hover:scale-105 hover:rotate-2"
                                      data-ai-hint={activeTabImage.imageHint}
                                  />

                              )}
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                  <h3 className="text-white text-xl font-bold text-center p-4">
                                      {activeTabImage?.description}
                                  </h3>
                              </div>
                          </div>
                      </Link>
                      <div className="text-center md:text-left">
                          <h2 className="text-3xl md:text-4xl font-bold">Trova la Soluzione Giusta per Te</h2>
                          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto md:mx-0">
                              Ogni settore ha esigenze uniche. Il nostro team di esperti è a tua disposizione per consigliarti le migliori attrezzature per ottimizzare il tuo lavoro.
                          </p>
                          <Dialog open={isQuoteOpen} onOpenChange={setIsQuoteOpen}>
                            <Tabs defaultValue="cleaning" className="mt-6" onValueChange={handleTabChange}>
                              <TabsList className="grid w-full grid-cols-3">
                                  <TabsTrigger value="cleaning"><Building className="mr-2"/>Imprese</TabsTrigger>
                                  <TabsTrigger value="detailing"><Car className="mr-2"/>Detailing</TabsTrigger>
                                  <TabsTrigger value="horeca"><Hotel className="mr-2"/>Ho.Re.Ca.</TabsTrigger>
                              </TabsList>
                              <TabsContent value="cleaning" className="p-4 bg-background/50 rounded-b-lg border border-t-0">
                                  <p className="text-sm text-muted-foreground mb-4">Ottimizza i tempi e garantisci un pulito impeccabile in uffici, condomini e strutture sanitarie.</p>
                                  <h4 className="font-semibold mb-2">Prodotti Consigliati:</h4>
                                  <ul className="space-y-2 text-sm text-muted-foreground list-inside mb-4">
                                      <li className="flex items-center"><Layers className="w-4 h-4 mr-2 text-primary"/>Panni multiuso ad alta assorbenza</li>
                                      <li className="flex items-center"><SprayCan className="w-4 h-4 mr-2 text-primary"/>Detergenti igienizzanti concentrati</li>
                                      <li className="flex items-center"><Building className="w-4 h-4 mr-2 text-primary"/>Ricambi per attrezzature (mop, spazzole)</li>
                                  </ul>
                                  <DialogTrigger asChild>
                                    <Button className="w-full">Richiedi Consulenza Specifica</Button>
                                  </DialogTrigger>
                              </TabsContent>
                              <TabsContent value="detailing" className="p-4 bg-background/50 rounded-b-lg border border-t-0">
                                  <p className="text-sm text-muted-foreground mb-4">Raggiungi la perfezione nella cura dell'auto, dalla decontaminazione alla finitura lucida.</p>
                                    <h4 className="font-semibold mb-2">Prodotti Consigliati:</h4>
                                  <ul className="space-y-2 text-sm text-muted-foreground list-inside mb-4">
                                      <li className="flex items-center"><Wind className="w-4 h-4 mr-2 text-primary"/>Panni per asciugatura ultra-assorbenti</li>
                                      <li className="flex items-center"><Sparkles className="w-4 h-4 mr-2 text-primary"/>Applicatori per cere e sigillanti</li>
                                      <li className="flex items-center"><SprayCan className="w-4 h-4 mr-2 text-primary"/>Sgrassatori e decontaminanti specifici</li>
                                  </ul>
                                  <DialogTrigger asChild>
                                    <Button className="w-full">Richiedi Consulenza Specifica</Button>
                                  </DialogTrigger>
                              </TabsContent>
                              <TabsContent value="horeca" className="p-4 bg-background/50 rounded-b-lg border border-t-0">
                                  <p className="text-sm text-muted-foreground mb-4">Mantieni i più alti standard di igiene in cucine, sale e camere d'hotel, nel rispetto delle normative HACCP.</p>
                                  <h4 className="font-semibold mb-2">Prodotti Consigliati:</h4>
                                  <ul className="space-y-2 text-sm text-muted-foreground list-inside mb-4">
                                      <li className="flex items-center"><Hotel className="w-4 h-4 mr-2 text-primary"/>Panni colore-codificati per aree di lavoro</li>
                                      <li className="flex items-center"><CookingPot className="w-4 h-4 mr-2 text-primary"/>Detergenti per superfici a contatto con alimenti</li>
                                      <li className="flex items-center"><GlassWater className="w-4 h-4 mr-2 text-primary"/>Sistemi per la pulizia di vetri e acciai</li>
                                  </ul>
                                  <DialogTrigger asChild>
                                    <Button className="w-full">Richiedi Consulenza Specifica</Button>
                                  </DialogTrigger>
                              </TabsContent>
                              </Tabs>
                              <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                      <DialogTitle>Richiedi una Consulenza o un Preventivo</DialogTitle>
                                  </DialogHeader>
                                  <QuoteRequestForm onSuccess={() => setIsQuoteOpen(false)} />
                              </DialogContent>
                          </Dialog>
                      </div>
                  </div>
              </div>
          </section>
        </AnimateOnScroll>
      </main>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col">
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
  );
}

function SolutionCategoryCard({ title, link, image, imageHint }: { title: string, link: string, image: string, imageHint: string }) {
    return (
        <Link href={link} className="block relative overflow-hidden rounded-lg shadow-lg">
            <div className="relative w-full aspect-video">
                <Image 
                    src={image}
                    alt={title} 
                    fill
                    className="object-cover"
                    data-ai-hint={imageHint}
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                    {title}
                </h3>
            </div>
        </Link>
    );
}

    
