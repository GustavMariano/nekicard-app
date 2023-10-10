import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from "./styles";

interface HeaderProps {
  title: string;
}

type ProfileFormNavigationProp = StackNavigationProp<any, "Header">;

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation<ProfileFormNavigationProp>();

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();

      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/LogoNeki-1.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.logoutButton}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};


export default Header;
