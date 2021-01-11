import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  View,
  ScrollView,
} from 'react-native';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import {
  Avatar,
  CheckBox,
  Input,
  Icon,
  ListItem,
  Overlay,
} from 'react-native-elements';
import SplashStyle from './SplashStyle';

const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH / LW;

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void {
    setTimeout(() => {
      this.props.navigation.navigate('Home');
    }, 2250);
  }

  render() {
    return (
      <View style={styles.mainContent}>
        <Image
          style={styles.logo_image}
          source={require('../assets/images/logo.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create(SplashStyle);
