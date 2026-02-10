import type React from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

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

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import Login from "./page/admin/Login";
import Dashboard from "./page/admin/Dashboard";

import MariamaProModal from "./components/MariamaProModal";

/**
 * LayoutManager
 * Gère l'affichage conditionnel Nav / Footer / Modals
 */
const LayoutManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  // 🔹 État GLOBAL de la modal Mariama Pro
  const [isMariamaModalOpen, setIsMariamaModalOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans antialiased text-gray-800 flex flex-col">
      {!isAdminPage && <NavBar />}

      <ScrollToTop />
      <CookieBanner />
      <GoogleAnalytics />
      <AnalyticsPageView />

      <main className="flex-grow">
        {children}
        {!isAdminPage && <DrMbeteChatbot />}
      </main>

      {!isAdminPage && (
        <Footer onOpenMariamaModal={() => setIsMariamaModalOpen(true)} />
      )}

      {/* MODAL PRO MARIAMA — montée UNE SEULE FOIS */}
      {!isAdminPage && (
        <MariamaProModal
          isOpen={isMariamaModalOpen}
          onClose={() => setIsMariamaModalOpen(false)}
        />
      )}
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

            {/* --- AUTH ADMIN --- */}
            <Route path="/admin/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route
                path="/admin"
                element={<Navigate to="/admin/dashboard" replace />}
              />
              <Route path="/admin/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </LayoutManager>
      </Router>
    </AuthProvider>
  );
};

export default App;
