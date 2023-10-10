import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Home from "../screens/Home";
import ProfileForm from "../screens/NovoPerfil";
import Card from "../screens/Card";
import EditarPerfil from "../screens/EditarPerfil";

const Stack = createStackNavigator();

function Navigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Card" component={Card} />
      <Stack.Screen name="NovoPerfil" component={ProfileForm} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
    </Stack.Navigator>
  );
}

export default Navigator;
