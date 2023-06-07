import React, { useState, useEffect } from "react";
import { Container, Background, Header, ScrollViewContainer } from "./styles";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";

import Title from "../../../components/title/Title";
import Text from "../../../components/text/Text";
import Link from "../../../components/link/Link";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";

import Icon from "react-native-vector-icons/Feather";

const Recipe = () => {
  const [ingredients, setIngredients] = useState("");
  const navigation = useNavigation();
  const [recipe, setRecipe] = useState({});
  const route = useRoute();
  const [loading, setLoading] = useState(true);

  const { id, height, weight, fullyToken } = route.params;

  const token = fullyToken;

  const handleIngredientChange = (value) => {
    setIngredients(value);
  };

  const goToProfileScreen = () => {
    navigation.navigate("Profile", {
      token,
    });
  };

  const saveRecipe = async () => {
    const recipeToSave = {
      description: recipe.description,
      ingredients: {
        food: [],
        quantity: [],
        category: [],
      },
    };

    recipe.listFood.forEach((ingredient) => {
      recipeToSave.ingredients.push(ingredient);
    });

    const jsonRecipe = JSON.stringify(recipeToSave);

    try {
      const response = await fetch("http://192.168.1.108:8080/nuture/recipes", {
        method: "POST",
        body: jsonRecipe,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        navigation.navigate("", {
          id,
          token,
        });
        return;
      } else {
        throw new Error("Ocorreu um erro na requisição de salvar a receita.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocorreu um erro na requisição de salvar a receita.");
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchRecipe = async () => {
      let recipeee = {};
      const { height, weight, ingredients } = route.params;
      try {
        const client = axios.create({
          headers: {
            Authorization: `Bearer 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`,
          },
        });
        const params = {
          messages: [
            {
              role: "user",
              content: `Generate a JSON of a recipe table for a person with a ${height}cm of 1.75m and weight of ${weight}kg, with the attributes "listFood" (a list of ingredients), "methodPreparation" (a string with a detailed description of the recipe preparation), "recipeDescription", and "category".
  
          ${ingredients}
          
          Generate a recipe IN PORTUGUESE that will maximize the amount of food possible while providing the highest satiety, and make it clear in the attribute. All attributes must be well-detailed text strings.
          
          Create a cool recipe with a user-friendly preparation method, including the following details:
          - Quantities in grams
          - Meal times
          - Clearly state that the recipe will meet the person's needs.
          
          Use this JSON example:
          
          {
            "listFood": [
              {
                "food": "rice",
                "quantity": "200g",
                "category": "Grains"
              },
              {
                "food": "eggs",
                "quantity": "3 units",
                "category": "Food"
              },
              {
                "food": "chicken",
                "quantity": "300g",
                "category": "Meat"
              }
            ],
            "description": "Preparation Method:\n\n1. In a saucepan, add water and bring it to a boil.\n2. Add the rice and cook for about 15 minutes or until tender. Drain and set aside.\n3. In another saucepan, bring water to a boil.\n4. Carefully add the eggs and cook for approximately 8 minutes to obtain soft-boiled eggs.\n5. Remove the eggs from the hot water and place them in cold water for a few minutes. Peel the eggs and cut them in half.\n6. In a frying pan, heat some oil and grill the chicken seasoned to your taste until golden brown and fully cooked.\n7. Serve the cooked rice with the eggs cut in half and the grilled chicken. Season with salt and pepper to taste, if desired.\n\nThis dish is nutritious and provides a feeling of satiety due to the combination of chicken protein, rice carbohydrates, and healthy fats from the eggs. It is ideal for lunch.\n\nRemember that if you don't have any of the mentioned foods, you can seek donations at shelters or charity organizations available in the app.\n\nThis recipe is suitable for a person with a height of 1.75m and weight of 60kg. It offers a balanced and nutritious meal that can meet the daily nutrient requirements. The quantity of ingredients used has been calculated to generate a generous amount of food and provide a lasting feeling of satiety.\n\nThe dish consists of cooked rice, boiled eggs, and grilled chicken. Rice provides energy through carbohydrates, eggs are an excellent source of protein, and chicken contributes with more protein and essential nutrients. This combination results in a balanced and tasty meal.\n\nIt is recommended to consume this recipe for lunch to obtain nutritional benefits and the necessary satiety throughout the day.\n\nIf you don't have any of the mentioned foods, you can seek donations at shelters or charity organizations available in the app."
          }
          
          Now, let's do the attribute mapping:
          
          listaIngredientes -> listFood
          ingrediente -> food
          quantidade -> quantity
          categoria -> category
          modoDePreparo -> methodPreparation
          descricaoReceira -> recipeDescription
          
          Finally, merge the methodPreparation and recipeDescription into a single string with the attribute name "description".
          `,
            },
          ],
          model: "gpt-3.5-turbo",
          max_tokens: 1000,
          temperature: 0.7,
        };

        const response = await client.post(
          "https://api.openai.com/v1/chat/completions",
          params
        );

        if (isMounted) {
          const responseData = response.data.choices[0].message.content;
          const sanitizedData = responseData.replace(/[\u0000-\u001F]+/g, "");
          recipeee = JSON.parse(sanitizedData);
          setRecipe(recipeee);
          setLoading(false);
          console.log(recipeee);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        alert("Ocorreu um erro, tente novamente mais tarde.");
      }
    };
    if (loading) {
      fetchRecipe();
    }

    return () => {
      isMounted = false;
    };
  }, [loading]);

  return (
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
                textAlign: "center",
              }}
            >
              Receita personalizada
            </Title>
          </Header>
          <>
            <Collapse
              style={{
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 5,
                marginTop: 50,
              }}
              isExpanded={true}
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
                <Title style={{ color: "#AE8800", fontSize: 20 }}>
                  Sua receita
                </Title>
                <Link onPress={saveRecipe} style={{ marginBottom: 15 }}>
                  <Icon name="save" size={25} color="#AE8800" />
                </Link>
              </CollapseHeader>
              <CollapseBody style={{ width: "100%" }}>
                <ScrollViewContainer>
                  <Collapse>
                    <CollapseHeader>
                      <Title
                        style={{
                          color: "#000",
                          fontSize: 18,
                          fontWeight: "500",
                          width: "100%",
                          marginTop: 20,
                        }}
                      >
                        Descrição da receita
                      </Title>
                    </CollapseHeader>
                    <CollapseBody>
                      <Text
                        style={{
                          color: "#909090",
                          fontSize: 14,
                          fontWeight: "400",
                          width: "100%",
                        }}
                      >
                        {recipe.description}
                      </Text>
                    </CollapseBody>
                  </Collapse>

                  <Title
                    style={{
                      color: "#000",
                      fontSize: 18,
                      fontWeight: "500",
                      width: "100%",
                      marginTop: 20,
                    }}
                  >
                    Ingredientes necessários
                  </Title>
                  <Text
                    style={{
                      color: "#909090",
                      fontSize: 14,
                      fontWeight: "400",
                      width: "100%",
                    }}
                  >
                    {recipe.listFood.map((ingredient) => (
                      <>
                        <Text
                          key={ingredient.food}
                          style={{ color: "#909090" }}
                        >
                          {ingredient.food} - {ingredient.quantity} -{" "}
                        </Text>
                      </>
                    ))}
                  </Text>
                </ScrollViewContainer>
              </CollapseBody>
            </Collapse>
          </>
        </>
      )}
    </Container>
  );
};

export default Recipe;
