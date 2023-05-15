import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  AuthTextInput,
  ErrorContainer,
  Title,
} from "../components/account.styles";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import React, { useContext, useState } from "react";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, isLoading, error } = useContext(AuthenticationContext);

  return (
    <AccountBackground>
      <AccountCover />
      <Title>{"Meals To Go"}</Title>
      <AccountContainer>
        <Spacer size={"large"}>
          <AuthTextInput
            label={"E-mail"}
            value={email}
            textContentType={"emailAddress"}
            keyboardType={"email-address"}
            onChangeText={setEmail}
          />
        </Spacer>
        <Spacer size={"large"}>
          <AuthTextInput
            label={"Password"}
            value={password}
            textContentType={"password"}
            onChangeText={setPassword}
            secureTextEntry
          />
        </Spacer>
        {error && (
          <ErrorContainer size="large">
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer size={"large"}>
          {!isLoading ? (
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              onPress={() => onLogin(email, password)}
            >
              Login
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={MD2Colors.blue300} />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
