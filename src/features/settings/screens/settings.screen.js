import { Avatar, List } from "react-native-paper";
import React, { useContext } from "react";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import styled from "styled-components";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[2]};
`;

const FavouritesIcon = (props) => (
  <List.Icon {...props} color={"black"} icon={"heart"} />
);
const LogoutIcon = (props) => (
  <List.Icon {...props} color={"black"} icon={"door"} />
);
const AvtarContainer = styled.View.attrs()`
  align-items: center;
`;
const AvatarIcon = styled(Avatar.Icon)`
  background-color: #2182bd;
`;

export const SettingsScreen = ({ navigation }) => {
  const { user, onLogout } = useContext(AuthenticationContext);
  return (
    <SafeArea>
      <AvtarContainer>
        <AvatarIcon size={180} icon={"human"} />
        <Spacer position={"top"} size={"large"}>
          <Text variant={"label"}>{user.email}</Text>
        </Spacer>
      </AvtarContainer>
      <List.Section>
        <SettingsItem
          title={"Favourites"}
          description={"View your favourites"}
          left={FavouritesIcon}
          onPress={() => navigation.navigate("Favourites")}
        />
        <SettingsItem title={"Logout"} left={LogoutIcon} onPress={onLogout} />
      </List.Section>
    </SafeArea>
  );
};
