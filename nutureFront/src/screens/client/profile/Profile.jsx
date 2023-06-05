import React, { useEffect, useState } from "react";
import { Container, Menu, ScrollViewContainer } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";

import Title from "../../../components/title/Title";
import Button from "../../../components/button/Button";
import Text from "../../../components/text/Text"

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    // Logica 
  };

  const handleDelete = () => {
    // Lógica para excluir o usuário
  };

  const { email, token } = route.params;

  useEffect(() => {
    let isMounted = true;


    const fullToken = `Bearer ${token}`;

    console.log(fullToken)

    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.119:8080/nuture/users/email/${email}`,
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
          setLoading(false)
          console.log(data);

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
    <Container>
      {loading ? (
        <Title style={{ color: "#000", textAlign: "center" }}>
          Carregando...
        </Title>
      ) : (
        <>
          <Text>Nome: {userData.name}</Text>
          <Text>Email: {userData.email}</Text>
          <Text>CPF: {userData.cpf}</Text>
          <Text>Telefone: {userData.phone.phone_number}</Text>
          <Text>Data de nascimento: {userData.birthday}</Text>
          <Text>Sexo: {userData.sex}</Text>
          <Text>Altura: {userData.height}</Text>
          <Text>Peso: {userData.weight}</Text>
          <Text>Frequência alimentar: {userData.food_frequency}</Text>

      {isEditing ? (
        <Button onPress={handleEdit}>Salvar</Button>
      ) : (
        <Button onPress={() => setIsEditing(true)}>Editar</Button>
      )}

      <Button onPress={handleDelete} >Apagar</Button>
        </>
      )}
    </Container>
  );
};

export default Profile;
