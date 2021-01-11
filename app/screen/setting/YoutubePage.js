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
import YouTube from 'react-native-youtube';


const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH / LW;

export default class YoutubePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.mainContent}>
        <View style={styles.title_container}>
          <TouchableOpacity
            style={styles.headerLeftIcon}
            onPress={() => {
              // this.props.navigation.goBack();
            }}>
            <Image source={require('../../assets/images/left-arrow.png')} />
          </TouchableOpacity>
        </View>

        <View style={{justifyContent: 'center'}}>
          <YouTube
            videoId="Wq7MM4QNTcg" // The YouTube video ID
            apiKey={'AIzaSyCzyDMT7lb5hKotFcCXgRrMZp_-GuZUz64'}
            play // control playback of video with true/false
            fullscreen // control whether the video should play in fullscreen or inline
            loop // control whether the video should loop when ended
            onReady={e => this.setState({isReady: true})}
            onChangeState={e => this.setState({status: e.state})}
            onChangeQuality={e => this.setState({quality: e.quality})}
            onError={e => this.setState({error: e.error})}
            style={{
              alignSelf: 'stretch',
              height: '100%',
              width: LW,
              minHeight: LH - 100,
            }}
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create(SettingViewStyle);

