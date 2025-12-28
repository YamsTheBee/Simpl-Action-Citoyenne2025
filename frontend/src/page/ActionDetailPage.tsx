// ---------------------------------------------
// ActionDetailPage – Détail d’une action citoyenne
// ---------------------------------------------

import { Calendar, ChevronLeft, Heart, MapIcon, User, Zap } from "lucide-react";
import { memo } from "react";
import { mockActions, type Action } from "../data/mockActions";

// ---------------------------------------------
// Types
// ---------------------------------------------

type Props = {
	actionId: string;
	navigate: (view: string, id: string | null) => void;
};

// ---------------------------------------------
// Helpers
// ---------------------------------------------

const renderDetailContent = (action: Action) => {
	if (action.id === "1") {
		return (
			<div className="prose lg:prose-xl mx-auto mt-8">
				<h2 className="text-4xl font-extrabold text-gray-900 mb-6">
					L'Épopée Verte : Un modèle de collaboration internationale
				</h2>

				<p className="lead text-gray-700 italic">
					Lancée à Paris, l'initiative "Épopée Verte" est rapidement devenue
					l'un des projets phares de Simpl-Action-Citoyenne.
				</p>

				<h3 className="text-3xl font-bold text-green-700 mt-10 mb-4 flex items-center">
					<Zap className="w-6 h-6 mr-3 text-green-500" />
					Les Piliers du Projet
				</h3>

				<p>
					L'objectif principal est de mobiliser les citoyens pour des journées
					de collecte de déchets.
				</p>

				<img
					src="https://placehold.co/800x450/4CAF50/ffffff?text=Collecte+Citoyenne"
					alt="Collecte citoyenne"
					className="rounded-lg shadow-xl mx-auto my-8"
				/>

				<h3 className="text-3xl font-bold text-green-700 mt-10 mb-4 flex items-center">
					<User className="w-6 h-6 mr-3 text-green-500" />
					Partenariat stratégique
				</h3>

				<p>Le modèle d'Épopée Verte est désormais adapté pour le Sénégal.</p>
			</div>
		);
	}

	return (
		<div className="prose lg:prose-xl mx-auto mt-8">
			<p className="lead text-gray-700 italic">
				Page de détail pour <b>{action.title}</b>. L’article complet arrive
				bientôt.
			</p>

			<p>
				Action à <b>{action.location}</b>, prévue le <b>{action.date}</b>.
			</p>

			{action.image && (
				<img
					src={action.image}
					alt={action.title}
					className="rounded-lg shadow-xl mx-auto my-8"
				/>
			)}
		</div>
	);
};

// ---------------------------------------------
// Component
// ---------------------------------------------

const ActionDetailPage = memo(({ actionId, navigate }: Props) => {
	const action = mockActions.find((a) => a.id === actionId);

	if (!action) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center">
				<h1 className="text-3xl font-bold text-red-600 mb-4">
					Action introuvable
				</h1>
				<button
					type="button"
					onClick={() => navigate("home", null)}
					className="px-6 py-3 bg-green-600 text-white rounded-full"
				>
					Retour à l’accueil
				</button>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white pt-16 pb-32">
			<div className="max-w-7xl mx-auto px-4">
				{/* Header */}
				<div className="flex justify-between items-center mb-10 border-b pb-4">
					<button
						type="button"
						onClick={() => navigate("actions", null)}
						className="flex items-center text-gray-500 hover:text-green-600"
					>
						<ChevronLeft className="w-5 h-5 mr-1" />
						Toutes les actions
					</button>

					{action.isCoupDeCoeur && (
						<span className="flex items-center text-red-600 font-semibold">
							<Heart className="w-4 h-4 mr-1 fill-red-600" />
							Coup de cœur
						</span>
					)}
				</div>

				{/* Title */}
				<div className="text-center mb-12">
					<h1 className="text-5xl font-extrabold">{action.title}</h1>

					<div className="mt-4 flex justify-center gap-6 text-gray-600">
						<span className="flex items-center">
							<MapIcon className="w-5 h-5 mr-1 text-green-600" />
							{action.location}
						</span>

						<span className="flex items-center">
							<Calendar className="w-5 h-5 mr-1 text-green-600" />
							{action.date}
						</span>
					</div>
				</div>

				{/* Content */}
				{renderDetailContent(action)}

				{/* CTA */}
				<div className="text-center mt-20 space-y-4">
					<button
						type="button"
						className="px-8 py-4 text-xl font-bold text-white bg-green-600 rounded-full hover:bg-green-700"
					>
						Je participe
					</button>

					<button
						type="button"
						onClick={() => navigate("actions", null)}
						className="block mx-auto text-gray-500 hover:text-green-600"
					>
						Voir d’autres actions
					</button>
				</div>
			</div>
		</div>
	);
});

export default ActionDetailPage;
