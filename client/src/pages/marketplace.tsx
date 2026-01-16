import { Navbar, Footer } from "@/components/layout/Navbar";
import { HorseCard } from "@/components/ui/horse-card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Search, SlidersHorizontal } from "lucide-react";
import horse1 from "@assets/generated_images/portrait_of_a_thoroughbred_polo_pony.png";
import horse2 from "@assets/generated_images/action_shot_of_a_polo_horse.png";
import horse3 from "@assets/generated_images/close_up_of_a_polo_horse_head.png";

// Mock Data duplicating for grid fill
const horses = [
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
  {
    id: "4",
    name: "Gato",
    price: "12.000",
    currency: "USD",
    image: horse3,
    location: "Cañuelas, AR",
    age: 8,
    height: "1.57",
    sex: "Castrado" as const,
    type: "Venta" as const,
  },
   {
    id: "5",
    name: "Luna",
    price: "22.000",
    currency: "USD",
    image: horse1,
    location: "Palm Beach, USA",
    age: 5,
    height: "1.54",
    sex: "Yegua" as const,
    type: "Venta" as const,
  },
   {
    id: "6",
    name: "Relámpago",
    price: "1.800",
    currency: "USD/mes",
    image: horse2,
    location: "Santiago, CL",
    age: 10,
    height: "1.59",
    sex: "Padrillo" as const,
    type: "Arriendo" as const,
  },
];

export default function Marketplace() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="container px-4 py-8 flex-1">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 shrink-0 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold">Filtros</h2>
            <Link href="/marketplace">
              <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-primary">
                Limpiar
              </Button>
            </Link>
            </div>
            
            <Accordion type="multiple" defaultValue={["operation", "price", "location"]}>
              
              <AccordionItem value="operation">
                <AccordionTrigger>Operación</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sale" />
                      <Label htmlFor="sale">Venta</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="rent" />
                      <Label htmlFor="rent">Arriendo</Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="location">
                <AccordionTrigger>Ubicación</AccordionTrigger>
                <AccordionContent>
                   <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cl" />
                      <Label htmlFor="cl">Chile</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ar" />
                      <Label htmlFor="ar">Argentina</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                      <Checkbox id="us" />
                      <Label htmlFor="us">USA</Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="price">
                <AccordionTrigger>Precio (USD)</AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4 px-2">
                    <Slider defaultValue={[50000]} max={100000} step={1000} />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>$0</span>
                      <span>$100k+</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
               <AccordionItem value="sex">
                <AccordionTrigger>Sexo</AccordionTrigger>
                <AccordionContent>
                   <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mare" />
                      <Label htmlFor="mare">Yegua</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="gelding" />
                      <Label htmlFor="gelding">Castrado</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                      <Checkbox id="stallion" />
                      <Label htmlFor="stallion">Padrillo</Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h1 className="font-serif text-3xl font-bold text-primary">Caballos Disponibles</h1>
                <p className="text-muted-foreground text-sm">{horses.length} resultados encontrados</p>
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar por nombre..." className="pl-9" />
                </div>
                <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {horses.map(horse => (
                <HorseCard key={horse.id} horse={horse} />
              ))}
            </div>
            
            {/* Pagination Mockup */}
            <div className="flex justify-center mt-12 gap-2">
              <Button variant="outline" disabled>Anterior</Button>
              <Button variant="secondary" className="text-white">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Siguiente</Button>
            </div>
          </main>
          
        </div>
      </div>
      
      <Footer />
    </div>
  );
}