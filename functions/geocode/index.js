const { locations } = require("./geocode.mock");
const url = require("url");

module.exports.geocodeRequest = (request, response) => {
  const { city } = url.parse(request.url, true).query;
  const locationMock = locations[city.toLowerCase()];
  if (!locationMock) {
    response.send("not found");
  }
  response.json(locationMock);
};
