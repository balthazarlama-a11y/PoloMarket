import { Navbar, Footer } from "@/components/layout/Navbar";
import { HorseCard } from "@/components/ui/horse-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Search, SlidersHorizontal, Grid2X2, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import horse1 from "@assets/generated_images/portrait_of_a_thoroughbred_polo_pony.png";
import horse2 from "@assets/generated_images/action_shot_of_a_polo_horse.png";
import horse3 from "@assets/generated_images/close_up_of_a_polo_horse_head.png";

// Mock Data
const horses = [
  {
    id: "1",
    name: "La Dolfina Clon",
    price: "45.000",
    currency: "USD",
    image: horse1,
    location: "Buenos Aires, AR",
    age: 8,
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
    <div className="min-h-screen flex flex-col bg-[#FDFCF9]">
      <Navbar />
      
      <div className="container px-4 py-12 flex-1">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar Filters */}
          <aside className="w-full md:w-72 shrink-0 space-y-8">
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="font-serif text-2xl font-bold text-primary">Filtros</h2>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-secondary font-bold text-xs uppercase tracking-widest">
                Limpiar Todo
              </Button>
            </div>
            
            <Accordion type="multiple" defaultValue={["operation", "price", "location"]} className="w-full">
              
              <AccordionItem value="operation" className="border-none">
                <AccordionTrigger className="font-bold py-4 hover:no-underline">Operación</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center space-x-3 group cursor-pointer">
                      <Checkbox id="sale" className="border-primary/20 data-[state=checked]:bg-primary" />
                      <Label htmlFor="sale" className="font-medium cursor-pointer group-hover:text-primary transition-colors">Venta</Label>
                    </div>
                    <div className="flex items-center space-x-3 group cursor-pointer">
                      <Checkbox id="rent" className="border-primary/20 data-[state=checked]:bg-primary" />
                      <Label htmlFor="rent" className="font-medium cursor-pointer group-hover:text-primary transition-colors">Arriendo</Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="location" className="border-none">
                <AccordionTrigger className="font-bold py-4 hover:no-underline">Ubicación</AccordionTrigger>
                <AccordionContent>
                   <div className="space-y-4 pt-2">
                    <div className="flex items-center space-x-3 group cursor-pointer">
                      <Checkbox id="cl" className="border-primary/20 data-[state=checked]:bg-primary" />
                      <Label htmlFor="cl" className="font-medium cursor-pointer group-hover:text-primary transition-colors">Chile</Label>
                    </div>
                    <div className="flex items-center space-x-3 group cursor-pointer">
                      <Checkbox id="ar" className="border-primary/20 data-[state=checked]:bg-primary" />
                      <Label htmlFor="ar" className="font-medium cursor-pointer group-hover:text-primary transition-colors">Argentina</Label>
                    </div>
                     <div className="flex items-center space-x-3 group cursor-pointer">
                      <Checkbox id="us" className="border-primary/20 data-[state=checked]:bg-primary" />
                      <Label htmlFor="us" className="font-medium cursor-pointer group-hover:text-primary transition-colors">USA</Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="price" className="border-none">
                <AccordionTrigger className="font-bold py-4 hover:no-underline">Rango de Precio (USD)</AccordionTrigger>
                <AccordionContent>
                  <div className="pt-6 px-2">
                    <Slider defaultValue={[50000]} max={100000} step={1000} className="[&_[role=slider]]:bg-secondary" />
                    <div className="flex justify-between mt-4 text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
                      <span>$0</span>
                      <span>$100k+</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
               <AccordionItem value="sex" className="border-none">
                <AccordionTrigger className="font-bold py-4 hover:no-underline">Sexo</AccordionTrigger>
                <AccordionContent>
                   <div className="space-y-4 pt-2">
                    <div className="flex items-center space-x-3 group cursor-pointer">
                      <Checkbox id="mare" className="border-primary/20 data-[state=checked]:bg-primary" />
                      <Label htmlFor="mare" className="font-medium cursor-pointer group-hover:text-primary transition-colors">Yegua</Label>
                    </div>
                    <div className="flex items-center space-x-3 group cursor-pointer">
                      <Checkbox id="gelding" className="border-primary/20 data-[state=checked]:bg-primary" />
                      <Label htmlFor="gelding" className="font-medium cursor-pointer group-hover:text-primary transition-colors">Castrado</Label>
                    </div>
                     <div className="flex items-center space-x-3 group cursor-pointer">
                      <Checkbox id="stallion" className="border-primary/20 data-[state=checked]:bg-primary" />
                      <Label htmlFor="stallion" className="font-medium cursor-pointer group-hover:text-primary transition-colors">Padrillo</Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
              <div>
                <h1 className="font-serif text-4xl font-bold text-primary mb-2">Marketplace</h1>
                <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest">{horses.length} caballos disponibles ahora</p>
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                  <Input placeholder="Buscar por nombre, criador o línea..." className="pl-11 h-12 bg-white border-primary/5 focus-visible:ring-secondary/30 rounded-full shadow-sm" />
                </div>
                <div className="flex gap-1 bg-white p-1 rounded-full shadow-sm border border-primary/5">
                   <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full bg-primary text-white">
                    <Grid2X2 className="h-4 w-4" />
                   </Button>
                   <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                    <List className="h-4 w-4 text-primary/40" />
                   </Button>
                </div>
              </div>
            </div>
            
            {/* Grid */}
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {horses.map((horse, idx) => (
                  <motion.div
                    key={horse.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <HorseCard horse={horse} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-20 gap-3">
              <Button variant="outline" disabled className="h-12 px-6 rounded-full border-primary/10">Anterior</Button>
              <Button variant="default" className="h-12 w-12 rounded-full bg-primary text-white font-bold">1</Button>
              <Button variant="outline" className="h-12 w-12 rounded-full border-primary/10 hover:border-primary transition-colors">2</Button>
              <Button variant="outline" className="h-12 w-12 rounded-full border-primary/10 hover:border-primary transition-colors">3</Button>
              <Button variant="outline" className="h-12 px-6 rounded-full border-primary/10 hover:border-primary transition-colors">Siguiente</Button>
            </div>
          </main>
          
        </div>
      </div>
      
      <Footer />
    </div>
  );
}