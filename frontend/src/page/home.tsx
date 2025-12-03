//  Projet : Simpl-Action-Citoyenne
//  * Auteur : Mariama Diaw
// --- 9. COMPOSANT HOME (Assemblage des composants) ---

import HeroSlider from "../components/HeroSlider";
import { MissionSection } from "../components/MissionSection";
import "../components/GalerieImpact";
import { FaitesUnDon } from "../components/FaitesUnDon";
import GalerieImpact from "../components/GalerieImpact";
const Home: React.FC = () => {
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

			<section className="FaitesUnDon-section">
				<FaitesUnDon />
			</section>
		</div>
	);
};

export default Home;
