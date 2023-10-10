import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#29292E",
  },
  logo: {
    width: 105,
    height: 110,
    marginBottom: "70px",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "#202024",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: "#E1E1E6",
    fontWeight: "bold",
    placeholderTextColor: "#7C7C8A",
  },
  loginButton: {
    backgroundColor: "#08afa4",
    width: "80%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: "20px",
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
