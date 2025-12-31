import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import FarmerDashboard from "@/pages/FarmerDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import MarketRates from "@/pages/MarketRates";
import Weather from "@/pages/Weather";
import Forum from "@/pages/Forum";
import AIAdvice from "@/pages/AIAdvice";
import Login from "@/pages/Login";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={FarmerDashboard} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/market" component={MarketRates} />
      <Route path="/weather" component={Weather} />
      <Route path="/forum" component={Forum} />
      <Route path="/ai-advice" component={AIAdvice} />
      <Route path="/login" component={Login} />
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
