import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./src/screens/HomeScreen";
import CasualScreen from "./src/screens/CasualScreen";
import NewGameScreen from "./src/screens/NewGameScreen";


const navigator = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    CasualScreen: CasualScreen,
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
