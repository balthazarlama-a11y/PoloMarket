import { Navbar, Footer } from "@/components/layout/Navbar";
import { ServiceCard } from "@/components/ui/service-card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Stethoscope, ArrowRight, X, Phone, Mail, MapPin, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { Link } from "wouter";

const REGIONES = [
    "Región Metropolitana", "Valparaíso", "O'Higgins", "Maule", "Biobío",
    "Araucanía", "Los Ríos", "Los Lagos", "Buenos Aires", "Córdoba",
    "Santa Fe", "Mendoza", "Salta", "Tucumán",
];

const SPECIALTIES = ["Equina general", "Traumatología", "Reproducción", "Odontología", "Otro"];

export default function ServiciosVeterinarias() {
    const [regionFilter, setRegionFilter] = useState("");
    const [specialtyFilter, setSpecialtyFilter] = useState("");
    const [emergencyOnly, setEmergencyOnly] = useState(false);

    const { data, isLoading } = useQuery<any>({
        queryKey: ["/api/services/vets", regionFilter, specialtyFilter, emergencyOnly],
        queryFn: getQueryFn({ on401: "returnNull" }),
    });

    const items = data?.vetClinics || [];

    const clearFilters = () => {
        setRegionFilter("");
        setSpecialtyFilter("");
        setEmergencyOnly(false);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Header */}
            <section className="bg-gradient-to-r from-rose-800 to-rose-900 py-14 md:py-20">
                <div className="container px-4">
                    <div className="flex items-center gap-2 text-rose-300/70 text-sm mb-3">
                        <Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link>
                        <ArrowRight className="w-3 h-3" />
                        <span className="text-white">Veterinarias</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                            <Stethoscope className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">
                                Veterinarias Equinas
                            </h1>
                            <p className="text-rose-200/70 mt-1">
                                Directorio de clínicas especializadas con servicio de emergencia
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters + Listings */}
            <section className="py-10 bg-muted/20 flex-1">
                <div className="container px-4">
                    <div className="bg-white rounded-xl border border-border/60 p-4 mb-8 shadow-sm">
                        <div className="flex flex-col md:flex-row gap-3 items-center">
                            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                                <SelectTrigger className="flex-1">
                                    <SelectValue placeholder="Especialidad" />
                                </SelectTrigger>
                                <SelectContent>
                                    {SPECIALTIES.map(s => (
                                        <SelectItem key={s} value={s}>{s}</SelectItem>
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
                            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer shrink-0 px-2">
                                <Checkbox checked={emergencyOnly} onCheckedChange={(c) => setEmergencyOnly(!!c)} />
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                                Emergencia 24h
                            </label>
                            {(regionFilter || specialtyFilter || emergencyOnly) && (
                                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 shrink-0">
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
                                    category="vet"
                                    title={item.clinicName}
                                    subtitle={item.specialty}
                                    details={[
                                        { icon: Stethoscope, label: "Esp", value: item.specialty },
                                        ...(item.phone ? [{ icon: Phone, label: "Tel", value: item.phone }] : []),
                                        ...(item.email ? [{ icon: Mail, label: "Email", value: item.email }] : []),
                                        ...(item.emergencyService ? [{ icon: AlertTriangle, label: "", value: "Emergencia 24h" }] : []),
                                    ]}
                                    badge={item.emergencyService ? "Emergencia 24h" : item.specialty}
                                    region={item.region}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4">
                                <Stethoscope className="w-10 h-10 text-rose-300" />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                                Aún no hay veterinarias registradas
                            </h3>
                            <p className="text-muted-foreground max-w-md mx-auto">
                                Registrá tu clínica veterinaria y conectá con dueños de caballos de polo en tu región.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
