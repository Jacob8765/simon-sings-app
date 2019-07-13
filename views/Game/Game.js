import React from "react";
import { View, Alert, StyleSheet, AsyncStorage, Text, Platform, Dimensions } from "react-native";
import Buttons from "./Buttons";
import Staff from "./Staff";
import { Audio } from "expo-av";
import { AdMobInterstitial } from "expo-ads-admob";
import { LinearGradient } from "expo-linear-gradient";
import { getHighScore, setHighScore } from "../../functions/HighScore";
import { ActivityIndicator, Surface } from "react-native-paper";
import Navbar from "../Navbar";
import { Feather } from "@expo/vector-icons";
import { scale } from "../../functions/AutoScale";

const PRODUCTION = false;
const { width, height } = Dimensions.get("window");

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.memory = [];
    this.currentAnswer = [];

    this.soundObj1 = new Audio.Sound();
    this.soundObj2 = new Audio.Sound();
    this.soundObj3 = new Audio.Sound();
    this.soundObj4 = new Audio.Sound();
    this.soundObj5 = new Audio.Sound();
    this.soundObj6 = new Audio.Sound();
    this.soundObj7 = new Audio.Sound();
    this.soundObj8 = new Audio.Sound();
    this.soundObj9 = new Audio.Sound();
    this.soundObj10 = new Audio.Sound();
    this.soundObj11 = new Audio.Sound();
    this.soundObj12 = new Audio.Sound();
    this.soundObj13 = new Audio.Sound();

    const willBlur = this.props.navigation.addListener("willBlur", payload => {
      console.log("unloading");
      AdMobInterstitial.removeAllListeners();
      this.unloadSounds();
    });

    AdMobInterstitial.setAdUnitID(PRODUCTION ? "ca-app-pub-7664984868766495/7939385108" : "ca-app-pub-3940256099942544/1033173712"); //"ca-app-pub-3940256099942544/1033173712"); // Test ID, Replace with your-admob-unit-id ca-app-pub-3940256099942544/1033173712

    if (!PRODUCTION) {
      AdMobInterstitial.setTestDeviceID("EMULATOR");
    }

    this.state = {
      solfege: false,
      staffOnly: false,
      isNoteActiveId: null,
      proMode: false,
      blackKeys: false,
      highScore: "0",
      score: 0,
      loading: true
    };

    this.init();
  }

  init = async () => {
    this.getItem("solfege");
    this.getItem("proMode");
    this.getItem("blackKeys");
    this.loadSounds();
    getHighScore().then(value => {
      this.setState({ highScore: value || "0", loading: false });
      AdMobInterstitial.requestAdAsync();
    });
  };

  getItem = async item => {
    AsyncStorage.getItem(item)
      .then(result => {
        this.setState({ [item]: result == "true" ? true : false });
      })
      .catch(err => {
        Alert.alert("Err: " + err);
      });
  };

  replayNotes = () => {
    this.currentAnswer = [];
    this.playback();
  };

  loadSounds = () => {
    this.soundObj1.loadAsync(require("../../assets/sounds/1.mp3"));
    this.soundObj2.loadAsync(require("../../assets/sounds/2.mp3"));
    this.soundObj3.loadAsync(require("../../assets/sounds/3.mp3"));
    this.soundObj4.loadAsync(require("../../assets/sounds/4.mp3"));
    this.soundObj5.loadAsync(require("../../assets/sounds/5.mp3"));
    this.soundObj6.loadAsync(require("../../assets/sounds/6.mp3"));
    this.soundObj7.loadAsync(require("../../assets/sounds/7.mp3"));
    this.soundObj8.loadAsync(require("../../assets/sounds/8.mp3"));
    this.soundObj9.loadAsync(require("../../assets/sounds/9.mp3"));
    this.soundObj10.loadAsync(require("../../assets/sounds/10.mp3"));
    this.soundObj11.loadAsync(require("../../assets/sounds/11.mp3"));
    this.soundObj12.loadAsync(require("../../assets/sounds/12.mp3"));
    this.soundObj13.loadAsync(require("../../assets/sounds/13.mp3")).then(() => {
      this.newNumber();
    });
  };

  unloadSounds = () => {
    this.soundObj1.unloadAsync(require("../../assets/sounds/1.mp3"));
    this.soundObj2.unloadAsync(require("../../assets/sounds/2.mp3"));
    this.soundObj3.unloadAsync(require("../../assets/sounds/3.mp3"));
    this.soundObj4.unloadAsync(require("../../assets/sounds/4.mp3"));
    this.soundObj5.unloadAsync(require("../../assets/sounds/5.mp3"));
    this.soundObj6.unloadAsync(require("../../assets/sounds/6.mp3"));
    this.soundObj7.unloadAsync(require("../../assets/sounds/7.mp3"));
    this.soundObj8.unloadAsync(require("../../assets/sounds/8.mp3"));
    this.soundObj9.unloadAsync(require("../../assets/sounds/9.mp3"));
    this.soundObj10.unloadAsync(require("../../assets/sounds/10.mp3"));
    this.soundObj11.unloadAsync(require("../../assets/sounds/11.mp3"));
    this.soundObj12.unloadAsync(require("../../assets/sounds/12.mp3"));
    this.soundObj13.unloadAsync(require("../../assets/sounds/13.mp3"));
  };

  playSound = async number => {
    try {
      if (Platform.OS == "ios") {
        await this["soundObj" + number].stopAsync(); //On IOS the same sound can't overlap itself
      }

      this["soundObj" + number].playFromPositionAsync(0);
    } catch (err) {
      console.log(err);
    }
  };

  playback = () => {
    let temp = 500;

    for (let i = 0; i < this.memory.length; i++) {
      setTimeout(() => {
        this.playSound(this.memory[i]);

        if (!this.state.proMode || i == 0) {
          this.setState({
            isNoteActive: true,
            isNoteActiveId: this.memory[i]
          });
        }
      }, 600 + temp);

      setTimeout(() => {
        if (!this.state.proMode || i == 0) {
          this.setState({
            isNoteActive: false,
            isNoteActiveId: null
          });
        }
      }, 1000 + temp);

      temp += 600;
    }
  };

  newNumber = () => {
    var randomNumber = Math.floor(Math.random() * (!this.state.blackKeys ? 8 : 13) + 1);

    this.setState({ score: this.memory.length });

    this.memory.push(randomNumber);
    this.currentAnswer = [];

    this.playback();
  };

  checkAnswer = number => {
    if (this.currentAnswer.length == this.memory.length) {
      this.newGame();
    } else {
      this.currentAnswer.push(number);
      this.playSound(number);

      this.setState({
        staffOnly: true,
        isNoteActiveId: number
      });

      setTimeout(() => {
        this.setState({
          staffOnly: false,
          isNoteActiveId: null
        });
      }, 350);

      if (this.currentAnswer[this.currentAnswer.length - 1] == this.memory[this.currentAnswer.length - 1]) {
        if (this.currentAnswer.length === this.memory.length) {
          this.newNumber();
        }
      } else {
        this["soundObj" + number].stopAsync(); //Required because otherwise the sound finishes playing after the ad is closed
        this.newGame();
      }
    }
  };

  newGame = async () => {
    const { navigate } = this.props.navigation;

    AdMobInterstitial.showAdAsync();

    Alert.alert(
      "Game over",
      "Your score was " + this.state.score + ". Would you like to play again?",
      [
        {
          text: "Yes",
          onPress: () => {
            this.newNumber();
          }
        },
        { text: "No", onPress: () => navigate("Home") }
      ],
      { cancelable: false }
    );

    if (this.memory.length - 1 > Number(this.state.highScore)) {
      setHighScore((this.memory.length - 1).toString());
    }

    this.memory = [];
    this.currentAnswer = [];
    AdMobInterstitial.requestAdAsync(); //Request a new ad

    this.setState({ score: 0 });
  };

  render() {
    if (!this.state.loading) {
      return (
        <View style={styles.container}>
          <Navbar showBackButton navigation={this.props.navigation} />

          <View style={{ justifyContent: "center", flexDirection: "row" }}>
            <Staff activeId={this.state.isNoteActiveId} blackKeys={this.state.blackKeys} />
          </View>

          <Buttons deviceWidth={width} checkAnswer={this.checkAnswer} activeId={this.state.isNoteActiveId} staffOnly={this.state.staffOnly} solfege={this.state.solfege} blackKeys={this.state.blackKeys} />

          <Surface style={styles.scoreContainer}>
            <LinearGradient style={styles.scoreGradient} colors={["#303F9F", "#7B1F9F"]} start={[0, 1]} end={[1, 0]}>
              <Feather name="rotate-cw" size={scale(24)} color="#FFFFFF" onPress={this.replayNotes} />
              <Text style={styles.scoreText}>Score: {this.state.score}</Text>
            </LinearGradient>
          </Surface>
        </View>
      );
    } else {
      return (
        <View style={{ justifyContent: "center", flex: 1, flexDirection: "row" }}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    padding: scale(10),
    flex: 1
  },

  scoreContainer: {
    width: width - 20,
    margin: scale(10),
    borderRadius: scale(16),
    elevation: 9,
    position: "absolute",
    bottom: 0,
    left: 0
  },

  scoreGradient: {
    padding: scale(14),
    borderRadius: scale(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  scoreText: {
    fontSize: scale(20),
    color: "white",
    fontFamily: "sans-serif-light"
  }
});
