import type { CSSProperties } from "react";

export interface MediumWidgetBaseOptions {
    chartOnly: boolean;
    width: string | number;
    height: string | number;
    locale: string;
    colorTheme: "light" | "dark";
    showVolume: boolean;
    hideDateRanges: boolean;
    scalePosition: "no" | "right" | "left";
    scaleMode: "Normal" | "Percentage" | "Logarithmic";
    fontFamily: CSSProperties["fontFamily"];
    fontSize: CSSProperties["fontSize"];
    chartType: ChartType;
    autosize: boolean;
    symbols: ([string, string] | string)[]; // if in tuple form, use [alias, symbol]
    backgroundColor: CSSProperties["backgroundColor"];
    gridLineColor: CSSProperties["color"];
    fontColor: CSSProperties["color"];
    widgetFontColor: CSSProperties["color"];
    hideLogo: boolean;
    valuesTracking: ValuesTracking;
    volumeUpColor: CSSProperties["color"];
    volumeDownColor: CSSProperties["color"];
    noTimeScale: boolean;
}

export interface CandlesticksProps {
    upColor: CSSProperties["color"];
    downColor: CSSProperties["color"];
    borderUpColor: CSSProperties["color"];
    borderDownColor: CSSProperties["color"];
    wickUpColor: CSSProperties["color"];
    wickDownColor: CSSProperties["color"];
}

export interface BarsProps {
    upColor: CSSProperties["color"];
    downColor: CSSProperties["color"];
}

export interface LineProps {
    color?: CSSProperties["color"];
    colorGrowing?: CSSProperties["color"];
    colorFalling?: CSSProperties["color"];
    lineWidth?: number;
}

export interface AreaProps {
    lineColor: CSSProperties["color"];
    lineColorGrowing?: CSSProperties["color"];
    lineColorFalling?: CSSProperties["color"];
    topColor: CSSProperties["color"];
    bottomColor: CSSProperties["color"];
    lineWidth: number;
}

export type ChartType = "candlesticks" | "bars" | "line" | "area";

export type MediumWidgetProps = MediumWidgetBaseOptions & (LineProps | AreaProps | BarsProps | CandlesticksProps) & {containerStyles?: CSSProperties}

export enum ValuesTracking {
	SCALE_LABELS = "0",
	FLOATING_TOOLTIP = "1",
	COLORED_TOOLTIP = "2",
	LEGEND = "3",
}