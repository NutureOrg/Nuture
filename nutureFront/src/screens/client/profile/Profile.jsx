import React, { useEffect, useState } from "react";
import { Container, Menu, ScrollViewContainer } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";

import Title from "../../../components/title/Title";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import Text from "../../../components/text/Text";

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleEdit = () => {
    // Lógica para salvar as alterações
    const updatedUserData = {
      ...userData,
      name: name,
      email: email,
      phone: { phone_number: phoneNumber },
      height: height,
      weight: weight,
    };

    // Chame uma função ou faça uma requisição para salvar as alterações no backend
    // ...

    setUserData(updatedUserData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Lógica para excluir o usuário
  };

  const { email, token } = route.params;

  useEffect(() => {
    let isMounted = true;

    const fullToken = `Bearer ${token}`;

    console.log(fullToken);

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

          setUserData(data);
          setLoading(false);
          console.log(data);

          return;
        } else {
          throw new Error("Ocorreu um erro ao iniciar a tela profile.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert(
          "Ocorreu um erro ao iniciar a tela profile. Tente novamente mais tarde."
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
        <Title style={{ color: "", textAlign: "center" }}>Carregando...</Title>
      ) : (
        <>
          {isEditing ? (
            <ScrollViewContainer vertical={true}>
              <Input placeholder="Nome" value={name} onChangeText={setName} />
              <Input
                placeholder="Email"
                value={emailInput}
                onChangeText={setEmailInput}
              />
              <Input
                placeholder="Telefone"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
              <Input
                placeholder="Altura"
                value={height}
                onChangeText={setHeight}
              />
              <Input
                placeholder="Peso"
                value={weight}
                onChangeText={setWeight}
              />
              <Button onPress={handleEdit}>Salvar</Button>
            </ScrollViewContainer>
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
              <Button onPress={() => setIsEditing(true)}>Editar</Button>
            </>
          )}

          <Button onPress={handleDelete}>Apagar</Button>
        </>
      )}
    </Container>
  );
};

export default Profile;
