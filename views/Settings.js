import React from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { Switch, Subheading, Provider } from "react-native-paper";
import Navbar from "./Navbar";
import { scale } from "../functions/AutoScale";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      proMode: "false",
      solfege: "false",
      blackKeys: "false"
    };

    const willFocus = this.props.navigation.addListener("willFocus", payload => {
      this.getItem("proMode");
      this.getItem("solfege");
      this.getItem("blackKeys").then(() => {
        this.setState({ loading: false });
      });
    });
  }

  setItem = async item => {
    const value = this.state[item] == "true" ? "false" : "true";
    this.setState({ [item]: value });

    try {
      await AsyncStorage.setItem(item, value, (err, result) => {
        if (err) throw err;
      });
    } catch (err) {
      console.log(err);
    }
  };

  getItem = async item => {
    try {
      await AsyncStorage.getItem(item).then(result => {
        this.setState({ [item]: result == "true" ? "true" : "false" });
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    if (!this.state.loading) {
      return (
        <Provider>
          <View style={styles.container}>
            <Navbar showBackButton showPrivacyDropdown navigation={this.props.navigation} />

            <View style={styles.item}>
              <Subheading style={styles.settingText}>Pro mode</Subheading>
              <Switch value={this.state.proMode == "true" ? true : false} onValueChange={() => this.setItem("proMode")} />
            </View>
            <View style={styles.item}>
              <Subheading style={styles.settingText}>Solfege</Subheading>
              <Switch value={this.state.solfege == "true" ? true : false} onValueChange={() => this.setItem("solfege")} />
            </View>
            <View style={styles.item}>
              <Subheading style={styles.settingText}>Chromatic notes</Subheading>
              <Switch value={this.state.blackKeys == "true" ? true : false} onValueChange={() => this.setItem("blackKeys")} />
            </View>
          </View>
        </Provider>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    padding: scale(5),
    flex: 1
  },

  item: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: scale(10)
  },

  settingText: {
    fontSize: 16 
  }
});
