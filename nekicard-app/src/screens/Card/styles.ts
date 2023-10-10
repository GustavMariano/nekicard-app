import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#202024",
    justifyContent: "center",
    alignItems: "center",
  },
  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#fff",
  },
  cardContainer: {
    backgroundColor: "#323238",
    borderRadius: 8,
    padding: 16,
    width: "80%",
    margin: 16,
    alignItems: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 250,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
    color: "#C4C4CC",
    fontWeight: "bold",
  },
});

export default styles;
