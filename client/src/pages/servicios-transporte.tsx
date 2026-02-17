import { Navbar, Footer } from "@/components/layout/Navbar";
import { ServiceCard } from "@/components/ui/service-card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Truck, MapPin, ArrowRight, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { Link } from "wouter";

const REGIONES = [
    "Región Metropolitana", "Valparaíso", "O'Higgins", "Maule", "Biobío",
    "Araucanía", "Los Ríos", "Los Lagos", "Buenos Aires", "Córdoba",
    "Santa Fe", "Mendoza", "Salta", "Tucumán",
];

export default function ServiciosTransporte() {
    const [originFilter, setOriginFilter] = useState("");
    const [destFilter, setDestFilter] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const queryParams = new URLSearchParams();
    if (originFilter) queryParams.set("originRegion", originFilter);
    if (destFilter) queryParams.set("destinationRegion", destFilter);

    const { data, isLoading } = useQuery<any>({
        queryKey: ["/api/services/transports", originFilter, destFilter],
        queryFn: getQueryFn({ on401: "returnNull" }),
    });

    const items = data?.transports || [];

    const clearFilters = () => {
        setOriginFilter("");
        setDestFilter("");
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Header */}
            <section className="bg-gradient-to-r from-emerald-800 to-emerald-900 py-14 md:py-20">
                <div className="container px-4">
                    <div className="flex items-center gap-2 text-emerald-300/70 text-sm mb-3">
                        <Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link>
                        <ArrowRight className="w-3 h-3" />
                        <span className="text-white">Transporte</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                            <Truck className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">
                                Transporte de Caballos
                            </h1>
                            <p className="text-emerald-200/70 mt-1">
                                Fletes y traslados con rutas definidas y disponibilidad inmediata
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters + Listings */}
            <section className="py-10 bg-muted/20 flex-1">
                <div className="container px-4">
                    {/* Filter bar */}
                    <div className="bg-white rounded-xl border border-border/60 p-4 mb-8 shadow-sm">
                        <div className="flex flex-col md:flex-row gap-3">
                            <Select value={originFilter} onValueChange={setOriginFilter}>
                                <SelectTrigger className="flex-1">
                                    <SelectValue placeholder="Región de origen" />
                                </SelectTrigger>
                                <SelectContent>
                                    {REGIONES.map(r => (
                                        <SelectItem key={r} value={r}>{r}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={destFilter} onValueChange={setDestFilter}>
                                <SelectTrigger className="flex-1">
                                    <SelectValue placeholder="Región de destino" />
                                </SelectTrigger>
                                <SelectContent>
                                    {REGIONES.map(r => (
                                        <SelectItem key={r} value={r}>{r}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {(originFilter || destFilter) && (
                                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                                    <X className="w-4 h-4" /> Limpiar
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Results */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="bg-white rounded-xl border border-border/60 p-5 animate-pulse h-36" />
                            ))}
                        </div>
                    ) : items.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {items.map((item: any) => (
                                <ServiceCard
                                    key={item.id}
                                    category="transport"
                                    title={item.title}
                                    subtitle={`${item.originRegion} → ${item.destinationRegion}`}
                                    details={[
                                        ...(item.truckCapacity ? [{ icon: Truck, label: "Capacidad", value: `${item.truckCapacity} caballos` }] : []),
                                        ...(item.availability ? [{ icon: Search, label: "Estado", value: item.availability }] : []),
                                        ...(item.phone ? [{ icon: Search, label: "Tel", value: item.phone }] : []),
                                    ]}
                                    badge={item.availability}
                                    price={item.fixedPrice ? `$${Number(item.fixedPrice).toLocaleString()} ${item.currency}` : item.pricePerKm ? `$${item.pricePerKm}/km` : undefined}
                                    region={item.originRegion}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                                <Truck className="w-10 h-10 text-emerald-300" />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                                Aún no hay transportistas
                            </h3>
                            <p className="text-muted-foreground max-w-md mx-auto">
                                Sé el primero en publicar tu servicio de transporte de caballos. Llegá a toda la comunidad del polo.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
