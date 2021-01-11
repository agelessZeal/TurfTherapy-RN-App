import React, {Component} from 'react';
import {Image} from 'react-native';

import {createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import NormalStackNavigator from './StackNavigator';

export default AppNavigator = createSwitchNavigator({
  Star: NormalStackNavigator,
  // Main: MainTabNavigator,
});
