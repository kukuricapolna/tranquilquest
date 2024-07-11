import { Addiction } from "@/constants/types";
import { StyleSheet, Text, View } from "react-native";
import {
  Button,
  Card,
  Paragraph,
  ProgressBar,
  Title,
  useTheme,
} from "react-native-paper";
import { formatDistanceToNow, differenceInDays } from "date-fns";
import { removeAddiction } from "@/functions/operations";
import { router } from "expo-router";

interface AdditionalAddictionProps {
  index: number;
  onDelete: () => void;
}

interface AddictionComponentProps extends Addiction, AdditionalAddictionProps {}

export default function AddictionComponent({
  addiction,
  started,
  id,
  index,
  onDelete,
}: AddictionComponentProps) {
  const firstLetterUpper = (text: string) => {
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
  };

  const theme = useTheme();
  return (
    <Card
      style={styles.card}
      onPress={() => router.push(`/addictions/${addiction}`)}
    >
      <Card.Content>
        <Title>{addiction}</Title>
        <Paragraph>
          {differenceInDays(started, new Date()) >= 30
            ? "You dit it! Congrats!"
            : `${firstLetterUpper(formatDistanceToNow(started))}  / 30 days sober of ${addiction}`}
        </Paragraph>
        <ProgressBar
          fillStyle={{ borderRadius: 50 }}
          progress={differenceInDays(started, new Date()) / 30}
          color={theme.colors.primary}
          style={styles.progressBar}
        />
      </Card.Content>
      <Card.Actions>
        <Button
          disabled={!Boolean(differenceInDays(started, new Date()) >= 30)}
          mode="contained"
          onPress={() => {
            removeAddiction(id);
            onDelete();
          }}
          buttonColor={theme.colors.error}
        >
          Delete
        </Button>
      </Card.Actions>
    </Card>
  );
}

const necessarySpace = (index: number) => {
  if (index == 0) {
    console.log(`Detected 0 index.`);
    return 55;
  } else {
    return 0;
  }
};

const styles = StyleSheet.create({
  smallerTitle: {
    color: "white",
    backgroundColor: "transparent",
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    margin: 30,
  },
  progressBar: {
    height: 10,
    marginVertical: 10,
    borderRadius: 30,
  },
});

// <View
//   style={{
//     backgroundColor: "transparent",
//     margin: 10,
//     padding: necessarySpace(index),
//   }}
//   key={id}
// >
//   <Button
//     mode="contained-tonal"
//     style={{ position: "absolute", right: 0, top: index == 0 ? 40 : 0 }}
//     labelStyle={{ fontSize: 10 }}
//     onPress={() => removeAddiction(id)} // TODO: Delete konkretnu addiction + notifikacie, super pridanie novej addiction, sluby, pripomienky
//   >
//     Delete
//   </Button>
//   <Text style={styles.smallerTitle}>{addiction}</Text>
//   <Text style={{ color: "white", fontWeight: "bold" }}>
//     {firstLetterUpper(formatDistanceToNow(started))} hours sober of{" "}
//     {addiction}
//   </Text>
//   <ProgressBar progress={(30 - new Date(started).getDate()) / 30} />
// </View>
