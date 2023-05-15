import React, { useContext, useEffect, useState } from "react";

import { LocationContext } from "../../../services/location/location.context";
import { Searchbar } from "react-native-paper";
import styled from "styled-components";

const SearchContainer = styled.View`
  padding: ${({ theme }) => theme.space[3]};
`;

export const Search = ({ isFavouritesToggled, onFavouritesToggle }) => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => setSearchKeyword(keyword), [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        icon={isFavouritesToggled ? "heart" : "heart-outline"}
        onIconPress={onFavouritesToggle}
        elevation={1}
        placeholder={"Search for a location"}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
        autoCorrect={false}
        onSubmitEditing={() => search(searchKeyword)}
        value={searchKeyword}
      />
    </SearchContainer>
  );
};
