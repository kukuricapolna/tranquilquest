import { bgGradient } from "@/constants/Colors";
import { motivations } from "@/constants/quotes";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Button, Card, Headline, Text } from "react-native-paper";

const { height: HGHT } = Dimensions.get("screen");

export default function Motivation() {
  const [motSel, setMotSel] = useState(0);

  function randomMotivationId() {
    const motivationLen = motivations.length - 1;
    console.log(`Len is: ${motivationLen}`);
    const rand = Math.random();
    const mot = Math.round(rand * motivationLen);
    setMotSel(mot);
  }

  useEffect(() => {
    randomMotivationId();
  }, []);
  return (
    <View style={styles.container}>
      <LinearGradient style={styles.background} colors={bgGradient} />
      <Card>
        <Card.Title title="An useful quote." />
        <Card.Content>
          <Text style={styles.bigText}>{motivations[motSel].quote}</Text>
          <Text style={styles.smallText}>-{motivations[motSel].by}-</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={randomMotivationId}>
            Another one
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  bigText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  smallText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
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
