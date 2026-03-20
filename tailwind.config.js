/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["var(--font-quicksand)", "sans-serif"],
      },
      colors: {
        'purple-primary': '#5032F5',
        'purple-dark': '#221750',
        'blue-unselected': '#eff4fc',
        'tip-bg': '#e5e1ff',
        'app-bg': '#f8faff',
        'accent-gold': '#ff9d2b',
      },
      fontWeight: {
        '900': '900',
        '850': '850',
      }
    },
  },
  plugins: [],
}
