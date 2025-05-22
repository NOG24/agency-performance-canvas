
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AgencyDashboard from "./pages/AgencyDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import I18nProvider from "./providers/I18nProvider";
import { AppThemeProvider } from "./providers/ThemeProvider";
import { AuthProvider } from "./providers/AuthProvider";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <AppThemeProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/agency-dashboard/*" element={
                <ProtectedRoute requiredRole="agency">
                  <AgencyDashboard />
                </ProtectedRoute>
              } />
              <Route path="/client-dashboard/*" element={
                <ProtectedRoute requiredRole="client">
                  <ClientDashboard />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </AppThemeProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
