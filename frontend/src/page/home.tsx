// Page d'accueil – Simple Action Citoyenne

import GalerieImpact from "../components/GalerieImpact";
import HeroSlider from "../components/HeroSlider";
import { MissionSection } from "../components/MissionSection";

const Home = () => {
	return (
		<div className="home-page">
			<section className="hero-section">
				<HeroSlider />
			</section>

			<section className="mission-section">
				<MissionSection />
			</section>

			<section className="galerieImpact-section">
				<GalerieImpact />
			</section>
		</div>
	);
};

export default Home;
