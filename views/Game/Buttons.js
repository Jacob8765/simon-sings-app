import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Text, Surface, TouchableRipple } from "react-native-paper";
import { scale } from "../../functions/AutoScale";

const button = (id, letter, solfege, activeId, staffOnly, solfegeEnabled, handlePress) => {
  return (
    <Surface key={id} style={styles.buttonSurface}>
      <TouchableRipple style={[styles.buttonContent, { backgroundColor: activeId == id && !staffOnly ? "#388E3C" : "black" }]} onPress={() => console.log("pressed")}>
        <TouchableWithoutFeedback onPressIn={() => handlePress(id)}>
          <Text style={styles.buttonText}>{solfegeEnabled ? solfege : letter}</Text>
        </TouchableWithoutFeedback>
      </TouchableRipple>
    </Surface>
  );
};

const styles = StyleSheet.create({
  buttonSurface: {
    elevation: 1,
    borderRadius: scale(3),
    width: scale(48),
    height: scale(48)
  },

  buttonContent: {
    backgroundColor: "#212121",
    borderRadius: scale(3),
    width: scale(48),
    height: scale(48),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },

  buttonText: {
    fontSize: scale(20),
    color: "white"
  },

  buttonContainer: {
    flexDirection: "row",
    marginRight: 30,
    marginLeft: 30,
    justifyContent: "space-between"
  }
});

export default class Buttons extends React.Component {
  constructor() {
    super();

    this.notes = [{ letter: "C", solfege: "Do", id: 1 }, { letter: "D", solfege: "Re", id: 2 }, { letter: "E", solfege: "Mi", id: 3 }, { letter: "F", solfege: "Fa", id: 4 }, { letter: "G", solfege: "Sol", id: 5 }, { letter: "A", solfege: "La", id: 6 }, { letter: "B", solfege: "Ti", id: 7 }, { letter: "C", solfege: "Do", id: 8 }];
    this.blackNotes = [{ placeholder: true }, { letter: "C#", solfege: "Ci", id: 9 }, { placeholder: true }, { letter: "D#", solfege: "Ra", id: 10 }, { placeholder: true }, { placeholder: true }, { placeholder: true }, { letter: "F#", solfege: "Fi", id: 11 }, { placeholder: true }, { letter: "G#", solfege: "Si", id: 12 }, { placeholder: true }, { letter: "A#", solfege: "Le", id: 13 }, { placeholder: true }, { placeholder: true }, { placeholder: true }];
    console.log(this.blackNotes.length);
  }

  handlePress = value => {
    this.props.checkAnswer(value);
  };

  render() {
    return (
      <View>
        {this.props.blackKeys ? <View style={[styles.buttonContainer, { marginBottom: 5 }]}>{this.blackNotes.map((note, index) => (!note.placeholder ? button(note.id, note.letter, note.solfege, this.props.activeId, this.props.staffOnly, this.props.solfege, this.handlePress) : <View style={{ width: scale(48), height: scale(48) }} />))}</View> : null}

        <View style={styles.buttonContainer}>{this.notes.map((note, index) => button(note.id, note.letter, note.solfege, this.props.activeId, this.props.staffOnly, this.props.solfege, this.handlePress))}</View>
      </View>
    );
  }
}
