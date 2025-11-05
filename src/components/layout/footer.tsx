import { Logo } from "@/components/icons";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Attrezzature per pulizia professionale. Soluzioni integrate per risultati impeccabili.
            </p>
            <div className="flex gap-4">
                <Link href="#" aria-label="Github" className="text-muted-foreground hover:text-foreground"><Github size={20}/></Link>
                <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground"><Twitter size={20}/></Link>
                <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground"><Linkedin size={20}/></Link>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold">Prodotti</h4>
            <Link href="/prodotti/panni-in-microfibra" className="text-sm text-muted-foreground hover:text-foreground">Panni in Microfibra</Link>
            <Link href="/prodotti/accessori" className="text-sm text-muted-foreground hover:text-foreground">Accessori</Link>
            <Link href="/prodotti/ricambi" className="text-sm text-muted-foreground hover:text-foreground">Ricambi</Link>
            <Link href="/prodotti/kit-pulizia" className="text-sm text-muted-foreground hover:text-foreground">Kit di Pulizia</Link>
            <Link href="/prodotti/linea-self-car-wash" className="text-sm text-muted-foreground hover:text-foreground">Linea Self Car Wash</Link>
            <Link href="/prodotti/detergenti" className="text-sm text-muted-foreground hover:text-foreground">Detergenti</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold">Azienda</h4>
            <Link href="/chi-siamo" className="text-sm text-muted-foreground hover:text-foreground">Chi Siamo</Link>
            <Link href="/detailing-journey" className="text-sm text-muted-foreground hover:text-foreground">Detailing Journey</Link>
            <Link href="/blog/come-lavare-i-panni-in-microfibra" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link>
            <Link href="#kit-configurator" className="text-sm text-muted-foreground hover:text-foreground">Contatti</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Lavora con Noi</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold">Legale</h4>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Termini di Servizio</Link>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Lint Professional Cleaning. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
}
