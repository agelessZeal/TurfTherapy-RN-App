import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

const solid_fertilzer = require('../../assets/images/icon/solid.png');
const liquid_fertilzer = require('../../assets/images/icon/liquid.png');
const setting = require('../../assets/images/icon/settings.png');

const solid_fertilzer_sel = require('../../assets/images/icon/sel/solid.png');
const liquid_fertilzer_sel = require('../../assets/images/icon/sel/liquid.png');
const setting_sel = require('../../assets/images/icon/sel/settings.png');

import Colors from '../../constants/Colors';

const TAB_ICON_SIZE = 25;

export default class TabBarIcon extends React.Component {
  render() {
    var img = '';
    if( this.props.name === 'Granular' ){
      img = this.props.focused ? solid_fertilzer_sel : solid_fertilzer;
    } else if( this.props.name === 'Liquid' ){
      img = this.props.focused ? liquid_fertilzer_sel : liquid_fertilzer;
    } else if( this.props.name === 'Setting' ){
      img = this.props.focused ? setting_sel : setting;
    }

    return (
      <View >
        <Image source={img} style={{width: TAB_ICON_SIZE, height: TAB_ICON_SIZE}}/>
        {/*<Text style={{color: this.props.focused ? Colors.textBlueColor :Colors.textGreyColor, marginBottom:5}}>{this.props.name}</Text>*/}
      </View>
    );
  }
}
