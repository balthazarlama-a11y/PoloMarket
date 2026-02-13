import { Navbar, Footer } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Building2, Mail, Lock, User, MapPin, Phone, FileText, ArrowRight, ShieldCheck, BarChart3, Globe } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function RegisterBusiness() {
    const [, setLocation] = useLocation();
    const [companyName, setCompanyName] = useState("");
    const [rut, setRut] = useState("");
    const [businessType, setBusinessType] = useState("");
    const [contactName, setContactName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const queryClient = useQueryClient();

    const registerMutation = useMutation({
        mutationFn: async (data: { name?: string; email: string; password: string }) => {
            try {
                const res = await apiRequest("POST", "/api/auth/register", data);
                const json = await res.json();
                return json;
            } catch (err: any) {
                try {
                    const text = err.message?.split(": ")[1] || err.message;
                    const parsed = typeof text === "string" && text.startsWith("{") ? JSON.parse(text) : { message: text };
                    throw new Error(parsed.message || "Error al registrar empresa");
                } catch {
                    throw new Error("Error al registrar empresa");
                }
            }
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["/api/auth/me"], data);
            setLocation("/dashboard");
        },
        onError: (err: any) => {
            setError(err.message || "Error al registrar empresa");
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        registerMutation.mutate({ name: companyName || undefined, email, password });
    };

    return (
        <div className="min-h-screen flex flex-col bg-muted/20">
            <Navbar />

            {/* Hero Banner */}
            <div className="bg-gradient-to-br from-primary to-primary/85 py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1598556685459-7b5610817478?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
                <div className="relative z-10 container px-4 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur mb-6">
                        <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">Cuenta de Empresa</h1>
                    <p className="text-white/60 text-lg max-w-xl mx-auto">
                        Registra tu empresa y empieza a publicar caballos en la plataforma más exclusiva de polo
                    </p>
                </div>
            </div>

            {/* Benefits */}
            <div className="container px-4 -mt-8 relative z-20 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { icon: ShieldCheck, title: "Perfil Verificado", desc: "Badge de empresa verificada en tus publicaciones" },
                        { icon: BarChart3, title: "Analíticas Avanzadas", desc: "Métricas detalladas de rendimiento" },
                        { icon: Globe, title: "Alcance Global", desc: "Visibilidad en 12+ países del mundo" },
                    ].map((item, i) => (
                        <Card key={i} className="border-border/50 premium-shadow">
                            <CardContent className="p-6 flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                                    <item.icon className="w-5 h-5 text-secondary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm text-primary">{item.title}</h3>
                                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Form */}
            <main className="container px-4 pb-16 max-w-3xl mx-auto">
                <Card className="border-border/50 premium-shadow-lg">
                    <CardContent className="p-8 md:p-10">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {error && (
                                <div className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm border border-destructive/20 animate-fade-in">
                                    {error}
                                </div>
                            )}

                            {/* Company Data */}
                            <div>
                                <h3 className="font-serif text-lg font-bold text-primary mb-5 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Building2 className="w-4 h-4 text-primary" />
                                    </div>
                                    Datos de la Empresa
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="companyName" className="text-sm font-medium">Nombre de la Empresa *</Label>
                                        <div className="relative gold-glow rounded-xl">
                                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input id="companyName" type="text" placeholder="Haras del Sur S.A." value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="pl-11 h-12 rounded-xl border-border/60" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="rut" className="text-sm font-medium">RUT / ID Fiscal *</Label>
                                        <div className="relative gold-glow rounded-xl">
                                            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input id="rut" type="text" placeholder="76.123.456-7" value={rut} onChange={(e) => setRut(e.target.value)} className="pl-11 h-12 rounded-xl border-border/60" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="businessType" className="text-sm font-medium">Tipo de Negocio *</Label>
                                        <Select value={businessType} onValueChange={setBusinessType}>
                                            <SelectTrigger className="h-12 rounded-xl border-border/60">
                                                <SelectValue placeholder="Selecciona el tipo de negocio" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="breeder">Criadero / Haras</SelectItem>
                                                <SelectItem value="dealer">Compra y Venta de Caballos</SelectItem>
                                                <SelectItem value="club">Club de Polo</SelectItem>
                                                <SelectItem value="trainer">Centro de Entrenamiento</SelectItem>
                                                <SelectItem value="rental">Arriendo de Caballos</SelectItem>
                                                <SelectItem value="other">Otro</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Data */}
                            <div>
                                <h3 className="font-serif text-lg font-bold text-primary mb-5 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <User className="w-4 h-4 text-primary" />
                                    </div>
                                    Datos de Contacto
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="contactName" className="text-sm font-medium">Representante *</Label>
                                        <div className="relative gold-glow rounded-xl">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input id="contactName" type="text" placeholder="Juan Pérez" value={contactName} onChange={(e) => setContactName(e.target.value)} className="pl-11 h-12 rounded-xl border-border/60" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-medium">Email Corporativo *</Label>
                                        <div className="relative gold-glow rounded-xl">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input id="email" type="email" placeholder="contacto@empresa.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-11 h-12 rounded-xl border-border/60" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-sm font-medium">Teléfono *</Label>
                                        <div className="relative gold-glow rounded-xl">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input id="phone" type="tel" placeholder="+56 9 1234 5678" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-11 h-12 rounded-xl border-border/60" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="country" className="text-sm font-medium">País *</Label>
                                        <Select value={country} onValueChange={setCountry}>
                                            <SelectTrigger className="h-12 rounded-xl border-border/60">
                                                <SelectValue placeholder="Selecciona tu país" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="chile">Chile</SelectItem>
                                                <SelectItem value="argentina">Argentina</SelectItem>
                                                <SelectItem value="usa">Estados Unidos</SelectItem>
                                                <SelectItem value="uruguay">Uruguay</SelectItem>
                                                <SelectItem value="brasil">Brasil</SelectItem>
                                                <SelectItem value="uk">Reino Unido</SelectItem>
                                                <SelectItem value="other">Otro</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="city" className="text-sm font-medium">Ciudad</Label>
                                        <div className="relative gold-glow rounded-xl">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input id="city" type="text" placeholder="Santiago" value={city} onChange={(e) => setCity(e.target.value)} className="pl-11 h-12 rounded-xl border-border/60" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Security */}
                            <div>
                                <h3 className="font-serif text-lg font-bold text-primary mb-5 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Lock className="w-4 h-4 text-primary" />
                                    </div>
                                    Seguridad
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-sm font-medium">Contraseña *</Label>
                                        <div className="relative gold-glow rounded-xl">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-11 h-12 rounded-xl border-border/60" required minLength={6} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirmar *</Label>
                                        <div className="relative gold-glow rounded-xl">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-11 h-12 rounded-xl border-border/60" required minLength={6} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-muted/50 rounded-xl p-5 text-sm text-muted-foreground border border-border/30">
                                Al crear una cuenta de empresa, aceptas nuestros términos de servicio y confirmas que los datos proporcionados son verídicos. Tu cuenta será verificada en un plazo de 24-48 horas.
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-secondary hover:bg-secondary/90 text-white text-lg h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 gap-2 font-semibold"
                                disabled={registerMutation.isPending}
                            >
                                {registerMutation.isPending ? "Creando cuenta..." : (
                                    <>Crear Cuenta de Empresa <ArrowRight className="w-5 h-5" /></>
                                )}
                            </Button>

                            <div className="text-center text-sm text-muted-foreground space-y-2">
                                <p>
                                    ¿Ya tienes cuenta?{" "}
                                    <Link href="/login"><a className="text-secondary hover:underline font-semibold">Inicia sesión</a></Link>
                                </p>
                                <p>
                                    ¿Buscas una cuenta personal?{" "}
                                    <Link href="/register"><a className="text-primary hover:underline font-medium">Regístrate aquí</a></Link>
                                </p>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </main>

            <Footer />
        </div>
    );
}
