import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  View,
  Linking,
  ScrollView,
} from 'react-native';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

import {
  Avatar,
  CheckBox,
  Input,
  Icon,
  ListItem,
  Overlay,
} from 'react-native-elements';
import SettingViewStyle from './SettingViewStyle';
import {NativeModules} from 'react-native';
// import Linking from 'react-native/Libraries/Linking/Linking';
import openURLInBrowser from 'react-native/Libraries/Core/Devtools/openURLInBrowser';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH / LW;



export default class Setting1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSwipeUp(gestureState) {
    this.setState({myText: 'You swiped up!'});
  }

  onSwipeDown(gestureState) {
    this.setState({myText: 'You swiped down setting view!'});
    this.props.navigation.goBack();
    console.log('you swipe down');
  }

  onSwipeLeft(gestureState) {
    console.log('you swipe left');
    this.setState({myText: 'You swiped left!'});
  }

  onSwipeRight(gestureState) {
    console.log('you swipe right');
    this.setState({myText: 'You swiped right!'});
  }

  onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({backgroundColor: 'red'});
        break;
      case SWIPE_DOWN:
        this.setState({backgroundColor: 'green'});
        break;
      case SWIPE_LEFT:
        this.setState({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        this.setState({backgroundColor: 'yellow'});
        break;
    }
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    return (
      <GestureRecognizer
        onSwipe={this.onSwipe.bind(this)}
        onSwipeUp={this.onSwipeUp.bind(this)}
        onSwipeDown={this.onSwipeDown.bind(this)}
        onSwipeLeft={this.onSwipeLeft.bind(this)}
        onSwipeRight={this.onSwipeRight.bind(this)}
        config={config}>
        <View style={styles.mainContainer}>
          <View style={styles.title_container}>
            <View style={styles.title_logo_container}>
              <View style={{width: '100%', height: '100%'}}>
                <Image
                    style={styles.fit_image}
                    source={require('../../assets/images/logo.png')}
                />
              </View>
            </View>
            <TouchableOpacity
                style={styles.headerLeftBack}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
              <Icon type='material-community' iconStyle={styles.right_chevron_icon_image} size={24}  name={'arrow-left'} color={Colors.titleBlack}/>
            </TouchableOpacity>
          </View>

          <Text style={styles.view_type_title}>Settings</Text>

          <View style={styles.setting_sub_container}>
            <ListItem
                containerStyle={styles.preset_list_item_container}
                Component={TouchableOpacity}
                onPress={() => {
                  this.props.navigation.navigate('AddPreset');
                }}
                title={'Presets'}
                titleStyle={styles.preset_list_item_text}
                rightIcon={<Icon type='material-community' iconStyle={styles.right_chevron_icon_image} size={24}
                                 name={'chevron-right'} color={Colors.chevronColor}/>}
            />

            <ListItem
                containerStyle={styles.preset_list_item_container}
                Component={TouchableOpacity}
                onPress={() => {
                  this.props.navigation.navigate('Feedback');
                }}
                title={'Send Feedback'}
                titleStyle={styles.preset_list_item_text}
                rightIcon={<Icon type='material-community' iconStyle={styles.right_chevron_icon_image} size={24}
                                 name={'chevron-right'} color={Colors.chevronColor}/>}
            />
          </View>
        </View>
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create(SettingViewStyle);
