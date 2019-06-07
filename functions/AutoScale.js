import { Dimensions } from "react-native";

const initialWidth = 797;
const initialHeight = 411;
const { width, height } = Dimensions.get("window");

module.exports.scale = size => {
  let percentOfInitial = size / (initialWidth + initialHeight);
  console.log(percentOfInitial);
  console.log(percentOfInitial * (width + height));
  return percentOfInitial * (width + height);
};
