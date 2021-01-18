import React, { useState } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider as AuthProvider } from './src/context/authContext';
import { setNavigator } from './src/navigationRef'

import HomeScreen from "./src/screens/HomeScreen";
import CasualScreen from "./src/screens/CasualScreen";
import NewCourseScreen from "./src/screens/NewCourseScreen";
import NineteenthHole from "./src/screens/NineteenthHole";
import NewGameScreen from "./src/screens/NewGameScreen";
import StrictScreen from "./src/screens/StrictScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import AccountScreen from "./src/screens/AccountScreen";
import LandingScreen from "./src/screens/LandingScreen";
import DemoScreen from "./src/screens/DemoScreen";


import { Dimensions } from 'react-native';



const switchNavigator = createSwitchNavigator({
  LandingScreen: LandingScreen,
  loginFlow: createSwitchNavigator({
    SigninScreen: SigninScreen,
    SignupScreen: SignupScreen
  }),
  mainFlow: createBottomTabNavigator({
    Home: HomeScreen,
    Review: NineteenthHole,
    Account: AccountScreen
  }),
  gameFlow: createSwitchNavigator({
    newGameFlow: createStackNavigator({
      New: NewGameScreen,
      Course: NewCourseScreen
    }),
    playFlow: createSwitchNavigator({
      StrictScreen: StrictScreen,
      CasualScreen: CasualScreen,
      DemoScreen: DemoScreen
    })
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
  
      <AuthProvider>
        <App ref={(navigator) => { setNavigator(navigator) }} />
      </AuthProvider>

  )
}