/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Add other customizations here if needed
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.custom-scrollbar::-webkit-scrollbar': {
          width: '6px', // Thinner width for a modern look
        },
        '.custom-scrollbar::-webkit-scrollbar-track': {
          backgroundColor: 'transparent', // Transparent for a cleaner look
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(128, 128, 128, 0.6)', // Semi-transparent for subtle appearance
          borderRadius: '10px', // More rounded corners
          border: '2px solid transparent', // Space around the thumb for a floating effect
          backgroundClip: 'padding-box', // Ensures transparency only on edges
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'rgba(80, 80, 80, 0.8)', // Darker on hover for visibility
        },
        '.custom-scrollbar': {
          scrollbarWidth: 'thin', // Firefox support for thin scrollbar
          scrollbarColor: 'rgba(128, 128, 128, 0.6) transparent', // Thumb and track colors for Firefox
        },
       
        '@media (max-width: 1023px)': {
          '.custom-height': {
            height: 'calc(9 * 5rem)', // Height for all widths up to and including 1023px
          },
        },
        // Reset to default height for widths above 1023px
        '@media (min-width: 1024px)': {
          '.custom-height': {
            height: 'calc(9 * 4.2rem)', // Reset to original height for widths above 1023px
          },
        },
        
      
      });
    },
  ],
};
