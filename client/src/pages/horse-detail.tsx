import { Navbar, Footer } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Ruler, Calendar, ShieldCheck, Heart, Share2, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useParams } from "wouter";

export default function HorseDetail() {
  const { id } = useParams();
  
  // Mock data for detail view
  const horse = {
    id: id,
    name: id === "1" ? "La Dolfina Clon" : id === "2" ? "Ellerstina Picaro" : "Black Pearl",
    price: id === "1" ? "45.000" : id === "2" ? "2.500" : "18.000",
    currency: id === "2" ? "USD/mes" : "USD",
    images: [null, null, null],
    location: "Buenos Aires, Argentina",
    age: 7,
    height: "1.56 m",
    sex: "Yegua",
    type: id === "2" ? "Arriendo" : "Venta",
    description: "Excelente yegua de polo, hija de clones de la Dolfina. Muy buena boca, dócil y con gran explosión en las corridas. Ideal para jugador de alto handicap o para cría por su excelente genética.",
    pedigree: {
      padre: "Dolfina Cuarteto",
      madre: "Dolfina B01",
      abuelo: "Pucará"
    },
    owner: {
      name: "Juan Pérez",
      verified: true,
      since: "2022"
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="container px-4 py-8 flex-1">
        <Link href="/marketplace">
          <Button variant="ghost" className="mb-6 -ml-4 text-muted-foreground">
            <ChevronLeft className="w-4 h-4 mr-1" /> Volver al Marketplace
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Gallery */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-muted flex items-center justify-center">
              {horse.images[0] ? (
                <img src={horse.images[0]} className="w-full h-full object-cover" />
              ) : (
                <div className="text-muted-foreground text-center">
                  <div className="text-4xl mb-2">🐴</div>
                  <p className="text-sm">Sin imagen disponible</p>
                </div>
              )}
              <div className="absolute inset-y-0 left-0 flex items-center p-4">
                <Button variant="secondary" size="icon" className="rounded-full opacity-70 hover:opacity-100">
                  <ChevronLeft />
                </Button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center p-4">
                <Button variant="secondary" size="icon" className="rounded-full opacity-70 hover:opacity-100">
                  <ChevronRight />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {horse.images.map((img, i) => (
                <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden border-2 border-transparent hover:border-primary cursor-pointer transition-all bg-muted flex items-center justify-center">
                  {img ? (
                    <img src={img} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">🐴</span>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-8 space-y-8">
              <section>
                <h2 className="font-serif text-2xl font-bold text-primary mb-4">Descripción</h2>
                <p className="text-muted-foreground leading-relaxed">{horse.description}</p>
              </section>

              <section className="bg-muted/30 p-8 rounded-2xl border border-border/50">
                <h2 className="font-serif text-2xl font-bold text-primary mb-6">Genealogía (Pedigree)</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="text-center md:text-left">
                     <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Padre</span>
                     <span className="font-serif text-xl font-bold text-primary">{horse.pedigree.padre}</span>
                   </div>
                   <div className="text-center md:text-left">
                     <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Madre</span>
                     <span className="font-serif text-xl font-bold text-primary">{horse.pedigree.madre}</span>
                   </div>
                   <div className="text-center md:text-left">
                     <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Abuelo</span>
                     <span className="font-serif text-xl font-bold text-primary">{horse.pedigree.abuelo}</span>
                   </div>
                </div>
              </section>
            </div>
          </div>

          {/* Right: Info & Contact */}
          <div className="space-y-6">
            <Card className="p-8 border-none shadow-xl shadow-primary/5">
              <div className="flex justify-between items-start mb-4">
                <Badge className="bg-secondary text-white uppercase tracking-tighter px-3 py-1">{horse.type}</Badge>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full"><Share2 className="w-4 h-4" /></Button>
                  <Button variant="outline" size="icon" className="rounded-full"><Heart className="w-4 h-4" /></Button>
                </div>
              </div>

              <h1 className="font-serif text-4xl font-bold text-primary mb-2">{horse.name}</h1>
              <div className="flex items-center text-muted-foreground mb-6">
                <MapPin className="w-4 h-4 mr-1" /> {horse.location}
              </div>

              <div className="text-3xl font-bold text-primary mb-8">
                {horse.currency} {horse.price}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-muted/50 p-4 rounded-xl text-center">
                   <Calendar className="w-5 h-5 mx-auto mb-2 text-secondary" />
                   <span className="block text-xs text-muted-foreground uppercase">Edad</span>
                   <span className="font-bold">{horse.age} años</span>
                </div>
                <div className="bg-muted/50 p-4 rounded-xl text-center">
                   <Ruler className="w-5 h-5 mx-auto mb-2 text-secondary" />
                   <span className="block text-xs text-muted-foreground uppercase">Alzada</span>
                   <span className="font-bold">{horse.height}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full h-14 bg-primary text-white text-lg font-bold gap-2">
                  <MessageCircle className="w-5 h-5" /> Contactar Vendedor
                </Button>
                <Button variant="outline" className="w-full h-14 text-lg font-bold">
                  Hacer una Oferta
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-border flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-secondary">JP</div>
                 <div>
                   <div className="flex items-center gap-1 font-bold text-primary">
                     {horse.owner.name}
                     <ShieldCheck className="w-4 h-4 text-blue-500" />
                   </div>
                   <div className="text-xs text-muted-foreground">Miembro desde {horse.owner.since}</div>
                 </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Minimal Card duplicate to avoid circular imports if needed, but App.tsx will handle routing
import { Card } from "@/components/ui/card";
