import type React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import NavBar from "./components/navbar";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./page/home";
import AboutPage from "./page/About";
import Impact from "./page/Impact";
import ContactUs from "./page/ContactUs";
import ActionsPage from "./page/Actions";
import EpopeePage from "./page/EpopeePage";

const App: React.FC = () => {
	return (
		<Router>
			<div className="min-h-screen font-sans antialiased text-gray-800">
				<NavBar />

				{/* ScrollToTop doit être juste après le Router */}
				<ScrollToTop />

				<main>
					<Routes>
						{/* Accueil */}
						<Route path="/" element={<Home />} />

						{/* À propos */}
						<Route path="/about" element={<AboutPage />} />

						{/* Impact */}
						<Route path="/impact" element={<Impact />} />

						{/* Contact */}
						<Route path="/contact" element={<ContactUs />} />

						{/* Actions */}
						<Route path="/actions" element={<ActionsPage />} />

						{/* Page Épopée */}
						<Route path="/epopee" element={<EpopeePage />} />
					</Routes>
				</main>

				<Footer />
			</div>
		</Router>
	);
};

export default App;
