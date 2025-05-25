
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import CatalogConfig from "./pages/CatalogConfig";
import SystemConfig from "./pages/SystemConfig";
import CatalogPage from "./pages/CatalogPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/catalog-config" element={<CatalogConfig />} />
          <Route path="/admin/system-config" element={<SystemConfig />} />
          <Route path="/catalog/:subdomain" element={<CatalogPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
