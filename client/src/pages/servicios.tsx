import { Navbar, Footer } from "@/components/layout/Navbar";
import { CategoryCard } from "@/components/ui/service-card";
import { Truck, Wheat, Users, Stethoscope, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";

export default function Servicios() {
    // Fetch counts for each category
    const { data: transportData } = useQuery<any>({
        queryKey: ["/api/services/transports"],
        queryFn: getQueryFn({ on401: "returnNull" }),
    });
    const { data: supplyData } = useQuery<any>({
        queryKey: ["/api/services/supplies"],
        queryFn: getQueryFn({ on401: "returnNull" }),
    });
    const { data: staffData } = useQuery<any>({
        queryKey: ["/api/services/staff"],
        queryFn: getQueryFn({ on401: "returnNull" }),
    });
    const { data: vetData } = useQuery<any>({
        queryKey: ["/api/services/vets"],
        queryFn: getQueryFn({ on401: "returnNull" }),
    });

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero */}
            <section className="relative bg-gradient-to-br from-primary via-primary to-[#0d1f15] py-20 md:py-28 overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                </div>
                <div className="container px-4 relative z-10 text-center">
                    <span className="inline-block text-secondary font-semibold tracking-[0.2em] text-xs uppercase mb-4 animate-fade-in">
                        Logística & Insumos
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
                        Servicios para el Polo
                    </h1>
                    <p className="text-lg text-white/70 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        Todo lo que necesitás para tu operación ecuestre. Transporte, insumos, personal calificado y atención veterinaria en un solo lugar.
                    </p>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-20 bg-muted/20">
                <div className="container px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <CategoryCard
                            category="transport"
                            title="Transporte (Fletes)"
                            description="Encontrá transportistas con rutas definidas, capacidad de camiones y disponibilidad inmediata para el traslado de caballos."
                            href="/servicios/transporte"
                            count={transportData?.transports?.length}
                        />
                        <CategoryCard
                            category="supply"
                            title="Insumos (Fardos / Alimento)"
                            description="Marketplace de forraje: alfalfa, avena y balanceados filtrados por ubicación geográfica y precio por unidad."
                            href="/servicios/insumos"
                            count={supplyData?.supplies?.length}
                        />
                        <CategoryCard
                            category="staff"
                            title="Staff (Bolsa de Trabajo)"
                            description="Espacio para petiseros, jugadores y managers. Publicá o encontrá personal calificado para tu equipo."
                            href="/servicios/staff"
                            count={staffData?.staffListings?.length}
                        />
                        <CategoryCard
                            category="vet"
                            title="Veterinarias"
                            description="Directorio de clínicas veterinarias especializadas en equinos, con servicio de emergencia y especialidades."
                            href="/servicios/veterinarias"
                            count={vetData?.vetClinics?.length}
                        />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-white">
                <div className="container px-4 text-center">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                        ¿Ofrecés un servicio?
                    </h2>
                    <p className="text-muted-foreground max-w-lg mx-auto mb-6">
                        Registrate como proveedor y publicá tus servicios de transporte, insumos, trabajo o veterinaria. Llegá a toda la comunidad del polo.
                    </p>
                    <a href="/register">
                        <button className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                            Registrarse como Proveedor
                        </button>
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}
