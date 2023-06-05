import { React, useState, useEffect } from "react";
import { Container, Background, Kav } from "./styles";
import { useNavigation } from "@react-navigation/native";

import Title from "../../components/title/Title";
import Button from "../../components/button/Button";

const StartScreen = () => {
  const navigation = useNavigation();

  const goToSignIn = () => {
    navigation.navigate("SignIn");
  };

  const goToSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <Container>
      <Background source={require("../../assets/BackgroundImage.jpg")}>
        <Title>Bem-vindo ao nosso app!</Title>
        <Button onPress={goToSignIn}>Entrar</Button>
        <Button onPress={goToSignUp}>Criar conta</Button>
      </Background>
    </Container>
  );
};

export default StartScreen;
