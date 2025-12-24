// Page d'accueil – Simple Action Citoyenne

import HeroSlider from "../components/HeroSlider";
import { MissionSection } from "../components/MissionSection";
import GalerieImpact from "../components/GalerieImpact";
import DrMbeteChatbot from "../components/DrMbeteChatbot";

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

			{/* 💬 Chatbot flottant en bas à droite */}
			<DrMbeteChatbot />
		</div>
	);
};

export default Home;
