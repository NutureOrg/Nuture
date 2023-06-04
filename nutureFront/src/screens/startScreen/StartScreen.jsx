import { React, useState, useEffect } from "react";
import { Container, Background, Kav } from "./styles";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Title from "../../components/title/Title";
import Button from "../../components/button/Button";

const StartScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        navigation.navigate("Profile");
      } else {
        navigation.navigate("SignIn");
      }
    } catch (error) {
      console.error("Erro ao verificar a autenticação:", error);
    }
  };

  const goToSignIn = () => {
    navigation.navigate("SignIn");
  };

  const goToSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <Container>
      <Background source={require("../../assets/BackgroundImage.jpg")}>
        <Title>Bem-vendo ao nosso app!</Title>
        <Button onPress={goToSignIn}>Entrar</Button>
        <Button onPress={goToSignUp}>Criar conta</Button>
      </Background>
    </Container>
  );
};

export default StartScreen;
