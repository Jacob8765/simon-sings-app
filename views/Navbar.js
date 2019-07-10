import React from "react";
import { Feather } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { scale } from "../functions/AutoScale";
import { Menu } from "react-native-paper";
import * as WebBrowser from 'expo-web-browser';

export default class Navbar extends React.Component {
  constructor() {
    super();

    this.state = {
      menu: false
    };
  }

  toggleMenu = () => {
    this.setState({ menu: !this.state.menu });
  };

  openPrivacyPolicy = () => {
    WebBrowser.openBrowserAsync("https://gist.github.com/Jacob8765/dff0c2aad403f08bf9f5ffc1731c659a");
  };

  render() {
    return (
      <View style={[styles.header, { justifyContent: this.props.showPrivacyDropdown ? "space-between" : "flex-start" }]}>
        {this.props.showBackButton ? <Feather name="arrow-left" size={scale(28)} style={{ marginLeft: -scale(4) }} color={this.props.darkTheme ? "#EEEEEE" : "black"} onPress={() => this.props.navigation.goBack()} /> : null}
        {this.props.showPrivacyDropdown ? (
          <Menu visible={this.state.menu} onDismiss={this.toggleMenu} anchor={<Feather name="more-vertical" size={scale(28)} color={this.props.darkTheme ? "#EEEEEE" : "black"} onPress={this.toggleMenu} />}>
            <Menu.Item onPress={this.openPrivacyPolicy} title="Privacy policy" />
          </Menu>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    margin: scale(10),
    marginBottom: scale(13),
    marginTop: scale(30),
    flexDirection: "row"
  }
});
