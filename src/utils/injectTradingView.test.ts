import "@testing-library/jest-dom";
import { injectTradingView } from "./injectTradingView";
import { fireEvent } from "@testing-library/react";

test("injects script into dom", async () => {
	// TODO: Try to test that the script actually loads into the dom and runs
	const promisedTradingView = injectTradingView();
	const script = document.querySelector("script");
	if (script)	fireEvent.load(script);
	expect(script).not.toBeNull();
	expect(promisedTradingView).rejects.toThrowError();
});