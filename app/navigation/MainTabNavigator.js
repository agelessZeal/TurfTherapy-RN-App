import React from 'react';
import {Platform, TouchableHighlight} from 'react-native';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import LiquidPage from '../screen/liquid/LiquidPage';
import GranularPage from '../screen/solid/GranularPage';
import SettingView from '../screen/setting/SettingView';
import AboutPage from '../screen/setting/AboutPage';
import YoutubePage from '../screen/setting/YoutubePage';

import TabBarIcon from '../components/common/TabBarIcon';
// constant
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH / LW;

const FirstStack = createStackNavigator({
  Solid: GranularPage,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
    },
    gesturesEnabled: true,
    headerTintColor: 'transparent',
    headerTitleStyle: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      flexGrow: 1,
      alignSelf: 'center',
      marginRight: Platform.select({
        ios: 18,
        android: 76,
      }),
    },
    headerTransparent: true,
  },
});

FirstStack.navigationOptions = ({navigation}) => {

  return {
    tabBarLabel: 'Granular',
    tabBarIcon: ({focused}) => (
      <TabBarIcon
        focused={focused}
        name="Granular"
        title="Granular"
      />
    ),
    tabBarVisible: true,
  };
};


const SecondStack = createStackNavigator({
  Liquid: LiquidPage,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
    },
    gesturesEnabled: true,
    headerTintColor: 'transparent',
    headerTitleStyle: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      flexGrow: 1,
      alignSelf: 'center',
      marginRight: Platform.select({
        ios: 18,
        android: 76,
      }),
    },
    headerTransparent: true,
  },
});

SecondStack.navigationOptions = {
  tabBarLabel: 'Liquid',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name="Liquid"
      title="Liquid"
    />
  ),
};


const SettingStack = createStackNavigator({
  Setting: SettingView,
  About: AboutPage,
  Youtube: YoutubePage,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
    },
    gesturesEnabled: true,
    headerTintColor: 'transparent',
    headerTitleStyle: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      flexGrow: 1,
      alignSelf: 'center',
      marginRight: Platform.select({
        ios: 18,
        android: 76,
      }),
    },
    headerTransparent: true,
  },
});


SettingStack.navigationOptions = ({navigation}) => {
  return {
    tabBarLabel: 'Setting',
    tabBarIcon: ({focused}) => (
      <TabBarIcon
        focused={focused}
        name="Setting"
        title="Setting"
      />
    ),
    tabBarVisible: true,
  };
};


export default createMaterialBottomTabNavigator({
    FirstStack,
    SecondStack,
    SettingStack,
  },
  {
    swipeEnabled: true,
    animationEnabled: true,
    labeled: true,
    shifting: false,
    activeColor: Colors.textBlueColor,
    inactiveColor: Colors.textGreyColor,
    barStyle: {
      borderTopColor: Colors.borderGreyColor,
      borderTopWidth: 1,
      backgroundColor: Colors.whiteColor,
    },
    tabBarOptions: {
      activeTintColor: Colors.textBlueColor,
      style: {
        marginBottom: 5,
        backgroundColor: Colors.borderBlueColor,
      },
      labelStyle: {
        color: Colors.textBlackColor,
      },
    },
  });
