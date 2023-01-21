/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      primary: '#bae6fd',
      secondary: '#cbd5e1',
      background: '#1e293b',
      background2: '#475569',
      grey: '#94a3b8',
      lightgrey: '#f9fafb',
      black: '#000000',
      amber: '#f59e0b',
      orange: '#ff9800',
      yellow: '#ffeb3b',
      green: '#28a745',
      red: '#e74c3c',
      violet: '#c4b5fd',
      white: '#ffffff',
      amberlight: '#fcd34d'
    },
    screens: {
      sm: '640px',
      md: '768px',
      ps: '1000px',
      lg: '1400px',
      xl: '1650px',
    },
    extend: {
      boxShadow: {
        'box': '0 0px 10px rgba(0, 0, 0, 10px 0.1)',
      },
      boxShadowL: {
        'box': '0 0px 15px rgba(0, 0, 0, 10px 0.1)',
      },

      spacing: {
        '20': '5rem'
      },
    },
  },
  plugins: [],
}
