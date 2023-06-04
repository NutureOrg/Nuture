import React, { useState, useEffect } from "react";
import { Container, Background, Kav } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextInputMask } from "react-native-masked-text";

import Title from "../../../components/title/Title";
import { CheckBox } from "react-native-elements";
import Button from "../../../components/button/Button";

const Gender = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [sex, setSex] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [formattedHeight, setFormattedHeight] = useState("");
  const [formattedWeight, setFormattedWeight] = useState("");

  useEffect(() => {
    setFormattedHeight(`${height}cm`);
  }, [height]);

  useEffect(() => {
    setFormattedWeight(`${weight}kg`);
  }, [weight]);

  const handleSexChange = (value) => {
    setSex(value);
  };

  const handleHeightChange = (value) => {
    setHeight(value);
  };

  const handleWeightChange = (value) => {
    setWeight(value);
  };

  const handleSubmit = () => {
    if (!sex || !height || !weight) {
      alert("Preencha todos os campos");
      return;
    }

    const { name, email, cpf, password, phone, birthday } = route.params;

    navigation.navigate("Frequency", {
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
      <Background source={require("../../../assets/BackgroundImage.jpg")}>
        <Kav
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <Title>Antes de prosseguir, precisamos de algumas informações importantes sobre você</Title>
          <Title style={{marginTop: 20}}>Sexo</Title>
          <CheckBox
            checked={sex === "male"}
            onPress={() => handleSexChange("male")}
            title="Masculino"
            containerStyle={{
              margin: 0,
              padding: 0,
              backgroundColor: "transparent",
              borderWidth: 0,
            }}
            checkedColor="#fff"
            uncheckedColor="#fff"
            titleProps={{
              style: {
                color: "#fff",
                marginLeft: 10,
                fontSize: 16,
                fontWeight: "bold",
              },
            }}
          />
          <CheckBox
            checked={sex === "female"}
            onPress={() => handleSexChange("female")}
            title="Feminino"
            containerStyle={{
              margin: 0,
              marginTop: 10,
              padding: 0,
              backgroundColor: "transparent",
              borderWidth: 0,
            }}
            checkedColor="#fff"
            uncheckedColor="#fff"
            titleProps={{
              style: {
                color: "#fff",
                marginLeft: 10,
                fontSize: 16,
                fontWeight: "bold",
              },
            }}
          />
          <Title style={{marginTop: 30}}>Altura</Title>
          <TextInputMask
            style={{
              width: 307,
              height: 55,
              paddingLeft: 10,
              borderRadius: 10,
              backgroundColor: "#fff",
            }}
            placeholder="Ex: 170 cm"
            type={"custom"}
            options={{
              mask: "999cm",
            }}
            value={formattedHeight}
            onChangeText={handleHeightChange}
          />
          <Title style={{marginTop: 30}}>Peso atual</Title>
          <TextInputMask
            style={{
              width: 307,
              height: 55,
              paddingLeft: 10,
              borderRadius: 10,
              backgroundColor: "#fff",
            }}
            placeholder="Ex: 70 kg"
            type={"custom"}
            options={{
              mask: "99kg",
            }}
            value={formattedWeight}
            onChangeText={handleWeightChange}
          />
          <Button onPress={handleSubmit}>Continuar</Button>
        </Kav>
      </Background>
    </Container>
  );
};

export default Gender;
