import { Navbar, Footer } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, CheckCircle, AlertCircle, ArrowRight, Upload, User, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { useState } from "react";

export default function Verification() {
  const [, setLocation] = useLocation();
  const [accountType, setAccountType] = useState<"personal" | "organizacion">("personal");

  const handleContinue = () => {
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Navbar />
      
      <main className="flex-1 py-20 container px-4 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
           <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/5 mb-6 border border-primary/10">
             <Shield className="w-10 h-10 text-primary" />
           </div>
           <h1 className="font-serif text-5xl font-bold text-primary mb-6">Registro de Miembro</h1>
           <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
             Seleccione el tipo de cuenta y complete la información requerida para unirse a la red de polo más exclusiva.
           </p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-12">
          <Button 
            variant={accountType === "personal" ? "default" : "outline"}
            className={`h-24 w-48 rounded-2xl flex flex-col gap-2 transition-all ${accountType === "personal" ? "shadow-xl scale-105" : "bg-white"}`}
            onClick={() => setAccountType("personal")}
          >
            <User className="w-6 h-6" />
            <span className="font-bold uppercase tracking-widest text-[10px]">Cuenta Personal</span>
          </Button>
          <Button 
            variant={accountType === "organizacion" ? "default" : "outline"}
            className={`h-24 w-48 rounded-2xl flex flex-col gap-2 transition-all ${accountType === "organizacion" ? "shadow-xl scale-105" : "bg-white"}`}
            onClick={() => setAccountType("organizacion")}
          >
            <Building2 className="w-6 h-6" />
            <span className="font-bold uppercase tracking-widest text-[10px]">Organización / Haras</span>
          </Button>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={accountType}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Tabs defaultValue="form" className="w-full">
              <Card className="border-none shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-primary p-8 text-white">
                  <CardTitle className="text-2xl font-serif">
                    {accountType === "personal" ? "Información Personal" : "Información de la Organización"}
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    {accountType === "personal" 
                      ? "Datos del jugador o profesional independiente." 
                      : "Datos legales y comerciales de la organización o haras."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8 bg-white">
                  {accountType === "personal" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Nombre</Label>
                        <Input placeholder="Ej. Adolfo" className="h-12 border-primary/10 bg-muted/30" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Apellido</Label>
                        <Input placeholder="Ej. Cambiaso" className="h-12 border-primary/10 bg-muted/30" />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Nombre de la Organización / Haras</Label>
                        <Input placeholder="Ej. Haras La Victoria" className="h-12 border-primary/10 bg-muted/30" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">RUT Empresa / Tax ID</Label>
                          <Input placeholder="76.123.456-7" className="h-12 border-primary/10 bg-muted/30" />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Sitio Web</Label>
                          <Input placeholder="www.organización.com" className="h-12 border-primary/10 bg-muted/30" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                       <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Correo Electrónico</Label>
                       <Input type="email" placeholder="contacto@ejemplo.com" className="h-12 border-primary/10 bg-muted/30" />
                    </div>
                    <div className="space-y-3">
                       <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">WhatsApp / Teléfono</Label>
                       <Input placeholder="+54 9 11 1234 5678" className="h-12 border-primary/10 bg-muted/30" />
                    </div>
                  </div>

                  <div className="bg-secondary/5 border border-secondary/20 p-6 rounded-2xl flex gap-4 items-start">
                     <AlertCircle className="w-6 h-6 text-secondary mt-0.5 shrink-0" />
                     <p className="text-sm text-secondary-foreground font-medium">
                       La validación de cuentas de {accountType === "organizacion" ? "organización" : "personas"} requiere la carga posterior de documentos oficiales.
                     </p>
                  </div>
                  
                  <Button 
                    className="w-full h-14 bg-primary text-white hover:bg-primary/90 text-lg font-serif group rounded-xl shadow-xl transition-all"
                    onClick={handleContinue}
                  >
                    Confirmar Registro
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Tabs>
          </motion.div>
        </AnimatePresence>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
           {[
             { title: "Seguridad Total", desc: "Encriptación de grado militar para sus datos." },
             { title: "Validación Humana", desc: "Verificamos cada registro manualmente." },
             { title: "Red Premium", desc: "Solo acceso para la elite del polo mundial." }
           ].map((item, i) => (
             <motion.div key={i} whileHover={{ y: -5 }} className="flex flex-col items-center text-center p-8 bg-white rounded-3xl border border-primary/5 shadow-sm">
               <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
                 <CheckCircle className="w-6 h-6 text-green-600" />
               </div>
               <h4 className="font-bold text-primary mb-2">{item.title}</h4>
               <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
             </motion.div>
           ))}
        </div>

      </main>
      <Footer />
    </div>
  );
}