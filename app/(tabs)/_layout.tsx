import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import TabOneScreen from ".";
import TabTwoScreen from "./two";
import Motivation from "./motivation";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const Tab = createMaterialBottomTabNavigator();
  return (
    // <Tabs
    //   screenOptions={{
    //     tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
    //     tabBarShowLabel: true,

    //     // Disable the static render of the header on web
    //     // to prevent a hydration error in React Navigation v6.
    //     headerShown: false, //  useClientOnlyValue(false, true),
    //     tabBarStyle: {
    //       position: "absolute",
    //       backgroundColor: "transparent",
    //       height: 80,
    //       elevation: 0,
    //       shadowOpacity: 0,
    //     },
    //     tabBarLabelStyle: {
    //       backgroundColor: "transparent",
    //       fontSize: 15,
    //       fontWeight: "bold",
    //       color: "white",
    //       borderTopLeftRadius: 20,
    //       borderTopEndRadius: 20,
    //     },
    //   }}
    // >
    <Tab.Navigator>
      <Tab.Screen
        name="index"
        component={TabOneScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={25} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="two"
        component={Motivation}
        options={{
          title: "Motivation \u0026 Help",
          tabBarIcon: ({ color }) => (
            <Entypo name="drink" color={color} size={25} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="addictions/[addiction]"
        options={{
          title: "Your addiction",
          href: null,
        }}
      /> */}
    </Tab.Navigator>
  );
}
