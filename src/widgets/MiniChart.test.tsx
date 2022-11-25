import { MiniChart } from "./MiniChart";
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

test("should render without crashing", () => {
	const { container } = render(<MiniChart/>);
	expect(container).toMatchSnapshot();
});