import { Navbar, Footer } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { HorseCard } from "@/components/ui/horse-card";
import { Search, ShieldCheck, Trophy, Users } from "lucide-react";
import heroImage from "@assets/generated_images/polo_horse_running_in_a_field_at_sunset.png";
import horse1 from "@assets/generated_images/portrait_of_a_thoroughbred_polo_pony.png";
import horse2 from "@assets/generated_images/action_shot_of_a_polo_horse.png";
import horse3 from "@assets/generated_images/close_up_of_a_polo_horse_head.png";

export default function Home() {
  const featuredHorses = [
    {
      id: "1",
      name: "La Dolfina Clon",
      price: "45.000",
      currency: "USD",
      image: horse1,
      location: "Buenos Aires, AR",
      age: 7,
      height: "1.56",
      sex: "Yegua" as const,
      type: "Venta" as const,
    },
    {
      id: "2",
      name: "Ellerstina Picaro",
      price: "2.500",
      currency: "USD/mes",
      image: horse2,
      location: "Santiago, CL",
      age: 9,
      height: "1.58",
      sex: "Castrado" as const,
      type: "Arriendo" as const,
    },
    {
      id: "3",
      name: "Black Pearl",
      price: "18.000",
      currency: "USD",
      image: horse3,
      location: "Pilar, AR",
      age: 6,
      height: "1.55",
      sex: "Yegua" as const,
      type: "Venta" as const,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Polo Match" 
            className="w-full h-full object-cover brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        <div className="relative z-10 container px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-medium tracking-wider mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            EL MARKETPLACE PREMIER DE POLO
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto drop-shadow-lg animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Encuentra tu próximo <span className="text-secondary italic">compañero</span> de juego
          </h1>
          <p className="text-lg text-white/90 mb-10 max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Compra, vende y arrienda caballos de polo con la seguridad y confianza de nuestra comunidad verificada.
          </p>
          
          {/* Search Box */}
          <div className="bg-white p-4 rounded-xl shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row gap-4 animate-in fade-in scale-in-95 duration-500 delay-300">
            <div className="flex-1">
               <Select>
                <SelectTrigger className="h-12 border-0 bg-muted/50 focus:ring-0 text-muted-foreground font-medium">
                  <SelectValue placeholder="Tipo de Operación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sale">Compra</SelectItem>
                  <SelectItem value="rent">Arriendo</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="flex-1">
               <Select>
                <SelectTrigger className="h-12 border-0 bg-muted/50 focus:ring-0 text-muted-foreground font-medium">
                  <SelectValue placeholder="Ubicación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chile">Chile</SelectItem>
                  <SelectItem value="argentina">Argentina</SelectItem>
                  <SelectItem value="usa">USA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90 text-white font-medium">
              <Search className="mr-2 h-4 w-4" /> Buscar
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-primary py-12 text-white border-y border-white/10">
        <div className="container px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="p-4">
            <ShieldCheck className="w-10 h-10 mx-auto mb-4 text-secondary" />
            <h3 className="text-lg font-serif font-bold mb-2">Identidad Verificada</h3>
            <p className="text-sm text-white/70">Todos nuestros vendedores pasan por un proceso de validación riguroso.</p>
          </div>
          <div className="p-4">
            <Trophy className="w-10 h-10 mx-auto mb-4 text-secondary" />
            <h3 className="text-lg font-serif font-bold mb-2">Calidad Asegurada</h3>
            <p className="text-sm text-white/70">Caballos con fichas técnicas detalladas y genealogía verificable.</p>
          </div>
          <div className="p-4">
            <Users className="w-10 h-10 mx-auto mb-4 text-secondary" />
            <h3 className="text-lg font-serif font-bold mb-2">Comunidad Global</h3>
            <p className="text-sm text-white/70">Conecta con jugadores y criadores de las mejores canchas del mundo.</p>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-secondary font-medium tracking-wider text-sm uppercase">Selección del Mes</span>
              <h2 className="text-4xl font-serif font-bold text-primary mt-2">Destacados</h2>
            </div>
            <Button variant="outline" className="hidden md:flex hover:bg-primary hover:text-white transition-colors">
              Ver todos los caballos
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHorses.map(horse => (
              <HorseCard key={horse.id} horse={horse} />
            ))}
          </div>
          
           <div className="mt-12 text-center md:hidden">
            <Button variant="outline" className="w-full">
              Ver todos los caballos
            </Button>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-24 bg-white container px-4">
         <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden relative">
           <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1598556685459-7b5610817478?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
           <div className="relative z-10 grid md:grid-cols-2 gap-12 p-12 md:p-24 items-center">
             <div className="space-y-6">
               <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">¿Eres criador o vendedor?</h2>
               <p className="text-gray-400 text-lg">Únete a la plataforma más exclusiva y llega a compradores serios. Gestiona tus publicaciones y ventas desde un panel profesional.</p>
               <div className="flex flex-col sm:flex-row gap-4 pt-4">
                 <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white border-none">
                   Crear Cuenta Profesional
                 </Button>
                 <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10">
                   Conocer planes
                 </Button>
               </div>
             </div>
             <div className="hidden md:block">
                {/* Abstract graphic or empty for balance */}
             </div>
           </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}