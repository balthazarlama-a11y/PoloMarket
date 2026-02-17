import { Navbar, Footer } from "@/components/layout/Navbar";
import { ServiceCard } from "@/components/ui/service-card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Wheat, MapPin, ArrowRight, X, Package, DollarSign } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { Link } from "wouter";

const REGIONES = [
    "Región Metropolitana", "Valparaíso", "O'Higgins", "Maule", "Biobío",
    "Araucanía", "Los Ríos", "Los Lagos", "Buenos Aires", "Córdoba",
    "Santa Fe", "Mendoza", "Salta", "Tucumán",
];

const SUPPLY_TYPES = ["Alfalfa", "Avena", "Pasto", "Balanceado", "Otro"];

export default function ServiciosInsumos() {
    const [regionFilter, setRegionFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    const { data, isLoading } = useQuery<any>({
        queryKey: ["/api/services/supplies", regionFilter, typeFilter],
        queryFn: getQueryFn({ on401: "returnNull" }),
    });

    const items = data?.supplies || [];

    const clearFilters = () => {
        setRegionFilter("");
        setTypeFilter("");
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Header */}
            <section className="bg-gradient-to-r from-amber-700 to-amber-800 py-14 md:py-20">
                <div className="container px-4">
                    <div className="flex items-center gap-2 text-amber-300/70 text-sm mb-3">
                        <Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link>
                        <ArrowRight className="w-3 h-3" />
                        <span className="text-white">Insumos</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                            <Wheat className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">
                                Insumos y Fardos
                            </h1>
                            <p className="text-amber-200/70 mt-1">
                                Marketplace de forraje: alfalfa, avena y balanceados por región
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters + Listings */}
            <section className="py-10 bg-muted/20 flex-1">
                <div className="container px-4">
                    <div className="bg-white rounded-xl border border-border/60 p-4 mb-8 shadow-sm">
                        <div className="flex flex-col md:flex-row gap-3">
                            <Select value={typeFilter} onValueChange={setTypeFilter}>
                                <SelectTrigger className="flex-1">
                                    <SelectValue placeholder="Tipo de insumo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {SUPPLY_TYPES.map(t => (
                                        <SelectItem key={t} value={t}>{t}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={regionFilter} onValueChange={setRegionFilter}>
                                <SelectTrigger className="flex-1">
                                    <SelectValue placeholder="Región" />
                                </SelectTrigger>
                                <SelectContent>
                                    {REGIONES.map(r => (
                                        <SelectItem key={r} value={r}>{r}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {(regionFilter || typeFilter) && (
                                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                                    <X className="w-4 h-4" /> Limpiar
                                </Button>
                            )}
                        </div>
                    </div>

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
                                    category="supply"
                                    title={item.title}
                                    subtitle={`${item.supplyType} — ${item.unitMeasure}`}
                                    details={[
                                        { icon: Package, label: "Tipo", value: item.supplyType },
                                        { icon: Package, label: "Unidad", value: item.unitMeasure },
                                        ...(item.minOrder > 1 ? [{ icon: Package, label: "Mín", value: `${item.minOrder} ${item.unitMeasure.toLowerCase()}s` }] : []),
                                    ]}
                                    badge={item.supplyType}
                                    price={`$${Number(item.pricePerUnit).toLocaleString()} / ${item.unitMeasure}`}
                                    region={item.region}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
                                <Wheat className="w-10 h-10 text-amber-300" />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                                Aún no hay insumos publicados
                            </h3>
                            <p className="text-muted-foreground max-w-md mx-auto">
                                Publicá tu oferta de alfalfa, avena o balanceados y conectá con compradores de la comunidad del polo.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
