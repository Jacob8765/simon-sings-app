import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Text, Surface } from "react-native-paper";
import { scale } from "../../functions/AutoScale";

const { width, height } = Dimensions.get("window");

const button = (id, letter, solfege, activeId, staffOnly, solfegeEnabled, handlePress, marginLeft) => {
  return (
    <TouchableOpacity onPressIn={() => handlePress(id)} key={id} style={{ left: marginLeft }}>
      <Surface key={id} style={[styles.buttonSurface, styles.buttonContent, { backgroundColor: activeId == id && !staffOnly ? "#388E3C" : "black" }]}>
        <Text style={styles.buttonText}>{solfegeEnabled ? solfege : letter}</Text>
      </Surface>
    </TouchableOpacity>
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
    marginRight: scale(30),
    marginLeft: scale(30),
    justifyContent: "space-between"
  }
});

export default class Buttons extends React.Component {
  constructor() {
    super();

    //The following code tries to figure out the width of the invisible buttons, relative to the screen size.
    // device width - the margins on both sides (since the margin on each size is 30 and the padding applied in the game class is 10 on each side, we subtract 80) - the amount of space the actual buttons take up (buttons are 48 width * 8 notes)
    // divided by the number of spaces, 7.
    this.invisibleButtonOverSpaceWidth = (width - scale(80) - (scale(48) * 8)) / 7;
    this.invisibleButtonOverNoteWidth = scale(48);

    // If the width of the button is less then the width of the space, the buttons get pushed over. This tries to center the buttons
    this.buttonMarginLeft = this.invisibleButtonOverSpaceWidth < this.invisibleButtonOverNoteWidth ? -((this.invisibleButtonOverNoteWidth - this.invisibleButtonOverSpaceWidth) / 2) : 0; //this needs to be multiplied by the index of the note.
    console.log(this.buttonMarginLeft);

    this.notes = [{ letter: "C", solfege: "Do", id: 1 }, { letter: "D", solfege: "Re", id: 2 }, { letter: "E", solfege: "Mi", id: 3 }, { letter: "F", solfege: "Fa", id: 4 }, { letter: "G", solfege: "Sol", id: 5 }, { letter: "A", solfege: "La", id: 6 }, { letter: "B", solfege: "Ti", id: 7 }, { letter: "C", solfege: "Do", id: 8 }];
    this.blackNotes = [
      { placeholder: true, overSpace: false },
      { letter: "C#", solfege: "Ci", id: 9, i: 1 },
      { placeholder: true, overSpace: false },
      { letter: "D#", solfege: "Ra", id: 10, i: 3 },
      { placeholder: true, overSpace: false },
      { placeholder: true, overSpace: true },
      { placeholder: true, overSpace: false },
      { letter: "F#", solfege: "Fi", id: 11, i: 5 },
      { placeholder: true, overSpace: false },
      { letter: "G#", solfege: "Si", id: 12, i: 7 },
      { placeholder: true, overSpace: false },
      { letter: "A#", solfege: "Le", id: 13, i: 9 },
      { placeholder: true, overSpace: false },
      { placeholder: true, overSpace: true },
      { placeholder: true, overSpace: false }
    ];
  }

  handlePress = value => {
    this.props.checkAnswer(value);
  };

  render() {
    return (
      <View>
        {this.props.blackKeys ? (
          <View style={[styles.buttonContainer, { marginBottom: 5 }]}>
            {this.blackNotes.map((note, index) => (!note.placeholder ? button(note.id, note.letter, note.solfege, this.props.activeId, this.props.staffOnly, this.props.solfege, this.handlePress, this.buttonMarginLeft * note.i) : <View style={{ width: note.overSpace ? this.invisibleButtonOverSpaceWidth : this.invisibleButtonOverNoteWidth, height: note.overSpace ? this.invisibleButtonOverSpaceWidth : this.invisibleButtonOverNoteWidth }} key={index + 50} />))}
          </View>
        ) : null}

        <View style={styles.buttonContainer}>{this.notes.map((note, index) => button(note.id, note.letter, note.solfege, this.props.activeId, this.props.staffOnly, this.props.solfege, this.handlePress))}</View>
      </View>
    );
  }
}
