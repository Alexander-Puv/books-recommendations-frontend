import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'title': ['var(--font-playfair)', 'Georgia', 'Times New Roman', 'serif'],
        'body': ['var(--font-cormorant)', 'Garamond', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config