import { AsyncStorage, Alert } from "react-native";

export const getHighScore = async () => {
  try {
    let proMode = await AsyncStorage.getItem("proMode");
    let blackKeys = await AsyncStorage.getItem("blackKeys");
    let value = await AsyncStorage.getItem(`highScore${proMode == "true" ? "proMode" : ""}${blackKeys == "true" ? "blackKeys" : ""}`);

    return value || "0";
  } catch (err) {
    Alert.alert("error " + err);
  }
}

export const setHighScore = async (value) => {
  let proMode = await AsyncStorage.getItem("proMode");
  let blackKeys = await AsyncStorage.getItem("blackKeys");

  await AsyncStorage.setItem(`highScore${proMode == "true" ? "proMode" : ""}${blackKeys == "true" ? "blackKeys" : ""}`, value, (err, result) => {
    if (err) throw err;
    return true;
  });
}