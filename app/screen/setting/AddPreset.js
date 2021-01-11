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
    AsyncStorage,
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
import {KeyboardAccessoryNavigation} from "react-native-keyboard-accessory";

const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH / LW;

export default class AddPreset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowGranularPreset: false,
            sizeoflawn: '',
            poundsofNitronper: '',
            productAnN: '',
            productAnP: '',
            productAnK: '',
            weightofbags: '',
            costPerBag: '',

            targetRateofNitrogen: '',
            weightofContainer: '',
            sizeOfContainer: 0,
            costPerContainer: '',

            addpresetName: '',
            isShowLiquidPreset: false,
            netweightofpounds: '',
            liquidPresets: [],
            granularPresets: [],
            isShowAnalysisInfo: false,
            currentPreset: undefined,
            isUpdate: false,
        };
    }

    refresh() {
        this.setState({
            sizeoflawn: '',
            poundsofNitronper: '',
            productAnN: '',
            productAnP: '',
            productAnK: '',
            weightofbags: '',
            costPerBag: '',
            addpresetName: '',
            netweightofpounds: '',
            targetRateofNitrogen: '',
            weightofContainer: '',
            sizeOfContainer: 0,
            costPerContainer: '',
        });
    }


    async componentDidMount(): void {
        await AsyncStorage.getItem('granularpresets').then(data => {
            if (data !== null) {
                var presetarray = JSON.parse(data);
                this.setState({granularPresets: presetarray});
            }
        });

        await AsyncStorage.getItem('liquidpresets').then(data => {
            if (data !== null) {
                var presetarray = JSON.parse(data);
                this.setState({liquidPresets: presetarray});
            }
        });
    }

    refreshG = async () => {
        await AsyncStorage.getItem('granularpresets').then(data => {
            if (data !== null) {
                var presetarray = JSON.parse(data);
                this.setState({granularPresets: presetarray});
            }
        });
    }

    refreshL = async () => {
        await AsyncStorage.getItem('liquidpresets').then(data => {
            if (data !== null) {
                var presetarray = JSON.parse(data);
                this.setState({liquidPresets: presetarray});
            }
        });
    }

    goToAddGranular = (item) => {
        if (item != null) {
            this.props.navigation.navigate('AddGranular', {
                onGoBack: () => this.refreshG(),
                isUpdate: true,
                currentPreset: item,
                addpresetName: item.name,
                sizeoflawn: item.sizeoflawn,
                poundsofNitronper: item.poundsofNitronper,
                productAnN: item.productAnN,
                productAnP: item.productAnP,
                productAnK: item.productAnK,
                weightofbags: item.weightofbags,
                costPerBag: item.costPerBag,
            });
        }else{
            this.props.navigation.navigate('AddGranular', {
                onGoBack: () => this.refreshG(),
                isUpdate: false,
                currentPreset: {},
                addpresetName: '',
                sizeoflawn: '',
                poundsofNitronper: '',
                productAnN: '',
                productAnP: '',
                productAnK: '',
                weightofbags: '',
                costPerBag: '',
            });
        }
    }

    goToAddLiquid = (item) => {
        if(item!= null){
            this.props.navigation.navigate('AddLiquid', {
                onGoBack: () => this.refreshL(),
                currentPreset: item,
                isUpdate: true,
                addpresetName: item.name,
                targetRateofNitrogen: item.targetRateofNitrogen,
                sizeoflawn: item.sizeoflawn,
                sizeOfContainer: item.sizeOfContainer,
                productAnN: item.productAnN,
                productAnP: item.productAnP,
                productAnK: item.productAnK,
                weightofContainer: item.weightofContainer,
                costPerContainer: item.costPerContainer,
            });
        }else {
            this.props.navigation.navigate('AddLiquid', {
                onGoBack: () => this.refreshL(),
                currentPreset: {},
                isUpdate: false,
                addpresetName: '',
                targetRateofNitrogen: '',
                sizeoflawn: '',
                sizeOfContainer: 0,
                productAnN: '',
                productAnP: '',
                productAnK: '',
                weightofContainer: '',
                costPerContainer: '',
            });
        }

    }

    getNumberFormatText(text) {
        // return text.replace(/\D/gm, '');
        let newText = '';
        let numbers = '0123456789.';

        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            } else {
                // alert("please enter numbers only");
            }
        }
        return newText;
    }

    render() {
        return (
            <View style={styles.mainContent}>

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

                <Text style={styles.view_type_title}>Presets</Text>


                <View style={styles.add_container}>


                    <View style={styles.row_between_container}>
                        <Text style={styles.project_sub_title_text}>Granular</Text>
                        <TouchableOpacity
                            style={styles.new_entry_btn}
                            onPress={() => {
                                this.goToAddGranular(null);
                            }}
                        >
                            <Text style={styles.add_new_project_text}>Add New</Text>
                        </TouchableOpacity>
                    </View>


                    <ScrollView style={{width: '100%'}}>
                        {this.state.granularPresets.map((item, i) => (
                            <ListItem
                                containerStyle={styles.preset_list_item_container}
                                Component={TouchableOpacity}
                                onPress={() => {
                                    if (item != null) {
                                        // this.goToAddGranular(item);
                                    }
                                }}
                                key={i}
                                title={i + 1 + '.  ' + item.name}
                                rightElement={

                                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>

                                        <Icon name={'edit'}
                                              color={Colors.chevronColor}
                                              containerStyle={styles.project_item_icon_container}
                                              type={"feather"}
                                              size={20}
                                              Component={TouchableOpacity}
                                              onPress={() => {
                                                  console.log('select item', item);
                                                  if (item != null) {
                                                      this.goToAddGranular(item);
                                                  }
                                              }}
                                        />

                                        <View style={{backgroundColor: Colors.borderGreyColor, width: 1}}/>

                                        <Icon name={'trash'}
                                              color={Colors.chevronColor}
                                              containerStyle={styles.project_item_icon_container}
                                              type={"simple-line-icon"}
                                              size={20}
                                              Component={TouchableOpacity}
                                              onPress={() => {

                                                  Alert.alert(
                                                      'Are you sure?',
                                                      'This action is irreversible, please confirm to delete this item.',
                                                      [
                                                          {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                                          {
                                                              text: 'Yes', onPress: async () => {
                                                                  var array = this.state.granularPresets;
                                                                  array.forEach((x, index, object) => {
                                                                      if (x.name == item.name) {
                                                                          object.splice(index, 1);
                                                                          console.log('found the same array item', x);
                                                                      }
                                                                  });
                                                                  console.log('after delete', array);
                                                                  this.setState({granularPresets: array});
                                                                  var stringofliquid = JSON.stringify(array);
                                                                  AsyncStorage.setItem('granularpresets', stringofliquid);
                                                              }
                                                          },
                                                      ],
                                                      {cancelable: false}
                                                  );
                                              }}
                                        />
                                    </View>
                                }
                                contentContainerStyle={{marginTop: 2}}
                            />
                        ))}
                    </ScrollView>


                    <View style={styles.row_between_container}>
                        <Text style={styles.project_sub_title_text}>Liquid</Text>
                        <TouchableOpacity
                            style={styles.new_entry_btn}
                            onPress={() => {
                                this.goToAddLiquid(null);
                            }}
                        >
                            <Text style={styles.add_new_project_text}>Add New</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={{width: '100%'}}>
                        {this.state.liquidPresets.map((item, i) => (
                            <ListItem
                                containerStyle={styles.preset_list_item_container}
                                Component={TouchableOpacity}
                                onPress={() => {
                                    if (item != null) {
                                    }
                                }}
                                key={i}
                                title={i + 1 + '.  ' + item.name}
                                rightElement={

                                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>

                                        <Icon name={'edit'}
                                              color={Colors.chevronColor}
                                              containerStyle={styles.project_item_icon_container}
                                              type={"feather"}
                                              size={20}
                                              Component={TouchableOpacity}
                                              onPress={() => {
                                                  console.log('select item', item);
                                                  if (item != null) {
                                                      this.goToAddLiquid(item);
                                                  }
                                              }}
                                        />

                                        <View style={{backgroundColor: Colors.borderGreyColor, width: 1}}/>

                                        <Icon name={'trash'}
                                              color={Colors.chevronColor}
                                              containerStyle={styles.project_item_icon_container}
                                              type={"simple-line-icon"}
                                              size={20}
                                              Component={TouchableOpacity}
                                              onPress={() => {

                                                  Alert.alert(
                                                      'Are you sure?',
                                                      'This action is irreversible, please confirm to delete this item.',
                                                      [
                                                          {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                                          {
                                                              text: 'Yes', onPress: async () => {
                                                                  console.log('select item', item);
                                                                  var array = this.state.liquidPresets;
                                                                  array.forEach((x, index, object) => {
                                                                      if (x.name == item.name) {
                                                                          object.splice(index, 1);
                                                                          console.log('found the same array item', x);
                                                                      }
                                                                  });
                                                                  console.log('after delete', array);
                                                                  this.setState({liquidPresets: array});
                                                                  var stringofliquid = JSON.stringify(array);
                                                                  AsyncStorage.setItem('liquidpresets', stringofliquid);
                                                              }
                                                          },
                                                      ],
                                                      {cancelable: false}
                                                  );
                                              }}
                                        />
                                    </View>
                                }
                                contentContainerStyle={{marginTop: 2}}
                            />
                        ))}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(SettingViewStyle);
