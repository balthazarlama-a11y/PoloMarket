import { Navbar, Footer } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Settings, CreditCard, Eye, Edit, Trash2, BarChart3, LogIn, Truck, Wheat, Users, Stethoscope, Briefcase } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getQueryFn, apiRequest } from "@/lib/queryClient";
import { Link, useLocation } from "wouter";
import { useEffect } from "react";
import { ServiceCard } from "@/components/ui/service-card";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  // Get current user
  const { data: authData, isLoading: authLoading } = useQuery<any>({
    queryKey: ["/api/auth/me"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const user = authData?.user || null;

  // Get user's horses
  const { data: horsesData, isLoading: horsesLoading } = useQuery({
    queryKey: ["/api/horses", { userId: user?.id }],
    queryFn: async () => {
      if (!user?.id) return { horses: [] };
      const res = await fetch(`/api/horses?userId=${user.id}`);
      return res.json();
    },
    enabled: !!user?.id,
  });

  const horses = horsesData?.horses || [];

  // Get user's services
  const { data: userTransports } = useQuery({
    queryKey: ["/api/services/transports", { userId: user?.id }],
    queryFn: async () => {
      if (!user?.id) return { transports: [] };
      const res = await fetch(`/api/services/transports?userId=${user.id}`);
      return res.json();
    },
    enabled: !!user?.id,
  });
  const { data: userSupplies } = useQuery({
    queryKey: ["/api/services/supplies", { userId: user?.id }],
    queryFn: async () => {
      if (!user?.id) return { supplies: [] };
      const res = await fetch(`/api/services/supplies?userId=${user.id}`);
      return res.json();
    },
    enabled: !!user?.id,
  });
  const { data: userStaff } = useQuery({
    queryKey: ["/api/services/staff", { userId: user?.id }],
    queryFn: async () => {
      if (!user?.id) return { staffListings: [] };
      const res = await fetch(`/api/services/staff?userId=${user.id}`);
      return res.json();
    },
    enabled: !!user?.id,
  });
  const { data: userVets } = useQuery({
    queryKey: ["/api/services/vets", { userId: user?.id }],
    queryFn: async () => {
      if (!user?.id) return { vetClinics: [] };
      const res = await fetch(`/api/services/vets?userId=${user.id}`);
      return res.json();
    },
    enabled: !!user?.id,
  });

  const myTransports = userTransports?.transports || [];
  const mySupplies = userSupplies?.supplies || [];
  const myStaff = userStaff?.staffListings || [];
  const myVets = userVets?.vetClinics || [];
  const totalServices = myTransports.length + mySupplies.length + myStaff.length + myVets.length;

  // Delete horse mutation
  const deleteMutation = useMutation({
    mutationFn: async (horseId: string) => {
      const res = await apiRequest("DELETE", `/api/horses/${horseId}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/horses"] });
    },
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/login");
    }
  }, [authLoading, user, setLocation]);

  const getInitials = (name?: string, email?: string) => {
    if (name) return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    if (email) return email[0].toUpperCase();
    return "U";
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <div className="text-4xl mb-4">🏇</div>
            <p className="text-muted-foreground">Cargando panel...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const totalViews = horses.reduce((acc: number, h: any) => acc + (h.views || 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />

      <main className="container py-8 px-4 flex-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-secondary/15 flex items-center justify-center text-lg font-bold text-secondary font-serif">
              {getInitials(user.name, user.email)}
            </div>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">Panel de Control</h1>
              <p className="text-muted-foreground text-sm">Bienvenido, {user.name || user.email}</p>
            </div>
          </div>
          <Button className="bg-secondary text-white hover:bg-secondary/90 gap-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <Plus className="w-4 h-4" /> Nueva Publicación
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Sidebar Stats */}
          <div className="space-y-4 lg:col-span-1">
            <Card className="border-border/50 premium-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Publicaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-serif text-primary">{horses.length}</div>
                <p className="text-xs text-muted-foreground mt-1">caballos activos</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 premium-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Visitas Totales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-serif text-primary">{totalViews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">en todas tus publicaciones</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-primary to-primary/90 text-white border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-white/60 uppercase tracking-wider">Plan Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold font-serif mb-1">{user.verified ? "Verificado" : "Básico"}</div>
                <p className="text-white/50 text-xs mb-3">{user.role || "Jugador"}</p>
                <Link href="/verification">
                  <Button size="sm" variant="secondary" className="w-full text-xs rounded-lg">
                    {user.verified ? "Administrar" : "Verificar Cuenta"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="listings">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-6">
                <TabsTrigger value="listings" className="rounded-none border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:text-primary data-[state=active]:shadow-none px-0 py-3 font-medium">
                  Mis Caballos
                </TabsTrigger>
                <TabsTrigger value="services" className="rounded-none border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:text-primary data-[state=active]:shadow-none px-0 py-3 font-medium">
                  Mis Servicios {totalServices > 0 && <span className="ml-1.5 text-xs bg-secondary/15 text-secondary px-1.5 py-0.5 rounded-full">{totalServices}</span>}
                </TabsTrigger>
                <TabsTrigger value="payments" className="rounded-none border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:text-primary data-[state=active]:shadow-none px-0 py-3 font-medium">
                  Pagos
                </TabsTrigger>
                <TabsTrigger value="profile" className="rounded-none border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:text-primary data-[state=active]:shadow-none px-0 py-3 font-medium">
                  Perfil
                </TabsTrigger>
              </TabsList>

              <TabsContent value="listings" className="pt-6">
                {horsesLoading ? (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground">Cargando tus caballos...</p>
                  </div>
                ) : horses.length > 0 ? (
                  <div className="space-y-4">
                    {horses.map((horse: any) => (
                      <div key={horse.id} className="flex flex-col sm:flex-row gap-4 p-5 border border-border/50 rounded-xl bg-card hover:bg-accent/5 transition-all duration-300 premium-shadow">
                        <div className="w-full sm:w-32 h-24 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                          {horse.images?.[0] ? (
                            <img src={horse.images[0]} alt={horse.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-3xl">🐴</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-serif font-bold text-lg text-primary truncate">{horse.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {horse.type} • {horse.location} • {horse.currency || "USD"} {horse.price}
                              </p>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${horse.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                              }`}>
                              {horse.status === "active" ? "Activo" : horse.status}
                            </span>
                          </div>
                          <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {horse.views || 0} vistas</span>
                          </div>
                        </div>
                        <div className="flex sm:flex-col gap-2 justify-center sm:border-l sm:pl-4 border-border/50">
                          <Button variant="outline" size="sm" className="flex-1 rounded-lg">
                            <Edit className="w-4 h-4 mr-2" /> Editar
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg"
                            onClick={() => deleteMutation.mutate(horse.id)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4 mr-2" /> Borrar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-card rounded-2xl border border-border/50">
                    <div className="text-5xl mb-4">🐴</div>
                    <h3 className="font-serif text-xl font-bold text-primary mb-2">Sin publicaciones</h3>
                    <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                      Aún no tienes caballos publicados. ¡Empieza a vender o arrendar tu primer caballo!
                    </p>
                    <Button className="bg-secondary text-white hover:bg-secondary/90 gap-2 rounded-xl">
                      <Plus className="w-4 h-4" /> Publicar mi primer caballo
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="services" className="pt-6">
                {totalServices > 0 ? (
                  <div className="space-y-6">
                    {myTransports.length > 0 && (
                      <div>
                        <h3 className="flex items-center gap-2 font-semibold text-sm text-emerald-700 mb-3"><Truck className="w-4 h-4" /> Transporte ({myTransports.length})</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {myTransports.map((t: any) => (
                            <ServiceCard key={t.id} category="transport" title={t.title} subtitle={`${t.originRegion} → ${t.destinationRegion}`} details={[...(t.truckCapacity ? [{ icon: Truck, label: "Cap", value: `${t.truckCapacity} caballos` }] : [])]} badge={t.availability} region={t.originRegion} />
                          ))}
                        </div>
                      </div>
                    )}
                    {mySupplies.length > 0 && (
                      <div>
                        <h3 className="flex items-center gap-2 font-semibold text-sm text-amber-700 mb-3"><Wheat className="w-4 h-4" /> Insumos ({mySupplies.length})</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {mySupplies.map((s: any) => (
                            <ServiceCard key={s.id} category="supply" title={s.title} subtitle={`${s.supplyType} — ${s.unitMeasure}`} details={[]} badge={s.supplyType} price={`$${Number(s.pricePerUnit).toLocaleString()} / ${s.unitMeasure}`} region={s.region} />
                          ))}
                        </div>
                      </div>
                    )}
                    {myStaff.length > 0 && (
                      <div>
                        <h3 className="flex items-center gap-2 font-semibold text-sm text-blue-700 mb-3"><Users className="w-4 h-4" /> Staff ({myStaff.length})</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {myStaff.map((s: any) => (
                            <ServiceCard key={s.id} category="staff" title={s.title} subtitle={s.staffRole} details={[...(s.experienceYears != null ? [{ icon: Briefcase, label: "Exp", value: `${s.experienceYears} años` }] : [])]} badge={s.staffRole} region={s.region} />
                          ))}
                        </div>
                      </div>
                    )}
                    {myVets.length > 0 && (
                      <div>
                        <h3 className="flex items-center gap-2 font-semibold text-sm text-rose-700 mb-3"><Stethoscope className="w-4 h-4" /> Veterinarias ({myVets.length})</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {myVets.map((v: any) => (
                            <ServiceCard key={v.id} category="vet" title={v.clinicName} subtitle={v.specialty} details={[]} badge={v.emergencyService ? "Emergencia 24h" : v.specialty} region={v.region} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-card rounded-2xl border border-border/50">
                    <div className="text-5xl mb-4">🔧</div>
                    <h3 className="font-serif text-xl font-bold text-primary mb-2">Sin servicios publicados</h3>
                    <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                      Publicá servicios de transporte, insumos, staff o veterinaria para la comunidad del polo.
                    </p>
                    <Link href="/servicios">
                      <Button className="bg-secondary text-white hover:bg-secondary/90 gap-2 rounded-xl">
                        <Plus className="w-4 h-4" /> Ver categorías de servicios
                      </Button>
                    </Link>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="payments">
                <Card className="border-border/50">
                  <CardContent className="py-16 text-center text-muted-foreground">
                    <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <h3 className="font-serif text-lg font-bold text-primary mb-2">Sin pagos recientes</h3>
                    <p className="text-sm">No tienes pagos registrados.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile">
                <Card className="border-border/50">
                  <CardContent className="py-8">
                    <div className="max-w-md mx-auto space-y-6">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-2xl bg-secondary/15 flex items-center justify-center text-2xl font-bold text-secondary font-serif mx-auto mb-4">
                          {getInitials(user.name, user.email)}
                        </div>
                        <h3 className="font-serif text-xl font-bold text-primary">{user.name || "Sin nombre"}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        {user.role && <p className="text-xs text-secondary font-medium mt-1">{user.role}</p>}
                      </div>
                      <div className="space-y-3 pt-4 border-t border-border/50">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Estado</span>
                          <span className={`font-medium ${user.verified ? 'text-green-600' : 'text-yellow-600'}`}>
                            {user.verified ? "✓ Verificado" : "Pendiente"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Miembro desde</span>
                          <span className="font-medium">{new Date(user.createdAt).toLocaleDateString('es-CL', { year: 'numeric', month: 'long' })}</span>
                        </div>
                        {user.rut && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">RUT</span>
                            <span className="font-medium">{user.rut}</span>
                          </div>
                        )}
                      </div>
                    </div>
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