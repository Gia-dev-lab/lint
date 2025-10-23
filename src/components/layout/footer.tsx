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
              Premium microfiber solutions for car wash and Ho.Re.Ca professionals.
            </p>
            <div className="flex gap-4">
                <Link href="#" aria-label="Github" className="text-muted-foreground hover:text-foreground"><Github size={20}/></Link>
                <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground"><Twitter size={20}/></Link>
                <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground"><Linkedin size={20}/></Link>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold">Products</h4>
            <Link href="#products" className="text-sm text-muted-foreground hover:text-foreground">Microfiber Cloths</Link>
            <Link href="#products" className="text-sm text-muted-foreground hover:text-foreground">Accessories</Link>
            <Link href="#products" className="text-sm text-muted-foreground hover:text-foreground">Equipment Parts</Link>
            <Link href="#products" className="text-sm text-muted-foreground hover:text-foreground">Kits</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold">Company</h4>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Careers</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold">Legal</h4>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Lint Microfiber Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
