import React from "react";
import { Container, Background, Kav } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";

import Title from "../../../components/title/Title";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import Link from "../../../components/link/Link";

const SignIn = () => {
  const route = useRoute();
  const userType = route.params?.userType || "";

  const navigation = useNavigation();

  const signIn = () => {
    navigation.navigate("");
  };

  const signUpClient = () => {
    navigation.navigate("SignUp");
  };

  const signUpDistributor = () => {
    navigation.navigate("SignUpDist");
  };

  return (
    <Container>
      <Background source={require("../../../assets/BackgroundImage.jpg")}>
        <Kav
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <Title text="Preencha as informações para entrar na sua conta" />
          <Input placeholder="E-mail" />
          <Input placeholder="Senha" />
          <Button onPress={signIn}>Entrar</Button>
          {userType === "client" && (
            <Link onPress={signUpClient}>Criar conta como cliente</Link>
          )}
          {userType === "distributor" && (
            <Link onPress={signUpDistributor}>
              Criar conta como centro de distribuição
            </Link>
          )}
        </Kav>
      </Background>
    </Container>
  );
};

export default SignIn;
