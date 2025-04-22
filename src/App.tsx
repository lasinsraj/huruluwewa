
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import Destination from "./pages/Destination";
import Gallery from "./pages/Gallery";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin Routes
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DestinationList from "./pages/admin/destinations/DestinationList";
import AddEditDestination from "./pages/admin/destinations/AddEditDestination";
import AdminNotFound from "./pages/admin/AdminNotFound";
import AdminAuth from "./pages/admin/AdminAuth";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <SidebarProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/destination" element={<Destination />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Admin Auth Route */}
              <Route path="/admin/login" element={<AdminAuth />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="destinations" element={<DestinationList />} />
                <Route path="destinations/add" element={<AddEditDestination />} />
                <Route path="destinations/edit/:id" element={<AddEditDestination />} />
                <Route path="*" element={<AdminNotFound />} />
              </Route>
              
              {/* Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SidebarProvider>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
