/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '982px': '982px',
        '890px': '890px', 
        'max-890': { 'max': '890px' },  
        'max-530': { 'max': '530px' },
        'xsm': '590px',
        '530px': '530px', 
        '440px': '440px', 
        '640px': '640px', 
        '425px': '425px', 
        'max440': { 'max': '440px' }, 
        '387px': '387px', 
        'max386': { 'max': '386px' },
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },

        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
        // Add the spinning animation keyframes
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideIn: 'slideIn 0.3s ease-out forwards',
        slideOut: 'slideOut 0.3s ease-out forwards',
        // Define the spin animation here
        spin: 'spin 1s linear infinite',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.custom-scrollbar::-webkit-scrollbar': {
          width: '6px', 
        },
        '.custom-scrollbar::-webkit-scrollbar-track': {
          backgroundColor: 'transparent', 
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(128, 128, 128, 0.6)', 
          borderRadius: '10px', 
          border: '2px solid transparent', 
          backgroundClip: 'padding-box', 
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'rgba(80, 80, 80, 0.8)', 
        },
        '.custom-scrollbar': {
          scrollbarWidth: 'thin', 
          scrollbarColor: 'rgba(128, 128, 128, 0.6) transparent',
        },

        '.hide-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none', 
          'scrollbar-width': 'none', 
        },
       
        '@media (max-width: 1023px)': {
          '.custom-height': {
            height: 'calc(9 * 5rem)', 
          },
        },
        
        '@media (min-width: 1024px)': {
          '.custom-height': {
            height: 'calc(9 * 4.2rem)', 
          },
        },
        '@media (max-width: 982px)': {
          '.responsive-width': {
            width: ' 100% !important',
            paddingRight: '0 !important',
          },
        },
        
        '.no-select': {
          userSelect: 'none',
          '-webkit-user-select': 'none', 
          '-moz-user-select': 'none', 
        },
      });
    },
  ],
};
