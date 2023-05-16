import { isDevelopment, isMock, localHost } from "../../utils/env";
import { mockImages, mocks } from "./mocks";

import { Platform } from "react-native";
import camalize from "camelize";

export const restaurantsRequest = (location = "37.7749295,-122.4194155") => {
  if (!isMock && Platform.OS !== "android") {
    return fetch(`${localHost}/placesNearby?location=${location}`).then(
      (res) => {
        return res.json();
      }
    );
  } else {
    return new Promise((resolve, reject) => {
      const mock = mocks[location];
      if (!mock) {
        reject("not found");
      }
      resolve(mock);
    });
  }
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    restaurant.photos = restaurant.photos.map((p) => {
      return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
    });
    restaurant.address = restaurant.vicinity;
    restaurant.isOpenNow =
      restaurant.opening_hours && restaurant.opening_hours.open_now;
    restaurant.isClosedTemporarily =
      restaurant.business_status === "CLOSED_TEMPORARILY";
    return restaurant;
  });

  const newResult = camalize(mappedResults);
  return newResult;
};
