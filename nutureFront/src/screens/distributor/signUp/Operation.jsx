import React, { useState } from "react";
import { Container, Background, Kav } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";

import Title from "../../../components/title/Title";
import Button from "../../../components/button/Button";

const Operation = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [opening_hours, setOpening_hours] = useState("");

  const handleOpening_hoursChange = (optionKey) => {
    setOpening_hours(optionKey);
  };

  const handleSubmit = () => {
    if (!opening_hours) {
      alert("Informe o funcionamento do seu centro");
      return;
    }

    const { name, email, cnpj, password, description, address } = route.params;

    navigation.navigate("PhoneDist", {
      name,
      email,
      cnpj,
      password,
      description,
      address,
      opening_hours,
    });
  };

  const pickerOptions = [
    { key: "weekdays", label: "De segunda a sexta" },
    { key: "weekends", label: "Apenas finais de semana" },
    { key: "daily", label: "Todos os dias" },
  ];

  return (
    <Container>
      <Background source={require("../../../assets/BackgroundImage.jpg")}>
        <Kav
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <Title text="Em quais dias da semana o seu Centro estará em funcionamento?" />

          {pickerOptions.map((option) => (
            <CheckBox
              key={option.key}
              checked={opening_hours === option.key}
              onPress={() => handleOpening_hoursChange(option.key)}
              title={option.label}
              containerStyle={{
                margin: 10,
                marginLeft: 0,
                marginRight: 0,
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
          ))}

          <Button onPress={handleSubmit}>Continuar</Button>
        </Kav>
      </Background>
    </Container>
  );
};

export default Operation;
