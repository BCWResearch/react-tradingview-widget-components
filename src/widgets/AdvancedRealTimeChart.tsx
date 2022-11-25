import React, {
	useEffect,
	useRef, useState 
} from "react";
import {
	AdvancedChartBarStyle, AdvancedRealTimeChartProps 
} from "../types/AdvancedRealTimeChartProps";
import { injectTradingView } from "../utils/injectTradingView";
import useIsMounted from "../utils/useIsMounted";
import { getId } from "../utils/widgetUtils";

export const AdvancedRealTimeChart = React.forwardRef<HTMLDivElement, Partial<AdvancedRealTimeChartProps & {fallback: React.ReactNode}>>(function AdvancedRealTimeChartRoot({ fallback, containerStyles, chartOnly, hideLogo, ...props }, ref) {
	const idRef = useRef(getId());
	const isMounted = useIsMounted();
	const [ isError, setIsError ] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const TradingView = await injectTradingView();
				new TradingView.widget({
					autosize: false,
					interval: "1",
					timezone: "Etc/UTC",
					theme: "dark",
					style: AdvancedChartBarStyle.CANDLES,
					locale: "en",
					toolbar_bg: "#f1f3f6",
					enable_publishing: false,
					allow_symbol_change: true,
					whitelabel: !!hideLogo,
					width: props.autosize ? "100%" : (props.width || 1000),
					height: props.autosize ? "100%" : (props.height || 500),
					...(chartOnly && {
						hide_top_toolbar: true,
						hide_side_toolbar: true,
						hide_legend: true,
					}),
					...props,
					container_id: idRef.current,
				});
				const node = document.querySelector("iframe[id^=\"tradingview_\"]");
				// enables iframe transparency
				if (node && node instanceof HTMLElement) node.style.colorScheme = "normal";
				if (isMounted()) setIsError(false);
			} catch (error) {
				if (isMounted()) setIsError(true);
			}
		})();
	}, [ JSON.stringify(props) ]);

	return (
		<div style={containerStyles} ref={ref}>
			<div id={idRef.current}>{isError && fallback ? fallback : null}</div>
		</div>
	);
});