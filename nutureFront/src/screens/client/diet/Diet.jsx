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

const Diet = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [dietData, setDietData] = useState({});
  const [loading, setLoading] = useState(true);

  const { fullyToken, id } = route.params;

  const fetchUser = async () => {
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
        setDietData(data.diets);
        setLoading(false);
        console.log(`diet Data:: ${dietData}`);

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

  const saveDiet = async () => {
    const dietToSave = {
      description: dietData.description,
      breakfast: dietData.breakfast,
      lunch: dietData.lunch,
      afternoon_coffee: dietData?.afternoon_coffee,
      dinner: dietData.dinner,
      user: {
        id: id,
      },
    };

    const jsonDiet = JSON.stringify(dietToSave);
    console.log(jsonDiet);
    console.log(fullyToken);
    try {
      const response = await fetch(`http://192.168.1.108:8080/nuture/diets`, {
        method: "POST",
        body: jsonDiet,
        headers: {
          "Content-Type": "application/json",
          Authorization: fullyToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        navigation.navigate("UserDiets", {
          id,
          fullyToken,
        });
        return;
      } else {
        throw new Error("Ocorreu um erro na requisição de salvar Dieta");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocorreu um erro na requisição de salvar Dieta");
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchDietData = async () => {
      let diet = {};

      const { height, weight, breakfast, food_frequency, lunch } = route.params;

      const fourMealsPrompt = `generate a JSON for a diet table for a person with a height of ${height}cm and weight of ${weight}kg, with attributes breakfast, lunch, afternoon coffee, and dinner. In each attribute, include the meal times.

translate the attributes value into Portuguese (THE ATTRIBUTE NAME MUST BE IN ENGLISH AND ALL THE ATTRIBUTES VALUE MUST BE WITH MAXIMUM 150 CHARACTERES)

The diet should be designed for a duration only.

Given that this person can only consume the following foods for breakfast and afternoon coffee: (${breakfast})

Given that this person can only consume the following foods for lunch and dinner: (${lunch})

Using only these attributes:

breakfast:
lunch:
afternoon coffee:
dinner:

All attributes must be well-detailed text strings and include:

Quantities in grams
Meal times
Clearly state that the meal will meet the person's needs.
Use this JSON as an example:

{
"breakfast": "For breakfast, you can have a meal around 8:00 AM consisting of 2 scrambled eggs with bread and flour.",
"lunch": "For lunch, you can have a satisfying meal with 1 ladle of beans, 2 servings of rice, and 2 pieces of meat.",
"afternoon coffee": "For afternoon coffee, you can have a lighter meal of 2 scrambled eggs and bread.",
"dinner": "For dinner, you can have a filling meal with 1 and a half ladles of beans and 2 servings of rice.",
"description": "<Always make it clear at the end of the messages that if the user doesn't have any of the foods, they can go to the donation centers>"
}`;

      const threeMealsPrompt = `generate a JSON for a diet table for a person with a height of ${height}cm and weight of ${weight}kg, with attributes breakfast, lunch, and dinner. In each attribute, include the meal times.

translate the attributes value into Portuguese (THE ATTRIBUTE NAME MUST BE IN ENGLISH)

The diet should be designed for a duration only.

Given that this person can only consume the following foods for breakfast: (${breakfast})

Given that this person can only consume the following foods for lunch and dinner: (${lunch})

Using only these attributes:

breakfast:
lunch:
dinner:

All attributes must be well-detailed text strings and include:

Quantities in grams
Meal times
Clearly state that the meal will meet the person's needs.
Use this JSON as an example:

{
"breakfast": "For breakfast, you can have a meal around 8:00 AM consisting of 2 scrambled eggs with bread and flour.",
"lunch": "For lunch, you can have a satisfying meal with 1 ladle of beans, 2 servings of rice, and 2 pieces of meat.",
"dinner": "For dinner, you can have a filling meal with 1 and a half ladles of beans and 2 servings of rice.",
"description": "Chatgpt, put description of how to make generally of all this food"
} 
`;

      var finalPrompt = "";
      if (food_frequency === "THREE_MEALS") {
        finalPrompt = threeMealsPrompt;
      } else {
        finalPrompt = fourMealsPrompt;
      }

      try {
        const client = axios.create({
          headers: {
            Authorization: `Bearer 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`,
          },
        });
        const params = {
          messages: [{ role: "user", content: finalPrompt }],
          model: "gpt-3.5-turbo",
          max_tokens: 1000,
          temperature: 0.7,
        };

        const response = await client.post(
          "https://api.openai.com/v1/chat/completions",
          params
        );

        if (isMounted) {
          diet = JSON.parse(response.data.choices[0].message.content);
          setDietData(diet);
          setLoading(false);
          console.log(diet);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        alert("Ocorreu um erro, tente novamente mais tarde.");
      }
    };

    if (loading) {
      fetchDietData();
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
            <Title style={{ color: "#000", fontSize: 22, marginBottom: 20 }}>
              Programa alimentar
            </Title>
            <Collapse style={{ width: 307 }} isExpanded={true}>
              <CollapseHeader>
                <Title style={{ color: "#AE8800", fontSize: 18 }}>
                  Descrição
                </Title>
              </CollapseHeader>
              <CollapseBody>
                <Title
                  style={{
                    color: "#909090",
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                  {dietData?.description}
                </Title>
              </CollapseBody>
            </Collapse>
            <Collapse style={{ width: 307 }} isExpanded={true}>
              <CollapseHeader collapsed={false}>
                <Title style={{ color: "#AE8800", fontSize: 18 }}>
                  Café da manhã
                </Title>
              </CollapseHeader>
              <CollapseBody>
                <Title
                  style={{
                    color: "#909090",
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                  {dietData?.breakfast}
                </Title>
              </CollapseBody>
            </Collapse>
            <Collapse style={{ width: 307 }} isExpanded={true}>
              <CollapseHeader>
                <Title style={{ color: "#AE8800", fontSize: 18 }}>Almoço</Title>
              </CollapseHeader>
              <CollapseBody>
                <Title
                  style={{
                    color: "#909090",
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                  {dietData?.lunch}
                </Title>
              </CollapseBody>
            </Collapse>

            {route.params.food_frequency === "FOUR_MEALS" && (
              <Collapse style={{ width: 307 }} isExpanded={true}>
                <CollapseHeader>
                  <Title style={{ color: "#AE8800", fontSize: 18 }}>
                    Lanche da tarde
                  </Title>
                </CollapseHeader>
                <CollapseBody>
                  <Title
                    style={{
                      color: "#909090",
                      fontSize: 14,
                      fontWeight: "400",
                    }}
                  >
                    {dietData?.["afternoon coffee"]}
                  </Title>
                </CollapseBody>
              </Collapse>
            )}

            <Collapse style={{ width: 307 }} isExpanded={true}>
              <CollapseHeader>
                <Title style={{ color: "#AE8800", fontSize: 18 }}>Jantar</Title>
              </CollapseHeader>
              <CollapseBody>
                <Title
                  style={{
                    color: "#909090",
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                  {dietData?.dinner}
                </Title>
              </CollapseBody>
            </Collapse>

            <Button onPress={saveDiet}>Salvar Plano Alimentar</Button>
          </>
        )}
      </Container>
    </ScrollViewContainer>
  );
};

export default Diet;
