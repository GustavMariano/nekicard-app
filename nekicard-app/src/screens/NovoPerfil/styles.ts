import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#323238",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#fff",
  },
  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#fff",
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#202024",
    color: "#C4C4CC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  touchableButton: {
    backgroundColor: "#08afa4",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  touchableCancelButton: {
    backgroundColor: "#202024",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  touchableButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});
