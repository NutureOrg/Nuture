import React, { useEffect, useState } from "react";
import { Container, Menu, ScrollViewContainer, Header, Barra } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { CheckBox } from "react-native-elements";

import Title from "../../../components/title/Title";
import Input from "../../../components/input/Input";
import Link from "../../../components/link/Link";
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

  const goToDietScreen = () => {
    const id = userData.id;
    const name = userData.name;
    const email = userData.email;
    const cpf = userData.cpf;
    const password = userData.password;
    const phone = userData.phone;
    const birthday = userData.birthday;
    const sex = userData.sex;
    const height = userData.height;
    const weight = userData.weight;
    const food_frequency = userData.food_frequency;

    navigation.navigate("Breakfast", {
      id,
      name,
      email,
      cpf,
      password,
      phone,
      birthday,
      sex,
      height,
      weight,
      food_frequency,
      fullyToken,
    });
  };

  const goToRecipeScreen = () => {
    const id = userData.id;
    const height = userData.height;
    const weight = userData.weight;

    navigation.navigate("Ingredients", {
      id,
      height,
      weight,
      fullyToken,
    });
  };

  const goToUserDietScreen = () => {
    const id = userData.id;
    const height = userData.height;
    const weight = userData.weight;

    navigation.navigate("UserDiets", {
      id,
      height,
      weight,
      fullyToken,
    });
  };

  const goToUserRecipeScreen = () => {
    const id = userData.id;
    const height = userData.height;
    const weight = userData.weight;

    navigation.navigate("UserRecipes", {
      id,
      height,
      weight,
      fullyToken,
    });
  };

  const handleDeleteUser = async () => {
    const id = userData.id;
    try {
      const response = await fetch(
        `http://192.168.1.108:8080/nuture/users/${id}`,
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

  const handleEdit = async () => {
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
        phone_number: parseInt(phoneNumber),
      },
    };

    setUserData(updatedUserData);
    console.log(updatedUserData);
    await updateUser(updatedUserData);
    setIsEditing(false);
  };

  const updateUser = async (updatedUserData) => {
    const id = updatedUserData.id;
    console.log(id);
    console.log(`updatedUserData: ${JSON.stringify(updatedUserData)}`);
    try {
      const response = await fetch(
        `http://192.168.1.108:8080/nuture/users/${id}`,
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
        alert("As informações do usuário foram editadas com sucesso.");
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
          `http://192.168.1.108:8080/nuture/users/email/${email}`,
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
              <Title style={{ color: "#AE8800" }}>
                Você está editando suas informações
              </Title>
              <Input
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                style={{ width: "100%" }}
              />
              <Input
                placeholder="Email"
                value={emailInput}
                style={{ width: "100%" }}
                onChangeText={setEmailInput}
              />
              <Input
                placeholder="Telefone"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                style={{ width: "100%" }}
              />
              <Input
                placeholder="Altura"
                value={height}
                onChangeText={setHeight}
                style={{ width: "100%" }}
              />
              <Input
                placeholder="Peso"
                value={weight}
                onChangeText={setWeight}
                style={{ width: "100%" }}
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
                checkedColor="#AE8800"
                uncheckedColor="#AE8800"
                titleProps={{
                  style: {
                    color: "#AE8800",
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
                  marginTop: 10,
                  padding: 0,
                  backgroundColor: "transparent",
                  width: 307,
                  borderWidth: 0,
                }}
                checkedColor="#AE8800"
                uncheckedColor="#AE8800"
                titleProps={{
                  style: {
                    color: "#AE8800",
                    marginLeft: 10,
                    fontSize: 14,
                    fontWeight: "bold",
                    width: "100%",
                  },
                }}
              />
              <Button onPress={handleEdit} style={{ width: "100%" }}>
                Salvar
              </Button>
              <Button
                onPress={handleDeleteUser}
                style={{ backgroundColor: "red", width: "100%" }}
              >
                Apagar Usuário
              </Button>
            </ScrollViewContainer>
          ) : (
            <ScrollViewContainer>
              <Header>
                <Title
                  style={{ color: "#000", fontSize: 20, fontWeight: "500" }}
                >
                  Olá, {userData.name}
                </Title>
                <Link
                  onPress={() => setIsEditing(true)}
                  style={{ marginBottom: 20 }}
                >
                  <Icon name="edit" size={25} color="#AE8800" />
                </Link>
              </Header>
              <Barra />
              <Text
                style={{
                  marginTop: 20,
                  color: "#909090",
                  fontSize: 18,
                  fontWeight: "400",
                }}
              >
                A sua saúde e bem-estar são nossa prioridade, e estamos
                empenhados em ajudá-lo a superar as carências alimentares. Nosso
                app foi desenvolvido com esse objetivo em mente, oferecendo
                recursos e orientações para garantir que você tenha acesso a um
                programa alimentar balanceado e nutritivo.
              </Text>
              <Button
                onPress={goToDietScreen}
                style={{
                  marginTop: 0,
                  width: "100%",
                  backgroundColor: "#AE8800",
                }}
              >
                Criar Programa Alimentar
              </Button>
              <Text
                style={{
                  marginTop: 20,
                  color: "#909090",
                  fontSize: 18,
                  fontWeight: "400",
                }}
              >
                Entendemos que cada indivíduo tem necessidades alimentares
                únicas, e é por isso que nosso app oferece opções
                personalizadas. Você poderá criar receitas adaptadas às suas
                necessidades específicas.
              </Text>
              <Button
                onPress={goToRecipeScreen}
                style={{
                  marginTop: 0,
                  width: "100%",
                  backgroundColor: "#AE8800",
                }}
              >
                Criar Receita
              </Button>
              <Text
                style={{
                  marginTop: 20,
                  color: "#909090",
                  fontSize: 18,
                  fontWeight: "400",
                }}
              >
                Com a funcionalidade de visualização de programas alimentares já
                criados, você pode revisitar suas dietas personalizadas e obter
                uma visão completa das escolhas alimentares que você fez
                anteriormente.
              </Text>
              <Button
                onPress={goToUserDietScreen}
                style={{
                  marginTop: 0,
                  width: "100%",
                  backgroundColor: "#AE8800",
                }}
              >
                Programas cadastrados
              </Button>
              <Text
                style={{
                  marginTop: 20,
                  color: "#909090",
                  fontSize: 18,
                  fontWeight: "400",
                }}
              >
                A página de receitas cadastradas do usuário é uma ferramenta que
                permite acessar e visualizar as receitas que você salvou
                anteriormente. Com essa funcionalidade, você pode revisitar suas
                criações culinárias e ter uma visão abrangente das deliciosas
                escolhas alimentares que você fez ao longo do tempo.
              </Text>
              <Button
                onPress={goToUserRecipeScreen}
                style={{
                  marginTop: 0,
                  width: "100%",
                  backgroundColor: "#AE8800",
                }}
              >
                Receitas cadastradas
              </Button>
            </ScrollViewContainer>
          )}
        </>
      )}
    </Container>
  );
};

export default Profile;
