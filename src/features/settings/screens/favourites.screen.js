import React, { useContext } from "react";

import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";
import { RestaurantList } from "../../restaurants/components/restaurant-list.styles";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";

const navigateToDetail = (item, navigation) =>
  navigation.navigate("RestaurantDetail", { restaurant: item });
const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

const renderFlatlistItem = (item, navigation) => {
  return (
    <TouchableOpacity onPress={() => navigateToDetail(item, navigation)}>
      <Spacer position="bottom" size="large">
        <RestaurantInfoCard restaurant={item} />
      </Spacer>
    </TouchableOpacity>
  );
};

export const FavouritesScreen = ({ navigation }) => {
  const { favourites } = useContext(FavouritesContext);
  return favourites.length ? (
    <SafeArea>
      <RestaurantList
        data={favourites}
        renderItem={({ item }) => renderFlatlistItem(item, navigation)}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  ) : (
    <NoFavouritesArea>
      <Text>{"No favourites yet"}</Text>
    </NoFavouritesArea>
  );
};
