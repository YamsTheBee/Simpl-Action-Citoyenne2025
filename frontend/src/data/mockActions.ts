// Types pour les actions
export type Action = {
	id: string;
	title: string;
	description: string;
	location: string;
	date: string;
	image?: string;
	isCoupDeCoeur?: boolean;
};

// Données fictives (mock)
export const mockActions: Action[] = [
	{
		id: "1",
		title: "Épopée Verte",
		description: "À suivre.",
		location: "Dakar",
		date: "12 Février 2025",
		image: "https://placehold.co/800x450/4CAF50/ffffff?text=Épopée+Verte",
		isCoupDeCoeur: true,
	},
	{
		id: "2",
		title: "Sourire Solidaire",
		description:
			"Distribution de repas aux personnes vulnérables dans la ville.",
		location: "Dakar",
		date: "18 Mars 2025",
		image: "https://placehold.co/800x450/F44336/ffffff?text=Sourire+Solidaire",
	},
	{
		id: "3",
		title: "École Propre",
		description:
			"Nettoyage des cours d’école et sensibilisation au tri des déchets.",
		location: "Rufisque",
		date: "25 Avril 2025",
		image: "https://placehold.co/800x450/1E88E5/ffffff?text=École+Propre",
	},
];
