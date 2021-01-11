import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
    Alert,
    View,
    ScrollView, Linking, ImageBackground,
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
import MainViewStyle from './MainViewStyle';
import openURLInBrowser from 'react-native/Libraries/Core/Devtools/openURLInBrowser';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH / LW;

export default class MainView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onSwipeUp(gestureState) {
        this.setState({myText: 'You swiped up!'});
    }

    onSwipeDown(gestureState) {
        this.setState({myText: 'You swiped down!'});
        this.setState({isShowContainer: false}, () => {
            this.props.navigation.goBack();
        });
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
            <View
                // source={require('../assets/images/main_background.png')}
                style={styles.mainContent}>
                <View style={styles.main_header_logo_container}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <View
                            style={styles.main_header_logo_image}>
                            <View style={{width: '100%', height: '100%'}}>
                                <Image
                                    style={styles.fit_image}
                                    source={require('../assets/images/logo.png')}
                                />
                            </View>
                        </View>
                        <Text style={[styles.main_header_logo_title1, styles.fontforSubtitle]}>Turf</Text>
                        <Text style={[styles.main_header_logo_title2, styles.fontforSubtitle]}>Therapy</Text>
                    </View>

                </View>
                <Text style={[styles.main_header_logo_home, styles.fontforSubtitle]}>Home</Text>
                <ScrollView>

                    <ListItem
                        containerStyle={[styles.home_item_container, styles.shadowStyle]}
                        Component={TouchableOpacity}
                        onPress={() => {
                            this.props.navigation.navigate('Granular');
                        }}
                        leftElement={
                            <TouchableOpacity style={styles.main_row}
                                              onPress={() => {
                                                  this.props.navigation.navigate('Granular');
                                              }}>

                                <View style={styles.mail_item_left_bar}/>
                                <View style={styles.main_item_left_logo}>
                                    <View style={styles.main_item_logo_image}>
                                        <View style={{width: '100%', height: '100%'}}>
                                            <Image
                                                style={styles.fit_image}
                                                source={require('../assets/images/new/seed.png')}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.item_title_container}>
                                        <Text style={styles.item_title}>Granular</Text>
                                        <Text style={styles.item_subtitle}>Calculate application rates based on desired
                                            amount
                                            of N, P, or K per 1000 sq ft.</Text>
                                    </View>
                                </View>

                            </TouchableOpacity>
                        }
                        rightElement={<View style={styles.right_chevron_icon}>
                            <View style={{width: '100%', height: '100%'}}>
                                <Icon type='material-community' iconStyle={styles.right_chevron_icon_image} size={24}
                                      name={'chevron-right'} color={Colors.chevronColor}/>
                            </View>
                        </View>}
                    >
                    </ListItem>

                    <ListItem
                        containerStyle={[styles.home_item_container, styles.shadowStyle]}
                        Component={TouchableOpacity}
                        onPress={() => {
                            this.props.navigation.navigate('Liquid');
                        }}
                        leftElement={
                            <TouchableOpacity style={styles.main_row}
                                              onPress={() => {
                                                  this.props.navigation.navigate('Liquid');
                                              }}>
                                <View style={styles.mail_item_left_bar}/>
                                <View style={styles.main_item_left_logo}>
                                    <View style={styles.main_item_logo_image}>
                                        <View style={{width: '100%', height: '100%'}}>
                                            <Image
                                                style={styles.fit_image}
                                                source={require('../assets/images/new/fertilizer.png')}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.item_title_container}>
                                        <Text style={styles.item_title}>Liquid</Text>
                                        <Text style={styles.item_subtitle}>Calculate application rates based on your
                                            desired amount of N, P, or K per 1000 sq ft.</Text>
                                    </View>
                                </View>

                            </TouchableOpacity>
                        }
                        rightElement={<View style={styles.right_chevron_icon}>
                            <View style={{width: '100%', height: '100%'}}>
                                <Icon type='material-community' iconStyle={styles.right_chevron_icon_image} size={24}
                                      name={'chevron-right'} color={Colors.chevronColor}/>
                            </View>
                        </View>}
                    >
                    </ListItem>


                    <ListItem
                        containerStyle={[styles.home_item_container, styles.shadowStyle]}
                        Component={TouchableOpacity}
                        onPress={() => {
                            this.props.navigation.navigate('Journal');
                        }}
                        leftElement={
                            <TouchableOpacity style={styles.main_row}
                                              onPress={() => {
                                                  this.props.navigation.navigate('Journal');
                                              }}>
                                <View style={styles.mail_item_left_bar}/>
                                <View style={styles.main_item_left_logo}>
                                    <View style={styles.main_item_logo_image}>
                                        <View style={{width: '100%', height: '100%'}}>
                                            <Image
                                                style={styles.fit_image}
                                                source={require('../assets/images/new/book.png')}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.item_title_container}>
                                        <Text style={styles.item_title}>Therapy Journal</Text>
                                        <Text style={styles.item_subtitle}>Keep track of the products you apply, application rates of N-P-K and estimated costs.
                                            </Text>
                                    </View>
                                </View>

                            </TouchableOpacity>
                        }
                        rightElement={<View style={styles.right_chevron_icon}>
                            <View style={{width: '100%', height: '100%'}}>
                                <Icon type='material-community' iconStyle={styles.right_chevron_icon_image} size={24}
                                      name={'chevron-right'} color={Colors.chevronColor}/>
                                {/*<Image style={styles.fit_image} source={require('../assets/images/right-arrow.png')}/>*/}
                            </View>
                        </View>}
                    >
                    </ListItem>


                    {/*<ListItem*/}
                    {/*    containerStyle={[styles.home_item_container, styles.shadowStyle]}*/}
                    {/*    Component={TouchableOpacity}*/}
                    {/*    onPress={() => {*/}
                    {/*        this.props.navigation.navigate('Tips');*/}
                    {/*    }}*/}
                    {/*    leftElement={*/}
                    {/*        <TouchableOpacity style={styles.main_row}*/}
                    {/*                          onPress={() => {*/}
                    {/*                              this.props.navigation.navigate('Tips');*/}
                    {/*                          }}>*/}
                    {/*            <View style={styles.mail_item_left_bar}/>*/}
                    {/*            <View style={styles.main_item_left_logo}>*/}
                    {/*                <View style={styles.main_item_logo_image}>*/}
                    {/*                    <View style={{width: '100%', height: '100%'}}>*/}
                    {/*                        <Image*/}
                    {/*                            style={styles.fit_image}*/}
                    {/*                            source={require('../assets/images/new/lightbulb.png')}*/}
                    {/*                        />*/}
                    {/*                    </View>*/}
                    {/*                </View>*/}
                    {/*                <View style={styles.item_title_container}>*/}
                    {/*                    <Text style={styles.item_title}>Tips & More</Text>*/}
                    {/*                </View>*/}
                    {/*            </View>*/}
                    
                    {/*        </TouchableOpacity>*/}
                    {/*    }*/}
                    {/*    rightElement={<View style={styles.right_chevron_icon}>*/}
                    {/*        <View style={{width: '100%', height: '100%'}}>*/}
                    {/*            <Icon type='material-community' iconStyle={styles.right_chevron_icon_image} size={24}*/}
                    {/*                  name={'chevron-right'} color={Colors.chevronColor}/>*/}
                    {/*        </View>*/}
                    {/*    </View>}*/}
                    {/*>*/}
                    {/*</ListItem>*/}

                    <ListItem
                        containerStyle={[styles.home_item_container, styles.shadowStyle]}
                        Component={TouchableOpacity}
                        onPress={() => {
                            this.props.navigation.navigate('Setting1');
                        }}
                        leftElement={
                            <TouchableOpacity style={styles.main_row}
                                              onPress={() => {
                                                  this.props.navigation.navigate('Setting1');
                                              }}>
                                <View style={styles.mail_item_left_bar}/>
                                <View style={styles.main_item_left_logo}>
                                    <View style={styles.main_item_logo_image}>
                                        <View style={{width: '80%', height: '80%'}}>
                                            <Image
                                                style={styles.fit_image}
                                                source={require('../assets/images/new/settings.png')}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.item_title_container}>
                                        <Text style={styles.item_title}>Settings</Text>
                                    </View>
                                </View>

                            </TouchableOpacity>
                        }
                        rightElement={<View style={styles.right_chevron_icon}>
                            <View style={{width: '100%', height: '100%'}}>
                                <Icon type='material-community' iconStyle={styles.right_chevron_icon_image} size={24}
                                      name={'chevron-right'} color={Colors.chevronColor}/>
                            </View>
                        </View>}
                    >
                    </ListItem>


                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create(MainViewStyle);
