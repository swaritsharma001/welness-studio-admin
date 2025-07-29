import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/components/AdminLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Classes from "./pages/Classes";
import Instructors from "./pages/Instructors";
import Products from "./pages/Products";
import Content from "./pages/Content";
import AdminInstructors from "./pages/AdminInstructors";
import AdminShop from "./pages/AdminShop";
import AdminOrders from "./pages/AdminOrders";
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
          <Route path="/login" element={<Login />} />
          
          {/* Protected Admin Routes */}
          <Route path="/admin/instructors" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminInstructors />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/shop" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminShop />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminOrders />
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          {/* Original routes for reference */}
          <Route path="/users" element={
            <AdminLayout>
              <Users />
            </AdminLayout>
          } />
          <Route path="/classes" element={
            <AdminLayout>
              <Classes />
            </AdminLayout>
          } />
          <Route path="/instructors" element={
            <AdminLayout>
              <Instructors />
            </AdminLayout>
          } />
          <Route path="/products" element={
            <AdminLayout>
              <Products />
            </AdminLayout>
          } />
          <Route path="/content" element={
            <AdminLayout>
              <Content />
            </AdminLayout>
          } />
          <Route path="/analytics" element={
            <AdminLayout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </AdminLayout>
          } />
          <Route path="/settings" element={
            <AdminLayout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Settings</h1>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </AdminLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
