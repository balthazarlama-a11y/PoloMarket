import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Marketplace from "@/pages/marketplace";
import Verification from "@/pages/verification";
import Dashboard from "@/pages/dashboard";
import HorseDetail from "@/pages/horse-detail";
import Login from "@/pages/login";
import Register from "@/pages/register";
import RegisterBusiness from "@/pages/register-business";
import Servicios from "@/pages/servicios";
import ServiciosTransporte from "@/pages/servicios-transporte";
import ServiciosInsumos from "@/pages/servicios-insumos";
import ServiciosStaff from "@/pages/servicios-staff";
import ServiciosVeterinarias from "@/pages/servicios-veterinarias";
import Accesorios from "@/pages/accesorios";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/verification" component={Verification} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/horse/:id" component={HorseDetail} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/register-business" component={RegisterBusiness} />
      <Route path="/servicios" component={Servicios} />
      <Route path="/servicios/transporte" component={ServiciosTransporte} />
      <Route path="/servicios/insumos" component={ServiciosInsumos} />
      <Route path="/servicios/staff" component={ServiciosStaff} />
      <Route path="/servicios/veterinarias" component={ServiciosVeterinarias} />
      <Route path="/accesorios" component={Accesorios} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;