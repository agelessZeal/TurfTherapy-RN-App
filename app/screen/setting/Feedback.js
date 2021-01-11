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
import LinearGradient from "react-native-linear-gradient";
import {KeyboardAccessoryNavigation} from "react-native-keyboard-accessory";

const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH / LW;
let inputs = [
    {
        placeholder: 'N',
        name: 'productN',
    },
    {
        keyboardType: 'email-address',
        placeholder: 'P',
        name: 'productP',
    },
];
export default class Feedback extends Component {
    constructor(props) {
        super(props);
        inputs = inputs.map(input => ({
            ref: React.createRef(),
            ...input,
        }));
        this.state = {
            feedbackFrom: '',
            feedbackSubject: 'Turf Therapy',
            feedbackContent: '',

            activeInputIndex: 0,
            nextFocusDisabled: false,
            previousFocusDisabled: false,
            buttonsDisabled: false,
            buttonsHidden: false,
        };
    }

    openMailApp() {
        if (Platform.OS === 'android') {
            NativeModules.UIMailLauncher.launchMailApp(); // UIMailLauncher is the
            return;
        }
        Linking.openURL('message:0'); // iOS
        return;
    }

    validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            this.setState({ email: text })
            return false;
        }
        else {
            this.setState({ email: text })
            console.log("Email is Correct");
        }
    }

    isEmailValid = (text) => {
        let email = text;
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(String(email).toLowerCase())
    }

    sendEmail() {
        if (
            this.state.feedbackFrom != '' &&
            this.state.feedbackContent != ''
        ) {
            if(!this.isEmailValid(this.state.feedbackFrom)){
                Alert.alert(
                    'Your email is  wrong',
                    'Please input your correct email',
                    [
                        {
                            text: 'OK',
                            onPress: () => console.log('Fail'),
                        },
                    ],
                    {cancelable: false},
                );
            }else{
                Linking.openURL(
                    'mailto:turftherapy357@gmail.com?subject=' +
                    this.state.feedbackSubject +
                    '&body=' +
                    this.state.feedbackContent +
                    '&cc=' +
                    this.state.feedbackFrom,
                );
            }
        } else {
            if(this.state.feedbackFrom == ''){
                Alert.alert(
                    'Your email Empty',
                    'Please input your email',
                    [
                        {
                            text: 'OK',
                            onPress: () => console.log('Fail'),
                        },
                    ],
                    {cancelable: false},
                );
            }else if(this.state.feedbackContent == ''){
                Alert.alert(
                    'Content Empty',
                    'Please input your feedback content',
                    [
                        {
                            text: 'OK',
                            onPress: () => console.log('Fail'),
                        },
                    ],
                    {cancelable: false},
                );
            }
        }
    }

    _handleFocusNextField = (nextField) => {
        // this.refs[nextField].refs.TextInput.focus();
    }

    handleFocus = index => () => {
        this.setState({
            nextFocusDisabled: index === inputs.length - 1,
            previousFocusDisabled: index === 0,
            activeInputIndex: index,
        });
    }

    handleFocusNext = () => {
        const {nextFocusDisabled, activeInputIndex} = this.state;
        if (nextFocusDisabled) {
            return;
        }
        inputs[activeInputIndex + 1].ref.current.focus();
    }

    handleFocusPrevious = () => {
        const {previousFocusDisabled, activeInputIndex} = this.state;
        if (previousFocusDisabled) {
            return;
        }

        inputs[activeInputIndex - 1].ref.current.focus();
    }


    render() {
        const toEmail = 'turftherapy357@gmail.com';
        return (
            <View style={styles.feedback_view}>
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
                        <Icon type='material-community' iconStyle={styles.right_chevron_icon_image} size={24}
                              name={'arrow-left'} color={Colors.titleBlack}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.view_type_title}>Feedback</Text>

                <ScrollView style={{flex: 1}}>

                    <View style={styles.feedback_container}>
                        <View style={styles.feedback_sub_container}>
                            <Text style={styles.regular_text}>To :</Text>
                            <View style={{flex: 1}}>
                                <Input
                                    containerStyle={styles.overlay_text_input_content}
                                    inputContainerStyle={{borderBottomWidth: 0}}
                                    labelStyle={styles.text_label_input}
                                    inputStyle={{fontSize: 13, fontFamily: 'OpenSans', color: Colors.textBlackColor}}
                                    placeholder={'Turf Therapy Admin'}
                                    editable={false}
                                    // key={`0`}
                                    // ref={inputs[0].ref}
                                    // blurOnSubmit={false}
                                    // onFocus={this.handleFocus(0)}
                                    autoFocus={false}
                                    returnKeyType={'next'}
                                    fontSize={Layout.font.medium_size}
                                    value={'Turf Therapy Admin'}
                                    onChangeText={text => {
                                    }}
                                />
                            </View>
                        </View>


                        <View style={styles.feedback_sub_container}>
                            <Text style={styles.regular_text}>From :</Text>
                            <View style={{flex: 1}}>
                                <Input
                                    containerStyle={styles.overlay_text_input_content}
                                    inputContainerStyle={{borderBottomWidth: 0}}
                                    labelStyle={styles.text_label_input}
                                    inputStyle={{fontSize: 13, fontFamily: 'OpenSans', color: Colors.textBlackColor}}
                                    placeholder={'Enter with email'}
                                    key={`0`}
                                    ref={inputs[0].ref}
                                    blurOnSubmit={false}
                                    onFocus={this.handleFocus(0)}
                                    autoFocus={false}
                                    returnKeyType={'next'}
                                    fontSize={Layout.font.medium_size}
                                    value={this.state.feedbackFrom}
                                    onChangeText={text => {
                                        this.setState({feedbackFrom: text});
                                    }}
                                />
                            </View>
                        </View>


                        <View>
                            <Input
                                containerStyle={styles.feedback_content_container}
                                inputContainerStyle={{borderBottomWidth: 0}}
                                labelStyle={styles.text_label_input}
                                multiline={true}
                                inputStyle={{fontSize: 13, fontFamily: 'OpenSans', color: Colors.textBlackColor}}
                                key={`1`}
                                ref={inputs[1].ref}
                                blurOnSubmit={false}
                                onFocus={this.handleFocus(1)}
                                autoFocus={false}
                                returnKeyType={'send'}
                                onChangeText={text => {
                                    this.setState({
                                        feedbackContent: text,
                                    });
                                }}
                                value={this.state.feedbackContent}
                                placeholder="Enter your feedback content"
                                onSubmitEditing={Keyboard.dismiss}
                            />
                        </View>

                        <View style={styles.send_email_container}>
                            <TouchableOpacity style={{flex: 1}}
                                              onPress={() => {
                                                  Keyboard.dismiss;
                                                  this.sendEmail();
                                              }}>
                                <LinearGradient
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 1}}
                                    colors={[Colors.gradient1, Colors.gradient2]}
                                    style={styles.gradient_btn}
                                >
                                    <Text style={styles.gradient_btn_text}>Send Feedback</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                <KeyboardAccessoryNavigation
                    avoidKeyboard={true}
                    androidAdjustResize
                    nextDisabled={this.state.nextFocusDisabled}
                    previousDisabled={this.state.previousFocusDisabled}
                    nextHidden={this.state.buttonsHidden}
                    previousHidden={this.state.buttonsHidden}
                    onNext={this.handleFocusNext}
                    onPrevious={this.handleFocusPrevious}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create(SettingViewStyle);
