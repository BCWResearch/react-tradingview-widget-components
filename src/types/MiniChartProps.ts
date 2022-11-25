import { CSSProperties } from "react";

export enum MiniChartDateRanges {
    ONE_DAY = "1D",
    ONE_MONTH = "1M",
    THREE_MONTHS = "3M",
    ONE_YEAR = "12M",
    FIVE_YEARS = "60M",
    ALL = "ALL",
}

export interface MiniChartBaseProps {
    noTimeScale: boolean;
    symbol: string,
	width: number | string,
	height: number | string,
	locale: string,
	dateRange: MiniChartDateRanges,
	colorTheme: "light" | "dark",
	lineColor: CSSProperties["color"],
	topGradientColor: CSSProperties["color"],
	bottomGradientColor: CSSProperties["color"],
	isTransparent: boolean,
	autosize: boolean,
	largeChartUrl: string,
}

export type MiniChartProps = MiniChartBaseProps & {containerStyles: CSSProperties};