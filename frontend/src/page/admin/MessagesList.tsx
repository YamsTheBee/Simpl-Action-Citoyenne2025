import React from 'react';
import { Trash2, Reply } from 'lucide-react';


const MessageList: React.FC = () => {
  const messages = [
    { id: 1, sender: "Marc Lawson", subject: "Partenariat scolaire", date: "Il y a 2h", preview: "Bonjour, je souhaiterais discuter d'une collaboration..." },
    { id: 2, sender: "Sophie Koulibaly", subject: "Bénévolat", date: "Hier", preview: "Comment puis-je rejoindre vos équipes sur le terrain ?" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Messages Reçus</h2>
      
      <div className="grid gap-4">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-green-200 transition-all group">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{msg.sender}</h3>
                <p className="text-green-600 text-sm font-medium">{msg.subject}</p>
              </div>
              <span className="text-xs text-slate-400 font-medium">{msg.date}</span>
            </div>
            <p className="text-slate-500 text-sm mb-4 line-clamp-2">
              {msg.preview}
            </p>
            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="flex items-center px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-bold hover:bg-green-100">
                <Reply className="w-3.5 h-3.5 mr-1.5" /> Répondre
              </button>
              <button className="flex items-center px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100">
                <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;