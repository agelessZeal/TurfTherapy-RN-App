import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    TextInput,
    ScrollView,
    Switch,
    Linking,
    Text, TouchableOpacity, Image, AsyncStorage, Alert, ImageBackground,
} from 'react-native';

import {KeyboardAccessoryNavigation} from 'react-native-keyboard-accessory';

import Colors from "../../constants/Colors";

import {Icon, ListItem} from "react-native-elements";
import TipsStyle from "./TipsStyle";

const LW = Layout.window.width;
const LH = Layout.window.height;

import ActivityIndicatorHelper from "../../components/ActivityIndicatorHelper";

import {TabView, SceneMap} from 'react-native-tab-view';
import {TabBar} from 'react-native-tab-view';
import Layout from "../../constants/Layout";

import SwitchSelector from 'react-native-switch-selector';

import MaterialTabs from 'react-native-material-tabs';

import FastImage from 'react-native-fast-image'


class Tips extends Component {


    constructor(props) {
        super(props);
        this.state = {
            apiServer: 'http://18.223.184.254/api/api.php',
            uploadURI: 'http://18.223.184.254/api/',
            loading: false,
            howToVideos: [],
            tipOfMonth: [],
            helpLinks: [],
            selectedIndex: 0,
            routes: [
                {key: 'video', title: 'Videos'},
                {key: 'tips', title: 'Tips'},
                {key: 'helps', title: 'Helps Links'},]
        };
    }

    async componentDidMount(): void {
        this.loadingLinks();

    }

    loadingLinks() {
        let data = new FormData()
        // params
        data.append('action', 'get-all-videos')
        this.setState({loading: true});
        fetch(this.state.apiServer, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: data
        })
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                if (res.result == 'ok') {
                    console.log(JSON.stringify(res));
                    const data = res.data;
                    const videos = data['videos'];
                    const tips = data['tips'];
                    const helps = data['helplinks'];
                    this.setState(
                        {
                            howToVideos: videos,
                            tipOfMonth: tips,
                            helpLinks: helps
                        })

                } else {
                    Alert.alert(
                        '',
                        res,
                        [
                            {
                                text: 'OK', onPress: () =>
                                    console.log('Fail')
                            },
                        ],
                        {cancelable: false}
                    )
                }
                this.setState({
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                });
                Alert.alert(
                    '',
                    error.message,
                    [
                        {
                            text: 'OK', onPress: () =>
                                console.log('failed')
                        },
                    ],
                    {cancelable: false}
                )
            })
    }

    setIndex(value) {
        console.log(value)
        this.setState({
            viewIndex: value,
        })
        return undefined;
    }

    tabIndexChange = index => {
        this.setState({
            ...this.state,
            selectedIndex: index,
        });
    };

    render() {
        return (
            <View style={styles.container}>

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

                <View style={{width: '100%', paddingHorizontal: 8}}>
                    <MaterialTabs
                        barColor={Colors.lightGrayBkColor}
                        items={['Free Tools', 'Favorites', 'My Videos',]}
                        selectedIndex={this.state.selectedIndex}
                        onChange={this.tabIndexChange}
                        textStyle={{color: Colors.textBlackColor, fontSize: 16}}
                        indicatorColor={Colors.bkGreen}
                        activeTextColor={Colors.textBlackColor}
                    />
                </View>

                {/*<SwitchSelector*/}
                {/*    initial={0}*/}
                {/*    style={{marginHorizontal: 10}}*/}
                {/*    onPress={value => this.tabIndexChange(value)}*/}
                {/*    selectedColor={Colors.textGreenColor}*/}
                {/*    borderRadius = {0}*/}
                {/*    borderColor = { Colors.whiteColor}*/}
                {/*    buttonColor={Colors.whiteColor}*/}
                {/*    hasPadding*/}
                {/*    options={[*/}
                {/*        {label: 'My Videos', value: 0},*/}
                {/*        {label: 'Trending Tips', value: 1},*/}
                {/*        {label: 'Free Tools', value: 2},*/}
                {/*    ]}*/}
                {/*/>*/}

                <ScrollView style={{flex: 1}}>
                    <View style={styles.tips_container}>
                        {
                            this.state.selectedIndex == 2 &&
                            <View >
                                {this.state.howToVideos.map((item, i) => (
                                    <View style={styles.column_center_container}>
                                        <TouchableOpacity
                                            style={styles.tips_item}
                                            onPress={() => {
                                                Linking.openURL(item.url);
                                            }}>

                                            <FastImage
                                                style={styles.tip_image}
                                                source={{
                                                    uri: item.image,
                                                    headers: {Authorization: 'someAuthToken'},
                                                    priority: FastImage.priority.normal,
                                                }}
                                                resizeMode={FastImage.resizeMode.stretch}
                                            />
                                        </TouchableOpacity>

                                        <Text style={styles.tips_item_text}>{item.comment}</Text>
                                    </View>
                                ))}
                            </View>
                        }
                        {
                            this.state.selectedIndex == 1 &&
                            <View >
                                {this.state.tipOfMonth.map((item, i) => (
                                    <View style={styles.column_center_container}>
                                        <TouchableOpacity
                                            style={styles.tips_item}
                                            onPress={() => {
                                                Linking.openURL(item.url);
                                                // this.props.navigation.navigate('YoutubePage');
                                            }}>
                                            <FastImage
                                                style={styles.tip_image}
                                                source={{
                                                    uri: item.image,
                                                    headers: {Authorization: 'someAuthToken'},
                                                    priority: FastImage.priority.normal,
                                                }}
                                                resizeMode={FastImage.resizeMode.stretch}
                                            />

                                        </TouchableOpacity>

                                        <Text style={styles.tips_item_text}>{item.comment}</Text>
                                    </View>
                                ))}
                            </View>
                        }
                        {
                            this.state.selectedIndex == 0 &&
                            <View>
                                {this.state.helpLinks.map((item, i) => (
                                    <View style={styles.column_center_container}>
                                        <TouchableOpacity
                                            style={styles.tips_item}
                                            onPress={() => {
                                                Linking.openURL(item.url);
                                                // this.props.navigation.navigate('YoutubePage');
                                            }}>
                                            <FastImage
                                                style={styles.tip_image}
                                                source={{
                                                    uri: item.image,
                                                    headers: {Authorization: 'someAuthToken'},
                                                    priority: FastImage.priority.normal,
                                                }}
                                                resizeMode={FastImage.resizeMode.stretch}
                                            />

                                        </TouchableOpacity>
                                        <Text style={styles.tips_item_text}>{item.comment}</Text>
                                    </View>
                                ))}
                            </View>
                        }
                    </View>
                </ScrollView>
                {this.state.loading && <ActivityIndicatorHelper/>}
            </View>
        );
    }
}

const styles = StyleSheet.create(TipsStyle);
export default Tips;
