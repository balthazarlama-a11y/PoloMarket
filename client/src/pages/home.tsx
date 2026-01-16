import { Navbar, Footer } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Search, ShieldCheck, Trophy, Users } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { HorseCard } from "@/components/ui/horse-card";
import heroImage from "@assets/generated_images/close-up_portrait_of_a_polo_horse_head.png";
import horse1 from "@assets/generated_images/portrait_of_a_thoroughbred_polo_pony.png";
import horse2 from "@assets/generated_images/action_shot_of_a_polo_horse.png";
import horse3 from "@assets/generated_images/close_up_of_a_polo_horse_head.png";

export default function Home() {
  const featuredHorses = [
    { id: "1", name: "La Dolfina Clon", price: "45.000", currency: "USD", image: horse1, location: "Buenos Aires, AR", age: 8, height: "1.56", sex: "Yegua" as const, type: "Venta" as const },
    { id: "2", name: "Ellerstina Picaro", price: "2.500", currency: "USD/mes", image: horse2, location: "Santiago, CL", age: 9, height: "1.58", sex: "Castrado" as const, type: "Arriendo" as const },
    { id: "3", name: "Black Pearl", price: "18.000", currency: "USD", image: horse3, location: "Pilar, AR", age: 6, height: "1.55", sex: "Yegua" as const, type: "Venta" as const },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Polo" className="w-full h-full object-cover brightness-[0.5]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white" />
        </div>
        
        <div className="relative z-10 container px-4 text-center pt-20">
          <h1 className="font-serif text-6xl md:text-9xl font-bold text-white mb-8 leading-none tracking-tighter drop-shadow-2xl">
            Polo<span className="text-secondary italic">Market</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-medium drop-shadow-md">
            La red de confianza para la compra, venta y arriendo de los mejores ejemplares de polo del mundo.
          </p>
          
          <div className="bg-white/95 backdrop-blur-2xl p-3 rounded-[2.5rem] shadow-2xl max-w-5xl mx-auto flex flex-col md:flex-row gap-3 border border-white/20 relative z-20">
            <div className="flex-1">
              <Select>
                <SelectTrigger className="h-14 border-0 bg-transparent focus:ring-0 text-primary font-bold px-8 uppercase tracking-widest text-[10px] w-full">
                  <SelectValue placeholder="Tipo de Operación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sale">Compra</SelectItem>
                  <SelectItem value="rent">Arriendo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-px bg-primary/10 hidden md:block my-4" />
            <div className="flex-1">
              <Select>
                <SelectTrigger className="h-14 border-0 bg-transparent focus:ring-0 text-primary font-bold px-8 uppercase tracking-widest text-[10px] w-full">
                  <SelectValue placeholder="Ubicación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ar">Argentina</SelectItem>
                  <SelectItem value="cl">Chile</SelectItem>
                  <SelectItem value="us">USA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="h-14 px-12 bg-primary text-white hover:bg-primary/90 rounded-[1.8rem] font-bold uppercase tracking-[0.2em] text-[10px] shadow-lg transition-transform hover:scale-[1.02]">
              <Search className="mr-3 h-4 w-4" /> Buscar Ahora
            </Button>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-32 container px-4 relative z-10 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <span className="text-secondary font-black tracking-[0.4em] text-[10px] uppercase block mb-4">Selección Elite</span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-primary tracking-tight leading-none">Ejemplares de Alto Handicap</h2>
          </div>
          <Link href="/marketplace">
            <Button variant="link" className="text-primary font-bold uppercase tracking-widest text-[10px] group p-0">
              Explorar todo el mercado <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {featuredHorses.map(horse => (
            <HorseCard key={horse.id} horse={horse} />
          ))}
        </div>
      </section>

      {/* Plans Section */}
      <section id="planes" className="py-32 bg-[#FBFBFB] relative overflow-hidden">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto bg-primary rounded-[4.5rem] overflow-hidden relative shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border border-white/10">
            <div className="absolute inset-0 opacity-[0.07] bg-[url('https://images.unsplash.com/photo-1598556685459-7b5610817478?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
            <div className="relative z-10 p-12 md:p-24">
              <div className="text-center mb-24">
                <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Membresías</h2>
                <p className="text-white/40 text-lg max-w-xl mx-auto font-medium italic">Potencia tu presencia en el mercado global del polo.</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="p-12 md:p-16 rounded-[3.5rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all group backdrop-blur-sm">
                  <h3 className="text-secondary font-black tracking-[0.4em] text-[10px] uppercase mb-6">Plan Profesional</h3>
                  <div className="flex items-baseline gap-2 mb-12">
                    <span className="text-6xl font-serif font-bold text-white">$49</span>
                    <span className="text-white/30 text-xs font-bold uppercase tracking-widest">/ Mes</span>
                  </div>
                  <ul className="space-y-6 mb-16">
                    {["Publicaciones Ilimitadas", "Estadísticas de Venta", "Insignia Verificada", "Soporte 24/7"].map((f, i) => (
                      <li key={i} className="flex items-center gap-5 text-sm text-white/70 font-medium">
                        <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                          <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full h-16 bg-secondary text-white hover:bg-secondary/90 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-2xl transition-all hover:scale-[1.02]"
                    onClick={() => window.location.href = '/verification'}
                  >
                    Empezar Ahora
                  </Button>
                </div>

                <div className="p-12 md:p-16 rounded-[3.5rem] bg-white text-primary shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] relative overflow-hidden transition-all hover:scale-[1.02]">
                  <div className="absolute top-12 right-12 rotate-12 pointer-events-none">
                    <Trophy className="w-24 h-24 text-secondary opacity-10" />
                  </div>
                  <h3 className="text-primary font-black tracking-[0.4em] text-[10px] uppercase mb-6">Haras & Organizaciones</h3>
                  <div className="flex items-baseline gap-2 mb-12">
                    <span className="text-6xl font-serif font-bold text-primary">$129</span>
                    <span className="text-primary/30 text-xs font-bold uppercase tracking-widest">/ Mes</span>
                  </div>
                  <ul className="space-y-6 mb-16">
                    {["Gestión de Marca", "Destacados Premium", "API de Integración", "Reportes Mensuales"].map((f, i) => (
                      <li key={i} className="flex items-center gap-5 text-sm text-primary/70 font-medium">
                        <div className="w-6 h-6 rounded-full bg-primary/5 flex items-center justify-center">
                          <Users className="w-3.5 h-3.5 text-secondary" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full h-16 bg-primary text-white hover:bg-primary/90 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-2xl transition-all hover:scale-[1.02]"
                    onClick={() => window.location.href = '/verification'}
                  >
                    Contactar Ventas
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner & CTA */}
      <section className="py-40 bg-white relative overflow-hidden">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-secondary/10 rounded-full border border-secondary/20">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Plataforma Asegurada</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-serif font-bold text-primary leading-[0.95] tracking-tighter">
                La confianza es nuestra <span className="text-secondary italic">prioridad</span> máxima.
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl font-medium">
                En PoloMarket, cada transacción está respaldada por una verificación manual rigurosa. Conectamos a los mejores polistas con los mejores ejemplares.
              </p>
              <div className="flex flex-wrap gap-12 pt-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-primary/5 flex items-center justify-center border border-primary/5">
                    <Trophy className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-serif font-bold text-primary">500+</div>
                    <div className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">Ejemplares Elite</div>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-primary/5 flex items-center justify-center border border-primary/5">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-serif font-bold text-primary">1.2k</div>
                    <div className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">Miembros VIP</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-10 bg-gradient-to-tr from-secondary/10 to-transparent blur-[100px] rounded-full" />
              <div className="relative bg-primary p-16 md:p-20 rounded-[4rem] shadow-2xl border border-white/5 overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 transition-all group-hover:bg-secondary/10" />
                <h3 className="text-4xl font-serif font-bold text-white mb-8 tracking-tight">¿Listo para empezar?</h3>
                <p className="text-white/50 mb-12 leading-relaxed text-lg italic">"La red global de polo más importante le espera. Publique sus ejemplares o encuentre su próximo campeón."</p>
                <div className="space-y-5">
                  <Button 
                    className="w-full h-18 bg-secondary text-white hover:bg-secondary/90 rounded-[1.8rem] font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl transition-all hover:scale-[1.02] py-6"
                    onClick={() => window.location.href = '/verification'}
                  >
                    Crear Cuenta Profesional
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full h-18 border-white/10 bg-white/5 text-white hover:bg-white hover:text-primary rounded-[1.8rem] font-bold uppercase tracking-[0.2em] text-[10px] transition-all py-6"
                    onClick={() => {
                      const el = document.getElementById("planes");
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Ver Planes de Membresía
                  </Button>
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