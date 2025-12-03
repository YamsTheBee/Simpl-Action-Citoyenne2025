// --- 4. COMPOSANT HERO SLIDER (Simulé statique) ---
import type React from "react";
import { Hand } from "lucide-react";
import heroImage from "../assets/HeroBgImg.png";

const HeroSlider: React.FC = () => (
	<section
		id="home"
		className="relative h-[65vh] md:h-[85vh] overflow-hidden bg-gray-100"
	>
		{/* Image d'arrière-plan */}
		<div
			className="absolute inset-0 bg-cover bg-center"
			style={{
				backgroundImage: `url(${heroImage})`,
				opacity: 0.9,
			}}
			aria-hidden="true"
		/>

		{/* Overlay foncé */}
		<div className="absolute inset-0 bg-black opacity-30" aria-hidden="true" />

		{/* CONTENU */}
		<div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 sm:px-6 lg:px-8">
			<h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-xl">
				L'Action Simple, <br className="sm:hidden" />
				L'Impact Puissant.
			</h1>

			<p className="mt-4 max-w-2xl text-xl text-gray-200 drop-shadow-md">
				Chaque geste compte. Transformons ensemble notre communauté.
			</p>

			<a
				href="#volunteers"
				className="mt-8 px-10 py-4 text-lg font-bold uppercase tracking-wider bg-yellow-400 text-gray-900 rounded-full shadow-2xl hover:bg-yellow-500 transform hover:scale-105 transition duration-300 ease-in-out flex items-center"
			>
				<Hand className="w-5 h-5 mr-3" />
				Je m'engage
			</a>
		</div>
	</section>
);

export default HeroSlider;
