import React from "react";
import { Container, Background } from "./styles";
import { useNavigation } from '@react-navigation/native';

import Title from "../components/title/Title";
import Button from "../components/button/Button";

const UserChoise = () => {
  const navigation = useNavigation();

  const isClient = () => {
    navigation.navigate('SignIn');
  }

  const isDistribuitor = () => {
    navigation.navigate('');
  }

  return (
    <Container>
      <Background source={require("../assets/BackgroundImage.jpg")}>
        <Title text="Como deseja utilizar nosso app?" />
        <Button onPress={isClient}>Sou Cliente</Button>
        <Button>Centro de Distribuição</Button>
      </Background>
    </Container>
  );
};

export default UserChoise;
