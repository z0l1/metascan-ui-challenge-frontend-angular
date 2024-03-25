/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,ts}"],
	theme: {
		extend: {
			colors: {
				theme: {
					1: "#2f4858",
					2: "#33658a",
					3: "#86BBD8",
					4: "#F6AE2D",
					5: "#F26419",
				},
			},
		},
	},
	plugins: [],
};
