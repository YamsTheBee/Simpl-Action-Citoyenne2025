import type React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/navbar";
import { Footer } from "./components/Footer";

// Pages
import Home from "./page/home";
import ActionsPage from "./page/Actions";
import ActionDetailPage from "./page/ActionDetailPage";
import Impact from "./page/Impact";
import ContactUs from "./page/ContactUs";
import AboutPage from "./page/About"; // ✔ Correction du nom

const App: React.FC = () => {
	return (
		<Router>
			<div className="min-h-screen font-sans antialiased text-gray-800">
				<NavBar />

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

						{/* Détail d’une action */}
						<Route
							path="/actions/:id"
							element={
								<ActionDetailPage
									actionId={""}
									navigate={(view: string): void => {
										throw new Error("Function not implemented.");
									}}
								/>
							}
						/>
					</Routes>
				</main>

				<Footer />
			</div>
		</Router>
	);
};

export default App;
