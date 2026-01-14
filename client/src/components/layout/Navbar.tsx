import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, User, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/verification", label: "Verificación" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/">
          <a className="font-serif text-2xl font-bold tracking-tight text-primary">
            PoloMarket
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location === link.href
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </a>
            </Link>
          ))}
          <div className="flex items-center gap-4 border-l pl-6 ml-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                Mi Cuenta
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-white">
                Publicar Caballo
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-b bg-background p-4 space-y-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className="block py-2 text-sm font-medium hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            </Link>
          ))}
          <div className="pt-4 border-t space-y-2">
            <Link href="/dashboard">
              <Button variant="outline" className="w-full justify-start gap-2">
                <User className="h-4 w-4" />
                Mi Cuenta
              </Button>
            </Link>
             <Link href="/dashboard">
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-white">
                Publicar Caballo
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold">PoloMarket</h3>
            <p className="text-primary-foreground/80 text-sm max-w-xs">
              La plataforma líder para la comunidad del polo. Compra, venta y arriendo con seguridad garantizada.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/marketplace?type=sale">Venta</Link></li>
              <li><Link href="/marketplace?type=rent">Arriendo</Link></li>
              <li><Link href="/marketplace?sort=featured">Destacados</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Comunidad</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/verification">Verificación de Identidad</Link></li>
              <li><Link href="#">Cómo funciona</Link></li>
              <li><Link href="#">Términos y Condiciones</Link></li>
            </ul>
          </div>

          <div>
             <h4 className="font-semibold mb-4">Contacto</h4>
             <p className="text-sm text-primary-foreground/70 mb-2">soporte@polomarket.com</p>
             <div className="flex gap-4 mt-4">
               {/* Social placeholders */}
               <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">IG</div>
               <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">FB</div>
             </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs text-primary-foreground/50">
          © 2024 PoloMarket. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}