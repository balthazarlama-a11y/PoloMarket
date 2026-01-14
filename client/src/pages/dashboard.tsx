import { Navbar, Footer } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Settings, CreditCard, Rabbit, Eye, Edit, Trash2, User, Building2, MapPin, Mail, Phone, Calendar } from "lucide-react";
import { useState } from "react";
import horse1 from "@assets/generated_images/portrait_of_a_thoroughbred_polo_pony.png";

export default function Dashboard() {
  const [profileType, setProfileType] = useState<"personal" | "criador">("personal");

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Navbar />
      
      <main className="container py-12 px-4 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
             <h1 className="font-serif text-4xl font-bold text-primary mb-2">Mi Panel</h1>
             <div className="flex items-center gap-3">
               <span className="text-muted-foreground font-medium">Juan Pérez</span>
               <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${profileType === 'criador' ? 'bg-secondary text-white' : 'bg-primary/10 text-primary'}`}>
                 {profileType === 'criador' ? 'Perfil Criador' : 'Perfil Personal'}
               </span>
             </div>
          </div>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="border-primary/10 hover:border-primary transition-colors"
              onClick={() => setProfileType(profileType === 'personal' ? 'criador' : 'personal')}
            >
              Cambiar a {profileType === 'personal' ? 'Criador' : 'Personal'}
            </Button>
            <Button className="bg-secondary text-white hover:bg-secondary/90 gap-2 shadow-lg px-6">
              <Plus className="w-4 h-4" /> Nueva Publicación
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-6">
             <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
               <div className="h-24 bg-primary relative">
                 <div className="absolute -bottom-10 left-6">
                   <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-lg">
                     <div className="w-full h-full rounded-xl bg-muted flex items-center justify-center text-primary">
                       {profileType === 'criador' ? <Building2 className="w-10 h-10" /> : <User className="w-10 h-10" />}
                     </div>
                   </div>
                 </div>
               </div>
               <CardContent className="pt-14 pb-8 space-y-6">
                 <div>
                   <h3 className="font-serif text-xl font-bold text-primary">
                     {profileType === 'criador' ? 'Haras La Victoria' : 'Juan Pérez'}
                   </h3>
                   <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mt-1">
                     {profileType === 'criador' ? 'Organización de Polo' : 'Jugador Amateur'}
                   </p>
                 </div>
                 
                 <div className="space-y-3 text-sm">
                   <div className="flex items-center gap-3 text-muted-foreground">
                     <MapPin className="w-4 h-4" /> <span>Buenos Aires, AR</span>
                   </div>
                   <div className="flex items-center gap-3 text-muted-foreground">
                     <Mail className="w-4 h-4" /> <span>juan@ejemplo.com</span>
                   </div>
                   <div className="flex items-center gap-3 text-muted-foreground">
                     <Phone className="w-4 h-4" /> <span>+54 9 11 5555-0123</span>
                   </div>
                 </div>

                 <Button variant="outline" className="w-full rounded-xl border-primary/5 bg-muted/30 hover:bg-primary hover:text-white transition-all">
                   <Settings className="w-4 h-4 mr-2" /> Editar Perfil
                 </Button>
               </CardContent>
             </Card>

             <div className="grid grid-cols-2 gap-4">
                <Card className="border-none shadow-lg rounded-2xl bg-white">
                  <CardContent className="p-4 text-center">
                    <Eye className="w-5 h-5 mx-auto mb-2 text-secondary" />
                    <div className="text-xl font-bold">1.2k</div>
                    <div className="text-[10px] uppercase font-bold text-muted-foreground">Visitas</div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-lg rounded-2xl bg-white">
                  <CardContent className="p-4 text-center">
                    <Rabbit className="w-5 h-5 mx-auto mb-2 text-secondary" />
                    <div className="text-xl font-bold">4</div>
                    <div className="text-[10px] uppercase font-bold text-muted-foreground">Activos</div>
                  </CardContent>
                </Card>
             </div>
          </div>
          
          {/* Main Content Area */}
          <div className="lg:col-span-3">
             <Tabs defaultValue="listings" className="space-y-8">
               <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-8">
                 <TabsTrigger value="listings" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none px-0 py-4 font-bold uppercase tracking-widest text-xs transition-all">
                   Mis Publicaciones
                 </TabsTrigger>
                 {profileType === 'criador' && (
                   <TabsTrigger value="stats" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none px-0 py-4 font-bold uppercase tracking-widest text-xs transition-all">
                     Estadísticas de Venta
                   </TabsTrigger>
                 )}
                 <TabsTrigger value="payments" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none px-0 py-4 font-bold uppercase tracking-widest text-xs transition-all">
                   Pagos y Facturas
                 </TabsTrigger>
               </TabsList>
               
               <TabsContent value="listings" className="space-y-6">
                 {/* Listing Item */}
                 {[1, 2, 3, 4].map((i) => (
                   <Card key={i} className="border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group bg-white">
                     <CardContent className="p-0 flex flex-col sm:flex-row">
                       <div className="w-full sm:w-48 h-32 relative overflow-hidden">
                         <img src={horse1} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                         <div className="absolute top-2 left-2">
                           <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter shadow-sm">
                             {i % 2 === 0 ? 'Venta' : 'Arriendo'}
                           </span>
                         </div>
                       </div>
                       <div className="flex-1 p-6 flex flex-col justify-between">
                         <div className="flex justify-between items-start">
                           <div>
                             <h3 className="font-serif font-bold text-xl text-primary mb-1">La Dolfina Clon {i}</h3>
                             <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                               <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> 12 Ene 2026</span>
                               <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> 342 vistas</span>
                             </div>
                           </div>
                           <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-green-50 text-green-700 border border-green-100">
                             Activo
                           </span>
                         </div>
                         <div className="mt-6 flex justify-end gap-3">
                           <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg border-primary/5 bg-muted/30 hover:bg-primary hover:text-white transition-all text-xs font-bold uppercase tracking-widest">
                             <Edit className="w-3.5 h-3.5 mr-2" /> Editar
                           </Button>
                           <Button variant="ghost" size="sm" className="h-9 px-4 rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10 text-xs font-bold uppercase tracking-widest">
                             <Trash2 className="w-3.5 h-3.5 mr-2" /> Eliminar
                           </Button>
                         </div>
                       </div>
                     </CardContent>
                   </Card>
                 ))}
               </TabsContent>

               <TabsContent value="stats">
                 <Card className="border-none shadow-xl rounded-3xl bg-white p-8">
                   <div className="text-center py-12">
                     <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                       <CreditCard className="w-8 h-8 text-secondary" />
                     </div>
                     <h3 className="text-xl font-bold text-primary mb-2">Panel de Criador Premium</h3>
                     <p className="text-muted-foreground max-w-sm mx-auto">Aquí podrás ver reportes detallados de tus ventas, leads recibidos y rendimiento de tus publicaciones destacadas.</p>
                   </div>
                 </Card>
               </TabsContent>

               <TabsContent value="payments">
                 <Card className="border-none shadow-xl rounded-3xl bg-white">
                    <CardContent className="py-16 text-center text-muted-foreground">
                      <CreditCard className="w-16 h-16 mx-auto mb-6 opacity-10" />
                      <p className="font-medium">No se han encontrado transacciones recientes.</p>
                      <Button variant="link" className="text-secondary mt-2">Ver historial completo</Button>
                    </CardContent>
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