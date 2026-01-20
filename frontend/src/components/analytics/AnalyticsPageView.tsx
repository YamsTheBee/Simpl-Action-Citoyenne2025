import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AnalyticsPageView = () => {
	const location = useLocation();

	useEffect(() => {
		if (!window.gtag) return;

		window.gtag("event", "page_view", {
			page_path: location.pathname,
		});
	}, [location]);

	return null;
};

export default AnalyticsPageView;
