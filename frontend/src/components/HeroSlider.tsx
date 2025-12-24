// Hero - Page d'accueil – Simple Action Citoyenne

import heroImage from "../assets/HeroBgImg.png";

const HeroSlider = () => {
	return (
		<section
			id="home"
			className="relative h-[65vh] md:h-[85vh] overflow-hidden bg-gray-100"
			aria-label="Section de présentation principale"
		>
			{/* Image de fond */}
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{ backgroundImage: `url(${heroImage})` }}
				aria-hidden="true"
			/>

			{/* Overlay pour lisibilité */}
			<div className="absolute inset-0 bg-black/30" aria-hidden="true" />

			{/* Contenu */}
			<div className="relative z-10 flex h-full flex-col items-center justify-end px-4 pb-28 text-center sm:px-6 lg:px-8">
				<h1 className="animate-fadeSlide text-4xl font-extrabold text-white drop-shadow-xl sm:text-6xl lg:text-7xl">
					L&apos;Action Simple,
					<br className="sm:hidden" />
					<span className="text-green-500"> L&apos;Impact Puissant.</span>
				</h1>

				<p className="mt-4 max-w-2xl animate-fadeSlide delay-400 text-lg text-gray-200 drop-shadow-md sm:text-xl">
					<span className="text-xs font-bold uppercase tracking-widest">
						Chaque geste compte. Transformons ensemble notre communauté.
					</span>
				</p>
			</div>
		</section>
	);
};

export default HeroSlider;
