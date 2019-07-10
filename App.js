import Home from "./views/Home";
import Settings from "./views/Settings";
import Game from "./views/Game/Game";
import { createStackNavigator } from "react-navigation";

const App = createStackNavigator(
  {
    Home: { screen: Home },
    Settings: { screen: Settings },
    Game: { screen: Game }
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

export default App;
