import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Vérifier si un token existe déjà au chargement
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      // Optionnel: valider le token avec le backend ici
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);


  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const login = async (email: string, pass: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password: pass,
      }),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    // 🔐 stocke le vrai JWT
    localStorage.setItem('admin_token', data.token);
    setIsAuthenticated(true);

    return true;
  } catch (error) {
    console.error('Erreur login admin:', error);
    return false;
  }
};


const logout = () => {
  localStorage.removeItem('admin_token');
  setIsAuthenticated(false);
  window.location.href = '/admin/login';
};


  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return context;
};