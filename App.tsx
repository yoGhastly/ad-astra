import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NetworkProvider } from "react-native-offline";
import HomeScreen from "./screens/Home";
import CheckIn from "./screens/CheckIn";
import Emotions from "./screens/Emotions";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NetworkProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="CheckIn" component={CheckIn} />
              <Stack.Screen name="Emotions" component={Emotions} />
            </Stack.Navigator>
          </NavigationContainer>
        </NetworkProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
