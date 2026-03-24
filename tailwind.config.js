/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#111111', // Noir Profond
        surface: '#1A1A1A', // Légèrement plus clair pour contraste subtil
        surfaceHighlight: '#222222',
        accent: '#D4AF37', // Or
        textPrimary: '#FFFCF2', // Blanc Crème
        textSecondary: '#A0A0A0', // Gris neutre chaud
      },
      fontFamily: {
        // Prioritize SF Pro Display, then Inter, then system fonts
        sans: ['"SF Pro Display"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
