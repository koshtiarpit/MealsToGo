import React, { useContext, useEffect, useState } from "react";

import { LocationContext } from "../../../services/location/location.context";
import { Searchbar } from "react-native-paper";
import styled from "styled-components";

const SearchContainer = styled.View`
  padding: ${({ theme }) => theme.space[3]};
  position: absolute;
  z-index: 999;
  top: 40px;
  width: 100%;
`;

export const Search = () => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        elevation={1}
        placeholder={"Search for a location"}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
        icon={"map"}
        autoCorrect={false}
        onSubmitEditing={() => search(searchKeyword)}
        value={searchKeyword}
      />
    </SearchContainer>
  );
};
