import React, {Component} from 'react';
import {Text, StyleSheet, Image, TouchableOpacity, Platform, Alert, View, ScrollView} from 'react-native';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

import {Avatar, CheckBox, Input, Icon, ListItem, Overlay} from 'react-native-elements';
import SettingViewStyle from './SettingViewStyle';

const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH / LW;

export default class AboutPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View  style={{ width: LW, height: LH, flex: 1, backgroundColor: Colors.lightGrayBkColor}}>
        <View style={styles.title_container}>
          <TouchableOpacity  style={styles.headerLeftIcon} onPress={() => {
            this.props.navigation.goBack();
          }}>
            <Image source={require('../../assets/images/left-arrow.png')}/>
          </TouchableOpacity>
          <Text style={styles.title_text}>About</Text>
        </View>

        <View style={{justifyContent: 'center', margin: 25}}>
          <Text style={{fontSize: Layout.font.normal_size}}>
            How are you? How are you? How are you? How are you?
          </Text>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create(SettingViewStyle);

