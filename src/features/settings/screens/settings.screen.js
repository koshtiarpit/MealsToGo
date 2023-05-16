import { Avatar, List } from "react-native-paper";
import React, { useCallback, useContext, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import { useFocusEffect } from "@react-navigation/native";

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
  const [photo, setPhoto] = useState(null);

  const getProfilePicture = async (currentUser) => {
    const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
    setPhoto(photoUri);
  };

  useFocusEffect(
    useCallback(() => {
      getProfilePicture(user);
    }, [user])
  );

  return (
    <SafeArea>
      <AvtarContainer>
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          {!photo ? (
            <AvatarIcon size={180} icon={"human"} />
          ) : (
            <Avatar.Image
              style={{
                transform: [{ scaleX: -1 }],
              }}
              size={180}
              source={{ uri: photo }}
              backgroundColor="#2182BD"
            />
          )}
        </TouchableOpacity>
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
