import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import UserChoise from "../screens/UserChoise";
import SignUp from "../screens/client/signUp/SignUp";
import SignIn from "../screens/client/signIn/SignIn";
import PhoneClient from "../screens/client/signUp/PhoneClient";
import Gender from "../screens/client/signUp/Gender";
import RecipeOrDiet from "../screens/client/recipeOrDiet/RecipeOrDiet";
import Frequency from "../screens/client/signUp/Frequency";

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        {/* Client area */}

        <Stack.Screen
          name="UserChoise"
          component={UserChoise}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PhoneClient"
          component={PhoneClient}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Gender"
          component={Gender}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecipeOrDiet"
          component={RecipeOrDiet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Frequency"
          component={Frequency}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
