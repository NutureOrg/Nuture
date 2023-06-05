import { React, useEffect, useState } from "react";
import { Container, ScrollViewContainer } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Icon from "react-native-vector-icons/Feather";

import Title from "../../../components/title/Title";
import Button from "../../../components/button/Button";

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  const token = AsyncStorage.getItem("token")
  const { email } = route.params;

  const fetchUser = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `http://192.168.1.119:8080/nuture/users/email/${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization : token
          },
        }
      );
  
      if (response.ok) {
        const data = await response.json();

        setUserData({
          name: data.name,
          email: data.email,
          cpf: data.cpf,
          password: data.password,
          phone: data.phone,
          birthday: data.birthday,
          sex: data.sex,
          height: data.height,
          weight: data.weight,
          diets: data.diets,
          recipes: data.recipes,
          food_frequency: data.food_frequency
        });
  
        console.log("Fetch de usuario com sucesso");
        console.log(data);
  
        return
      } else {
        throw new Error("Ocorreu um erro ao fazer login.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocorreu um erro ao fazer login. Tente novamente mais tarde.");
    }
  }
  
  const create = () => {

    navigation.navigate("RecipeOrDiet", {
      name,
      email,
      cpf,
      password,
      phone,
      birthday,
      sex,
      height,
      weight,
    });
  };

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
      <ScrollViewContainer vertical={true}></ScrollViewContainer>
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
      <ScrollViewContainer vertical={true}></ScrollViewContainer>
      <Button
        onPress={create}
        style={{ position: "absolute", bottom: 50, marginLeft: 30 }}
      >
        <Icon name="plus-square" size={30} />
      </Button>
    </Container>
  );
};

export default Profile;
