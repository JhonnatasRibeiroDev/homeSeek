
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PropertyProvider } from "./contexts/PropertyContext";
import MainLayout from "./components/Layout/MainLayout";
import PublicLayout from "./components/Layout/PublicLayout";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MapPage from "./pages/MapPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import UnitsDetailPage from "./pages/UnitsDetailPage";
import CompanyPage from "./pages/CompanyPage";
import ConversasPage from "./pages/ConversasPage";
import PropostasPage from "./pages/PropostasPage";
import StoriesPage from "./pages/StoriesPage";
import UsuariosPage from "./pages/UsuariosPage";
import MeusImoveisPage from "./pages/MeusImoveisPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <PropertyProvider>
          <BrowserRouter basename="/imovelcenter">
            <Routes>
              {/* Home route - conditional display based on login */}
              <Route path="/" element={<Home />} />
              
              {/* Public routes */}
              <Route path="/mapa" element={
                <PublicLayout>
                  <MapPage />
                </PublicLayout>
              } />
              <Route path="/imovel/:id" element={
                <PublicLayout>
                  <PropertyDetailPage />
                </PublicLayout>
              } />
              <Route path="/imovel/:id/unidades" element={
                <PublicLayout>
                  <UnitsDetailPage />
                </PublicLayout>
              } />
              <Route path="/empresa/:company" element={
                <PublicLayout>
                  <CompanyPage />
                </PublicLayout>
              } />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              } />
              <Route path="/conversas" element={
                <MainLayout>
                  <ConversasPage />
                </MainLayout>
              } />
              <Route path="/propostas" element={
                <MainLayout>
                  <PropostasPage />
                </MainLayout>
              } />
              <Route path="/stories" element={
                <MainLayout>
                  <StoriesPage />
                </MainLayout>
              } />
              <Route path="/usuarios" element={
                <MainLayout>
                  <UsuariosPage />
                </MainLayout>
              } />
              <Route path="/meus-imoveis" element={
                <MainLayout>
                  <MeusImoveisPage />
                </MainLayout>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <WhatsAppButton />
          </BrowserRouter>
        </PropertyProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
