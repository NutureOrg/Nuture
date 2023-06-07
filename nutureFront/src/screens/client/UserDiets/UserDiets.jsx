import React, { useState, useEffect } from "react";
import { Container, TextArea, ScrollViewContainer, Header } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { Alert } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import Title from "../../../components/title/Title";
import Button from "../../../components/button/Button";
import Link from "../../../components/link/Link";

const UserDiets = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [dietData, setDietData] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const { fullyToken, id } = route.params;

  const token = fullyToken;
  const email = userData.email;

  const logDietData = () => {
    console.log(dietData);
  };

  const confirmDeleteCompany = (id) => {
    Alert.alert("Confirmação", "Tem certeza que deseja deletar a dieta?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Deletar",
        style: "destructive",
        onPress: () => deleteDiet(id),
      },
    ]);
  };

  const deleteDiet = async (id) => {
    try {
      const response = await fetch(
        `http://192.168.1.108:8080/nuture/diets/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.ok) {
        navigation.navigate("Profile", {
          id,
          token,
        });
        alert("Dieta deletada com sucesso.");
        return;
      } else {
        throw new Error("Ocorreu um erro ao deletar sua dieta.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocorreu um erro ao deletar sua dieta.");
    }
  };

  const goToProfileScreen = () => {
    navigation.navigate("Profile", {
      token,
      email,
    });
  };

  useEffect(() => {
    let isMounted = true;

    const { fullyToken, id } = route.params;

    const fetchDietsData = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.108:8080/nuture/users/${id}`,
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
          setDietData(data.diets);
          setLoading(false);

          return;
        } else {
          throw new Error(
            "Ocorreu um erro na requisição de programas alimentares do usuario."
          );
        }
      } catch (error) {
        console.error("Error:", error);
        alert(
          "Ocorreu um erro na requisição de programas alimentares do usuario."
        );
      }
    };
    if (loading) {
      fetchDietsData();
    }

    return () => {
      isMounted = false;
    };
  }, [loading]);

  return (
    <ScrollViewContainer vertical={true}>
      <Container>
        {loading ? (
          <Title style={{ color: "#000", textAlign: "center" }}>
            Carregando...
          </Title>
        ) : (
          <>
            <Header>
              <Link onPress={goToProfileScreen}>
                <Icon name="arrow-left" size={30} color="#AE8800" />
              </Link>
              <Title
                style={{
                  marginTop: 20,
                  color: "#000",
                  fontWeight: "500",
                  fontSize: 20,
                }}
              >
                Programas alimentares
              </Title>
            </Header>

            {dietData.map((diet, index) => (
              <Collapse
                key={index}
                isExpanded={true}
                style={{
                  padding: 10,
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  marginTop: 50,
                }}
              >
                <CollapseHeader
                  style={{
                    height: 50,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottomWidth: 1,
                    borderColor: "#AE8800",
                  }}
                >
                  <Title
                    style={{
                      fontSize: 20,
                      color: "#AE8800",
                      fontWeight: "600",
                    }}
                  >{`Dieta ${index + 1}`}</Title>
                  <Link
                    style={{ marginBottom: 20 }}
                    onPress={() => confirmDeleteCompany(diet.id)}
                  >
                    <Icon name="trash-2" size={25} color="red" />
                  </Link>
                </CollapseHeader>
                <CollapseBody style={{ flexDirection: "column" }}>
                  <Title
                    style={{
                      fontSize: 18,
                      color: "#000",
                      fontWeight: "500",
                      marginTop: 20,
                    }}
                  >
                    Café da manhã:
                  </Title>
                  <Title
                    style={{
                      fontSize: 14,
                      color: "#cdcdcd",
                      fontWeight: "500",
                      marginTop: 0,
                    }}
                  >
                    {diet.breakfast}
                  </Title>

                  <Title
                    style={{
                      fontSize: 18,
                      color: "#000",
                      fontWeight: "500",
                      marginTop: 10,
                    }}
                  >
                    Almoço:
                  </Title>
                  <Title
                    style={{
                      fontSize: 14,
                      color: "#cdcdcd",
                      fontWeight: "500",
                      marginTop: 0,
                    }}
                  >
                    {diet.lunch}
                  </Title>

                  <Title
                    style={{
                      fontSize: 18,
                      color: "#000",
                      fontWeight: "500",
                      marginTop: 10,
                    }}
                  >
                    Jantar:
                  </Title>
                  <Title
                    style={{
                      fontSize: 14,
                      color: "#cdcdcd",
                      fontWeight: "500",
                      marginTop: 0,
                    }}
                  >
                    {diet.dinner}
                  </Title>

                  <Title
                    style={{
                      fontSize: 18,
                      color: "#000",
                      fontWeight: "500",
                      marginTop: 10,
                    }}
                  >
                    Descrição:
                  </Title>
                  <Title
                    style={{
                      fontSize: 14,
                      color: "#cdcdcd",
                      fontWeight: "500",
                      marginTop: 0,
                    }}
                  >
                    {diet.description}
                  </Title>
                </CollapseBody>
              </Collapse>
            ))}
          </>
        )}
      </Container>
    </ScrollViewContainer>
  );
};

export default UserDiets;
