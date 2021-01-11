import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  View,
  TextInput,
  Keyboard,
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

const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH / LW;

export default class SettingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackFrom: '',
      feedbackSubject: 'Turf Therapy',
      feedbackContent: '',
    };
  }

  render() {
    return (
        <View style={styles.mainContent}>
          <View style={styles.title_container}>

            <View style={styles.setting_header}>
              <View  style={{width:'30%'}}>
                <Image
                    source={require('../../assets/images/setting.png')}
                    style={styles.setting_icon}
                />
              </View>
            </View>
            <View
                style={styles.headerRightLogo}>
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
              <View style={{width: '40%', height: '40%'}}>
                <Image
                    style={styles.fit_image}
                    source={require('../../assets/images/left.png')}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.setting_sub_container}>
            <TouchableOpacity
                style={[styles.setting_button_container,styles.fontTitleHarabaraSmall]}
                onPress={() => {
                  this.props.navigation.navigate('AddPreset');
                }}>
              <Text style={styles.setting_sub_button}>Presets</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.setting_button_container}
                onPress={() => {
                  this.props.navigation.navigate('Feedback');
                }}>
              <Text style={styles.setting_sub_button}>Send Feedback</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}
const styles = StyleSheet.create(SettingViewStyle);
