
import type React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

import Footer from "./components/Footer";
import NavBar from "./components/navbar";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./page/home";
import AboutPage from "./page/About";
import Impact from "./page/Impact";
import ContactUs from "./page/ContactUs";
import ActionsPage from "./page/Actions";
import EpopeePage from "./page/EpopeePage";
import DrMbeteChatbot from "./components/DrMbeteChatbot";
import GoogleAnalytics from "./components/analytics/GoogleAnalytics";
import AnalyticsPageView from "./components/analytics/AnalyticsPageView";
import CookieBanner from "./components/CookieBanner";

// Imports pour l'administration - Vérifiez que ces fichiers ont été créés
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import Login from "./page/admin/Login";
import Dashboard from "./page/admin/Dashboard";

/**
 * Composant de mise en page conditionnelle
 * Permet de masquer la NavBar et le Footer sur les pages Admin pour une immersion totale
 */
const LayoutManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  // Vérifie si nous sommes sur une route d'administration ou de connexion
 const isAdminPage = location.pathname.startsWith('/admin');


  return (
    <div className="min-h-screen font-sans antialiased text-gray-800 flex flex-col">
      {/* N'affiche la navigation que si on n'est pas en mode admin */}
      {!isAdminPage && <NavBar />}
      
      <ScrollToTop />
      <CookieBanner />
      <GoogleAnalytics />
      <AnalyticsPageView />

      <main className="flex-grow">
        {children}
        {!isAdminPage && <DrMbeteChatbot />}
      </main>

      {/* N'affiche le footer que si on n'est pas en mode admin */}
      {!isAdminPage && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <LayoutManager>
          <Routes>
            {/* --- ROUTES PUBLIQUES --- */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/actions" element={<ActionsPage />} />
            <Route path="/epopee" element={<EpopeePage />} />

            {/* --- ROUTES ADMIN --- */}
            {/* Page de connexion accessible via le lien footer */}
        <Route path="/admin/login" element={<Login />} />

            
      
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              {/* TODO Ajoutez ici vos futures pages : /admin/donations, etc. */}
            </Route>

            {/* TODO: Redirection ou 404 optionnelle peut être ajoutée ici */}
          </Routes>
        </LayoutManager>
      </Router>
    </AuthProvider>
  );
};

export default App;