import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SymbolOverview } from "./SymbolOverview";

test("should inject TradingView object into window", () => {
	render(<SymbolOverview/>);
	expect("TradingView" in window).toBeTruthy();
});

test("render should match snapshot", () => {
	const { container } = render(<SymbolOverview/>);
	expect(container).toMatchSnapshot();
});

test("should match manual snapshot", () => {
	const { container } = render(<SymbolOverview/>);
	expect(container).toMatchInlineSnapshot(`
    <div></div>
    `);
});

test("should render fallback onerror", () => {
	// TODO: mock script error
	render(<SymbolOverview/>);
	expect(screen.getByText("ERROR")).toBeInTheDocument();
});

test("should render loading component before onload", () => {
	// TODO: mock script error
	render(<SymbolOverview/>);
	expect(screen.getByText("LOADING")).toBeInTheDocument();
});

