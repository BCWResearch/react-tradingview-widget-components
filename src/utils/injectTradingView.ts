declare global {
    interface Window {
        TradingView?: TradingView;
    }
}

type Widget = { new (options: Record<string, unknown>): {id: string; options: Record<string, unknown>;} }

export interface TradingView {
    host: string;
    ideasHost: string;
    chatHost: string;
    widgetHost: string;
    getHost(e: unknown): string;
    embedStylesForCopyright(): void;
    embedStylesForFullHeight(n: number, hasCopyright: boolean, id: string): void;
    gId(): string;
    isPersentHeight(): boolean;
    getSuffix(): string;
    hasCopyright(id: string): boolean;
    calculateWidgetHeight(num: number, element: unknown): string;
    onready(e: Event): void;
    css(e: unknown): void;
    bindEvent(e: unknown, t: unknown, o: unknown): void;
    unbindEvent(e: unknown, t: unknown, o: unknown): void;
    cloneSimpleObject(e: unknown): typeof e;
    isArray(e: unknown): boolean;
    isMobileDevice(device?: Record<string, boolean>): boolean;
    generateUtmForUrlParams(e: unknown): string;
    WidgetAbstract(): Record<string, unknown>,
    MiniWidget: Widget
    MediumWidget: Widget;
    widget: Widget;
    chart: Widget;
    stream: Widget;
    EventsWidget: Widget;
    IdeasStreamWidget: Widget;
    IdeaWidget: Widget;
    ChatWidgetEmbed: Widget;
}

export const injectTradingView = (signal?: AbortSignal) => {
	return new Promise<TradingView>((resolve, reject) => {
		if (window.TradingView) {
			resolve(window.TradingView);
			return;
		}
		const script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "https://s3.tradingview.com/tv.js";
		script.async = true;
		script.onload = () => {
			if (signal?.aborted) {
				reject(new Error("TradingView Widget script load aborted."));
				return;
			}
			if (!window.TradingView) {
				reject(new Error("Failed to inject TradingView into window"));
				return;
			}
			resolve(window.TradingView);
		};
		script.onerror = () => reject("Failed to inject Trading View script");
		if (!document.querySelector("script[src='https://s3.tradingview.com/tv.js']")) document.head.appendChild(script);
	});
};