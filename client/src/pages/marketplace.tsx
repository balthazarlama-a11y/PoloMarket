import { Navbar, Footer } from "@/components/layout/Navbar";
import { HorseCard } from "@/components/ui/horse-card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Marketplace() {
  const [showFilters, setShowFilters] = useState(false);

  // Fetch horses from API
  const { data, isLoading } = useQuery({
    queryKey: ["/api/horses"],
    queryFn: async () => {
      const res = await fetch("/api/horses");
      return res.json();
    },
  });

  const horses = data?.horses || [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="container px-4 py-8 flex-1">
        {/* Accessories banner */}
        <Link href="/accesorios">
          <div className="mb-6 bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200/50 rounded-xl px-5 py-3 flex items-center justify-between hover:shadow-md transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <span className="text-lg">🏇</span>
              <span className="text-sm font-medium text-violet-800">¿Buscás accesorios de polo? Monturas, tacos, botas y más</span>
            </div>
            <span className="text-violet-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">Ver accesorios →</span>
          </div>
        </Link>
        <div className="flex flex-col md:flex-row gap-8">

          {/* Mobile Filter Toggle */}
          <div className="md:hidden">
            <Button
              variant="outline"
              className="w-full rounded-xl gap-2 h-11"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
            </Button>
          </div>

          {/* Sidebar Filters */}
          <aside className={`w-full md:w-64 shrink-0 space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-primary">Filtros</h2>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-secondary text-xs">
                Limpiar todo
              </Button>
            </div>

            <Accordion type="multiple" defaultValue={["operation", "price", "location"]}>

              <AccordionItem value="operation">
                <AccordionTrigger className="text-sm font-semibold">Operación</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="buy" />
                      <Label htmlFor="buy" className="text-sm cursor-pointer">Compra</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="rent" />
                      <Label htmlFor="rent" className="text-sm cursor-pointer">Arriendo</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sale" />
                      <Label htmlFor="sale" className="text-sm cursor-pointer">Venta</Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="location">
                <AccordionTrigger className="text-sm font-semibold">Ubicación</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cl" />
                      <Label htmlFor="cl" className="text-sm cursor-pointer">Chile</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ar" />
                      <Label htmlFor="ar" className="text-sm cursor-pointer">Argentina</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="us" />
                      <Label htmlFor="us" className="text-sm cursor-pointer">USA</Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="price">
                <AccordionTrigger className="text-sm font-semibold">Precio (USD)</AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4 px-2">
                    <Slider defaultValue={[50000]} max={100000} step={1000} />
                    <div className="flex justify-between mt-3 text-xs text-muted-foreground font-medium">
                      <span>$0</span>
                      <span>$100k+</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="sex">
                <AccordionTrigger className="text-sm font-semibold">Sexo</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mare" />
                      <Label htmlFor="mare" className="text-sm cursor-pointer">Yegua</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="gelding" />
                      <Label htmlFor="gelding" className="text-sm cursor-pointer">Castrado</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="stallion" />
                      <Label htmlFor="stallion" className="text-sm cursor-pointer">Padrillo</Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="level">
                <AccordionTrigger className="text-sm font-semibold">Nivel de Polo</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="low" />
                      <Label htmlFor="low" className="text-sm cursor-pointer">Principiante</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mid" />
                      <Label htmlFor="mid" className="text-sm cursor-pointer">Medio</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="high" />
                      <Label htmlFor="high" className="text-sm cursor-pointer">Alto Handicap</Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary">Caballos Disponibles</h1>
                <p className="text-muted-foreground text-sm mt-1">
                  {isLoading ? "Buscando..." : `${horses.length} resultados encontrados`}
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-72 gold-glow rounded-xl">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar por nombre..." className="pl-11 h-11 rounded-xl border-border/60" />
                </div>
              </div>
            </div>

            {/* Grid */}
            {isLoading ? (
              <div className="text-center py-20">
                <div className="text-4xl mb-4 animate-bounce">🐴</div>
                <p className="text-muted-foreground">Cargando caballos...</p>
              </div>
            ) : horses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {horses.map((horse: any) => (
                  <HorseCard key={horse.id} horse={horse} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-card rounded-2xl border border-border/50">
                <div className="text-5xl mb-4">🐴</div>
                <h3 className="font-serif text-2xl font-bold text-primary mb-2">Sin resultados</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  No se encontraron caballos con los filtros actuales. Intenta ajustar tu búsqueda.
                </p>
                <Button variant="outline" className="rounded-xl">Limpiar filtros</Button>
              </div>
            )}

            {/* Pagination */}
            {horses.length > 0 && (
              <div className="flex justify-center mt-12 gap-2">
                <Button variant="outline" disabled className="rounded-lg">Anterior</Button>
                <Button variant="secondary" className="text-white rounded-lg">1</Button>
                <Button variant="outline" className="rounded-lg">2</Button>
                <Button variant="outline" className="rounded-lg">3</Button>
                <Button variant="outline" className="rounded-lg">Siguiente</Button>
              </div>
            )}
          </main>

        </div>
      </div>

      <Footer />
    </div>
  );
}