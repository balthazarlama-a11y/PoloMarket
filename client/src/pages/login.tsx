import { Navbar, Footer } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Mail, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useQueryClient } from "@tanstack/react-query";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      try {
        const res = await apiRequest("POST", "/api/auth/login", data);
        const json = await res.json();
        return json;
      } catch (err: any) {
        try {
          const text = err.message?.split(": ")[1] || err.message;
          const parsed = typeof text === "string" && text.startsWith("{") ? JSON.parse(text) : { message: text };
          throw new Error(parsed.message || "Error al iniciar sesión");
        } catch {
          throw new Error("Email o contraseña incorrectos");
        }
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/auth/me"], data);
      setLocation("/dashboard");
    },
    onError: (err: any) => {
      setError(err.message || "Error al iniciar sesión");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate({ email, password });
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
              Bienvenido de vuelta
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Accede a tu panel, gestiona tus caballos y conecta con la comunidad de polo más exclusiva.
            </p>
            <div className="flex justify-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary font-serif">500+</div>
                <div className="text-xs text-white/40 uppercase tracking-wider mt-1">Caballos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary font-serif">12</div>
                <div className="text-xs text-white/40 uppercase tracking-wider mt-1">Países</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary font-serif">98%</div>
                <div className="text-xs text-white/40 uppercase tracking-wider mt-1">Satisfacción</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex-1 flex items-center justify-center py-12 px-4 lg:px-12">
          <div className="w-full max-w-md animate-fade-in-up">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                <LogIn className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">Iniciar Sesión</h1>
              <p className="text-muted-foreground">
                Ingresa a tu cuenta para gestionar tus publicaciones
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm border border-destructive/20 animate-fade-in">
                  {error}
                </div>
              )}

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

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium">Contraseña</Label>
                  <a href="#" className="text-xs text-secondary hover:underline font-medium">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
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
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-13 bg-primary hover:bg-primary/90 text-white rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Iniciando sesión..." : (
                  <>Iniciar Sesión <ArrowRight className="w-4 h-4" /></>
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
                  ¿No tienes cuenta?{" "}
                  <Link href="/register">
                    <a className="text-secondary hover:underline font-semibold">Regístrate aquí</a>
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