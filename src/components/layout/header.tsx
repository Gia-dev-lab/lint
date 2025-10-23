
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Menu, Search, Phone, Mail, Sparkles } from "lucide-react";
import { Logo } from "@/components/icons";
import { QuoteRequestForm } from "../quote-request-form";

export default function Header() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { href: "#products", label: "Products" },
    { href: "#configurator", label: "Kit Configurator" },
    { href: "#testimonials", label: "Testimonials" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 mr-4">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
            <div className="hidden w-full max-w-xs md:flex relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search products, parts..." className="pl-9" />
            </div>

            <div className="hidden items-center gap-4 lg:flex">
                <a href="tel:+18005555468" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                    <Phone size={16} />
                    <span>+1 (800) 555-LINT</span>
                </a>
                <a href="mailto:sales@lintmicrofiber.com" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                    <Mail size={16} />
                    <span>sales@lintmicrofiber.com</span>
                </a>
            </div>

            <Dialog open={isQuoteOpen} onOpenChange={setIsQuoteOpen}>
                <DialogTrigger asChild>
                <Button variant="accent" className="hidden sm:flex shrink-0">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Request Quote
                </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Request a Custom Quote</DialogTitle>
                </DialogHeader>
                <QuoteRequestForm onSuccess={() => setIsQuoteOpen(false)} />
                </DialogContent>
            </Dialog>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden shrink-0">
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="flex flex-col h-full">
                    <nav className="grid gap-6 text-lg font-medium mt-8">
                        <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4" onClick={() => setIsMobileMenuOpen(false)}>
                            <Logo />
                        </Link>
                        {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                        ))}
                    </nav>
                    <div className="mt-auto flex flex-col gap-4 border-t pt-4">
                        <Button variant="accent" onClick={() => { setIsMobileMenuOpen(false); setIsQuoteOpen(true);}}>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Request a Quote
                        </Button>
                        <div className="flex flex-col gap-4 items-center text-sm font-medium text-muted-foreground">
                            <a href="tel:+18005555468" className="flex items-center gap-2">
                                <Phone size={16} />
                                <span>+1 (800) 555-LINT</span>
                            </a>
                            <a href="mailto:sales@lintmicrofiber.com" className="flex items-center gap-2">
                                <Mail size={16} />
                                <span>sales@lintmicrofiber.com</span>
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
