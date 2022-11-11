import {
	render, screen 
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { SymbolOverview } from "./SymbolOverview";
import { injectTradingView } from "../utils/injectTradingView";

const mockedInjectTradingView = jest.mocked(injectTradingView);

jest.mock("../utils/injectTradingView", () => ({
	injectTradingView: jest.fn(async () => ({
		MediumWidget: function(props: unknown) {
			const node = document.querySelector("#mockedId");
			if (node) node.innerHTML = "WIDGET";
			return props;
		} 
	})), 
}));

jest.mock("../utils/widgetUtils", () => ({
	getId: jest.fn(() => "mockedId")
}));

test("renders widget inside div with id", async () => {
	render(<SymbolOverview/>);
	expect(await screen.findByText(/WIDGET/)).toBeInTheDocument();
});

test("containing div id should be the same on rerender", async () => {
	const { rerender, container } = render(<SymbolOverview/>);
	expect(await screen.findByText(/WIDGET/)).toBeInTheDocument();
	expect(container).toMatchSnapshot();
	rerender(<SymbolOverview chartOnly/>);
	expect(container).toMatchSnapshot();
});

test("should render fallback on error", async () => {
	mockedInjectTradingView.mockImplementation(async () => {throw new Error();});
	render(<SymbolOverview fallback="ERROR"/>);
	expect(await screen.findByText(/ERROR/)).toBeInTheDocument();
});

