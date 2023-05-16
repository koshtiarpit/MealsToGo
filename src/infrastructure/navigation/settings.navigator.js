import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import { CameraScreen } from "../../features/settings/screens/camera.screen";
import { FavouritesScreen } from "../../features/settings/screens/favourites.screen";
import React from "react";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = ({ route, navigation }) => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsStack.Screen
        name="Settingss"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <SettingsStack.Screen
        options={{
          headerBackTitle: "Settings",
          headerShown: true,
        }}
        name="Favourites"
        component={FavouritesScreen}
      />
      <SettingsStack.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          headerBackTitle: "Settings",
          headerShown: true,
        }}
      />
    </SettingsStack.Navigator>
  );
};
