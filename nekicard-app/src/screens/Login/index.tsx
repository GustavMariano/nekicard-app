import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api } from "../../services/Api";
import { StackNavigationProp } from "@react-navigation/stack";

type ProfileFormNavigationProp = StackNavigationProp<any, "Login">;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<ProfileFormNavigationProp>();

  const handleLogin = async () => {
    try {
      console.log("Dados enviados para a API:");
      console.log("Email:", email);
      console.log("Senha:", password);

      const response = await Api.post("/login", {
        email,
        senha: password,
      });

      const { token, userId } = response.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userId", String(userId));

      console.log("Resposta da API:", response.data);

      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro ao fazer login:", error);

      console.error("Erro:", error);

      alert("Email ou senha inválidos!");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/LogoNeki-1.png")}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
