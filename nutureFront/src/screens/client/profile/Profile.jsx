import React, { useEffect, useState } from "react";
import { Container, Menu, ScrollViewContainer } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";

import { CheckBox } from "react-native-elements";

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
  const [food_frequency, setFood_frequency] = useState("");

  const handleFrequency = (value) => {
    setFood_frequency(value);
  };

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

  const updateUser = async (updatedUserData) => {
    const id = updatedUserData.id;
    try {
      const response = await fetch(
        `http://192.168.1.119:8080/nuture/users/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedUserData),
          headers: {
            "Content-Type": "application/json",
            Authorization: fullToken,
          },
        }
      );

      console.log(response);

      if (response.ok) {
        setLoading(false);
        console.log("Deu certo e Deus é bom");
        return;
      } else {
        throw new Error(
          "Ocorreu um erro na requisição para editar as informações do usuario"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Ocorreu um erro na requisição para editar as informações do usuario."
      );
    }
  };

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
              <CheckBox
                checked={food_frequency === "THREE_MEALS"}
                onPress={() => handleFrequency("THREE_MEALS")}
                title="Três refeições principais"
                containerStyle={{
                  margin: 0,
                  marginLeft: 0,
                  marginTop: 30,
                  padding: 0,
                  backgroundColor: "transparent",
                  borderWidth: 0,
                  width: 307,
                }}
                checkedColor="#000"
                uncheckedColor="#fff"
                titleProps={{
                  style: {
                    color: "#000",
                    marginLeft: 10,
                    fontSize: 14,
                    fontWeight: "bold",
                    width: "100%",
                  },
                }}
              />
              <CheckBox
                checked={food_frequency === "FOUR_MEALS"}
                onPress={() => handleFrequency("FOUR_MEALS")}
                title="Três refeições principais e um lanche"
                containerStyle={{
                  margin: 0,
                  marginLeft: 0,
                  marginTop: 30,
                  padding: 0,
                  backgroundColor: "transparent",
                  width: 307,
                  borderWidth: 0,
                }}
                checkedColor="#000"
                uncheckedColor="#fff"
                titleProps={{
                  style: {
                    color: "#000",
                    marginLeft: 10,
                    fontSize: 14,
                    fontWeight: "bold",
                    width: "100%",
                  },
                }}
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
