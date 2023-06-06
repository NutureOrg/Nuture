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
  const [phoneNumber, setPhoneNumber] = useState();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [food_frequency, setFood_frequency] = useState("");

  const { email, token } = route.params;

  const fullyToken = `Bearer ${token}`;

  const handleFrequency = (value) => {
    setFood_frequency(value);
  };

  const handleEdit = async () => {
    // Lógica para salvar as alterações
    const updatedUserData = {
      id: userData.id,
      name: name,
      cpf: userData.cpf,
      email: emailInput,
      height: height,
      weight: weight,
      birthday: userData.birthday,
      sex: userData.sex,
      food_frequency: food_frequency,
      phone: { 
        ddi: 55,
        ddd: 11,
        phone_number: parseInt(phoneNumber)
      },
    };

    setUserData(updatedUserData);
    console.log(updatedUserData)
    await updateUser(updatedUserData);
    setIsEditing(false);
  };

  const handleDeleteUser = async () => {
    const id = userData.id;
    try {
      const response = await fetch(
        `http://192.168.1.119:8080/nuture/users/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: fullyToken,
          },
        }
      );

      console.log(response);

      if (response.ok) {
        setLoading(false);
        console.log("Deu certo e Deus é bom");
        navigation.navigate("StartScreen");
        alert("Usuário deletado com sucesso.");
        return;
      } else {
        throw new Error(
          "Ocorreu um erro na requisição para deletar o usuário."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocorreu um erro na requisição para deletar o usuário.");
    }
  };

  const updateUser = async (updatedUserData) => {
    const id = updatedUserData.id;
    console.log(id)
    console.log(`updatedUserData: ${JSON.stringify(updatedUserData)}`);
    try {
      const response = await fetch(
        `http://192.168.1.119:8080/nuture/users/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedUserData),
          headers: {
            "Content-Type": "application/json",
            Authorization: fullyToken,
          },
        }
      );

      console.log(response);

      if (response.ok) {
        setLoading(false);
        console.log("Deu certo e Deus é bom e o DIABO não existe :envil:");
        return;
      } else {
        throw new Error(
          "Ocorreu um erro na requisição para editar as informações do usuário"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Ocorreu um erro na requisição para editar as informações do usuário."
      );
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.119:8080/nuture/users/email/${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: fullyToken,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setLoading(false);
          console.log(`fetched User: ${userData}`)

          return;
        } else {
          throw new Error("Ocorreu um erro ao iniciar a tela de perfil.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert(
          "Ocorreu um erro ao iniciar a tela de perfil. Tente novamente mais tarde."
        );
      }
    };

    fetchUser();
  }, []);

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
              <Button onPress={handleDeleteUser} style={{ backgroundColor: "red" }}>
                Apagar Usuário
              </Button>
            </ScrollViewContainer>
          ) : (
            <>
              <Text>Nome: {userData.name}</Text>
              <Text>Email: {userData.email}</Text>
              <Text>CPF: {userData.cpf}</Text>
              <Text>Telefone: {userData.phone.phone_number}</Text>
              <Text>Data de Nascimento: {userData.birthday}</Text>
              <Text>Sexo: {userData.sex}</Text>
              <Text>Altura: {userData.height}</Text>
              <Text>Peso: {userData.weight}</Text>
              <Text>Frequência Alimentar: {userData.food_frequency}</Text>
              <Button onPress={() => setIsEditing(true)}>Editar</Button>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Profile;
