
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import Subscribers from "./pages/Subscribers";
import Profile from "./pages/Profile";
import SystemConfig from "./pages/SystemConfig";
import CatalogConfig from "./pages/CatalogConfig";
import CatalogPage from "./pages/CatalogPage";
import ProductForm from "./components/ProductForm";
import CategoryForm from "./components/CategoryForm";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/catalog/:subdomain" element={<CatalogPage />} />

                {/* Protected admin routes */}
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
                <Route path="/admin/products/new" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
                <Route path="/admin/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
                <Route path="/admin/categories/new" element={<ProtectedRoute><CategoryForm /></ProtectedRoute>} />
                <Route path="/admin/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                <Route path="/admin/subscribers" element={<ProtectedRoute><Subscribers /></ProtectedRoute>} />
                <Route path="/admin/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/admin/system" element={<ProtectedRoute><SystemConfig /></ProtectedRoute>} />
                <Route path="/admin/catalog" element={<ProtectedRoute><CatalogConfig /></ProtectedRoute>} />

                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
