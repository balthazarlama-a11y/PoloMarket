import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, ChevronDown, Truck, Wheat, Users, Stethoscope } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";

const serviceLinks = [
  { href: "/servicios/transporte", label: "Transporte (Fletes)", icon: Truck, color: "text-emerald-600" },
  { href: "/servicios/insumos", label: "Insumos (Fardos)", icon: Wheat, color: "text-amber-600" },
  { href: "/servicios/staff", label: "Staff (Bolsa de Trabajo)", icon: Users, color: "text-blue-600" },
  { href: "/servicios/veterinarias", label: "Veterinarias", icon: Stethoscope, color: "text-rose-600" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [location] = useLocation();
  const queryClient = useQueryClient();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const { data: authData } = useQuery<any>({
    queryKey: ["/api/auth/me"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const user = authData?.user || null;

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/auth/logout");
      return res.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/auth/me"], null);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const isServicesActive = location.startsWith("/servicios");

  const getInitials = (name?: string, email?: string) => {
    if (name) return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    if (email) return email[0].toUpperCase();
    return "U";
  };

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled
        ? "bg-background/95 backdrop-blur-lg shadow-sm border-b border-border/50"
        : "bg-background/80 backdrop-blur border-b border-border/30"
    )}>
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/">
          <a className="flex items-center gap-2 group">
            <span className="font-serif text-2xl font-bold tracking-tight text-primary group-hover:text-secondary transition-colors duration-300">
              Polo Market
            </span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex md:items-center md:gap-1">
          {/* Inicio */}
          <Link href="/">
            <a className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-accent",
              location === "/" ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
            )}>
              Inicio
              {location === "/" && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-secondary rounded-full" />
              )}
            </a>
          </Link>

          {/* Marketplace */}
          <Link href="/marketplace">
            <a className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-accent",
              location === "/marketplace" ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
            )}>
              Marketplace
              {location === "/marketplace" && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-secondary rounded-full" />
              )}
            </a>
          </Link>

          {/* Servicios Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className={cn(
                "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-accent",
                isServicesActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
              )}
            >
              Servicios
              <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", servicesOpen && "rotate-180")} />
              {isServicesActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-secondary rounded-full" />
              )}
            </button>

            {/* Dropdown panel */}
            {servicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl border border-border/60 shadow-xl overflow-hidden animate-slide-down z-50">
                <div className="p-2">
                  <Link href="/servicios">
                    <a
                      className="block px-4 py-2.5 text-sm font-semibold text-primary hover:bg-accent rounded-lg transition-colors"
                      onClick={() => setServicesOpen(false)}
                    >
                      Ver todos los servicios
                    </a>
                  </Link>
                  <div className="h-px bg-border/50 my-1" />
                  {serviceLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.href} href={item.href}>
                        <a
                          className={cn(
                            "flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-colors hover:bg-accent",
                            location === item.href ? "bg-accent font-medium text-primary" : "text-muted-foreground hover:text-foreground"
                          )}
                          onClick={() => setServicesOpen(false)}
                        >
                          <Icon className={cn("w-4 h-4", item.color)} />
                          {item.label}
                        </a>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Verificación */}
          <Link href="/verification">
            <a className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-accent",
              location === "/verification" ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
            )}>
              Verificación
              {location === "/verification" && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-secondary rounded-full" />
              )}
            </a>
          </Link>

          {/* Auth buttons */}
          <div className="flex items-center gap-3 border-l border-border/50 pl-6 ml-4">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="gap-2 hover:bg-accent rounded-lg">
                    <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-bold text-secondary">
                      {getInitials(user.name, user.email)}
                    </div>
                    <span className="max-w-[120px] truncate">{user.name || user.email}</span>
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-muted-foreground hover:text-destructive rounded-lg"
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="gap-2 rounded-lg text-muted-foreground hover:text-primary">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav — Animated */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="border-t border-border/50 bg-background p-4 space-y-1">
          <Link href="/">
            <a
              className={cn(
                "block py-3 px-4 text-sm font-medium rounded-lg transition-colors",
                location === "/" ? "bg-primary/5 text-primary font-semibold border-l-2 border-secondary" : "text-muted-foreground hover:text-primary hover:bg-accent"
              )}
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </a>
          </Link>
          <Link href="/marketplace">
            <a
              className={cn(
                "block py-3 px-4 text-sm font-medium rounded-lg transition-colors",
                location === "/marketplace" ? "bg-primary/5 text-primary font-semibold border-l-2 border-secondary" : "text-muted-foreground hover:text-primary hover:bg-accent"
              )}
              onClick={() => setIsOpen(false)}
            >
              Marketplace
            </a>
          </Link>

          {/* Mobile Servicios Expandable */}
          <div>
            <button
              className={cn(
                "w-full flex items-center justify-between py-3 px-4 text-sm font-medium rounded-lg transition-colors",
                isServicesActive ? "bg-primary/5 text-primary font-semibold border-l-2 border-secondary" : "text-muted-foreground hover:text-primary hover:bg-accent"
              )}
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            >
              Servicios
              <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", mobileServicesOpen && "rotate-180")} />
            </button>
            <div className={cn(
              "overflow-hidden transition-all duration-300",
              mobileServicesOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
            )}>
              <div className="pl-4 space-y-1 pt-1">
                <Link href="/servicios">
                  <a
                    className="block py-2 px-4 text-sm text-primary font-medium rounded-lg hover:bg-accent transition-colors"
                    onClick={() => { setIsOpen(false); setMobileServicesOpen(false); }}
                  >
                    Ver todos
                  </a>
                </Link>
                {serviceLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.href} href={item.href}>
                      <a
                        className={cn(
                          "flex items-center gap-2 py-2 px-4 text-sm rounded-lg transition-colors",
                          location === item.href ? "text-primary font-medium bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                        onClick={() => { setIsOpen(false); setMobileServicesOpen(false); }}
                      >
                        <Icon className={cn("w-4 h-4", item.color)} />
                        {item.label}
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <Link href="/verification">
            <a
              className={cn(
                "block py-3 px-4 text-sm font-medium rounded-lg transition-colors",
                location === "/verification" ? "bg-primary/5 text-primary font-semibold border-l-2 border-secondary" : "text-muted-foreground hover:text-primary hover:bg-accent"
              )}
              onClick={() => setIsOpen(false)}
            >
              Verificación
            </a>
          </Link>

          <div className="pt-3 border-t border-border/50 space-y-2">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full justify-start gap-3 rounded-lg h-11" onClick={() => setIsOpen(false)}>
                    <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-bold text-secondary">
                      {getInitials(user.name, user.email)}
                    </div>
                    {user.name || user.email}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive rounded-lg"
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  disabled={logoutMutation.isPending}
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="w-full rounded-lg h-11" onClick={() => setIsOpen(false)}>
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg h-11" onClick={() => setIsOpen(false)}>
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="space-y-4 md:col-span-1">
            <h3 className="font-serif text-2xl font-bold">Polo Market</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              La plataforma líder para la comunidad del polo. Compra, venta y arriendo de caballos con seguridad garantizada.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-secondary/80 flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110">
                IG
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-secondary/80 flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110">
                FB
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-secondary/80 flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110">
                WA
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-primary-foreground/90">Marketplace</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li><Link href="/marketplace?type=buy" className="hover:text-secondary transition-colors">Compra</Link></li>
              <li><Link href="/marketplace?type=sale" className="hover:text-secondary transition-colors">Venta</Link></li>
              <li><Link href="/marketplace?type=rent" className="hover:text-secondary transition-colors">Arriendo</Link></li>
              <li><Link href="/marketplace?sort=featured" className="hover:text-secondary transition-colors">Destacados</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-primary-foreground/90">Servicios</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li><Link href="/servicios/transporte" className="hover:text-secondary transition-colors">Transporte</Link></li>
              <li><Link href="/servicios/insumos" className="hover:text-secondary transition-colors">Insumos</Link></li>
              <li><Link href="/servicios/staff" className="hover:text-secondary transition-colors">Staff</Link></li>
              <li><Link href="/servicios/veterinarias" className="hover:text-secondary transition-colors">Veterinarias</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-primary-foreground/90">Comunidad</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li><Link href="/verification" className="hover:text-secondary transition-colors">Verificación de Identidad</Link></li>
              <li><Link href="/register-business" className="hover:text-secondary transition-colors">Cuenta Empresarial</Link></li>
              <li><Link href="#" className="hover:text-secondary transition-colors">Cómo funciona</Link></li>
              <li><Link href="#" className="hover:text-secondary transition-colors">Términos y Condiciones</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wider text-primary-foreground/90">Contacto</h4>
            <p className="text-sm text-primary-foreground/60 mb-3">soporte@polomarket.com</p>
            <p className="text-sm text-primary-foreground/60 mb-4">+56 2 2345 6789</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/40">
            © {currentYear} Polo Market. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-xs text-primary-foreground/40">
            <a href="#" className="hover:text-secondary transition-colors">Privacidad</a>
            <a href="#" className="hover:text-secondary transition-colors">Términos</a>
            <a href="#" className="hover:text-secondary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}