"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { placeholderImages } from "@/lib/placeholder-images";
import { CheckCircle2, Users, Target, Heart } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const aboutHeroImage = placeholderImages.find(img => img.id === 'about-hero');

const teamMembers = [
  {
    name: "Alessandro Moretti",
    role: "Fondatore & CEO",
    image: placeholderImages.find(img => img.id === 'team-member-1')
  },
  {
    name: "Beatrice Rossi",
    role: "Responsabile Vendite B2B",
    image: placeholderImages.find(img => img.id === 'team-member-2')
  },
  {
    name: "Riccardo Bianchi",
    role: "Specialista Prodotto",
    image: placeholderImages.find(img => img.id === 'team-member-3')
  }
];

const values = [
    {
        icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
        title: "Qualità senza Compromessi",
        description: "Selezioniamo e testiamo ogni prodotto per garantire performance eccellenti e durature. La qualità non è un'opzione, è una promessa."
    },
    {
        icon: <Target className="h-8 w-8 text-primary" />,
        title: "Efficienza Operativa",
        description: "Forniamo soluzioni che ottimizzano i processi di pulizia, riducendo tempi e costi per i nostri clienti. Il tuo successo è il nostro obiettivo."
    },
    {
        icon: <Heart className="h-8 w-8 text-primary" />,
        title: "Partnership e Supporto",
        description: "Andiamo oltre la semplice fornitura. Ci proponiamo come partner strategici, offrendo consulenza e supporto per crescere insieme."
    }
];

export default function ChiSiamoPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] flex items-center justify-center text-center text-foreground overflow-hidden">
        {aboutHeroImage && (
          <Image
            src={aboutHeroImage.imageUrl}
            alt={aboutHeroImage.description}
            fill
            className="object-cover -z-10"
            data-ai-hint={aboutHeroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-background/60 -z-10" />
        <AnimateOnScroll className="z-10 container max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            La Nostra Storia
          </h1>
          <p className="mt-4 text-lg md:text-xl text-foreground/80">
            Passione per l'eccellenza, dedizione per il pulito professionale.
          </p>
        </AnimateOnScroll>
      </section>

      {/* Mission and Vision Section */}
      <AnimateOnScroll>
        <section className="py-16 lg:py-24 bg-secondary">
          <div className="container grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Missione e Visione</h2>
              <p className="text-lg text-muted-foreground">
                La nostra missione è fornire ai professionisti del pulito non solo prodotti, ma soluzioni complete che elevino la qualità e l'efficienza del loro lavoro. Crediamo in un mondo dove la pulizia professionale è sinonimo di tecnologia, sostenibilità e risultati impeccabili.
              </p>
              <p className="text-muted-foreground">
                Aspiriamo a diventare il punto di riferimento in Italia per la fornitura di attrezzature per la pulizia, costruendo partnership durature basate sulla fiducia, la competenza e l'innovazione continua.
              </p>
            </div>
            <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
                {placeholderImages.find(img => img.id === 'product-kit-1') && 
                    <Image 
                        src={placeholderImages.find(img => img.id === 'product-kit-1')?.imageUrl || ''} 
                        alt="Attrezzature professionali Lint"
                        fill
                        className="object-cover"
                        data-ai-hint="attrezzature pulizia"
                    />
                }
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Values Section */}
      <AnimateOnScroll>
        <section className="py-16 lg:py-24 bg-background">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">I Nostri Valori</h2>
                    <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
                        Sono i pilastri su cui costruiamo ogni nostra relazione e selezioniamo ogni nostro prodotto.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((value) => (
                        <Card key={value.title} className="text-center p-6 border-0 shadow-none">
                           <div className="flex justify-center mb-4">{value.icon}</div>
                           <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                           <p className="text-muted-foreground">{value.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
      </AnimateOnScroll>

      {/* Team Section */}
      <AnimateOnScroll>
        <section id="team" className="py-16 lg:py-24 bg-secondary">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Il Nostro Team</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Le persone dietro Lint. Esperti appassionati pronti ad assisterti.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-5xl mx-auto">
              {teamMembers.map((member) => (
                <Card key={member.name} className="overflow-hidden text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardContent className="p-0">
                    {member.image && (
                         <div className="relative h-64 w-full">
                            <Image
                                src={member.image.imageUrl}
                                alt={member.name}
                                fill
                                className="object-cover object-top"
                                data-ai-hint={member.image.imageHint}
                            />
                         </div>
                    )}
                  </CardContent>
                  <CardHeader>
                      <CardTitle className="text-xl">{member.name}</CardTitle>
                      <p className="text-primary font-medium">{member.role}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </AnimateOnScroll>
      
       {/* Final CTA */}
      <AnimateOnScroll>
          <section className="py-16 lg:py-24 bg-background">
            <div className="container text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Pronto a Lavorare con Noi?</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Che tu sia un'impresa di pulizie, un rivenditore o un professionista del car detailing, abbiamo le soluzioni giuste per te. Contattaci oggi per una consulenza personalizzata.
              </p>
              <div className="mt-8 flex gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/#kit-configurator">Richiedi una Consulenza</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/prodotti">Esplora il Catalogo</Link>
                </Button>
              </div>
            </div>
          </section>
      </AnimateOnScroll>
    </>
  );
}
