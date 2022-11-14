import typescript from "@rollup/plugin-typescript";

export default {
	input: "src/index.ts",
	output: {
		dir: "dist",
		format: "esm"
	},
	external: [
		"react",
		"react/jsx-runtime"
	],
	plugins: [ typescript({
		exclude: [ "**/*.test.*" ] 
	}) ],
};