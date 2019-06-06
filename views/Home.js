import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { getHighScore } from "../functions/HighScore";
import { Button } from 'react-native-paper';
import { Headline } from 'react-native-paper';

export default class App extends React.Component {
  static navigationOptions = {
    title: 'Simon Sings',
  };

  constructor() {
    super();

    this.state = {
      highScore: "0",
      loading: true
    }

    this.loadHighScore();
  }

  loadHighScore = () => {
    getHighScore().then((value) => {
      this.setState({ highScore: value, loading: false })
    }).catch((err) => {
      Alert.alert("Error fetching high score: " + err);
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    this.loadHighScore();

    if (!this.state.loading) {
      return (
        <View style={styles.container}>
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <Headline style={{ fontSize: 35, padding: 5 }}>High score: {this.state.highScore}</Headline>
          </View>

          <View style={styles.buttonContainer} >
            <Button icon="music-note" color="#AD1457" style={styles.button} mode="contained" onPress={() => navigate("Game")}>
              Start Game
            </Button>
            <Button icon="settings" style={styles.button} mode="contained" onPress={() => navigate("Settings")}>
              Preferences
            </Button>
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
    padding: 5,
    justifyContent: "center",
    flexDirection: "column"
  },

  buttonContainer: {
    marginTop: "auto",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  },

  button: {
    paddingTop: 10,
    paddingBottom: 10,
    margin: 5,
    width: "100%"
  }
});
