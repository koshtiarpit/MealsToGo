import React, { useContext, useEffect, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { Camera } from "expo-camera";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import styled from "styled-components";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;

const InnerSnap = styled.View`
  width: 100%;
  height: 100%;
  z-index: 999;
`;

export const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const Snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current?.takePictureAsync();
      AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

  if (hasPermission === null) {
    return (
      <SafeArea>
        <View />
      </SafeArea>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeArea>
        <Text>{"No access to camera"}</Text>
      </SafeArea>
    );
  }

  return (
    <ProfileCamera
      ref={(camera) => (cameraRef.current = camera)}
      type={Camera.Constants.Type.front}
      ratio="16:9"
    >
      <TouchableOpacity onPress={Snap}>
        <InnerSnap />
      </TouchableOpacity>
    </ProfileCamera>
  );
};
