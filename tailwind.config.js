/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        club: {
          red: '#CC0000',
          'red-light': '#E53935',
          'red-dark': '#990000',
          black: '#0a0a0a',
          dark: '#141414',
          gray: '#1e1e1e',
          'gray-mid': '#2a2a2a',
          'gray-light': '#3a3a3a',
          white: '#FFFFFF',
          'off-white': '#F5F5F5',
          muted: '#9CA3AF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-red': 'pulseRed 2s infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(40px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        bounceGentle: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        pulseRed: { '0%, 100%': { boxShadow: '0 0 0 0 rgba(204,0,0,0.4)' }, '50%': { boxShadow: '0 0 0 12px rgba(204,0,0,0)' } },
      },
      backgroundImage: {
        'gradient-club': 'linear-gradient(135deg, #0a0a0a 0%, #1a0000 50%, #0a0a0a 100%)',
        'gradient-red': 'linear-gradient(135deg, #CC0000 0%, #990000 100%)',
      },
    },
  },
  plugins: [],
}
