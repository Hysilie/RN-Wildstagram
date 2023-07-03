import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CameraScreen from "./screens/camera/CameraScreen";
import FeedScreen from "./screens/feed/FeedScreen";
import ImageScreen from "./screens/images/ImageScreen";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
  const s = useMemo(
    () => ({
      iconSize: 30,
      iconFocusedColor: "#16998e",
    }),
    []
  );

  const TabBarIcon = ({ iconName, size, color }) => (
    <Ionicons name={iconName} size={s.iconSize} color={color} />
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              iconName={focused ? route?.name : `${route?.name}-outline`}
              size={s.iconSize}
              color={focused ? s.iconFocusedColor : color}
            />
          ),
          tabBarShowLabel: false,
          headerTitle: route?.name?.toUpperCase(),
          headerTintColor: "#16998e",
        })}
      >
        <Tab.Screen
          name="camera"
          component={CameraScreen}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen name="home" component={FeedScreen} />
        <Tab.Screen name="image" component={ImageScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
