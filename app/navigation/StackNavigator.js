import {createStackNavigator} from 'react-navigation-stack';

import {Platform} from 'react-native';
import Splash from '../screen/Splash';
import MainView from '../screen/MainView';
import YoutubePage from '../screen/setting/YoutubePage';
import Setting1 from '../screen/setting/Setting1';
import Feedback from '../screen/setting/Feedback';
import AddPreset from '../screen/setting/AddPreset';

import GranularPage from '../screen/solid/GranularPage';
import LiquidPage from '../screen/liquid/LiquidPage';
import Journal from "../screen/journal/Journal";
import AddLiquid from "../screen/setting/AddLiquid";
import AddGranular from "../screen/setting/AddGranular";
import AddProject from "../screen/journal/AddProject";
import NewEntry from "../screen/journal/NewEntry";
import Tips from "../screen/Tips/Tips";
import SettingView from "../screen/setting/SettingView";
import LiquidEntry from "../screen/journal/LiquidEntry";

const StackNavigatorOptions = {
    defaultNavigationOptions: {
        header: null
    },
};

const NormalStackNavigator = createStackNavigator(
    {
        Home: {
            screen: MainView,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
                header:null,
            },
        },
        YoutubePage: {
            screen: YoutubePage,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
                header:null,
            },
        },
        Setting1: {
            screen: Setting1,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
                header:null,
            },
        },
        Feedback: {
            screen: Feedback,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
                header:null,
            },
        },
        AddPreset: {
            screen: AddPreset,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
                header:null,
            },
        },
        Granular: {
            screen: GranularPage,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
                header:null,
            },
        },
        Liquid: {
            screen: LiquidPage,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
                header:null,
            },
        },
        Journal: {
            screen: Journal,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
                header:null,
            },
        },
        AddLiquid: {
            screen: AddLiquid,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
                header:null,
            },
        },
        AddGranular: {
            screen: AddGranular,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
                header:null,
            },
        },
        AddProject: {
            screen: AddProject,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
                header:null,
            },
        },
        NewEntry:{
            screen: NewEntry,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
                header:null,
            },
        },
        LiquidEntry:{
            screen: LiquidEntry,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
                header:null,
            },
        },
        Tips:{
            screen: Tips,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
                header:null,
            },
        },
        SettingView:{
            screen: SettingView,
            navigationOptions: {
                drawerLockMode: 'locked-close',
                disableGestures: true,
                header:null,
            },
        },

    },
    StackNavigatorOptions,
);

export default NormalStackNavigator;
