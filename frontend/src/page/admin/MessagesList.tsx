import React, { useEffect, useState } from "react";
import { Trash2, Reply, Loader2, AlertCircle } from "lucide-react";
import { adminServices } from "../../../../services/adminService";

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const MessagesList: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await adminServices.getMessages();
        setMessages(data);
      } catch (err) {
        setError("Impossible de charger les messages.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-green-600 w-6 h-6" />
      </div>
    );
  }


const handleDelete = async (id: number) => {
	const confirm = window.confirm(
		"Voulez-vous vraiment supprimer ce message ?"
	);

	if (!confirm) return;

	try {
		await adminServices.deleteMessage(id);

		// 🔄 Mise à jour locale (sans recharger)
		setMessages((prev) =>
			prev.filter((message) => message.id !== id)
		);
	} catch (err) {
		alert("Impossible de supprimer le message.");
	}
};


  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Messages reçus</h2>

      {/* ❌ Erreur */}
      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* 📭 Aucun message */}
      {messages.length === 0 && !error && (
        <p className="text-slate-400 italic">Aucun message reçu.</p>
      )}

      {/* 📬 Liste des messages */}
      {messages.map((msg) => (
        <div key={msg.id} className="bg-white p-6 rounded-xl border">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold">{msg.name}</p>
              <p className="text-sm text-slate-500">{msg.email}</p>
            </div>
            <span className="text-xs text-slate-400">
              {msg.created_at
                ? new Date(msg.created_at).toLocaleDateString("fr-FR")
                : "—"}
            </span>
          </div>

          <p className="mt-4 text-slate-600 line-clamp-4">
            {msg.message}
          </p>

          <div className="mt-4 flex gap-4">
            <button className="text-green-600 flex items-center gap-1 text-sm hover:underline">
              <Reply size={14} /> Répondre
            </button>

            <button 
            onClick={() => handleDelete(msg.id)}
            className="text-red-600 flex items-center gap-1 text-sm hover:underline">
              <Trash2 size={14} /> Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
