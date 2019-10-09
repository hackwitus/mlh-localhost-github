const fs = require('fs');
const NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  httpAdapter: 'https'
};

var geocoder = NodeGeocoder(options);

async function getLocations(addresses) {
  const locations = await geocoder
    .batchGeocode(addresses)
    .filter(({ error }) => {
      return !error;
    })
    .map(({ error, value: [result, ...results] }) => {
      console.log(result);
      return {
        lat: result.latitude,
        lng: result.longitude
      };
    });
  return locations;
}

module.exports = {
  getLocations
};
