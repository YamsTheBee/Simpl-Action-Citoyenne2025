// Page d'accueil – Simple Action Citoyenne

import GalerieImpact from "../components/GalerieImpact";
import HeroSlider from "../components/HeroSlider";
import { MissionSection } from "../components/MissionSection";

const Home = () => {
	return (
		<main className="home-page">
			<section className="hero-section">
				<h1 className="sr-only">Simple Action Citoyenne</h1>
				<HeroSlider />
			</section>

			<section className="mission-section">
				<h2 className="sr-only">Notre mission</h2>
				<MissionSection />
			</section>

			<section className="galerieImpact-section">
				<h2 className="sr-only">Notre impact</h2>
				<GalerieImpact />
			</section>
		</main>
	);
};

export default Home;
