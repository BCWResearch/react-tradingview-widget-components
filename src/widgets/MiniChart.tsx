import React, {
	useEffect, useRef 
} from "react";
import { MiniChartProps } from "../types/MiniChartProps";

export const MiniChart = ({ containerStyles, lineColor, topGradientColor, bottomGradientColor, width, height, autosize, ...props }: Partial<MiniChartProps>) => {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;
		const script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
		script.async = true;
		script.onload = async () => {
			const iframe = containerRef.current?.querySelector("iframe");
			if (iframe && iframe instanceof Element) iframe.style.colorScheme = "normal";
		};
		const config = JSON.stringify({
			width: autosize ? "100%" : (width || 350),
			height: autosize ? "100%" : (height || 220),
			dateRange: "1D",
			colorTheme: "dark",
			trendLineColor: lineColor || "rgba(41, 98, 255, 1)",
			underLineColor: topGradientColor || "rgba(41, 98, 255, 0.3)",
			underLineBottomColor: bottomGradientColor || "rgba(41, 98, 255, 0)",
			isTransparent: true,
			...props,
		});
		script.innerHTML = config;
		containerRef.current.appendChild(script);
		return () => {
			while (containerRef.current?.firstChild) {
				containerRef.current.removeChild(containerRef.current.firstChild);
			}
		};
	}, [ JSON.stringify(props) ]);

	return (
		<div style={containerStyles} className="tradingview-widget-container" ref={containerRef}/>
	);
};