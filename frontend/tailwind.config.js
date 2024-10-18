/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				text: "var(--text)",
				background: "var(--background)",
				primary: "var(--primary)",
				secondary: "var(--secondary)",
				accent: "var(--accent)",
			},
			boxShadow: {
				"3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
			},

			fontSize: {
				// sm: '0.750rem',
				// base: '1rem',
				// xl: '1.333rem',
				// '2xl': '1.777rem',
				// '3xl': '2.369rem',
				// '4xl': '3.158rem',
				// '5xl': '4.210rem',
			},
			fontFamily: {
				heading: "Suwannaphum",
				body: "PT Sans Caption",
				homeTitle: "Yeseva One",
				handwriting: "Caveat",
			},
			fontWeight: {
				normal: "400",
				bold: "700",
			},
		},
	},
	darkMode: "class",
	plugins: [require("@tailwindcss/forms")],

	// daisyui: {
	// 	themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
	// 	darkTheme: "dark", // name of one of the included themes for dark mode
	// 	base: true, // applies background color and foreground color for root element by default
	// 	styled: true, // include daisyUI colors and design decisions for all components
	// 	utils: true, // adds responsive and modifier utility classes
	// 	prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
	// 	logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
	// 	themeRoot: ":root", // The element that receives theme color CSS variables
	// },
};
