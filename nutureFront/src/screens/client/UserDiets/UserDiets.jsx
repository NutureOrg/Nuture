import React, { useState, useEffect } from "react";
import { Container, TextArea, ScrollViewContainer } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";

import Title from "../../../components/title/Title";
import Button from "../../../components/button/Button";

const UserDiets = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [dietData, setDietData] = useState({});
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const { fullyToken } = route.params;
  const token = fullyToken
  const email = userData.email
  
  const logDietData = () => {
    console.log(dietData)
  }

  const goToProfileScreen = () => {
    navigation.navigate("Profile", {
      token,
      email
    })
  }

  useEffect(() => {
    let isMounted = true;

    const { fullyToken, id } = route.params;

  const fetchDietsData = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.119:8080/nuture/users/${id}`,
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
        setUserData(data)
        setDietData(data.diets);
        setLoading(false);

        //if (isMounted) {
        //  setDietData(data.diets);
       //   setLoading(false);
      //    console.log(diet);
       // }
        return;
      } else {
        throw new Error("Ocorreu um erro na requisição de programas alimentares do usuario.");
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

  //TODO:fazer o map dos programas alimentares recebidos
  //TODO:fazer o map dos programas alimentares recebidos
  //TODO:fazer o map dos programas alimentares recebidos
  return (
    <ScrollViewContainer vertical={true}>
      <Container>
        {loading ? (
          <Title style={{ color: "#000", textAlign: "center" }}>
            Carregando...
          </Title>
        ) : (
            <>
          <Title style={{ color: "#658", textAlign: "center" }}>
            Carregou padrinho
          </Title>

          <Button onPress={logDietData}>log diet</Button>

          <Button onPress={goToProfileScreen}>Go to Profile</Button>
          </>
          
          //{dietData.map((diet) => {
        //      <>
         //     <Box></Box>
          //  <Title style={{ color: "#000", fontSize: 22, marginBottom: 20 }}>
         //   diet.description
        //  </Title>
          
            //  <Title
             //   style={{
             //     color: "#909090",
             //     fontSize: 14,
             //     fontWeight: "400",
            //    }}
            //  >
            //</>    {dietData?.description}
            //</Container>  </Title>
            //  </>
         // })}
        )}
      </Container>
    </ScrollViewContainer>
  );
};

export default UserDiets;
