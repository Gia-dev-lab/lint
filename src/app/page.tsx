
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { products, testimonials, productCategories, type Product } from "@/lib/data";
import { placeholderImages } from "@/lib/data";
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

const heroImage = placeholderImages.find(img => img.id === 'hero-background');

export default function Home() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <main>
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] flex items-center justify-center text-center text-white">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="z-0 object-cover brightness-50"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="z-10 container max-w-4xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Professional Grade Microfiber Solutions
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              The ultimate source for high-quality cleaning products for Car Washes and Ho.Re.Ca industries.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg" variant="default">
                <Link href="#products">Browse Products</Link>
              </Button>
              <Dialog open={isQuoteOpen} onOpenChange={setIsQuoteOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" variant="accent">Request a Quote</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Request a Custom Quote</DialogTitle>
                  </DialogHeader>
                  <QuoteRequestForm onSuccess={() => setIsQuoteOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>

        {/* Product Catalog Section */}
        <section id="products" className="py-16 lg:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Our Product Catalog</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Explore our comprehensive range of microfiber cloths, accessories, and specialized kits.
              </p>
            </div>
            <Tabs defaultValue="All" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
                <TabsTrigger value="All">All</TabsTrigger>
                {productCategories.map(cat => <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>)}
              </TabsList>
              
              <TabsContent value="All">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
              </TabsContent>

              {productCategories.map(cat => (
                 <TabsContent key={cat} value={cat}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {products.filter(p => p.category === cat).map(product => <ProductCard key={product.id} product={product} />)}
                    </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
        
        {/* Kit Configurator Section */}
        <section id="configurator" className="py-16 lg:py-24 bg-secondary">
          <div className="container grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Can't Find the Right Kit?</h2>
              <p className="text-muted-foreground text-lg">
                Let our AI-powered assistant create a personalized kit for you. Describe your business and cleaning tasks, and we'll suggest the perfect combination of products.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="text-primary" /> Tailored to your industry (Car Wash, Hotel, etc.)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="text-primary" /> Optimizes for efficiency and cost-effectiveness.</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="text-primary" /> Instant recommendations, ready to be quoted.</li>
              </ul>
            </div>
            <KitConfigurator />
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 lg:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Trusted by Industry Leaders</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Hear what our B2B clients have to say about Lint Microfiber products.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="flex flex-col">
                  <CardContent className="pt-6 flex-grow">
                    <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                  </CardContent>
                  <CardHeader className="flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.image.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.image.imageHint} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.company}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden flex flex-col group">
      <div className="relative h-48 w-full">
        <Image
          src={product.image.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          data-ai-hint={product.image.imageHint}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <CardDescription className="h-10 line-clamp-2">{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <h4 className="font-semibold text-sm mb-2">Key Details:</h4>
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
        <Button variant="outline" className="w-full">View Details</Button>
      </div>
    </Card>
  )
}
