import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/contexts/CartContext";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Admin from "@/pages/Admin";
import Products from "@/pages/Products";
import Categories from "@/pages/Categories";
import Orders from "@/pages/Orders";
import Subscribers from "@/pages/Subscribers";
import SystemConfig from "@/pages/SystemConfig";
import Appearance from "@/pages/Appearance";
import CatalogConfig from "@/pages/CatalogConfig";
import Reports from "@/pages/Reports";
import NewProduct from "@/pages/NewProduct";
import EditProduct from "@/pages/EditProduct";
import NewCategory from "@/pages/NewCategory";
import EditCategory from "@/pages/EditCategory";
import CatalogPage from "@/pages/CatalogPage";
import PlanSelection from "@/pages/PlanSelection";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/plans" element={<PlanSelection />} />

              <Route path="/catalog/:subdomain" element={<CatalogPage />} />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminDashboard />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Products />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products/new"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <NewProduct />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products/edit/:id"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <EditProduct />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/categories"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Categories />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/categories/new"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <NewCategory />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/categories/edit/:id"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <EditCategory />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Orders />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/subscribers"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Subscribers />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/system"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <SystemConfig />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/appearance"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Appearance />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/catalog-config"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <CatalogConfig />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/reports"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Reports />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Toaster />
          </Router>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
