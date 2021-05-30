module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        liner: 'liner 1s ease-in-out infinite alternate',
        shine: 'shine 1s ease-in-out infinite alternate',
      },
      keyframes: {
        liner: {
          from: {
            transform: 'translateX(0rem)',
            width: '30%',
          },
          to: {
            transform: 'translateX(31rem)',
            width: '15%',
          },
        },
        shine: {
          '10%': {
            opacity: 1,
            top: '-30%',
            left: '-30%',
            transitionProperty: 'left, top, opacity',
            transitionDuration: '0.7s, 0.7s, 0.15s',
            transitionTimingFunction: 'ease',
          },
          100: {
            opacity: 0,
            top: '-30%',
            left: '-30%',
            transitionProperty: 'left, top, opacity',
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
