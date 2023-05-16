import { isDevelopment, isMock, localHost } from "../../utils/env";

import { Platform } from "react-native";
import camelize from "camelize";
import { locations } from "./location.mock";

export const locationRequest = (searchTerm) => {
  if (!isMock && Platform.OS !== "android") {
    return fetch(`${localHost}/geocode?city=${searchTerm}`).then((res) => {
      return res.json();
    });
  } else {
    return new Promise((resolve, reject) => {
      const locationMock = locations[searchTerm];
      if (!locationMock) {
        reject("not found");
      }
      resolve(locationMock);
    });
  }
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;
  return { lat, lng, viewport: geometry.viewport };
};
