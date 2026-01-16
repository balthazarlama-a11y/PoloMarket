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
    <nav className="fixed top-0 z-[100] w-full border-b border-primary/5 bg-white/70 backdrop-blur-2xl">
      <div className="container flex h-24 items-center justify-between px-4">
        <Link href="/">
          <a className="font-serif text-4xl font-black tracking-tighter text-primary group transition-all">
            Polo<span className="text-secondary italic group-hover:not-italic transition-all duration-500">Market</span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex lg:items-center lg:gap-14">
          <div className="flex items-center gap-10">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={cn(
                    "text-[11px] font-black uppercase tracking-[0.25em] transition-all hover:text-secondary relative py-2",
                    location === link.href
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-secondary"
                      : "text-primary/30"
                  )}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-6 border-l border-primary/10 pl-14 ml-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-[11px] font-black uppercase tracking-[0.25em] hover:bg-primary/5 rounded-[1.2rem] px-8 h-12 transition-all">
                <User className="h-4 w-4 mr-3 text-secondary" />
                Mi Cuenta
              </Button>
            </Link>
            <Link href="/verification">
              <Button className="bg-primary text-white hover:bg-primary/90 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.2)] rounded-[1.2rem] px-10 h-12 text-[11px] font-black uppercase tracking-[0.25em] transition-all hover:translate-y-[-2px] active:translate-y-0">
                Publicar
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-3 text-primary hover:bg-primary/5 rounded-2xl transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-24 bg-white z-[99] p-10 space-y-10 animate-in slide-in-from-right duration-500 ease-out flex flex-col items-center justify-start">
          <div className="w-full space-y-6">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className="block text-3xl font-serif font-bold text-primary text-center hover:text-secondary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </div>
          
          <div className="w-full pt-10 border-t border-primary/5 space-y-6">
            <Link href="/dashboard">
              <Button variant="outline" className="w-full h-18 rounded-[2rem] font-black uppercase tracking-widest text-[12px] border-2" onClick={() => setIsOpen(false)}>
                <User className="h-5 w-5 mr-3" /> Mi Cuenta
              </Button>
            </Link>
             <Link href="/verification">
              <Button className="w-full h-18 bg-secondary text-white rounded-[2rem] font-black uppercase tracking-widest text-[12px] shadow-2xl" onClick={() => setIsOpen(false)}>
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
    <footer className="bg-primary text-white pt-40 pb-16 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-12 mb-32">
          <div className="lg:col-span-5 space-y-12">
            <Link href="/">
              <a className="font-serif text-5xl font-black tracking-tighter">
                Polo<span className="text-secondary italic">Market</span>
              </a>
            </Link>
            <p className="text-white/40 text-xl leading-relaxed max-w-sm italic font-medium">
              "Redefiniendo el estándar de excelencia en el comercio ecuestre global, uniendo pasión y prestigio."
            </p>
            <div className="flex gap-6">
              {[Instagram, Twitter, Globe].map((Icon, i) => (
                <a key={i} href="#" className="w-14 h-14 rounded-[1.5rem] bg-white/[0.03] border border-white/5 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all group shadow-xl">
                  <Icon className="w-6 h-6 text-white/20 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-10">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-secondary">Ecosistema</h4>
            <ul className="space-y-6 text-sm font-bold text-white/40">
              <li><Link href="/" className="hover:text-secondary transition-colors">Inicio</Link></li>
              <li><Link href="/marketplace" className="hover:text-secondary transition-colors">Marketplace</Link></li>
              <li><Link href="/verification" className="hover:text-secondary transition-colors">Verificación</Link></li>
              <li><Link href="/dashboard" className="hover:text-secondary transition-colors">Mi Perfil</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-10">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-secondary">Soporte Elite</h4>
            <ul className="space-y-6 text-sm font-bold text-white/40">
              <li><a href="#" className="hover:text-secondary transition-colors">Centro VIP</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Legales</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-10">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-secondary">Contacto Global</h4>
            <div className="space-y-8">
              <div className="flex items-center gap-6 text-white/30 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-secondary/20 transition-all">
                  <Mail className="w-5 h-5 text-secondary" />
                </div>
                <span className="text-sm font-bold group-hover:text-white transition-colors">elite@polomarket.com</span>
              </div>
              <div className="flex items-center gap-6 text-white/30 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-secondary/20 transition-all">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <span className="text-sm font-bold group-hover:text-white transition-colors">Buenos Aires, Argentina</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/10">
            © 2026 PoloMarket International Group. All Rights Reserved.
          </p>
          <div className="flex gap-10 text-[11px] font-black uppercase tracking-[0.3em] text-white/10">
            <a href="#" className="hover:text-secondary transition-colors">Privacy</a>
            <a href="#" className="hover:text-secondary transition-colors">Terms</a>
            <a href="#" className="hover:text-secondary transition-colors">Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}