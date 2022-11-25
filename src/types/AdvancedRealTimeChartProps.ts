import type { CSSProperties } from "react";

export enum AdvancedChartBarStyle {
    BARS = "0",
    CANDLES = "1",
    LINE = "2",
    AREA = "3",
    RENKO = "4",
    KAGI = "5",
    POINT_AND_FIGURE = "6",
    LINE_BREAK = "7",
    HEIKIN_ASHI = "8",
    HOLLOW_CANDLES = "9",
}

export interface AdvancedRealTimeChartBaseProps {
    autosize: boolean;
    symbol: string;
    interval: string; //number representing minutes, D for day, W for week
    timezone: string; // "Etc/UTC"
    theme: "light" | "dark";
    style: AdvancedChartBarStyle;
    locale: string; // "en"
    toolbar_bg: CSSProperties["color"];
    enable_publishing: false;
    width: number;
    height: number;
    allow_symbol_change: boolean;
    hide_top_toolbar: boolean;
    hide_side_toolbar: boolean;
    hide_legend: boolean;
    save_image: boolean;
    hideLogo: boolean;
    chartOnly: boolean;
}

export type AdvancedRealTimeChartProps = AdvancedRealTimeChartBaseProps & {containerStyles: CSSProperties};