import React, {
	useEffect, useRef, useState,
} from "react";
import { injectTradingView } from "../utils/injectTradingView";
import { getId } from "../utils/widgetUtils";
import {
	ChartType, MediumWidgetProps, ValuesTracking 
} from "../types/SymbolOverviewProps";
import useIsMounted from "../utils/useIsMounted";

const chartTypeDefaultValues: Record<ChartType, Record<string, string | number>> = {
	bars: {
		upColor: "#22AB94",
		downColor: "#F7525F",
	},
	line: {
		lineWidth: 3,
	},
	area: {
		lineColor: "#2962FF",
		topColor: "rgba(41, 98, 255, 0.3)",
		bottomColor: "rgba(41, 98, 255, 0)",
		lineWidth: 3,
	},
	candlesticks: {
		upColor: "#22AB94",
		downColor: "#F7525F",
		borderUpColor: "#22AB94",
		borderDownColor: "#F7525F",
		wickUpColor: "#22AB94",
		wickDownColor: "#F7525F",
	}
};

export const SymbolOverview = React.forwardRef<HTMLDivElement, Partial<MediumWidgetProps & {fallback: React.ReactNode}>>(function SymbolOverviewRoot({ fallback, containerStyles, ...props }, ref) {
	const idRef = useRef(getId());
	const isMounted = useIsMounted();
	const [ isError, setIsError ] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const TradingView = await injectTradingView();
				new TradingView.MediumWidget({
					chartOnly: false,
					locale: "en",
					colorTheme: "dark",
					autosize: false,
					showVolume: false,
					hideDateRanges: false,
					scalePosition:  "right",
					scaleMode: "Normal",
					fontFamily: "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
					fontSize: "10",
					noTimeScale: false,
					valuesTracking: ValuesTracking.FLOATING_TOOLTIP,
					chartType: "line",
					whitelabel: !!props.hideLogo,
					...props,
					width: props.autosize ? "100%" : (props.width || 1000),
					height: props.autosize ? "100%" : (props.height || 500),
					...chartTypeDefaultValues[props.chartType || "line"],
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