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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/plans" element={<PlanSelection />} />
              
              <Route path="/catalog/:subdomain" element={<CatalogPage />} />

              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/products/new" element={<NewProduct />} />
              <Route path="/admin/products/edit/:id" element={<EditProduct />} />
              <Route path="/admin/categories" element={<Categories />} />
              <Route path="/admin/categories/new" element={<NewCategory />} />
              <Route path="/admin/categories/edit/:id" element={<EditCategory />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/subscribers" element={<Subscribers />} />
              <Route path="/admin/system" element={<SystemConfig />} />
              <Route path="/admin/appearance" element={<Appearance />} />
              <Route path="/admin/catalog-config" element={<CatalogConfig />} />
              <Route path="/admin/reports" element={<Reports />} />
            </Routes>
            <Toaster />
          </Router>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
