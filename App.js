import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./src/screens/HomeScreen";
import CasualScreen from "./src/screens/CasualScreen";
import NewCourseScreen from "./src/screens/NewCourseScreen";
import NineteenthHole from "./src/screens/NineteenthHole";
import ResultsScreen from "./src/screens/ResultsScreen";
import NewGameScreen from "./src/screens/NewGameScreen";


const navigator = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    CasualScreen: CasualScreen,
    NewCourseScreen: NewCourseScreen,
    NineteenthHole: NineteenthHole,
    ResultsScreen: ResultsScreen,
    NewGameScreen: NewGameScreen,
  },
  {
    initialRouteName: "HomeScreen",
    defaultNavigationOptions: {
      title: "Visual Scorecard"
    }
  }
);

export default createAppContainer(navigator);
