import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Home";
import CheckIn from "./screens/CheckIn";
import EmotionCircles from "./screens/EmotionCircles";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NextScreen" component={CheckIn} />
        <Stack.Screen name="EmotionCircles" component={EmotionCircles} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
