import { Navbar, Footer } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useQueryClient } from "@tanstack/react-query";

export default function Register() {
  const [, setLocation] = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
          throw new Error(parsed.message || "Error al registrar usuario");
        } catch {
          throw new Error("Error al registrar usuario");
        }
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/auth/me"], data);
      setLocation("/dashboard");
    },
    onError: (err: any) => {
      setError(err.message || "Error al registrar usuario");
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

    registerMutation.mutate({ name: name || undefined, email, password });
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />

      <main className="flex-1 flex">
        {/* Left Decorative Panel — Hidden on mobile */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden items-center justify-center p-12">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1598556685459-7b5610817478?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />
          <div className="relative z-10 text-center max-w-md">
            <div className="text-7xl mb-8">🏇</div>
            <h2 className="font-serif text-4xl font-bold text-white mb-6 leading-tight">
              Únete a la comunidad
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Crea tu cuenta y accede al marketplace de caballos de polo más exclusivo del mundo.
            </p>
            <div className="space-y-4 text-left bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              {[
                "Acceso a cientos de caballos verificados",
                "Publica tus propios caballos",
                "Contacta directamente con vendedores",
                "Panel de gestión profesional"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white/70">
                  <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex-1 flex items-center justify-center py-12 px-4 lg:px-12">
          <div className="w-full max-w-md animate-fade-in-up">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                <UserPlus className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">Crear Cuenta</h1>
              <p className="text-muted-foreground">
                Únete a la comunidad más exclusiva de polo
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm border border-destructive/20 animate-fade-in">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Nombre <span className="text-muted-foreground font-normal">(Opcional)</span></Label>
                <div className="relative gold-glow rounded-xl">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Juan Pérez"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-11 h-12 rounded-xl border-border/60 focus:border-secondary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <div className="relative gold-glow rounded-xl">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 h-12 rounded-xl border-border/60 focus:border-secondary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Contraseña</Label>
                  <div className="relative gold-glow rounded-xl">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-11 h-12 rounded-xl border-border/60 focus:border-secondary"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirmar</Label>
                  <div className="relative gold-glow rounded-xl">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-11 h-12 rounded-xl border-border/60 focus:border-secondary"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-13 bg-primary hover:bg-primary/90 text-white rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? "Creando cuenta..." : (
                  <>Crear Cuenta <ArrowRight className="w-4 h-4" /></>
                )}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/60" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-muted/20 px-3 text-muted-foreground">o</span>
                </div>
              </div>

              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  ¿Ya tienes cuenta?{" "}
                  <Link href="/login">
                    <a className="text-secondary hover:underline font-semibold">Inicia sesión</a>
                  </Link>
                </p>
                <p className="text-xs text-muted-foreground">
                  ¿Eres empresa?{" "}
                  <Link href="/register-business">
                    <a className="text-primary hover:underline font-medium">Cuenta empresarial</a>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}