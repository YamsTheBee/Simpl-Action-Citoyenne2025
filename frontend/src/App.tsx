import type React from "react";
import NavBar from "./components/navbar";
import { Footer } from "./components/Footer";
import Home from "./page/home";

const App: React.FC = () => {
	return (
		<div className="min-h-screen font-sans antialiased text-gray-800">
			<style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.3s ease-out forwards;
        }
      `}</style>

			<NavBar />

			<main className="pt-0">
				<Home />
			</main>

			<Footer />
		</div>
	);
};

export default App;
