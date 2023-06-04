import { React, useState } from "react";
import { Container, Background, Kav } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";

import Title from "../../../components/title/Title";
import { CheckBox } from "react-native-elements";
import Button from "../../../components/button/Button";

const Frequency = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [food_frequency, setFood_frequency] = useState("");

  const handleFrequency = (value) => {
    setFood_frequency(value);
  };

  const handleSubmit = async () => {
    if (!food_frequency) {
      alert("Selecione uma opção");
      return;
    }

    const { name, email, cpf, password, phone, birthday, sex, height, weight } =
      route.params;

    try {
      const response = await fetch(`http://192.168.1.119:8080/nuture/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          cpf,
          email,
          weight,
          height,
          birthday,
          sex,
          food_frequency,
          password,
          phone,
        }),
      });
      console.log("Frequency Values: ");
      console.log(name);
      console.log(cpf);
      console.log(email);
      console.log(weight);
      console.log(height);
      console.log(birthday);
      console.log(sex);
      console.log(food_frequency);
      console.log(password);
      console.log(phone);

      if (response.ok) {
        alert("Usuário criado com sucesso");

        navigation.navigate(
          "Breakfast", {
            name,
            email,
            cpf,
            password,
            phone,
            birthday,
            sex,
            height,
            weight,
            food_frequency
          }
        );
        
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <Container>
      <Background source={require("../../../assets/BackgroundImage.jpg")}>
        <Kav
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <Title text="Qual é a sua frequência alimentar?" />
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
            checkedColor="#fff"
            uncheckedColor="#fff"
            titleProps={{
              style: {
                color: "#fff",
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
            checkedColor="#fff"
            uncheckedColor="#fff"
            titleProps={{
              style: {
                color: "#fff",
                marginLeft: 10,
                fontSize: 14,
                fontWeight: "bold",
                width: "100%",
              },
            }}
          />
          <Button onPress={handleSubmit}>Continuar</Button>
        </Kav>
      </Background>
    </Container>
  );
};

export default Frequency;
