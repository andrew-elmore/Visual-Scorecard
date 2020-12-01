import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./src/screens/HomeScreen";
import CasualScreen from "./src/screens/CasualScreen";


const navigator = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    CasualScreen: CasualScreen,
  },
  {
    initialRouteName: "HomeScreen",
    defaultNavigationOptions: {
      title: "Visual Scorecard"
    }
  }
);

export default createAppContainer(navigator);
