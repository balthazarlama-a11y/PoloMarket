import { Navbar, Footer } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
    Trophy, Truck, Wheat, Users, Stethoscope, ShoppingBag,
    ArrowRight, ArrowLeft, CheckCircle2, Loader2,
} from "lucide-react";

type Category = "caballo" | "transporte" | "insumos" | "staff" | "veterinaria" | "accesorio";

const categoryConfig: Record<Category, {
    label: string; icon: any; color: string; bgColor: string;
    hoverColor: string; gradient: string; endpoint: string; redirect: string;
    description: string;
}> = {
    caballo: {
        label: "Caballo", icon: Trophy, color: "text-primary",
        bgColor: "bg-primary/10", hoverColor: "hover:border-primary",
        gradient: "from-primary/5 to-primary/10",
        endpoint: "/api/horses", redirect: "/marketplace",
        description: "Publicá tu caballo para venta, arriendo o compra.",
    },
    transporte: {
        label: "Transporte (Flete)", icon: Truck, color: "text-emerald-600",
        bgColor: "bg-emerald-50", hoverColor: "hover:border-emerald-400",
        gradient: "from-emerald-50 to-emerald-100/50",
        endpoint: "/api/services/transports", redirect: "/servicios/transporte",
        description: "Ofrecé servicio de flete de caballos.",
    },
    insumos: {
        label: "Insumos (Fardos)", icon: Wheat, color: "text-amber-600",
        bgColor: "bg-amber-50", hoverColor: "hover:border-amber-400",
        gradient: "from-amber-50 to-amber-100/50",
        endpoint: "/api/services/supplies", redirect: "/servicios/insumos",
        description: "Vendé alfalfa, avena, balanceado y más.",
    },
    staff: {
        label: "Staff (Bolsa de Trabajo)", icon: Users, color: "text-blue-600",
        bgColor: "bg-blue-50", hoverColor: "hover:border-blue-400",
        gradient: "from-blue-50 to-blue-100/50",
        endpoint: "/api/services/staff", redirect: "/servicios/staff",
        description: "Publicá un puesto o tu perfil profesional.",
    },
    veterinaria: {
        label: "Veterinaria", icon: Stethoscope, color: "text-rose-600",
        bgColor: "bg-rose-50", hoverColor: "hover:border-rose-400",
        gradient: "from-rose-50 to-rose-100/50",
        endpoint: "/api/services/vets", redirect: "/servicios/veterinarias",
        description: "Registrá tu clínica veterinaria equina.",
    },
    accesorio: {
        label: "Accesorio de Polo", icon: ShoppingBag, color: "text-violet-600",
        bgColor: "bg-violet-50", hoverColor: "hover:border-violet-400",
        gradient: "from-violet-50 to-violet-100/50",
        endpoint: "/api/accessories", redirect: "/accesorios",
        description: "Vendé monturas, tacos, botas, cascos y más.",
    },
};

const regiones = [
    "Región Metropolitana", "Valparaíso", "O'Higgins", "Maule", "Biobío",
    "Araucanía", "Los Ríos", "Los Lagos", "Coquimbo", "Atacama",
    "Buenos Aires", "Córdoba", "Santa Fe", "Mendoza",
];

export default function Publicar() {
    const [, navigate] = useLocation();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [step, setStep] = useState<"select" | "form">("select");
    const [category, setCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState<Record<string, any>>({});

    const mutation = useMutation({
        mutationFn: async () => {
            if (!category) throw new Error("Seleccioná una categoría");
            const config = categoryConfig[category];
            const res = await apiRequest("POST", config.endpoint, formData);
            return res.json();
        },
        onSuccess: () => {
            toast({ title: "¡Publicación creada!", description: "Tu publicación fue creada exitosamente." });
            queryClient.invalidateQueries();
            if (category) navigate(categoryConfig[category].redirect);
        },
        onError: (err: any) => {
            toast({ title: "Error", description: err.message || "No se pudo crear la publicación. Verifica que estás logueado.", variant: "destructive" });
        },
    });

    const updateField = (key: string, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate();
    };

    const selectCategory = (cat: Category) => {
        setCategory(cat);
        setFormData({});
        setStep("form");
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            {/* Hero */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,white_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="container px-4 relative z-10 text-center">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">Publicar</h1>
                    <p className="text-white/60 text-lg max-w-lg mx-auto">
                        Creá tu publicación y llegá a la comunidad de polo más grande.
                    </p>
                </div>
            </section>

            <section className="py-12 flex-1">
                <div className="container px-4 max-w-3xl mx-auto">

                    {/* Step 1: Select Category */}
                    {step === "select" && (
                        <div>
                            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">¿Qué querés publicar?</h2>
                            <p className="text-muted-foreground mb-8">Seleccioná la categoría de tu publicación.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {(Object.entries(categoryConfig) as [Category, typeof categoryConfig[Category]][]).map(([key, cfg]) => {
                                    const Icon = cfg.icon;
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => selectCategory(key)}
                                            className={`group text-left p-6 rounded-2xl border-2 border-border/50 bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${cfg.hoverColor}`}
                                        >
                                            <div className={`w-12 h-12 rounded-xl ${cfg.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                                <Icon className={`w-6 h-6 ${cfg.color}`} />
                                            </div>
                                            <h3 className="font-semibold text-foreground mb-1">{cfg.label}</h3>
                                            <p className="text-sm text-muted-foreground">{cfg.description}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Form */}
                    {step === "form" && category && (
                        <div>
                            <button
                                onClick={() => { setStep("select"); setCategory(null); }}
                                className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" /> Cambiar categoría
                            </button>

                            {(() => {
                                const cfg = categoryConfig[category];
                                const Icon = cfg.icon;
                                return (
                                    <div className={`rounded-2xl border border-border/50 bg-gradient-to-br ${cfg.gradient} p-6 mb-8`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-xl ${cfg.bgColor} flex items-center justify-center`}>
                                                <Icon className={`w-5 h-5 ${cfg.color}`} />
                                            </div>
                                            <div>
                                                <h2 className="font-serif text-xl font-bold text-foreground">{cfg.label}</h2>
                                                <p className="text-sm text-muted-foreground">{cfg.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}

                            <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl border border-border/50 p-8">

                                {/* CABALLO */}
                                {category === "caballo" && (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="name">Nombre del caballo *</Label>
                                                <Input id="name" required value={formData.name || ""} onChange={e => updateField("name", e.target.value)} className="mt-1" />
                                            </div>
                                            <div>
                                                <Label htmlFor="type">Operación *</Label>
                                                <select id="type" required value={formData.type || ""} onChange={e => updateField("type", e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                                                    <option value="">Seleccionar...</option>
                                                    <option value="Venta">Venta</option>
                                                    <option value="Arriendo">Arriendo</option>
                                                    <option value="Compra">Compra</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <Label htmlFor="price">Precio (USD) *</Label>
                                                <Input id="price" type="number" required value={formData.price || ""} onChange={e => updateField("price", e.target.value)} className="mt-1" />
                                            </div>
                                            <div>
                                                <Label htmlFor="age">Edad (años) *</Label>
                                                <Input id="age" type="number" min={0} max={30} required value={formData.age || ""} onChange={e => updateField("age", parseInt(e.target.value))} className="mt-1" />
                                            </div>
                                            <div>
                                                <Label htmlFor="height">Alzada (manos) *</Label>
                                                <Input id="height" required placeholder="ej: 15.2" value={formData.height || ""} onChange={e => updateField("height", e.target.value)} className="mt-1" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <Label htmlFor="sex">Sexo *</Label>
                                                <select id="sex" required value={formData.sex || ""} onChange={e => updateField("sex", e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                                                    <option value="">Seleccionar...</option>
                                                    <option value="Yegua">Yegua</option>
                                                    <option value="Castrado">Castrado</option>
                                                    <option value="Padrillo">Padrillo</option>
                                                </select>
                                            </div>
                                            <div>
                                                <Label htmlFor="location">Ubicación *</Label>
                                                <Input id="location" required value={formData.location || ""} onChange={e => updateField("location", e.target.value)} className="mt-1" />
                                            </div>
                                            <div>
                                                <Label htmlFor="poloLevel">Nivel de Polo</Label>
                                                <select id="poloLevel" value={formData.poloLevel || ""} onChange={e => updateField("poloLevel", e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                                                    <option value="">Seleccionar...</option>
                                                    <option value="Principiante">Principiante</option>
                                                    <option value="Intermedio">Intermedio</option>
                                                    <option value="Alto handicap">Alto handicap</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="description">Descripción</Label>
                                            <textarea id="description" rows={3} value={formData.description || ""} onChange={e => updateField("description", e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                                        </div>
                                    </>
                                )}

                                {/* TRANSPORTE */}
                                {category === "transporte" && (
                                    <>
                                        <div>
                                            <Label htmlFor="title">Título del servicio *</Label>
                                            <Input id="title" required placeholder="ej: Flete Santiago - Viña del Mar" value={formData.title || ""} onChange={e => updateField("title", e.target.value)} className="mt-1" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="originRegion">Región de origen *</Label>
                                                <select id="originRegion" required value={formData.originRegion || ""} onChange={e => updateField("originRegion", e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                                                    <option value="">Seleccionar...</option>
                                                    {regiones.map(r => <option key={r} value={r}>{r}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <Label htmlFor="destinationRegion">Región de destino *</Label>
                                                <select id="destinationRegion" required value={formData.destinationRegion || ""} onChange={e => updateField("destinationRegion", e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                                                    <option value="">Seleccionar...</option>
                                                    {regiones.map(r => <option key={r} value={r}>{r}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <Label htmlFor="truckCapacity">Capacidad (caballos)</Label>
                                                <Input id="truckCapacity" type="number" min={1} value={formData.truckCapacity || ""} onChange={e => updateField("truckCapacity", parseInt(e.target.value))} className="mt-1" />
                                            </div>
                                            <div>
                                                <Label htmlFor="fixedPrice">Precio fijo</Label>
                                                <Input id="fixedPrice" type="number" value={formData.fixedPrice || ""} onChange={e => updateField("fixedPrice", e.target.value)} className="mt-1" />
                                            </div>
                                            <div>
                                                <Label htmlFor="pricePerKm">Precio por km</Label>
                                                <Input id="pricePerKm" type="number" value={formData.pricePerKm || ""} onChange={e => updateField("pricePerKm", e.target.value)} className="mt-1" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="phone">Teléfono de contacto</Label>
                                                <Input id="phone" value={formData.phone || ""} onChange={e => updateField("phone", e.target.value)} className="mt-1" />
                                            </div>
                                            <div>
                                                <Label htmlFor="availability">Disponibilidad</Label>
                                                <select id="availability" value={formData.availability || ""} onChange={e => updateField("availability", e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                                                    <option value="Disponible">Disponible</option>
                                                    <option value="Ocupado">Ocupado</option>
                                                    <option value="Por consultar">Por consultar</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="description">Descripción</Label>
                                            <textarea id="description" rows={3} value={formData.description || ""} onChange={e => updateField("description", e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                                        </div>
                                    </>
                                )}

                                {/* INSUMOS */}
                                {category === "insumos" && (
                                    <>
                                        <div>
                                            <Label htmlFor="title">Título *</Label>
                                            <Input id="title" required placeholder="ej: Fardos de alfalfa premium" value={formData.title || ""} onChange={e => updateField("title", e.target.value)} className="mt-1" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="supplyType">Tipo de insumo *</Label>
                                                <select id="supplyType" required value={formData.supplyType || ""} onChange={e => updateField("supplyType", e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                                                    <option value="">Seleccionar...</option>
                                                    <option value="Alfalfa">Alfalfa</option>
                                                    <option value="Avena">Avena</option>
                                                    <option value="Pasto">Pasto</option>
                                                    <option value="Balanceado">Balanceado</option>
                                                    <option value="Otro">Otro</option>
                                                </select>
                                            </div>
                                            <div>
                                                <Label htmlFor="unitMeasure">Unidad de medida *</Label>
                                                <select id="unitMeasure" required value={formData.unitMeasure || ""} onChange={e => updateField("unitMeasure", e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                                                    <option value="">Seleccionar...</option>
                                                    <option value="Fardo">Fardo</option>
                                                    <option value="Kg">Kg</option>
                                                    <option value="Tonelada">Tonelada</option>
                                                    <option value="Bolsa">Bolsa</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <Label htmlFor="pricePerUnit">Precio por unidad *</Label>
                                                <Input id="pricePerUnit" type="number" required value={formData.pricePerUnit || ""} onChange={e => updateField("pricePerUnit", e.target.value)} className="mt-1" />
                                            </div>
                                            <div>
                                                <Label htmlFor="minOrder">Pedido mínimo</Label>
                                                <Input id="minOrder" type="number" min={1} value={formData.minOrder || ""} onChange={e => updateField("minOrder", parseInt(e.target.value))} className="mt-1" />
                                            </div>
                                            <div>
                                                <Label htmlFor="region">Región *</Label>
                                                <select id="region" required value={formData.region || ""} onChange={e => updateField("region", e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                                                    <option value="">Seleccionar...</option>
                                                    {regiones.map(r => <option key={r} value={r}>{r}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="description">Descripción</Label>
                                            <textarea id="description" rows={3} value={formData.description || ""} onChange={e => updateField("description", e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                                        </div>
                                    </>
                                )}

                                {/* STAFF */}
                                {category === "staff" && (
                                    <>
                                        <div>
                                            <Label htmlFor="title">Título del puesto *</Label>
                                            <Input id="title" required placeholder="ej: Petisero con experiencia" value={formData.title || ""} onChange={e => updateField("title", e.target.value)} className="mt-1" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="staffRole">Rol *</Label>
                                                <select id="staffRole" required value={formData.staffRole || ""} onChange={e => updateField("staffRole", e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                                                    <option value="">Seleccionar...</option>
                                                    <option value="Petisero">Petisero</option>
                                                    <option value="Jugador">Jugador</option>
                                                    <option value="Manager">Manager</option>
                                                    <option value="Otro">Otro</option>
                                                </select>
                                            </div>
                                            <div>
                                                <Label htmlFor="experienceYears">Años de experiencia</Label>
                                                <Input id="experienceYears" type="number" min={0} value={formData.experienceYears || ""} onChange={e => updateField("experienceYears", parseInt(e.target.value))} className="mt-1" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="region">Región *</Label>
                                                <select id="region" required value={formData.region || ""} onChange={e => updateField("region", e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                                                    <option value="">Seleccionar...</option>
                                                    {regiones.map(r => <option key={r} value={r}>{r}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <Label htmlFor="availability">Disponibilidad</Label>
                                                <select id="availability" value={formData.availability || ""} onChange={e => updateField("availability", e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                                                    <option value="Disponible">Disponible</option>
                                                    <option value="No disponible">No disponible</option>
                                                    <option value="Por consultar">Por consultar</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="salaryExpectation">Expectativa salarial</Label>
                                            <Input id="salaryExpectation" placeholder="ej: $500.000 CLP/mes" value={formData.salaryExpectation || ""} onChange={e => updateField("salaryExpectation", e.target.value)} className="mt-1" />
                                        </div>
                                        <div>
                                            <Label htmlFor="description">Descripción</Label>
                                            <textarea id="description" rows={3} value={formData.description || ""} onChange={e => updateField("description", e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                                        </div>
                                    </>
                                )}

                                {/* VETERINARIA */}
                                {category === "veterinaria" && (
                                    <>
                                        <div>
                                            <Label htmlFor="clinicName">Nombre de la clínica *</Label>
                                            <Input id="clinicName" required value={formData.clinicName || ""} onChange={e => updateField("clinicName", e.target.value)} className="mt-1" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="specialty">Especialidad *</Label>
                                                <select id="specialty" required value={formData.specialty || ""} onChange={e => updateField("specialty", e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                                                    <option value="">Seleccionar...</option>
                                                    <option value="Equina general">Equina general</option>
                                                    <option value="Traumatología">Traumatología</option>
                                                    <option value="Reproducción">Reproducción</option>
                                                    <option value="Odontología">Odontología</option>
                                                    <option value="Otro">Otro</option>
                                                </select>
                                            </div>
                                            <div>
                                                <Label htmlFor="region">Región *</Label>
                                                <select id="region" required value={formData.region || ""} onChange={e => updateField("region", e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                                                    <option value="">Seleccionar...</option>
                                                    {regiones.map(r => <option key={r} value={r}>{r}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="address">Dirección</Label>
                                                <Input id="address" value={formData.address || ""} onChange={e => updateField("address", e.target.value)} className="mt-1" />
                                            </div>
                                            <div>
                                                <Label htmlFor="phone">Teléfono</Label>
                                                <Input id="phone" value={formData.phone || ""} onChange={e => updateField("phone", e.target.value)} className="mt-1" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="email">Email</Label>
                                                <Input id="email" type="email" value={formData.email || ""} onChange={e => updateField("email", e.target.value)} className="mt-1" />
                                            </div>
                                            <div className="flex items-center gap-3 pt-6">
                                                <input type="checkbox" id="emergencyService" checked={formData.emergencyService || false} onChange={e => updateField("emergencyService", e.target.checked)} className="w-4 h-4 rounded border-input" />
                                                <Label htmlFor="emergencyService">Servicio de emergencia 24h</Label>
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="description">Descripción</Label>
                                            <textarea id="description" rows={3} value={formData.description || ""} onChange={e => updateField("description", e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                                        </div>
                                    </>
                                )}

                                {/* ACCESORIO */}
                                {category === "accesorio" && (
                                    <>
                                        <div>
                                            <Label htmlFor="title">Título *</Label>
                                            <Input id="title" required placeholder="ej: Montura de polo inglesa" value={formData.title || ""} onChange={e => updateField("title", e.target.value)} className="mt-1" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="category_acc">Categoría *</Label>
                                                <select id="category_acc" required value={formData.category || ""} onChange={e => updateField("category", e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                                                    <option value="">Seleccionar...</option>
                                                    <option value="Monturas">Monturas</option>
                                                    <option value="Tacos">Tacos</option>
                                                    <option value="Botas">Botas</option>
                                                    <option value="Cascos">Cascos</option>
                                                    <option value="Riendas">Riendas</option>
                                                    <option value="Protecciones">Protecciones</option>
                                                    <option value="Otro">Otro</option>
                                                </select>
                                            </div>
                                            <div>
                                                <Label htmlFor="condition">Estado *</Label>
                                                <select id="condition" required value={formData.condition || ""} onChange={e => updateField("condition", e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                                                    <option value="">Seleccionar...</option>
                                                    <option value="Nuevo">Nuevo</option>
                                                    <option value="Usado - Excelente">Usado - Excelente</option>
                                                    <option value="Usado - Bueno">Usado - Bueno</option>
                                                    <option value="Usado - Regular">Usado - Regular</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <Label htmlFor="price">Precio *</Label>
                                                <Input id="price" type="number" required value={formData.price || ""} onChange={e => updateField("price", e.target.value)} className="mt-1" />
                                            </div>
                                            <div>
                                                <Label htmlFor="brand">Marca</Label>
                                                <Input id="brand" value={formData.brand || ""} onChange={e => updateField("brand", e.target.value)} className="mt-1" />
                                            </div>
                                            <div>
                                                <Label htmlFor="region">Región *</Label>
                                                <select id="region" required value={formData.region || ""} onChange={e => updateField("region", e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                                                    <option value="">Seleccionar...</option>
                                                    {regiones.map(r => <option key={r} value={r}>{r}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="description">Descripción</Label>
                                            <textarea id="description" rows={3} value={formData.description || ""} onChange={e => updateField("description", e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                                        </div>
                                    </>
                                )}

                                {/* Submit */}
                                <div className="flex items-center gap-4 pt-4 border-t border-border/30">
                                    <Button
                                        type="submit"
                                        disabled={mutation.isPending}
                                        className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 h-12 gap-2 shadow-lg hover:shadow-xl transition-all"
                                    >
                                        {mutation.isPending ? (
                                            <><Loader2 className="w-4 h-4 animate-spin" /> Publicando...</>
                                        ) : (
                                            <><CheckCircle2 className="w-4 h-4" /> Publicar</>
                                        )}
                                    </Button>
                                    <p className="text-xs text-muted-foreground">Al publicar, aceptás los términos y condiciones.</p>
                                </div>
                            </form>
                        </div>
                    )}

                </div>
            </section>

            <Footer />
        </div>
    );
}
