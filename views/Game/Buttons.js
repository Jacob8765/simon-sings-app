import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  },

  blackKeyContainer: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10
  },

  button: {
    margin: 3,
    backgroundColor: "black"
  },

  buttonText: {
    textAlign: "center"
  },

  buttonContentStyle: {
    padding: 1.5
  }
})

export default class Buttons extends React.Component {
  static navigationOptions = {
    title: 'Game',
  };

  handlePress = (value, checkAnswer) => {
    if (checkAnswer) {
      this.props.checkAnswer(value);
    }
  }

  render() {
    return (
      <View>
        {this.props.blackKeys ?
          <View style={styles.blackKeyContainer}>
            <Button mode="contained" dark={true} onPress={() => this.handlePress(9, true)} contentStyle={this.props.deviceWidth < 680 ? styles.buttonContentStyle : null} style={[styles.button, { backgroundColor: this.props.activeId == 9 && !this.props.staffOnly ? "#388E3C" : "black" }]}>
              {this.props.solfege ? "Ci" : "C#"}
            </Button>
            <Button mode="contained" dark={true} onPress={() => this.handlePress(10, true)} contentStyle={this.props.deviceWidth < 680 ? styles.buttonContentStyle : null} style={[styles.button, { backgroundColor: this.props.activeId == 10 && !this.props.staffOnly ? "#388E3C" : "black" }]}>
              {this.props.solfege ? "Ra" : "D#"}
            </Button>
            <Button mode="contained" dark={true} onPress={() => this.handlePress(11, true)} contentStyle={this.props.deviceWidth < 680 ? styles.buttonContentStyle : null} style={[styles.button, { backgroundColor: this.props.activeId == 11 && !this.props.staffOnly ? "#388E3C" : "black" }]}>
              {this.props.solfege ? "Fi" : "F#"}
            </Button>
            <Button mode="contained" dark={true} onPress={() => this.handlePress(12, true)} contentStyle={this.props.deviceWidth < 680 ? styles.buttonContentStyle : null} style={[styles.button, { backgroundColor: this.props.activeId == 12 && !this.props.staffOnly ? "#388E3C" : "black" }]}>
              {this.props.solfege ? "Si" : "G#"}
            </Button>
            <Button mode="contained" dark={true} onPress={() => this.handlePress(13, true)} contentStyle={this.props.deviceWidth < 680 ? styles.buttonContentStyle : null} style={[styles.button, { backgroundColor: this.props.activeId == 13 && !this.props.staffOnly ? "#388E3C" : "black" }]}>
              {this.props.solfege ? "Le" : "A#"}
            </Button>
          </View>
          : null
        }


        <View style={styles.buttonContainer}>
          <Button mode="contained" dark={true} onPress={() => this.handlePress(1, true)} contentStyle={this.props.deviceWidth < 680 ? styles.buttonContentStyle : null} style={[styles.button, { backgroundColor: this.props.activeId == 1 && !this.props.staffOnly ? "#388E3C" : "black" }]}>
            {this.props.solfege ? "Do" : "C"}
          </Button>
          <Button mode="contained" dark={true} onPress={() => this.handlePress(2, true)} contentStyle={this.props.deviceWidth < 680 ? styles.buttonContentStyle : null} style={[styles.button, { backgroundColor: this.props.activeId == 2 && !this.props.staffOnly ? "#388E3C" : "black" }]}>
            {this.props.solfege ? "Re" : "D"}
          </Button>
          <Button mode="contained" dark={true} onPress={() => this.handlePress(3, true)} contentStyle={this.props.deviceWidth < 680 ? styles.buttonContentStyle : null} style={[styles.button, { backgroundColor: this.props.activeId == 3 && !this.props.staffOnly ? "#388E3C" : "black" }]}>
            {this.props.solfege ? "Mi" : "E"}
          </Button>
          <Button mode="contained" dark={true} onPress={() => this.handlePress(4, true)} contentStyle={this.props.deviceWidth < 680 ? styles.buttonContentStyle : null} style={[styles.button, { backgroundColor: this.props.activeId == 4 && !this.props.staffOnly ? "#388E3C" : "black" }]}>
            {this.props.solfege ? "Fa" : "F"}
          </Button>
          <Button mode="contained" dark={true} onPress={() => this.handlePress(5, true)} contentStyle={this.props.deviceWidth < 680 ? styles.buttonContentStyle : null} style={[styles.button, { backgroundColor: this.props.activeId == 5 && !this.props.staffOnly ? "#388E3C" : "black" }]}>
            {this.props.solfege ? "Sol" : "G"}
          </Button>
          <Button mode="contained" dark={true} onPress={() => this.handlePress(6, true)} contentStyle={this.props.deviceWidth < 680 ? styles.buttonContentStyle : null} style={[styles.button, { backgroundColor: this.props.activeId == 6 && !this.props.staffOnly ? "#388E3C" : "black" }]}>
            {this.props.solfege ? "La" : "A"}
          </Button>
          <Button mode="contained" dark={true} onPress={() => this.handlePress(7, true)} contentStyle={this.props.deviceWidth < 680 ? styles.buttonContentStyle : null} style={[styles.button, { backgroundColor: this.props.activeId == 7 && !this.props.staffOnly ? "#388E3C" : "black" }]}>
            {this.props.solfege ? "Ti" : "B"}
          </Button>
          <Button mode="contained" dark={true} onPress={() => this.handlePress(8, true)} contentStyle={this.props.deviceWidth < 680 ? styles.buttonContentStyle : null} style={[styles.button, { backgroundColor: this.props.activeId == 8 && !this.props.staffOnly ? "#388E3C" : "black" }]}>
            {this.props.solfege ? "Do" : "C"}
          </Button>
        </View>
      </View>
    );
  }
}