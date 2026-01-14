import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Settings, CreditCard, Rabbit, Eye, Edit, Trash2 } from "lucide-react";
import horse1 from "@assets/generated_images/portrait_of_a_thoroughbred_polo_pony.png";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="container py-8 px-4 flex-1">
        <div className="flex justify-between items-center mb-8">
          <div>
             <h1 className="font-serif text-3xl font-bold text-primary">Panel de Control</h1>
             <p className="text-muted-foreground">Bienvenido, Juan Pérez</p>
          </div>
          <Button className="bg-secondary text-white hover:bg-secondary/90 gap-2">
            <Plus className="w-4 h-4" /> Nueva Publicación
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Stats */}
          <div className="space-y-4 lg:col-span-1">
             <Card>
               <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-medium text-muted-foreground">Publicaciones Activas</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="text-3xl font-bold">4</div>
               </CardContent>
             </Card>
             <Card>
               <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-medium text-muted-foreground">Visitas Totales</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="text-3xl font-bold">1,204</div>
               </CardContent>
             </Card>
              <Card className="bg-primary text-white">
               <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-medium text-white/80">Plan Actual</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="text-2xl font-bold font-serif mb-2">Criador Pro</div>
                 <Button size="sm" variant="secondary" className="w-full text-xs">Administrar Membresía</Button>
               </CardContent>
             </Card>
          </div>
          
          {/* Main Dashboard Area */}
          <div className="lg:col-span-3">
             <Tabs defaultValue="listings">
               <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-6">
                 <TabsTrigger value="listings" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none px-0 py-3">Mis Caballos</TabsTrigger>
                 <TabsTrigger value="payments" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none px-0 py-3">Pagos</TabsTrigger>
                 <TabsTrigger value="profile" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none px-0 py-3">Perfil</TabsTrigger>
               </TabsList>
               
               <TabsContent value="listings" className="pt-6">
                 <div className="space-y-4">
                   {/* Listing Item */}
                   {[1, 2, 3, 4].map((i) => (
                     <div key={i} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors">
                       <img src={horse1} className="w-full sm:w-32 h-24 object-cover rounded-md" />
                       <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-start">
                           <div>
                             <h3 className="font-serif font-bold text-lg text-primary truncate">La Dolfina Clon {i}</h3>
                             <p className="text-sm text-muted-foreground">Publicado el 12 Ene 2026 • Expira en 18 días</p>
                           </div>
                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                             Activo
                           </span>
                         </div>
                         <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> 342 vistas</span>
                            <span className="flex items-center gap-1"><Rabbit className="w-4 h-4" /> Venta</span>
                         </div>
                       </div>
                       <div className="flex sm:flex-col gap-2 justify-center sm:border-l sm:pl-4">
                         <Button variant="outline" size="sm" className="flex-1"><Edit className="w-4 h-4 mr-2" /> Editar</Button>
                         <Button variant="ghost" size="sm" className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4 mr-2" /> Borrar</Button>
                       </div>
                     </div>
                   ))}
                 </div>
               </TabsContent>

               <TabsContent value="payments">
                 <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p>No tienes pagos recientes.</p>
                    </CardContent>
                 </Card>
               </TabsContent>
               
                <TabsContent value="profile">
                 <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      <Settings className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p>Configuración del perfil (En desarrollo)</p>
                    </CardContent>
                 </Card>
               </TabsContent>

             </Tabs>
          </div>
          
        </div>
      </main>
    </div>
  );
}