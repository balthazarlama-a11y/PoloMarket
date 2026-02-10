import { Navbar, Footer } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Building2, Mail, Lock, User, MapPin, Phone, FileText } from "lucide-react";
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

            <main className="flex-1 flex items-center justify-center py-12 container px-4">
                <Card className="w-full max-w-2xl">
                    <CardHeader className="space-y-1 text-center">
                        <div className="inline-flex items-center justify-center p-3 rounded-full bg-secondary/10 mb-4 mx-auto">
                            <Building2 className="w-8 h-8 text-secondary" />
                        </div>
                        <CardTitle className="font-serif text-3xl font-bold">Cuenta de Empresa</CardTitle>
                        <CardDescription>
                            Registra tu empresa y empieza a publicar caballos de polo en nuestra plataforma
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Datos de la Empresa */}
                            <div>
                                <h3 className="font-serif text-lg font-semibold mb-4 text-primary border-b pb-2">Datos de la Empresa</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="companyName">Nombre de la Empresa *</Label>
                                        <div className="relative">
                                            <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="companyName"
                                                type="text"
                                                placeholder="Haras del Sur S.A."
                                                value={companyName}
                                                onChange={(e) => setCompanyName(e.target.value)}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="rut">RUT / ID Fiscal *</Label>
                                        <div className="relative">
                                            <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="rut"
                                                type="text"
                                                placeholder="76.123.456-7"
                                                value={rut}
                                                onChange={(e) => setRut(e.target.value)}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="businessType">Tipo de Negocio *</Label>
                                        <Select value={businessType} onValueChange={setBusinessType}>
                                            <SelectTrigger className="h-10">
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

                            {/* Datos de Contacto */}
                            <div>
                                <h3 className="font-serif text-lg font-semibold mb-4 text-primary border-b pb-2">Datos de Contacto</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="contactName">Nombre del Representante *</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="contactName"
                                                type="text"
                                                placeholder="Juan Pérez"
                                                value={contactName}
                                                onChange={(e) => setContactName(e.target.value)}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Corporativo *</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="contacto@empresa.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Teléfono *</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder="+56 9 1234 5678"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="country">País *</Label>
                                        <Select value={country} onValueChange={setCountry}>
                                            <SelectTrigger className="h-10">
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
                                        <Label htmlFor="city">Ciudad</Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="city"
                                                type="text"
                                                placeholder="Santiago"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Seguridad */}
                            <div>
                                <h3 className="font-serif text-lg font-semibold mb-4 text-primary border-b pb-2">Seguridad</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Contraseña *</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="pl-10"
                                                required
                                                minLength={6}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="confirmPassword"
                                                type="password"
                                                placeholder="••••••••"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="pl-10"
                                                required
                                                minLength={6}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                                <p>Al crear una cuenta de empresa, aceptas nuestros términos de servicio y confirmas que los datos proporcionados son verídicos. Tu cuenta será verificada por nuestro equipo en un plazo de 24-48 horas.</p>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-secondary hover:bg-secondary/90 text-white text-lg h-12"
                                disabled={registerMutation.isPending}
                            >
                                {registerMutation.isPending ? "Creando cuenta..." : "Crear Cuenta de Empresa"}
                            </Button>

                            <div className="text-center text-sm text-muted-foreground space-y-1">
                                <p>
                                    ¿Ya tienes cuenta?{" "}
                                    <Link href="/login">
                                        <a className="text-primary hover:underline font-medium">Inicia sesión</a>
                                    </Link>
                                </p>
                                <p>
                                    ¿Buscas una cuenta personal?{" "}
                                    <Link href="/register">
                                        <a className="text-primary hover:underline font-medium">Regístrate aquí</a>
                                    </Link>
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
