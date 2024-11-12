describe('Weather Component E2E Test', () => {
  beforeEach(() => {
    // Mock the API response for location
    cy.intercept('GET', 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=*', {
      statusCode: 200,
      body: {
        city: 'Cesis',
        locality: 'Cesis Locality',
        principalSubdivision: 'Cesis Subdivision'
      }
    });

    // Mock the API response for current weather
    cy.intercept('GET', 'https://api.weatherapi.com/v1/current.json?key=1f8a5c56a5744e389e741625240111&q=Cesis&aqi=yes', {
      statusCode: 200,
      body: {
        location: {
          name: 'Cesis',
          tz_id: 'Europe/Riga',
          localtime: '2024-11-11 14:00'
        },
        current: {
          temp_c: 25,
          condition: {
            text: 'Sunny',
            icon: '//cdn.weatherapi.com/weather/64x64/day/113.png'
          },
          air_quality: {
            "gb-defra-index": 3
          }
        }
      }
    });

    // Mock the API response for 10-day forecast
    cy.intercept('GET', 'https://api.weatherapi.com/v1/forecast.json?key=1f8a5c56a5744e389e741625240111&q=Cesis&days=11&aqi=yes', {
      statusCode: 200,
      body: {
        forecast: {
          forecastday: Array.from({ length: 11 }, (_, i) => ({
            date: `2024-11-${12 + i}`,
            day: {
              avgtemp_c: 20 + i,
              condition: {
                text: 'Partly cloudy',
                icon: '//cdn.weatherapi.com/weather/64x64/day/116.png'
              },
              maxwind_kph: 15 + i,
              avghumidity: 50 + i
            },
            hour: Array.from({ length: 24 }, (_, j) => ({
              time: `2024-11-${12 + i} ${j}:00`,
              temp_c: 15 + j,
              condition: {
                text: 'Clear',
                icon: '//cdn.weatherapi.com/weather/64x64/night/113.png'
              },
              wind_kph: 10 + j,
              humidity: 60 + j
            }))
          }))
        }
      }
    });

    cy.visit('https://forecast-app-vtdt.vercel.app');
  });

  it('should input city name and display user location and weather data correctly', () => {

    cy.get('input[placeholder="Search Location"]').type('Cesis');
    
    // Verify the displayed data
    cy.contains('Cesis').should('be.visible');
    cy.contains('Sunny').should('be.visible');
    cy.get('img[src="//cdn.weatherapi.com/weather/64x64/day/113.png"]').should('be.visible');
  });

  it('should display loading indicator during API request', () => {

    cy.get('.loading-indicator').should('be.visible');
  });

  it('should handle API errors gracefully', () => {
    cy.intercept('GET', 'https://api.weatherapi.com/v1/current.json?key=1f8a5c56a5744e389e741625240111&q=Cesis&aqi=yes', {
      statusCode: 404,
      body: { error: { message: 'City not found or doesn’t exist' } }
    });

    cy.visit('https://forecast-app-vtdt.vercel.app');
    cy.contains('City not found or doesn’t exist').should('be.visible');
  });

  it('should open modal and display hourly data for selected day', () => {

    cy.get('input[placeholder="Search Location"]').type('Cesis');

    cy.contains('10 Days').click({ force: true });

    cy.get('div.cursor-pointer').first().click({ force: true });

    cy.get('.fixed.top-0.left-0').should('be.visible');

    // Check if the modal displays the correct date and data
    cy.get('.fixed.top-0.left-0 .text-2xl').should('contain', '2024-11-13');
    cy.get('.fixed.top-0.left-0').contains('Clear').should('be.visible');
    cy.get('.fixed.top-0.left-0').contains('15°C').should('be.visible');
    cy.get('.fixed.top-0.left-0').contains('Wind: 10 km/h').should('be.visible');
    cy.get('.fixed.top-0.left-0').contains('Humidity: 60%').should('be.visible');
  });
});
