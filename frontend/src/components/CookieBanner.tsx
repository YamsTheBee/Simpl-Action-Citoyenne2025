import { useState, useEffect } from "react";

const CookieBanner = () => {
	const [showBanner, setShowBanner] = useState(false);

	useEffect(() => {
		const cookieValue = document.cookie
			.split("; ")
			.find((row) => row.startsWith("CookieConsent="))
			?.split("=")[1];

		if (!cookieValue) {
			setShowBanner(true);
		}
	}, []);

	const acceptCookies = () => {
		// Crée le cookie qui expire dans 1 an
		const expires = new Date();
		expires.setFullYear(expires.getFullYear() + 1);
		document.cookie = `CookieConsent=true; expires=${expires.toUTCString()}; path=/`;
		setShowBanner(false);
	};

	if (!showBanner) return null;

	const refuseCookies = () => {
		const expires = new Date();
		expires.setFullYear(expires.getFullYear() + 1);

		document.cookie = `CookieConsent=false; expires=${expires.toUTCString()}; path=/`;
		setShowBanner(false);
	};

	return (
		<div
			style={{
				position: "fixed",
				bottom: 0,
				width: "100%",
				background: "#5c5a5a92",
				color: "#fff",
				padding: "1.5rem",
				fontSize: "0.9rem",
				textAlign: "center",
				zIndex: 1000,
			}}
		>
			Nous utilisons des cookies pour améliorer votre expérience et suivre les
			statistiques.
			<button
				type="button"
				onClick={acceptCookies}
				style={{
					marginLeft: "1rem",
					padding: "0.5rem 1rem",
					background: "green",
					color: "#fff",
					border: "none",
					cursor: "pointer",
				}}
			>
				Accepter
			</button>
			<button
				type="button"
				onClick={refuseCookies}
				style={{
					marginLeft: "0.5rem",
					padding: "0.5rem 1rem",
					background: "gray",
					color: "#fff",
					border: "none",
					cursor: "pointer",
				}}
			>
				Refuser
			</button>
		</div>
	);
};

export default CookieBanner;
