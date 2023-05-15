import { ActivityIndicator, MD2Colors } from "react-native-paper";
import React, { useContext, useState } from "react";

import { FadeInView } from "../../../components/animations/fade.animation";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { RestaurantList } from "../components/restaurant-list.styles";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Search } from "../components/search.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const renderFlatlistItem = (item, navigation) => {
  return (
    <TouchableOpacity onPress={() => navigateToDetail(item, navigation)}>
      <FadeInView>
        <Spacer position="bottom" size="large">
          <RestaurantInfoCard restaurant={item} />
        </Spacer>
      </FadeInView>
    </TouchableOpacity>
  );
};

const navigateToDetail = (item, navigation) =>
  navigation.navigate("RestaurantDetail", { restaurant: item });

export const RestaurantsScreen = ({ navigation }) => {
  const { isLoading, restaurants } = useContext(RestaurantsContext);
  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={MD2Colors.blue300} />
        </LoadingContainer>
      )}
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => renderFlatlistItem(item, navigation)}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
