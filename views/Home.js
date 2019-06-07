import React from "react";
import { StyleSheet, View, Alert, Dimensions, Text } from "react-native";
import { getHighScore } from "../functions/HighScore";
import { LinearGradient } from "expo";
import { Surface, TouchableRipple } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { scale } from "../functions/AutoScale";

const { width, height } = Dimensions.get("window");

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      highScore: "0",
      loading: true
    };

    const willFocus = this.props.navigation.addListener("willFocus", payload => {
      this.loadHighScore();
    });
  }

  loadHighScore = () => {
    getHighScore()
      .then(value => {
        this.setState({ highScore: value, loading: false });
      })
      .catch(err => {
        Alert.alert("Error fetching high score: " + err);
      });
  };

  render() {
    const { navigate } = this.props.navigation;

    if (!this.state.loading) {
      return (
        <View style={styles.container}>
          <View style={{ marginTop: height / 8, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: scale(56), padding: 5, fontFamily: "sans-serif-light" }}>High score: {this.state.highScore}</Text>
          </View>

          <View style={styles.buttons}>
            <Surface style={styles.surface}>
              <LinearGradient style={{ borderRadius: scale(10) }} colors={["#303F9F", "#1976D2"]} start={[0, 1]} end={[1, 0]}>
                <TouchableRipple style={{ padding: scale(20) }} onPress={() => navigate("Game")}>
                  <View style={{ justifyContent: "center", flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                    <Feather name="play" size={scale(24)} color="white" />

                    <Text style={styles.headerText}>New game</Text>
                  </View>
                </TouchableRipple>
              </LinearGradient>
            </Surface>

            <Surface style={styles.surface}>
              <LinearGradient style={{ borderRadius: scale(10) }} colors={["#9C27B0", "#FF3D00"]} start={[0, 1]} end={[1, 0]}>
                <TouchableRipple style={{ padding: scale(20) }} onPress={() => navigate("Settings")}>
                  <View style={{ justifyContent: "center", flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                    <Feather name="settings" size={scale(24)} color="white" />

                    <Text style={styles.headerText}>Preferences</Text>
                  </View>
                </TouchableRipple>
              </LinearGradient>
            </Surface>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(5)
  },

  surface: {
    elevation: 9,
    borderRadius: scale(10),
    marginBottom: scale(10),
    marginHorizontal: scale(10)
  },

  headerText: {
    marginLeft: scale(10),
    fontSize: scale(22),
    color: "white"
  },

  buttons: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width
  }
});
