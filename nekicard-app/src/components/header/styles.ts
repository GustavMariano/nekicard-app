import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: "#323238",
    },
    logo: {
      width: 40,
      height: 40,
      resizeMode: "contain",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#fff",
    },
    logoutButton: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#fff",
    },
  });