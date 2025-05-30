
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "next-themes";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import Subscribers from "./pages/Subscribers";
import Profile from "./pages/Profile";
import CatalogConfig from "./pages/CatalogConfig";
import SystemConfig from "./pages/SystemConfig";
import Reports from "./pages/Reports";
import Appearance from "./pages/Appearance";
import OrderTracking from "./pages/OrderTracking";
import CatalogPage from "./pages/CatalogPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/track/:orderId" element={<OrderTracking />} />
              <Route path="/catalog/:subdomain" element={<CatalogPage />} />
              
              {/* Protected Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/admin/products" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Products />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/admin/categories" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Categories />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/admin/orders" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Orders />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/admin/subscribers" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Subscribers />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/admin/profile" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Profile />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/admin/catalog-config" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <CatalogConfig />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/admin/system" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <SystemConfig />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/admin/reports" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Reports />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/admin/appearance" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Appearance />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
