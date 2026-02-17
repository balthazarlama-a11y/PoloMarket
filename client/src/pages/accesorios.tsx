import { Navbar, Footer } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
    ShoppingBag, ArrowLeft, MapPin, Tag, DollarSign, Star,
    Shirt, Target, Footprints, HardHat, Lasso, Shield,
} from "lucide-react";

const categories = ["Todos", "Monturas", "Tacos", "Botas", "Cascos", "Riendas", "Protecciones", "Otro"];
const conditions = ["Todos", "Nuevo", "Usado - Excelente", "Usado - Bueno", "Usado - Regular"];

const categoryIcons: Record<string, any> = {
    Monturas: Shirt,
    Tacos: Target,
    Botas: Footprints,
    Cascos: HardHat,
    Riendas: Lasso,
    Protecciones: Shield,
    Otro: ShoppingBag,
};

const categoryColors: Record<string, string> = {
    Monturas: "bg-violet-100 text-violet-600",
    Tacos: "bg-orange-100 text-orange-600",
    Botas: "bg-amber-100 text-amber-700",
    Cascos: "bg-sky-100 text-sky-600",
    Riendas: "bg-teal-100 text-teal-600",
    Protecciones: "bg-red-100 text-red-600",
    Otro: "bg-gray-100 text-gray-600",
};

export default function Accesorios() {
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [selectedCondition, setSelectedCondition] = useState("Todos");

    const queryParams = new URLSearchParams();
    if (selectedCategory !== "Todos") queryParams.set("category", selectedCategory);
    if (selectedCondition !== "Todos") queryParams.set("condition", selectedCondition);

    const { data, isLoading } = useQuery<any>({
        queryKey: ["/api/accessories", queryParams.toString()],
        queryFn: async () => {
            const res = await fetch(`/api/accessories?${queryParams.toString()}`);
            return res.json();
        },
    });

    const items = data?.accessories || [];

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            {/* Hero */}
            <section className="relative bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_40%,white_1px,transparent_1px)] bg-[size:30px_30px]" />
                <div className="container px-4 relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Volver al inicio
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
                            <ShoppingBag className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">Accesorios de Polo</h1>
                        </div>
                    </div>
                    <p className="text-white/70 text-lg max-w-xl mt-3">
                        Encontrá monturas, tacos, botas, cascos y todo el equipamiento que necesitás para el polo.
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="bg-white border-b border-border/50 sticky top-0 z-20">
                <div className="container px-4 py-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex gap-2 flex-wrap flex-1">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === cat
                                            ? "bg-violet-600 text-white shadow-md"
                                            : "bg-muted/50 text-muted-foreground hover:bg-muted"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <select
                            value={selectedCondition}
                            onChange={e => setSelectedCondition(e.target.value)}
                            className="px-4 py-2 rounded-xl border border-border/60 bg-white text-sm font-medium text-foreground"
                        >
                            {conditions.map(c => (
                                <option key={c} value={c}>{c === "Todos" ? "Estado: Todos" : c}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 flex-1">
                <div className="container px-4">
                    <p className="text-muted-foreground text-sm mb-8">
                        {isLoading ? "Buscando..." : `${items.length} accesorios encontrados`}
                    </p>

                    {isLoading ? (
                        <div className="text-center py-20">
                            <div className="text-4xl mb-4 animate-bounce">🏇</div>
                            <p className="text-muted-foreground">Cargando accesorios...</p>
                        </div>
                    ) : items.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {items.map((item: any) => {
                                const Icon = categoryIcons[item.category] || ShoppingBag;
                                const colorClass = categoryColors[item.category] || "bg-gray-100 text-gray-600";

                                return (
                                    <div key={item.id} className="group bg-white rounded-2xl border border-border/50 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        <div className="relative h-48 bg-gradient-to-br from-violet-50 to-purple-50 flex items-center justify-center">
                                            <Icon className="w-16 h-16 text-violet-200" />
                                            {item.condition === "Nuevo" && (
                                                <span className="absolute top-3 left-3 px-2.5 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                                                    <Star className="w-3 h-3" /> Nuevo
                                                </span>
                                            )}
                                            <span className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-full ${colorClass}`}>
                                                {item.category}
                                            </span>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-serif text-lg font-bold text-foreground mb-1 group-hover:text-violet-700 transition-colors line-clamp-1">
                                                {item.title}
                                            </h3>
                                            {item.brand && (
                                                <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                                                    <Tag className="w-3 h-3" /> {item.brand}
                                                </p>
                                            )}
                                            {item.description && (
                                                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{item.description}</p>
                                            )}
                                            <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/30">
                                                <div className="flex items-center gap-1 text-lg font-bold text-violet-700">
                                                    <DollarSign className="w-4 h-4" />
                                                    {Number(item.price).toLocaleString()} {item.currency}
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <MapPin className="w-3 h-3" /> {item.region}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-card rounded-2xl border border-border/50">
                            <div className="text-5xl mb-4">🛒</div>
                            <h3 className="font-serif text-2xl font-bold text-primary mb-2">Sin accesorios publicados</h3>
                            <p className="text-muted-foreground max-w-md mx-auto mb-6">
                                {selectedCategory !== "Todos"
                                    ? `Aún no hay accesorios en la categoría "${selectedCategory}".`
                                    : "Aún no hay accesorios disponibles. ¡Sé el primero en publicar!"}
                            </p>
                            <Link href="/dashboard">
                                <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl gap-2">
                                    Publicar accesorio
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
