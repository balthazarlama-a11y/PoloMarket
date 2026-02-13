import { Navbar, Footer } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { HorseCard } from "@/components/ui/horse-card";
import { Search, ShieldCheck, Trophy, Users, ArrowRight } from "lucide-react";

export default function Home() {
  const featuredHorses: any[] = [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[650px] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="/polo-horse-hero.png"
            alt="Polo Horse"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </div>

        <div className="relative z-10 container px-4 text-center max-w-5xl">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold tracking-[0.2em] uppercase mb-8 animate-fade-in-up">
            El Marketplace Premier de Polo
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] drop-shadow-lg animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Encuentra tu próximo{" "}
            <span className="text-secondary italic">compañero</span>{" "}
            de juego
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Compra, vende y arrienda caballos de polo con la seguridad y confianza de nuestra comunidad verificada.
          </p>

          {/* Search Box */}
          <div className="bg-white p-2 md:p-3 rounded-2xl shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row gap-2 md:gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex-1">
              <Select>
                <SelectTrigger className="h-12 md:h-14 border-0 bg-muted/40 focus:ring-0 text-muted-foreground font-medium rounded-xl text-sm md:text-base">
                  <SelectValue placeholder="Tipo de Operación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Compra</SelectItem>
                  <SelectItem value="rent">Arriendo</SelectItem>
                  <SelectItem value="sale">Venta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select>
                <SelectTrigger className="h-12 md:h-14 border-0 bg-muted/40 focus:ring-0 text-muted-foreground font-medium rounded-xl text-sm md:text-base">
                  <SelectValue placeholder="Ubicación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chile">Chile</SelectItem>
                  <SelectItem value="argentina">Argentina</SelectItem>
                  <SelectItem value="usa">USA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Link href="/marketplace">
              <Button size="lg" className="h-12 md:h-14 px-8 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl w-full md:w-auto shadow-lg hover:shadow-xl transition-all duration-300">
                <Search className="mr-2 h-4 w-4" /> Buscar
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center gap-8 md:gap-16 mt-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white font-serif">500+</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Caballos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white font-serif">12</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Países</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white font-serif">98%</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Satisfacción</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-primary py-16 text-white">
        <div className="container px-4 grid grid-cols-1 md:grid-cols-3 gap-0">
          {[
            { icon: ShieldCheck, title: "Identidad Verificada", desc: "Todos nuestros vendedores pasan por un proceso de validación riguroso." },
            { icon: Trophy, title: "Calidad Asegurada", desc: "Caballos con fichas técnicas detalladas y genealogía verificable." },
            { icon: Users, title: "Comunidad Global", desc: "Conecta con jugadores y criadores de las mejores canchas del mundo." },
          ].map((item, i) => (
            <div key={i} className={`p-8 md:p-10 text-center group ${i > 0 ? 'border-t md:border-t-0 md:border-l border-white/10' : ''}`}>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-5 group-hover:bg-secondary/80 transition-all duration-500">
                <item.icon className="w-7 h-7 text-secondary group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-lg font-serif font-bold mb-3">{item.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-muted/20">
        <div className="container px-4">
          <div className="flex justify-between items-end mb-14">
            <div>
              <span className="text-secondary font-semibold tracking-[0.2em] text-xs uppercase">Selección del Mes</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mt-3">Destacados</h2>
            </div>
            <Link href="/marketplace">
              <Button variant="outline" className="hidden md:flex gap-2 hover:bg-primary hover:text-white transition-all duration-300 rounded-xl">
                Ver todos <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {featuredHorses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredHorses.map(horse => (
                <HorseCard key={horse.id} horse={horse} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-border/50">
              <div className="text-5xl mb-4">🐴</div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-2">Próximamente</h3>
              <p className="text-muted-foreground max-w-md mx-auto">Estamos preparando una selección exclusiva de caballos para ti. ¡Vuelve pronto!</p>
            </div>
          )}

          <div className="mt-12 text-center md:hidden">
            <Link href="/marketplace">
              <Button variant="outline" className="w-full rounded-xl gap-2">
                Ver todos los caballos <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-white">
        <div className="container px-4">
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0d1f15] rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1598556685459-7b5610817478?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/10 to-transparent" />
            <div className="relative z-10 grid md:grid-cols-2 gap-12 p-10 md:p-20 lg:p-24 items-center">
              <div className="space-y-6">
                <span className="inline-block text-secondary text-xs font-semibold tracking-[0.2em] uppercase">Para Profesionales</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">¿Eres criador o vendedor?</h2>
                <p className="text-gray-400 text-lg leading-relaxed">Únete a la plataforma más exclusiva y llega a compradores serios. Gestiona tus publicaciones y ventas desde un panel profesional.</p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/register-business">
                    <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white border-none rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-13 px-8">
                      Crear Cuenta Profesional
                    </Button>
                  </Link>
                  <Link href="/verification">
                    <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 rounded-xl h-13 px-8">
                      Conocer planes
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border-2 border-secondary/30 flex items-center justify-center">
                  <div className="w-36 h-36 rounded-full border-2 border-secondary/20 flex items-center justify-center">
                    <div className="text-6xl">🏇</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}