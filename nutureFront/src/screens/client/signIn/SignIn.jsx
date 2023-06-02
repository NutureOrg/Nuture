import React from "react";
import { Container, Background, Kav } from "./styles";
import { useNavigation } from "@react-navigation/native";

import Title from "../../../components/title/Title";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import Link from "../../../components/link/Link";

const SignIn = () => {
  const navigation = useNavigation();

  const signIn = () => {
    navigation.navigate("");
  };

  const signUp = () => {
    navigation.navigate("SignUp");
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
          <Button>Entrar</Button>
          <Link onPress={signUp}>Ainda não tem uma conta? Criar</Link>
        </Kav>
      </Background>
    </Container>
  );
};

export default SignIn;
