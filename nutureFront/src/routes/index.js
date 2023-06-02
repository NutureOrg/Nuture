import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import UserChoise from "../screens/UserChoise";
import SignUp from "../screens/client/signUp/SignUp";
import SignIn from "../screens/client/signIn/SignIn";
import PhoneClient from "../screens/client/signUp/PhoneClient";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
