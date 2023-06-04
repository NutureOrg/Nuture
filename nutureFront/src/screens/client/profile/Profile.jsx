import { React } from "react";
import { Container, ScrollViewContainer } from "./styles";
import { useRoute } from "@react-navigation/native";

import Icon from "react-native-vector-icons/Feather";

import Title from "../../../components/title/Title";
import Button from "../../../components/button/Button";

const Profile = () => {
  return (
    <Container>
      <Title
        style={{
          color: "#000",
          fontWeight: "500",
          paddingTop: 100,
          marginLeft: 30,
        }}
      >
        Olá NomeDoUser
      </Title>
      <Title
        style={{
          color: "#000",
          fontWeight: "400",
          fontSize: 18,
          paddingTop: 50,
          marginLeft: 30,
        }}
      >
        Todas as receitas
      </Title>
      <ScrollViewContainer vertical={true}>

      </ScrollViewContainer>
      <Title
        style={{
          color: "#000",
          fontWeight: "400",
          fontSize: 18,
          paddingTop: 30,
          marginLeft: 30,
        }}
      >
        Programas alimentares
      </Title>
      <ScrollViewContainer vertical={true}>

      </ScrollViewContainer>
      <Button style={{ position: "absolute", bottom: 50, marginLeft: 30 }}>
        <Icon name="plus-square" size={30} />
      </Button>
    </Container>
  );
};

export default Profile;
