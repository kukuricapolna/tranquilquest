import AddictionComponent from "@/components/AddictionComponent";
import { bgGradient } from "@/constants/Colors";
import { Addiction } from "@/constants/types";
import { getSpecific } from "@/functions/operations";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-paper";

const { height: HGHT } = Dimensions.get("screen");

export default function AddictionSpecific() {
  const { addiction } = useLocalSearchParams<{ addiction: string }>();
  const { data, refetch } = useQuery<Addiction[]>({
    queryKey: ["currentAddiction"],
    queryFn: async () => {
      const x = await getSpecific("addiction");
      return x as Addiction[];
    },
  });
  // const daysSober =
  const add = data[0];
  return (
    <View style={styles.container}>
      <LinearGradient style={styles.background} colors={bgGradient} />
      <Text style={styles.smallerTitle}>{addiction}</Text>
      <TouchableOpacity
        onPress={() => router.push("/")}
        style={{ position: "absolute", bottom: HGHT - 150, left: 20 }}
      >
        {/* <Text style={styles.smallerTitle}>Back</Text> */}
        <Ionicons name="arrow-back-outline" size={40} color="white" />
      </TouchableOpacity>
      <AddictionComponent
        addiction={add.addiction}
        started={add.started}
        id={add.id}
        onDelete={() => {
          router.push("/");
        }}
        index={0}
      />
      {/* <Text style={{ color: "white" }}>
        You're doing great! You are clean of {addiction} for{" "}
        {30 - new Date(data[0].started.toString()).getDate()}/30 days.
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: HGHT,
  },
  container: {
    flex: 1,
    color: "white",
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  smallerTitle: {
    color: "white",
    backgroundColor: "transparent",
    fontSize: 20,
    fontWeight: "bold",
  },
});
