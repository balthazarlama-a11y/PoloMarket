import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Instagram, Twitter, Mail, MapPin, Globe } from "lucide-react";
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
    <nav className="sticky top-0 z-50 w-full border-b border-primary/5 bg-white/80 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between px-4">
        <Link href="/">
          <a className="font-serif text-3xl font-black tracking-tighter text-primary group transition-all">
            Polo<span className="text-secondary italic group-hover:not-italic transition-all">Market</span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex md:items-center md:gap-12">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className={cn(
                  "text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-secondary",
                  location === link.href
                    ? "text-primary border-b-2 border-secondary pb-1"
                    : "text-primary/40"
                )}
              >
                {link.label}
              </a>
            </Link>
          ))}
          <div className="flex items-center gap-6 border-l border-primary/10 pl-10 ml-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary/5 rounded-xl px-6">
                <User className="h-4 w-4 mr-2 text-secondary" />
                Mi Cuenta
              </Button>
            </Link>
            <Link href="/verification">
              <Button className="bg-primary text-white hover:bg-primary/90 shadow-xl rounded-xl px-8 text-[10px] font-black uppercase tracking-[0.2em]">
                Publicar
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-b bg-white p-8 space-y-6 animate-in slide-in-from-top duration-300">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className="block text-sm font-black uppercase tracking-widest text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            </Link>
          ))}
          <div className="pt-6 border-t border-primary/5 space-y-4">
            <Link href="/dashboard">
              <Button variant="outline" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px]">
                <User className="h-4 w-4 mr-2" /> Mi Cuenta
              </Button>
            </Link>
             <Link href="/verification">
              <Button className="w-full h-14 bg-secondary text-white rounded-2xl font-black uppercase tracking-widest text-[10px]">
                Publicar Ahora
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
    <footer className="bg-primary text-white pt-32 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">
          <div className="md:col-span-5 space-y-10">
            <Link href="/">
              <a className="font-serif text-4xl font-black tracking-tighter">
                Polo<span className="text-secondary italic">Market</span>
              </a>
            </Link>
            <p className="text-white/40 text-lg leading-relaxed max-w-sm italic">
              "Redefiniendo el estándar de excelencia en el comercio ecuestre global."
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Globe].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all group">
                  <Icon className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Navegación</h4>
            <ul className="space-y-4 text-sm font-medium text-white/50">
              <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
              <li><Link href="/marketplace" className="hover:text-white transition-colors">Explorar Mercado</Link></li>
              <li><Link href="/verification" className="hover:text-white transition-colors">Sistema Verificado</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Mi Panel</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Soporte</h4>
            <ul className="space-y-4 text-sm font-medium text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Contacto</h4>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white/50">
                <Mail className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium">elite@polomarket.com</span>
              </div>
              <div className="flex items-center gap-4 text-white/50">
                <MapPin className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium">Buenos Aires, Argentina</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
            © 2026 PoloMarket Group. Crafted for Excellence.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
            <a href="#" className="hover:text-secondary transition-colors">Privacidad</a>
            <a href="#" className="hover:text-secondary transition-colors">Legal</a>
            <a href="#" className="hover:text-secondary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}