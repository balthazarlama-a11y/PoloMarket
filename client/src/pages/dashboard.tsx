import { Navbar, Footer } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Plus, Settings, CreditCard, Rabbit, Eye, Edit, Trash2, User, Building2, MapPin, Mail, Phone, Calendar, LogOut, Info, Dna } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import horse1 from "@assets/generated_images/portrait_of_a_thoroughbred_polo_pony.png";

export default function Dashboard() {
  const [profileType, setProfileType] = useState<"personal" | "organizacion">("personal");
  const [isPublishing, setIsPublishing] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Navbar />
      
      <main className="container py-12 px-4 flex-1">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <h1 className="font-serif text-4xl font-bold text-primary mb-2 tracking-tight">Centro de Gestión</h1>
             <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 px-3 py-1 bg-white border border-primary/10 rounded-full shadow-sm">
                 <div className={`w-2 h-2 rounded-full ${profileType === 'organizacion' ? 'bg-secondary animate-pulse' : 'bg-primary'}`} />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
                   Sesión Actual: {profileType === 'organizacion' ? 'Haras La Victoria' : 'Juan Pérez'}
                 </span>
               </div>
             </div>
          </motion.div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="h-12 border-primary/10 hover:border-primary transition-all rounded-xl font-bold text-xs uppercase tracking-widest bg-white"
              onClick={() => setProfileType(profileType === 'personal' ? 'organizacion' : 'personal')}
            >
              {profileType === 'personal' ? <Building2 className="w-4 h-4 mr-2" /> : <User className="w-4 h-4 mr-2" />}
              Cambiar a {profileType === 'personal' ? 'Organización' : 'Personal'}
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="h-12 bg-secondary text-white hover:bg-secondary/90 gap-2 shadow-xl px-8 rounded-xl font-bold text-xs uppercase tracking-widest">
                  <Plus className="w-4 h-4" /> Nueva Publicación
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] border-none shadow-2xl p-0">
                <DialogHeader className="bg-primary p-8 text-white">
                  <DialogTitle className="text-3xl font-serif">Publicar Caballo</DialogTitle>
                  <DialogDescription className="text-white/70">Complete la ficha técnica y genealogía del ejemplar.</DialogDescription>
                </DialogHeader>
                <div className="p-8 space-y-8 bg-white">
                  <section className="space-y-6">
                    <div className="flex items-center gap-2 text-primary">
                      <Info className="w-5 h-5" />
                      <h3 className="font-bold uppercase tracking-widest text-xs">Datos Generales</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Nombre del Caballo</Label>
                        <Input placeholder="Ej. La Dolfina Cuartetera" className="h-11 border-primary/5 bg-muted/30 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Tipo de Publicación</Label>
                        <select className="w-full h-11 border-primary/5 bg-muted/30 rounded-xl px-3 text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all">
                          <option>Venta Directa</option>
                          <option>Arriendo / Temporada</option>
                          <option>Subasta</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Edad</Label>
                        <Input type="number" placeholder="Ej. 6" className="h-11 border-primary/5 bg-muted/30 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Sexo</Label>
                        <select className="w-full h-11 border-primary/5 bg-muted/30 rounded-xl px-3 text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all">
                          <option>Yegua</option>
                          <option>Padrillo</option>
                          <option>Caballo (Castrado)</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Descripción y Logros</Label>
                      <Textarea placeholder="Describa el temperamento, nivel de juego y premios obtenidos..." className="min-h-[100px] border-primary/5 bg-muted/30 rounded-xl" />
                    </div>
                  </section>

                  <section className="space-y-6 pt-6 border-t border-primary/5">
                    <div className="flex items-center gap-2 text-secondary">
                      <Dna className="w-5 h-5" />
                      <h3 className="font-bold uppercase tracking-widest text-xs">Genealogía (Pedigree)</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Padre (Semental)</Label>
                        <Input placeholder="Nombre del padre" className="h-11 border-primary/5 bg-muted/30 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Madre (Yegua)</Label>
                        <Input placeholder="Nombre de la madre" className="h-11 border-primary/5 bg-muted/30 rounded-xl" />
                      </div>
                    </div>
                    <div className="bg-secondary/5 p-4 rounded-xl border border-secondary/10">
                      <p className="text-[10px] font-medium text-secondary-foreground leading-relaxed">
                        * La información genealógica es vital para compradores premium. Asegúrese de que los nombres coincidan con los registros oficiales.
                      </p>
                    </div>
                  </section>

                  <div className="flex gap-4 pt-4">
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1 h-12 rounded-xl font-bold text-[10px] uppercase tracking-widest border-primary/10">Cancelar</Button>
                    </DialogTrigger>
                    <Button 
                      className="flex-[2] h-12 bg-primary text-white hover:bg-primary/90 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-xl"
                      onClick={() => setIsPublishing(true)}
                    >
                      {isPublishing ? "Procesando..." : "Publicar Ahora"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={profileType}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                  <div className={`h-32 relative transition-colors duration-500 ${profileType === 'organizacion' ? 'bg-secondary' : 'bg-primary'}`}>
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                      <div className="w-24 h-24 rounded-3xl bg-white p-1 shadow-2xl">
                        <div className="w-full h-full rounded-[1.25rem] bg-muted flex items-center justify-center text-primary border border-primary/5">
                          {profileType === 'organizacion' ? <Building2 className="w-12 h-12" /> : <User className="w-12 h-12" />}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="pt-16 pb-10 px-8 text-center space-y-8">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-primary mb-1">
                        {profileType === 'organizacion' ? 'Haras La Victoria' : 'Juan Pérez'}
                      </h3>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">
                        {profileType === 'organizacion' ? 'Organización / Haras' : 'Perfil Individual'}
                      </p>
                    </div>
                    
                    <div className="space-y-4 text-sm font-medium border-y border-primary/5 py-8">
                      <div className="flex items-center gap-4 text-primary/70">
                        <MapPin className="w-4 h-4 text-secondary" /> <span>Buenos Aires, AR</span>
                      </div>
                      <div className="flex items-center gap-4 text-primary/70">
                        <Mail className="w-4 h-4 text-secondary" /> <span className="truncate">contacto@lavictoria.com</span>
                      </div>
                      <div className="flex items-center gap-4 text-primary/70">
                        <Phone className="w-4 h-4 text-secondary" /> <span>+54 9 11 5555-0123</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button variant="outline" className="w-full h-11 rounded-xl border-primary/10 hover:border-primary font-bold text-[10px] uppercase tracking-widest transition-all">
                        <Settings className="w-3.5 h-3.5 mr-2" /> Ajustes
                      </Button>
                      <Button variant="ghost" className="w-full h-11 rounded-xl text-destructive hover:bg-destructive/5 font-bold text-[10px] uppercase tracking-widest">
                        <LogOut className="w-3.5 h-3.5 mr-2" /> Cerrar Sesión
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-4">
               {[
                 { icon: Eye, label: "Vistas", val: "2.4k" },
                 { icon: Rabbit, label: "Ventas", val: "12" }
               ].map((stat, i) => (
                 <Card key={i} className="border-none shadow-xl rounded-3xl bg-white hover:bg-primary hover:text-white transition-all group cursor-default">
                   <CardContent className="p-6 text-center">
                     <stat.icon className="w-5 h-5 mx-auto mb-3 text-secondary group-hover:text-white transition-colors" />
                     <div className="text-2xl font-black mb-1">{stat.val}</div>
                     <div className="text-[9px] uppercase font-black tracking-widest opacity-40 group-hover:opacity-100">{stat.label}</div>
                   </CardContent>
                 </Card>
               ))}
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="lg:col-span-3">
             <Tabs defaultValue="listings" className="space-y-10">
               <TabsList className="w-full justify-start border-b border-primary/5 rounded-none h-auto p-0 bg-transparent gap-12">
                 {[
                   { id: "listings", label: "Gestión de Caballos" },
                   { id: "stats", label: "Rendimiento", condition: profileType === 'organizacion' },
                   { id: "payments", label: "Finanzas" }
                 ].filter(t => t.condition !== false).map((tab) => (
                   <TabsTrigger 
                    key={tab.id}
                    value={tab.id} 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:text-primary data-[state=active]:shadow-none px-0 py-5 font-bold uppercase tracking-[0.15em] text-[10px] transition-all"
                   >
                     {tab.label}
                   </TabsTrigger>
                 ))}
               </TabsList>
               
               <TabsContent value="listings" className="space-y-6 animate-in fade-in duration-500">
                 {/* Listing Item */}
                 {[1, 2, 3, 4].map((i) => (
                   <Card key={i} className="border-none shadow-lg hover:shadow-2xl transition-all duration-500 rounded-[2rem] overflow-hidden group bg-white">
                     <CardContent className="p-0 flex flex-col sm:flex-row">
                       <div className="w-full sm:w-64 h-48 relative overflow-hidden">
                         <img src={horse1} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                         <div className="absolute top-4 left-4">
                           <span className="bg-primary/90 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                             {i % 2 === 0 ? 'Venta' : 'Arriendo'}
                           </span>
                         </div>
                       </div>
                       <div className="flex-1 p-8 flex flex-col justify-between">
                         <div>
                           <div className="flex justify-between items-start mb-4">
                             <h3 className="font-serif font-bold text-2xl text-primary leading-none group-hover:text-secondary transition-colors">La Dolfina Clon {i}</h3>
                             <div className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-green-50 text-green-700 border border-green-100">
                               Activo
                             </div>
                           </div>
                           <div className="flex items-center gap-6 text-[10px] text-primary/40 font-bold uppercase tracking-[0.1em]">
                             <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Publicado: 12 Ene</span>
                             <span className="flex items-center gap-2"><Eye className="w-4 h-4" /> 1,245 Vistas</span>
                           </div>
                         </div>
                         <div className="flex justify-end gap-3 pt-8 mt-4 border-t border-primary/5">
                           <Button variant="outline" size="sm" className="h-11 px-6 rounded-xl border-primary/5 bg-muted/30 hover:bg-primary hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
                             <Edit className="w-4 h-4 mr-2" /> Editar Ficha
                           </Button>
                           <Button variant="ghost" size="sm" className="h-11 px-6 rounded-xl text-destructive hover:bg-destructive/5 text-[10px] font-black uppercase tracking-widest">
                             <Trash2 className="w-4 h-4 mr-2" /> Eliminar
                           </Button>
                         </div>
                       </div>
                     </CardContent>
                   </Card>
                 ))}
               </TabsContent>

               <TabsContent value="stats">
                  <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-16 text-center">
                    <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-8">
                      <CreditCard className="w-10 h-10 text-secondary" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-primary mb-4">Métricas de Venta Premium</h2>
                    <p className="text-muted-foreground max-w-md mx-auto mb-10 text-lg leading-relaxed">Analice el rendimiento de su haras con datos en tiempo real sobre interés de compradores y leads generados.</p>
                    <Button className="h-14 px-10 rounded-2xl bg-primary text-white font-bold text-xs uppercase tracking-[0.2em] shadow-xl">Solicitar Reporte Pro</Button>
                  </Card>
               </TabsContent>

               <TabsContent value="payments">
                 <Card className="border-none shadow-2xl rounded-[3rem] bg-white p-20 text-center">
                    <CreditCard className="w-20 h-20 mx-auto mb-8 opacity-5 text-primary" />
                    <p className="font-serif text-2xl font-bold text-primary/40 italic">Su historial financiero aparecerá aquí.</p>
                 </Card>
               </TabsContent>

             </Tabs>
          </div>
          
        </div>
      </main>
      <Footer />
    </div>
  );
}