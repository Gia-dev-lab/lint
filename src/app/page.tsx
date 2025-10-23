

"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { products, testimonials, type Product } from "@/lib/data";
import { placeholderImages } from "@/lib/placeholder-images";
import { CheckCircle2 } from 'lucide-react';
import { KitConfigurator } from "@/components/kit-configurator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QuoteRequestForm } from "@/components/quote-request-form";
import Link from "next/link";
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { SparklesCore } from "@/components/ui/sparkles";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

const heroImage = placeholderImages.find(img => img.id === 'hero-background');

export default function Home() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const selectedProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      <main>
        {/* Sezione Eroe */}
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
           <div className="absolute inset-0 bg-background/70 backdrop-blur-sm -z-10" />
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
          <div className="z-10 container max-w-4xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
              Attrezzature per Pulizia Professionale
            </h1>
            <p className="text-lg md:text-xl text-foreground/80">
              Da Lint, sappiamo che per un professionista ogni componente dell’attrezzatura è cruciale per l’efficienza e il risultato finale. Per questo abbiamo creato un ecosistema completo di attrezzature per pulizia professionale, che va oltre i singoli prodotti per offrirti una soluzione integrata e performante. Che tu abbia bisogno di panni tecnici ad alte prestazioni, di accessori per ottimizzare il lavoro o di ricambi per garantire la continuità operativa, qui troverai la qualità e l’affidabilità che il tuo business merita.
            </p>
            <div className="flex gap-4 justify-center">
               <Dialog open={isQuoteOpen} onOpenChange={setIsQuoteOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" variant="default" className="transition-all duration-300 hover:scale-105 hover:shadow-lg">Contattaci per una Consulenza</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-background/90 backdrop-blur-lg">
                  <DialogHeader>
                    <DialogTitle>Richiedi un Preventivo Personalizzato</DialogTitle>
                  </DialogHeader>
                  <QuoteRequestForm onSuccess={() => setIsQuoteOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>
        
        {/* Sezione Nuova Soluzioni Professionali */}
        <section id="solutions" className="py-16 lg:py-24 bg-secondary">
          <AnimateOnScroll>
            <div className="container text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Esplora le Nostre Soluzioni Professionali</h2>
              <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
                Trova rapidamente ciò di cui hai bisogno. Le nostre linee di attrezzature per pulizia professionale sono state selezionate per rispondere alle esigenze specifiche di ogni professionista del pulito.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <SolutionCard 
                  title="Panni in Microfibra"
                  description="Il cuore di ogni intervento di pulizia. La nostra selezione include panni professionali per ogni applicazione: dall’asciugatura ultra-rapida alla pulizia senza aloni."
                  link="#products"
                  linkLabel="Esplora i Panni"
                  product={products.find(p => p.category === 'Panni')}
                />
                <SolutionCard 
                  title="Accessori per la Pulizia"
                  description="Gli strumenti giusti che fanno la differenza. In questa sezione troverai spugne, supporti, applicatori e tutto ciò che serve per massimizzare l’efficienza."
                  link="#products"
                  linkLabel="Scopri gli Accessori"
                  product={products.find(p => p.category === 'Accessori')}
                />
                <SolutionCard 
                  title="Ricambi Professionali"
                  description="Non lasciare che un dettaglio fermi il tuo lavoro. La nostra gamma di ricambi ti assicura la massima continuità operativa e performance ottimali."
                  link="#products"
                  linkLabel="Trova i Ricambi"
                  product={products.find(p => p.category === 'Parti di Ricambio')}
                />
                <SolutionCard
                  title="Panni per Autolavaggio"
                  description="Panni specifici per autolavaggi, ad alta resistenza e capacità di assorbimento per un self-service di qualità e un detailing impeccabile."
                  link="#products"
                  linkLabel="Esplora i Panni"
                  product={products.find(p => p.category === 'Panni per Autolavaggio')}
                />
                <SolutionCard
                  title="Detergenti per Pulizia"
                  description="Prodotti chimici professionali per una pulizia profonda. Formule ecologiche ed efficaci per ogni tipo di superficie e sporco."
                  link="#products"
                  linkLabel="Scopri i Detergenti"
                  product={products.find(p => p.category === 'Detergenti')}
                />
                <SolutionCard
                  title="Kit di Pulizia e Detailing"
                  description="Kit pronti all'uso per professionisti. Soluzioni complete che includono tutto il necessario per iniziare subito a lavorare con efficienza."
                  link="#products"
                  linkLabel="Vedi i Kit"
                  product={products.find(p => p.category === 'Kit')}
                />
              </div>
            </div>
          </AnimateOnScroll>
        </section>

        {/* Sezione Prodotti Selezionati */}
        <section id="products" className="py-16 lg:py-24 bg-background">
          <AnimateOnScroll>
            <div className="container">
              <div className="text-center mb-12">
                 <h2 className="text-3xl md:text-4xl font-bold">Prodotti Selezionati</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {selectedProducts.map(product => <ProductCard key={product.id} product={product} />)}
              </div>
            </div>
          </AnimateOnScroll>
        </section>
        
        {/* Sezione Perché Scegliere Lint */}
        <section id="why-lint" className="py-16 lg:py-24 bg-secondary">
          <AnimateOnScroll>
            <div className="container grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">Perché Scegliere Lint come Fornitore di Attrezzature per Pulizia Professionale</h2>
                 <p className="text-muted-foreground text-lg">
                  Affidarsi a Lint significa scegliere un partner che comprende le sfide del mondo professionale.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-primary mt-1 flex-shrink-0" /> 
                      <div>
                          <h4 className="font-semibold">Qualità Selezionata</h4>
                          <p className="text-muted-foreground">Ogni articolo, dal panno più tecnico al più piccolo ricambio, è testato per garantire standard elevati di performance e durata.</p>
                      </div>
                  </li>
                   <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-primary mt-1 flex-shrink-0" /> 
                      <div>
                          <h4 className="font-semibold">Efficienza Operativa</h4>
                          <p className="text-muted-foreground">Le nostre attrezzature per pulizia professionale sono pensate per lavorare in sinergia, ottimizzando i tempi e riducendo gli sprechi di prodotto e di energia.</p>
                      </div>
                  </li>
                   <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-primary mt-1 flex-shrink-0" /> 
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
          </AnimateOnScroll>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 lg:py-24 bg-background">
          <AnimateOnScroll>
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
          </AnimateOnScroll>
        </section>

        {/* Final CTA Section */}
        <section id="kit-configurator" className="py-16 lg:py-24 bg-secondary">
          <AnimateOnScroll>
            <div className="container grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold">Non Sai da Dove Iniziare?</h2>
                    <p className="text-muted-foreground text-lg">
                        Rispondi a poche semplici domande e il nostro configuratore intelligente ti suggerirà il kit di prodotti perfetto per le tue esigenze specifiche. Che tu gestisca un autolavaggio, un'impresa di pulizie o un hotel, abbiamo la soluzione su misura per te.
                    </p>
                    <p className="text-muted-foreground">
                        Inizia ora e scopri come ottimizzare il tuo lavoro con le attrezzature giuste.
                    </p>
                </div>
                <div>
                    <KitConfigurator />
                </div>
            </div>
          </AnimateOnScroll>
        </section>

      </main>
    </div>
  );
}

function SolutionCard({ title, description, link, linkLabel, product }: { title: string, description: string, link: string, linkLabel: string, product?: Product }) {
  return (
    <Card className="flex flex-col text-center items-center p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      {product && (
        <div className="relative h-32 w-32 mb-4 rounded-full overflow-hidden border-4 border-background shadow-md">
          <Image
            src={product.image.imageUrl}
            alt={title}
            fill
            className="object-cover"
            data-ai-hint={product.image.imageHint}
          />
        </div>
      )}
      <CardHeader className="p-0">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 mt-2 flex-grow">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <div className="mt-4">
        <Button asChild variant="secondary" className="transition-transform duration-300 hover:scale-105">
          <Link href={link}>{linkLabel}</Link>
        </Button>
      </div>
    </Card>
  );
}


function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={product.image.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          data-ai-hint={product.image.imageHint}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <CardDescription className="h-10 line-clamp-2">{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <h4 className="font-semibold text-sm mb-2">Dettagli Chiave:</h4>
        <ul className="space-y-1 text-sm text-muted-foreground">
          {product.details.map(detail => (
            <li key={detail} className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-primary/70" />
              <span>{detail}</span>
            </li>
          ))}
          <li className="flex items-center gap-2">
             <span className="text-primary/70 text-xs font-code">SKU:</span>
              <span className="font-code">{product.id.toUpperCase()}-2024</span>
          </li>
        </ul>
      </CardContent>
      <div className="p-6 pt-0 mt-auto">
        <Button variant="outline" className="w-full transition-colors duration-300 hover:bg-primary hover:text-primary-foreground">Vedi Dettagli</Button>
      </div>
    </Card>
  )
}

    
    
