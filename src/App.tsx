
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import AgencyDashboard from "./pages/AgencyDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import I18nProvider from "./providers/I18nProvider";
import { AppThemeProvider } from "./providers/ThemeProvider";
import { AuthProvider } from "./providers/AuthProvider";
import LoginPage from "./pages/LoginPage";

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
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/agency-dashboard/*" element={
                <ProtectedRoute requiredRole="admin">
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
