/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1F6AA5',
        'primary-pressed': '#1C5C90',
        'primary-soft': '#E7F1F8',
        danger: '#DC2626',
        bg: '#F7F8FA',
        surface: '#FFFFFF',
        text: '#0F172A',
        'text-muted': '#475569',
        border: '#E5E7EB',
        'icon-muted': '#9CA3AF'
      },
      fontFamily: {
        inter: ['Inter', 'System']
      },
      borderRadius: {
        md: '16px',
        lg: '20px'
      }
    }
  },
  plugins: []
};
