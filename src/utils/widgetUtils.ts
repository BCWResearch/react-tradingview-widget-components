export const getId = (): string => {
	return "tradingview_" + (1048576 * (1 + Math.random()) | 0).toString(16).substring(1);
};