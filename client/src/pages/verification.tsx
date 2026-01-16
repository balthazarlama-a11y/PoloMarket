import { Navbar, Footer } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, CheckCircle, User, AlertCircle } from "lucide-react";

export default function Verification() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />
      
      <main className="flex-1 py-12 container px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
           <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-4">
             <Shield className="w-8 h-8 text-primary" />
           </div>
           <h1 className="font-serif text-4xl font-bold text-primary mb-4">Verificación de Identidad</h1>
           <p className="text-muted-foreground max-w-lg mx-auto">
             Para mantener la seguridad y prestigio de PoloMarket, todos los vendedores deben verificar su identidad.
             Este proceso es rápido y seguro.
           </p>
        </div>
        
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12 mb-8">
            <TabsTrigger value="personal" className="font-serif text-base">Información Personal</TabsTrigger>
            <TabsTrigger value="documents" className="font-serif text-base">Documentación</TabsTrigger>
          </TabsList>
          
          <Card>
            <CardHeader>
              <CardTitle>Completa tu perfil</CardTitle>
              <CardDescription>Esta información será validada por nuestro equipo de seguridad.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" placeholder="Juan" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname">Apellido</Label>
                  <Input id="lastname" placeholder="Pérez" />
                </div>
              </div>
              
              <div className="space-y-2">
                 <Label htmlFor="email">Correo Electrónico</Label>
                 <Input id="email" type="email" placeholder="juan@ejemplo.com" />
              </div>
              
              <div className="space-y-2">
                 <Label htmlFor="phone">Teléfono / WhatsApp</Label>
                 <Input id="phone" placeholder="+56 9 1234 5678" />
              </div>
              
               <div className="space-y-2">
                 <Label htmlFor="role">Rol en el Polo</Label>
                 <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                   <option>Jugador Amateur</option>
                   <option>Jugador Profesional</option>
                   <option>Criador</option>
                   <option>Petisero / Manager</option>
                 </select>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg flex gap-3 items-start">
                 <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                 <p className="text-sm text-blue-800">
                   Tu información está protegida. Solo compartiremos tus datos de contacto con usuarios verificados que muestren interés real en tus caballos.
                 </p>
              </div>
              
              <Button className="w-full bg-primary text-white hover:bg-primary/90">
                Guardar y Continuar
              </Button>
            </CardContent>
          </Card>
        </Tabs>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="flex gap-4 items-start p-4 bg-white rounded-lg border">
             <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
             <div>
               <h4 className="font-bold text-sm">Validación RUT/DNI</h4>
               <p className="text-xs text-muted-foreground mt-1">Integramos servicios oficiales para validar documentos de identidad.</p>
             </div>
           </div>
           <div className="flex gap-4 items-start p-4 bg-white rounded-lg border">
             <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
             <div>
               <h4 className="font-bold text-sm">Historial Limpio</h4>
               <p className="text-xs text-muted-foreground mt-1">Verificamos antecedentes en la comunidad de polo.</p>
             </div>
           </div>
           <div className="flex gap-4 items-start p-4 bg-white rounded-lg border">
             <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
             <div>
               <h4 className="font-bold text-sm">Pagos Seguros</h4>
               <p className="text-xs text-muted-foreground mt-1">Tus transacciones están protegidas por pasarelas certificadas.</p>
             </div>
           </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}