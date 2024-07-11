import {
  Alert,
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "@/components/Themed";
import { Button, Modal, Text, Title } from "react-native-paper";
import { useEffect, useRef, useState } from "react";
import Picker from "@/components/Picker";
import { addictions } from "@/constants/addictions";
import { useQuery } from "@tanstack/react-query";
import { addAddiction, getAllAddictions } from "@/functions/operations";
import { Addiction } from "@/constants/types";
import AddictionComponent from "@/components/AddictionComponent";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { bgGradient } from "@/constants/Colors";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

// async function registerForPushNotificationAsync() {
//   if (Platform.OS === "android") {
//     Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }
//   if (Device.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       return;
//     }
//     const projectId =
//       Constants.expoConfig?.extra?.projectId ?? Constants.easConfig.projectId;
//     if (!projectId) {
//       return;
//     }
//     try {
//       const pushTokenString = (
//         await Notifications.getExpoPushTokenAsync({ projectId })
//       ).data;
//       return pushTokenString;
//     } catch (e: unknown) {
//       console.error(e);
//     }
//   } else {
//     console.error(`Must be physical device.`);
//   }
// }

const { height: HGHT } = Dimensions.get("screen");

export default function TabOneScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAddiction, setSelectedAddiction] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { data, refetch } = useQuery<Addiction[]>({
    queryKey: ["userAddictions"],
    queryFn: async () => {
      const x = await getAllAddictions();
      return x as Addiction[];
    },
  });

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  // useEffect(() => {
  //   registerForPushNotificationAsync()
  //     .then((token) => setExpoPushToken(token ?? ""))
  //     .catch((error: any) => setExpoPushToken(`${error}`));
  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });
  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });
  //   return () => {
  //     notificationListener.current &&
  //       Notifications.removeNotificationSubscription(
  //         notificationListener.current,
  //       );
  //     responseListener.current &&
  //       Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // });

  return (
    <View style={styles.container}>
      <LinearGradient style={styles.background} colors={bgGradient} />
      <Text>{expoPushToken}</Text>
      {data?.length == 0 ? (
        <View style={{ backgroundColor: "transparent" }}>
          <Title style={styles.title}>No addictions added!</Title>
          <Button
            mode="contained-tonal"
            onPress={() => setIsModalVisible(!isModalVisible)}
          >
            Add
          </Button>
        </View>
      ) : (
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => refetch()}
            />
          }
          key={data?.toString()}
          renderItem={({ item, index }) => {
            return (
              <AddictionComponent
                onDelete={() => refetch()}
                index={index}
                id={item.id}
                key={item.id}
                addiction={item.addiction}
                started={item.started}
              />
            );
          }}
        />
      )}
      <View
        style={{
          position: "absolute",
          overflow: "hidden",
          bottom: HGHT / 10,
          right: 20,
          backgroundColor: "transparent",
        }}
      >
        {data?.length != 0 && (
          <Button
            onPress={() => setIsModalVisible(!isModalVisible)}
            style={{
              overflow: "hidden",
              zIndex: 1,
            }}
            mode="contained-tonal"
          >
            Add
          </Button>
        )}
      </View>

      <Modal
        contentContainerStyle={styles.modal}
        visible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
      >
        <Title>Add a new addiction</Title>
        <Picker
          items={addictions}
          onChange={(sa) => {
            if (Number(data?.length) >= 3) {
              Alert.alert(
                "Error while adding",
                "You reached the maximum addictions of 3.",
                [{ text: "OK", onPress: () => null }],
                { cancelable: false },
              );
              setIsModalVisible(false);
            } else {
              setSelectedAddiction(sa);
              setIsModalVisible(false);
              addAddiction(sa);
              refetch();
            }
          }}
        />
      </Modal>
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
  smallerTitle: {
    color: "white",
    backgroundColor: "transparent",
    fontSize: 20,
    fontWeight: "bold",
  },
});
