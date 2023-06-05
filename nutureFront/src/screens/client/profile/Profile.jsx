import React, { useEffect, useState } from "react";
import { Container, Menu, ScrollViewContainer } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import SyncStorage from "sync-storage";

import Title from "../../../components/title/Title";
import Button from "../../../components/button/Button";

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const { email } = route.params;

  useEffect(() => {
    let isMounted = true;

    const token = SyncStorage.get("token");

    const fullToken = `Bearer ${token}`;

    console.log(fullToken)

    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.108:8080/nuture/users/email/${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: fullToken,
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
            food_frequency: data.food_frequency,
          });

          console.log("Fetch de usuario com sucesso");
          setLoading(false);
          console.log(userData);

          return;
        } else {
          throw new Error("Ocorreu ao iniciar tela profile.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert(
          "Ocorreu um erro ao iniciar tela profile. Tente novamente mais tarde."
        );
      }
    };

    if (loading) {
      fetchUser();
    }

    return () => {
      isMounted = false;
    };
  }, [loading]);

  const create = () => {
    navigation.navigate("RecipeOrDiet");
  };

  return (
    // <Container>
    //   <Title
    //     style={{
    //       color: "#000",
    //       fontWeight: "500",
    //       paddingTop: 100,
    //       marginLeft: 30,
    //     }}
    //   >
    //     Olá NomeDoUser
    //   </Title>
    //   <Title
    //     style={{
    //       color: "#000",
    //       fontWeight: "400",
    //       fontSize: 18,
    //       paddingTop: 50,
    //       marginLeft: 30,
    //     }}
    //   >
    //     Todas as receitas
    //   </Title>
    //   <ScrollViewContainer vertical={true}></ScrollViewContainer>
    //   <Title
    //     style={{
    //       color: "#000",
    //       fontWeight: "400",
    //       fontSize: 18,
    //       paddingTop: 30,
    //       marginLeft: 30,
    //     }}
    //   >
    //     Programas alimentares
    //   </Title>
    //   <ScrollViewContainer vertical={true}></ScrollViewContainer>
    //   <Button
    //     onPress={create}
    //     style={{ position: "absolute", bottom: 50, marginLeft: 30 }}
    //   >
    //     <Icon name="plus-square" size={30} />
    //   </Button>
    // </Container>
    <Container>
      {loading ? (
        <Title style={{ color: "#000", textAlign: "center" }}>
          Carregando...
        </Title>
      ) : (
        <>
          <Title style={{marginTop: 100, color: "#000",}}>{userData.name}</Title>
        </>
      )}
    </Container>
  );
};

export default Profile;
