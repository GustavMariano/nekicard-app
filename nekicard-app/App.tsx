import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import Navigator from "./src/routes/routes";

export default function App() {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}
