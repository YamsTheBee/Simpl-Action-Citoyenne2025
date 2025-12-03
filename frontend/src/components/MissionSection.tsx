// --- 5. MissionSection.tsx ---
import type React from "react";
import { Zap, Heart, Users } from "lucide-react";

// Définition du type TS
interface StatItem {
	value: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
}

// --- Données statistiques locales ---
const stats: StatItem[] = [
	{ value: "48+", label: "Projets réalisés", icon: Zap },
	{ value: "7,5K", label: "Heures de bénévolat", icon: Heart },
	{ value: "350+", label: "Membres actifs", icon: Users },
];

export const MissionSection: React.FC = () => (
	<section id="mission" className="py-20 md:py-32 bg-white">
		<div className="container mx-auto px-4 sm:px-6 lg:px-8">
			<h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-4">
				NOTRE MISSION.
			</h2>

			<p className="text-xl text-center max-w-3xl mx-auto text-gray-600 mb-16">
				Simple Action Citoyenne est le catalyseur de l'engagement local,
				transformant les petites intentions en grandes réalisations collectives.
			</p>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
				{stats.map((stat: StatItem) => (
					<div
						key={stat.label}
						className="p-6 rounded-xl transition duration-300 hover:shadow-2xl hover:scale-[1.02] border border-gray-100"
					>
						<stat.icon className="w-10 h-10 text-green-600 mx-auto mb-4" />

						<p className="text-5xl font-bold text-gray-900">{stat.value}</p>

						<p className="mt-2 text-xl font-medium text-gray-500 uppercase tracking-wider">
							{stat.label}
						</p>
					</div>
				))}
			</div>
		</div>
	</section>
);
