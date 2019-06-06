import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { WebBrowser } from "expo";
import { Switch, Subheading, Divider, Text } from 'react-native-paper';


const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1
  },

  item: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  }
})

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Preferences',
  };

  constructor() {
    super()

    this.state = {
      loading: true,
      proMode: "false",
      solfege: "false",
      blackKeys: "false"
    }
  }

  componentWillMount() {
    this.getItem("proMode")
    this.getItem("solfege")
    this.getItem("blackKeys").then(() => {
      this.setState({ loading: false });
    })
  }

  setItem = async (item) => {
    const value = this.state[item] == "true" ? "false" : "true";
    this.setState({ [item]: value });

    try {
      await AsyncStorage.setItem(item, value, (err, result) => {
        if (err) throw err;
      });
    } catch (err) {

    }
  }

  getItem = async (item) => {
    try {
      await AsyncStorage.getItem(item).then((result) => {
        this.setState({ [item]: result == "true" ? "true" : "false" });
      });
    } catch (err) {
      console.log(err);
    }
  }

  openPrivacyPolicy = () => {
    WebBrowser.openBrowserAsync('https://gist.github.com/Jacob8765/dff0c2aad403f08bf9f5ffc1731c659a');
  }

  render() {
    if (!this.state.loading) {
      return (
        <View style={styles.container}>
          <View style={styles.item}>
            <Subheading>Pro mode</Subheading>
            <Switch
              value={this.state.proMode == "true" ? true : false}
              onValueChange={() => this.setItem("proMode")}
            />
          </View>
          <View style={styles.item}>
            <Subheading>Solfege</Subheading>
            <Switch
              value={this.state.solfege == "true" ? true : false}
              onValueChange={() => this.setItem("solfege")}
            />
          </View>
          <View style={styles.item}>
            <Subheading>Black keys</Subheading>
            <Switch
              value={this.state.blackKeys == "true" ? true : false}
              onValueChange={() => this.setItem("blackKeys")}
            />
          </View>

          <Divider />

          <Text style={{ color: "blue", padding: 10, paddingTop: 20, fontSize: 17 }} onPress={this.openPrivacyPolicy}>Privacy policy</Text>
        </View>
      );
    } else {
      return null;
    }
  }
}