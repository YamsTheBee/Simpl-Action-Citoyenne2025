import { useEffect, useState } from "react";
import { MessageSquare, HeartHandshake } from "lucide-react";
import { adminServices } from "../../../services/adminService";

interface Activity {
  id: number;
  type: "message" | "donation";
  author: string;
  content: string;
  created_at: string;
}

const AdminRecentActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    adminServices.getRecentActivities().then(setActivities);
  }, []);

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
        <h3 className="font-bold text-slate-700 uppercase text-xs">
          Activités récentes
        </h3>
        <span className="text-[10px] text-green-600 font-bold bg-green-100 px-2 py-1 rounded">
          Live
        </span>
      </div>

      <div className="divide-y">
        {activities.map((act) => (
          <div
            key={act.id}
            className="p-4 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              {act.type === "message" ? (
                <MessageSquare className="w-4 h-4 text-purple-500" />
              ) : (
                <HeartHandshake className="w-4 h-4 text-green-500" />
              )}
              <span className="text-sm font-medium text-slate-700">
                {act.type === "message"
                  ? `Message de ${act.author}`
                  : `Don de ${act.author}`}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold">
              {new Date(act.created_at).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRecentActivities;
