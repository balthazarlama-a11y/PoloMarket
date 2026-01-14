import { Navbar, Footer } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, CheckCircle, AlertCircle, ArrowRight, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

export default function Verification() {
  const [, setLocation] = useLocation();

  const handleContinue = () => {
    // Functional simulation
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
           <h1 className="font-serif text-5xl font-bold text-primary mb-6">Verificación de Elite</h1>
           <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
             Para mantener la exclusividad de nuestra red, validamos manualmente a cada miembro.
             Su privacidad es nuestra prioridad absoluta.
           </p>
        </motion.div>
        
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-14 mb-10 bg-white/50 backdrop-blur border p-1 rounded-full">
            <TabsTrigger value="personal" className="font-bold text-sm uppercase tracking-widest rounded-full data-[state=active]:bg-primary data-[state=active]:text-white transition-all">1. Perfil Profesional</TabsTrigger>
            <TabsTrigger value="documents" className="font-bold text-sm uppercase tracking-widest rounded-full data-[state=active]:bg-primary data-[state=active]:text-white transition-all">2. Documentación</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <Card className="border-none shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-primary p-8 text-white">
                <CardTitle className="text-2xl font-serif">Información del Polista</CardTitle>
                <CardDescription className="text-white/70">Complete los datos para iniciar su validación en el ecosistema.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-8 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Nombre Completo</Label>
                    <Input id="name" placeholder="Ej. Adolfo" className="h-12 border-primary/10 bg-muted/30 focus-visible:ring-secondary/30" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="lastname" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Apellido</Label>
                    <Input id="lastname" placeholder="Ej. Cambiaso" className="h-12 border-primary/10 bg-muted/30 focus-visible:ring-secondary/30" />
                  </div>
                </div>
                
                <div className="space-y-3">
                   <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Correo Electrónico Corporativo / Personal</Label>
                   <Input id="email" type="email" placeholder="ejemplo@organizacion.com" className="h-12 border-primary/10 bg-muted/30 focus-visible:ring-secondary/30" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                     <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">WhatsApp de Contacto</Label>
                     <Input id="phone" placeholder="+54 9 11 1234 5678" className="h-12 border-primary/10 bg-muted/30 focus-visible:ring-secondary/30" />
                  </div>
                  <div className="space-y-3">
                     <Label htmlFor="role" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Especialidad</Label>
                     <select className="flex h-12 w-full rounded-md border border-primary/10 bg-muted/30 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30 font-medium">
                       <option>Jugador Profesional (Handicap 5+)</option>
                       <option>Criador / Haras</option>
                       <option>Organización de Polo</option>
                       <option>Manager / Petisero</option>
                       <option>Jugador Amateur</option>
                     </select>
                  </div>
                </div>

                <div className="bg-secondary/5 border border-secondary/20 p-6 rounded-2xl flex gap-4 items-start">
                   <AlertCircle className="w-6 h-6 text-secondary mt-0.5 shrink-0" />
                   <p className="text-sm text-secondary-foreground font-medium leading-relaxed">
                     Sus datos son encriptados. La validación manual puede demorar hasta 24 horas hábiles para asegurar la integridad de la plataforma.
                   </p>
                </div>
                
                <Button 
                  className="w-full h-14 bg-primary text-white hover:bg-primary/90 text-lg font-serif group rounded-xl shadow-xl hover:shadow-2xl transition-all"
                  onClick={handleContinue}
                >
                  Confirmar y Continuar 
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
             <Card className="border-none shadow-2xl rounded-3xl overflow-hidden">
               <CardHeader className="bg-primary p-8 text-white">
                 <CardTitle className="text-2xl font-serif">Carga de Documentación</CardTitle>
                 <CardDescription className="text-white/70">Requerimos una prueba de identidad para habilitar su marketplace.</CardDescription>
               </CardHeader>
               <CardContent className="p-12 text-center bg-white">
                 <div className="border-2 border-dashed border-primary/10 rounded-3xl p-16 hover:border-secondary transition-colors cursor-pointer group">
                   <div className="inline-flex items-center justify-center p-6 rounded-full bg-muted group-hover:bg-secondary/10 transition-colors mb-6">
                     <Upload className="w-12 h-12 text-primary group-hover:text-secondary transition-colors" />
                   </div>
                   <h3 className="text-xl font-bold mb-2">Cargar Identificación (RUT/DNI)</h3>
                   <p className="text-muted-foreground max-w-xs mx-auto text-sm">Arrastre su documento o haga clic para seleccionar un archivo (JPG, PNG o PDF).</p>
                 </div>
                 <Button className="mt-8 w-full h-12 bg-primary/10 text-primary hover:bg-primary/20" onClick={handleContinue}>
                   Omitir por ahora
                 </Button>
               </CardContent>
             </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
           <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center text-center p-8 bg-white rounded-3xl border border-primary/5 shadow-sm">
             <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
               <CheckCircle className="w-6 h-6 text-green-600" />
             </div>
             <h4 className="font-bold text-primary mb-2">Validación Oficial</h4>
             <p className="text-xs text-muted-foreground leading-relaxed">Cruce de datos con servicios nacionales de identidad.</p>
           </motion.div>
           <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center text-center p-8 bg-white rounded-3xl border border-primary/5 shadow-sm">
             <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
               <CheckCircle className="w-6 h-6 text-green-600" />
             </div>
             <h4 className="font-bold text-primary mb-2">Red Exclusiva</h4>
             <p className="text-xs text-muted-foreground leading-relaxed">Acceso reservado a profesionales y criadores verificados.</p>
           </motion.div>
           <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center text-center p-8 bg-white rounded-3xl border border-primary/5 shadow-sm">
             <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
               <CheckCircle className="w-6 h-6 text-green-600" />
             </div>
             <h4 className="font-bold text-primary mb-2">Cero Spam</h4>
             <p className="text-xs text-muted-foreground leading-relaxed">Protección total de sus datos de contacto.</p>
           </motion.div>
        </div>

      </main>
      <Footer />
    </div>
  );
}