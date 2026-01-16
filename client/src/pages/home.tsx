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
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Polo" className="w-full h-full object-cover brightness-[0.5]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white" />
        </div>
        
        <div className="relative z-10 container px-4 text-center">
          <h1 className="font-serif text-6xl md:text-8xl font-bold text-white mb-8 leading-none tracking-tighter">
            Polo<span className="text-secondary italic">Market</span>
          </h1>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto font-medium">
            La red de confianza para la compra, venta y arriendo de los mejores ejemplares de polo del mundo.
          </p>
          
          <div className="bg-white/95 backdrop-blur-xl p-2 rounded-[2rem] shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-2 border border-white/20">
            <Select>
              <SelectTrigger className="h-14 border-0 bg-transparent focus:ring-0 text-primary font-bold px-8 uppercase tracking-widest text-[10px]">
                <SelectValue placeholder="Operación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sale">Compra</SelectItem>
                <SelectItem value="rent">Arriendo</SelectItem>
              </SelectContent>
            </Select>
            <div className="w-px bg-primary/10 hidden md:block my-3" />
            <Select>
              <SelectTrigger className="h-14 border-0 bg-transparent focus:ring-0 text-primary font-bold px-8 uppercase tracking-widest text-[10px]">
                <SelectValue placeholder="Ubicación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">Argentina</SelectItem>
                <SelectItem value="cl">Chile</SelectItem>
                <SelectItem value="us">USA</SelectItem>
              </SelectContent>
            </Select>
            <Button className="h-14 px-10 bg-primary text-white hover:bg-primary/90 rounded-[1.5rem] font-bold uppercase tracking-[0.2em] text-[10px] ml-auto">
              <Search className="mr-3 h-4 w-4" /> Buscar Ahora
            </Button>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-32 container px-4">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-secondary font-black tracking-[0.3em] text-[10px] uppercase">Selección Elite</span>
            <h2 className="text-5xl font-serif font-bold text-primary mt-4 tracking-tight">Ejemplares Destacados</h2>
          </div>
          <Link href="/marketplace">
            <Button variant="link" className="text-primary font-bold uppercase tracking-widest text-[10px] group">
              Explorar todo el mercado <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredHorses.map(horse => (
            <HorseCard key={horse.id} horse={horse} />
          ))}
        </div>
      </section>

      {/* Plans Section */}
      <section id="planes" className="py-32 bg-[#F8F9FA]">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto bg-primary rounded-[4rem] overflow-hidden relative shadow-2xl border border-white/5">
            <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1598556685459-7b5610817478?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
            <div className="relative z-10 p-12 md:p-24">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Membresías</h2>
                <p className="text-white/40 text-lg max-w-xl mx-auto font-medium italic">Potencia tu presencia en el mercado global.</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-10">
                <div className="p-12 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                  <h3 className="text-secondary font-black tracking-[0.3em] text-[10px] uppercase mb-4">Plan Profesional</h3>
                  <div className="flex items-baseline gap-2 mb-10">
                    <span className="text-5xl font-serif font-bold text-white">$49</span>
                    <span className="text-white/30 text-xs font-bold uppercase tracking-widest">/ Mes</span>
                  </div>
                  <ul className="space-y-6 mb-12">
                    {["Publicaciones Ilimitadas", "Estadísticas de Venta", "Insignia Verificada", "Soporte 24/7"].map((f, i) => (
                      <li key={i} className="flex items-center gap-4 text-sm text-white/70 font-medium">
                        <ShieldCheck className="w-5 h-5 text-secondary" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full h-14 bg-secondary text-white hover:bg-secondary/90 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-xl"
                    onClick={() => window.location.href = '/verification'}
                  >
                    Empezar Ahora
                  </Button>
                </div>

                <div className="p-12 rounded-[3rem] bg-white text-primary shadow-2xl relative overflow-hidden">
                  <div className="absolute top-8 right-8 rotate-12">
                    <Trophy className="w-20 h-20 text-secondary opacity-20" />
                  </div>
                  <h3 className="text-primary font-black tracking-[0.3em] text-[10px] uppercase mb-4">Haras & Organizaciones</h3>
                  <div className="flex items-baseline gap-2 mb-10">
                    <span className="text-5xl font-serif font-bold text-primary">$129</span>
                    <span className="text-primary/30 text-xs font-bold uppercase tracking-widest">/ Mes</span>
                  </div>
                  <ul className="space-y-6 mb-12">
                    {["Gestión de Marca", "Destacados Premium", "API de Integración", "Reportes Mensuales"].map((f, i) => (
                      <li key={i} className="flex items-center gap-4 text-sm text-primary/70 font-medium">
                        <Users className="w-5 h-5 text-secondary" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full h-14 bg-primary text-white hover:bg-primary/90 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-xl"
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

      {/* Bottom CTA */}
      <section className="py-32 container px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 tracking-tight italic">¿Listo para unirte a la elite?</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            className="h-16 px-12 bg-secondary text-white hover:bg-secondary/90 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl transition-transform hover:scale-105"
            onClick={() => window.location.href = '/verification'}
          >
            Crear Cuenta Profesional
          </Button>
          <Button 
            variant="outline" 
            className="h-16 px-12 border-primary/10 bg-white hover:bg-primary hover:text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] transition-all"
            onClick={() => {
              const el = document.getElementById("planes");
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Conocer Planes
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}