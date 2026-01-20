import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop - Déplace la page en haut à chaque changement de route
 * Utilise useLayoutEffect pour éviter les sauts de scroll lors du rendu
 */
const ScrollToTop = () => {
	const { pathname } = useLocation();

	// Scroll en haut à chaque changement de route
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useLayoutEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	}, [pathname]); // dépendance minimale

	return null;
};

export default ScrollToTop;
