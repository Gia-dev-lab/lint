
"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Menu, Search, Phone, Mail, MessageSquareText, ChevronDown } from "lucide-react";
import { Logo } from "@/components/icons";
import { QuoteRequestForm } from "../quote-request-form";
import { useUser } from "@/firebase";
import { UserNav } from "../auth/user-nav";
import { AuthForm } from "../auth/auth-form";

type NavLink = {
  href: string;
  label: string;
  children?: NavLink[];
};

export default function Header() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  
  const navLinks: NavLink[] = [
    { href: "/#solutions", label: "Soluzioni" },
    {
      href: "/prodotti",
      label: "Prodotti",
      children: [
        { href: "/prodotti/panni-in-microfibra", label: "Panni in Microfibra" },
        { href: "/prodotti/accessori", label: "Accessori e Detailing" },
        { href: "/prodotti/ricambi", label: "Ricambi" },
        { href: "/prodotti/kit-pulizia", label: "Kit di Pulizia" },
        { href: "/prodotti/linea-self-car-wash", label: "Linea Self Car Wash" },
        { href: "/prodotti/detergenti", label: "Detergenti" },
      ]
    },
    {
        href: "/chi-siamo",
        label: "Azienda",
        children: [
            { href: "/chi-siamo", label: "Chi Siamo" },
            { href: "/#why-lint", label: "Perché Lint" },
            { href: "/detailing-journey", label: "Detailing Journey" },
        ]
    }
  ];

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/prodotti?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false); // Chiudi il menu mobile dopo la ricerca
    }
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 mr-4 text-primary">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {navLinks.map((link) =>
              link.children ? (
                <DropdownMenu key={link.href}>
                  <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/70 outline-none">
                    {link.label}
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {link.href.startsWith('/') && !link.href.includes('#') &&
                      <DropdownMenuItem asChild>
                        <Link href={link.href}>Vedi Tutti</Link>
                      </DropdownMenuItem>
                    }
                    {link.children.map((child) => (
                      <DropdownMenuItem key={child.href} asChild>
                        <Link href={child.href}>{child.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-foreground/80 text-foreground/70"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
            <form onSubmit={handleSearchSubmit} className="hidden w-full max-w-xs md:flex relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Cerca attrezzature, ricambi..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>

            <div className="hidden items-center gap-4 lg:flex">
                <a href="tel:+39021234567" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                    <Phone size={16} />
                    <span>+39 02 1234567</span>
                </a>
                <a href="mailto:vendite@lintpro.it" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                    <Mail size={16} />
                    <span>vendite@lintpro.it</span>
                </a>
            </div>

            <Dialog open={isQuoteOpen} onOpenChange={setIsQuoteOpen}>
                <DialogTrigger asChild>
                <Button variant="default" className="hidden sm:flex shrink-0 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:opacity-90">
                    <MessageSquareText className="mr-2 h-4 w-4" />
                    Richiedi Consulenza
                </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Richiedi una Consulenza o un Preventivo</DialogTitle>
                    <DialogDescription>
                      Compila il modulo per ricevere un preventivo o parlare con un nostro esperto.
                    </DialogDescription>
                  </DialogHeader>
                  <QuoteRequestForm onSuccess={() => setIsQuoteOpen(false)} />
                </DialogContent>
            </Dialog>

            {!isUserLoading && (
              user ? (
                <UserNav user={user} />
              ) : (
                <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Accedi</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <AuthForm onSuccess={() => setIsAuthOpen(false)} />
                  </DialogContent>
                </Dialog>
              )
            )}


            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden shrink-0">
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">Apri menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="flex flex-col h-full">
                     <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4 text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                        <Logo />
                    </Link>
                    <nav className="grid gap-2 text-lg font-medium mt-4">
                        {navLinks.map((link) => (
                           link.children ? (
                             <Accordion key={link.label} type="single" collapsible className="w-full">
                               <AccordionItem value="item-1" className="border-b-0">
                                 <AccordionTrigger className="text-lg font-medium text-muted-foreground hover:text-foreground py-2 hover:no-underline">
                                  {link.label}
                                 </AccordionTrigger>
                                 <AccordionContent className="pl-4">
                                   <div className="grid gap-2">
                                     {link.href.startsWith('/') && !link.href.includes('#') &&
                                      <Link
                                        href={link.href}
                                        className="text-muted-foreground transition-colors hover:text-foreground"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                      >
                                        Vedi Tutti
                                      </Link>
                                     }
                                      {link.children.map((childLink) => (
                                        <Link
                                          key={childLink.href}
                                          href={childLink.href}
                                          className="text-muted-foreground transition-colors hover:text-foreground"
                                          onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                          {childLink.label}
                                        </Link>
                                      ))}
                                   </div>
                                 </AccordionContent>
                               </AccordionItem>
                             </Accordion>
                           ) : (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-muted-foreground transition-colors hover:text-foreground py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                           )
                        ))}
                    </nav>
                     <form onSubmit={handleSearchSubmit} className="mt-8 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder="Cerca prodotti..." 
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                    <div className="mt-auto flex flex-col gap-4 border-t pt-4">
                        <Button variant="default" onClick={() => { setIsMobileMenuOpen(false); setIsQuoteOpen(true);}}>
                            <MessageSquareText className="mr-2 h-4 w-4" />
                            Richiedi Consulenza
                        </Button>
                        <div className="flex flex-col gap-4 items-center text-sm font-medium text-muted-foreground">
                            <a href="tel:+39021234567" className="flex items-center gap-2">
                                <Phone size={16} />
                                <span>+39 02 1234567</span>
                            </a>
                            <a href="mailto:vendite@lintpro.it" className="flex items-center gap-2">
                                <Mail size={16} />
                                <span>vendite@lintpro.it</span>
                            </a>
                        </div>
                    </div>
                  </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
