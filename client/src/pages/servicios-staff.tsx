import { Navbar, Footer } from "@/components/layout/Navbar";
import { ServiceCard } from "@/components/ui/service-card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight, X, Briefcase, Clock, Star } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { Link } from "wouter";

const REGIONES = [
    "Región Metropolitana", "Valparaíso", "O'Higgins", "Maule", "Biobío",
    "Araucanía", "Los Ríos", "Los Lagos", "Buenos Aires", "Córdoba",
    "Santa Fe", "Mendoza", "Salta", "Tucumán",
];

const STAFF_ROLES = ["Petisero", "Changuero", "Jugador", "Manager", "Otro"];

export default function ServiciosStaff() {
    const [roleFilter, setRoleFilter] = useState("");
    const [regionFilter, setRegionFilter] = useState("");

    const { data, isLoading } = useQuery<any>({
        queryKey: ["/api/services/staff", roleFilter, regionFilter],
        queryFn: getQueryFn({ on401: "returnNull" }),
    });

    const items = data?.staffListings || [];

    const clearFilters = () => {
        setRoleFilter("");
        setRegionFilter("");
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Header */}
            <section className="bg-gradient-to-r from-blue-800 to-blue-900 py-14 md:py-20">
                <div className="container px-4">
                    <div className="flex items-center gap-2 text-blue-300/70 text-sm mb-3">
                        <Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link>
                        <ArrowRight className="w-3 h-3" />
                        <span className="text-white">Staff</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                            <Users className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">
                                Staff — Bolsa de Trabajo
                            </h1>
                            <p className="text-blue-200/70 mt-1">
                                Petiseros, jugadores y managers disponibles para tu equipo
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
                            <Select value={roleFilter} onValueChange={setRoleFilter}>
                                <SelectTrigger className="flex-1">
                                    <SelectValue placeholder="Rol" />
                                </SelectTrigger>
                                <SelectContent>
                                    {STAFF_ROLES.map(r => (
                                        <SelectItem key={r} value={r}>{r}</SelectItem>
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
                            {(roleFilter || regionFilter) && (
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
                                    category="staff"
                                    title={item.title}
                                    subtitle={item.staffRole}
                                    details={[
                                        { icon: Briefcase, label: "Rol", value: item.staffRole },
                                        ...(item.experienceYears != null ? [{ icon: Star, label: "Exp", value: `${item.experienceYears} años` }] : []),
                                        ...(item.availability ? [{ icon: Clock, label: "Disp", value: item.availability }] : []),
                                    ]}
                                    badge={item.staffRole}
                                    price={item.salaryExpectation || undefined}
                                    region={item.region}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                                <Users className="w-10 h-10 text-blue-300" />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                                Aún no hay postulaciones
                            </h3>
                            <p className="text-muted-foreground max-w-md mx-auto">
                                Publicá tu perfil como petisero, jugador o manager y conectá con equipos de polo.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
