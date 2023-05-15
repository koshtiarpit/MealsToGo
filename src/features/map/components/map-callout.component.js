import { CompactRestaurantInfo } from "../../../components/restaurant/compact-restaurant-info.component";
import React from "react";

export const MapCallout = ({ restaurant }) => {
  return <CompactRestaurantInfo restaurant={restaurant} isMap />;
};
