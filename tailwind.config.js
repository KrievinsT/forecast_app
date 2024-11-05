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
        'xsm': '590px',
        '530px': '530px', 
        '440px': '440px', 
          
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
