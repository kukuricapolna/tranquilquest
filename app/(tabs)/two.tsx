import { Dimensions, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { LinearGradient } from "expo-linear-gradient";
import { bgGradient } from "@/constants/Colors";
import { Button } from "react-native-paper";
import { router } from "expo-router";

const { height: HGHT } = Dimensions.get("screen");

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient style={styles.background} colors={bgGradient} />
      <Text style={styles.title}>Tab Two</Text>
      <Button onPress={() => router.push("/motivation")}>Motivation</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "white",
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,

    height: 1,
    width: "80%",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: HGHT,
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 25,
  },
});
