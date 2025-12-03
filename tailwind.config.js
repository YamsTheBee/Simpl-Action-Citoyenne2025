/** @type {import('tailwindcss').Config} */
export default {
	// C'est cette section 'content' qui est CRUCIALE.
	// Elle indique au moteur de Tailwind où se trouvent les classes (dans tous les fichiers .tsx/.jsx du dossier src).
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "sans-serif"],
			},
			// Configuration pour centrer le contenu
			container: {
				center: true,
				padding: "1rem",
				screens: {
					sm: "640px",
					md: "768px",
					lg: "1024px",
					xl: "1280px",
				},
			},
		},
	},
	plugins: [],
};
