const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    //baseUrl: 'https://deckofcardsapi.com',
    baseUrl: 'http://165.227.93.41/cgitar',
    watchForFileChanges: false // usado na geração do token, pois se mantar true o teste fica em looping
  },
});
