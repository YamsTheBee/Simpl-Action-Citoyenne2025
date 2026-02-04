// On garde une base propre sans le /api final
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Helper pour inclure le token JWT dans les headers
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
  };
};

/**
 * Gestion centralisée des erreurs de réponse
 */
const handleResponse = async (response: Response) => {
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem('token');
    window.location.href = '/admin/login';
    return;
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Erreur serveur: ${response.status}`);
  }

  return response.json();
};





export const adminServices = {
  // --- GESTION DES DONS ---
  getDonations: async () => {
    const response = await fetch(`${API_BASE}/api/admin/donations`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // --- GESTION DES MESSAGES ---
  getMessages: async () => {
    const response = await fetch(`${API_BASE}/api/admin/messages`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  deleteMessage: async (id: number) => {
    const response = await fetch(`${API_BASE}/api/admin/messages/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // --- ACTIVITÉS RÉCENTES ---
getRecentActivities: async () => {
  const response = await fetch(`${API_BASE}/api/admin/activities`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
},

  // --- GESTION DE LA NEWSLETTER ---
  getNewsletterSubscribers: async () => {
    const response = await fetch(`${API_BASE}/api/admin/newsletter`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // --- STATISTIQUES DU DASHBOARD ---
  getDashboardStats: async () => {
    const response = await fetch(`${API_BASE}/api/admin/stats`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  }
};