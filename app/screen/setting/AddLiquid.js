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
import {Dropdown} from "react-native-material-dropdown";

const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH / LW;

let inputs = [
    {
        placeholder: 'Preset Name',
        name: 'presetName',
    },
    {
        keyboardType: 'numeric',
        placeholder: 'Size of Lawn',
        name: 'sizeofLawn'
    },
    {
        placeholder: 'N',
        name: 'productN',
    },
    {
        keyboardType: 'numeric',
        placeholder: 'P',
        name: 'productP',
    },
    {
        keyboardType: 'numeric',
        placeholder: 'K',
        name: 'productK',
    },
    {
        keyboardType: 'numeric',
        placeholder: 'Container Size',
        name: 'containersize'
    },
    {
        keyboardType: 'numeric',
        placeholder: 'Container Weight',
        name: 'containerWeight'
    },
    {
        keyboardType: 'numeric',
        placeholder: 'Cost Per Container',
        name: 'costPerContainer'
    },
];

let ContainerSizes = [
    {
        value: 32,
        label: '32 oz',
        oz: 32,
    },
    {
        value: 33.81,
        label: '1 liter',
        oz: 33.81,
    },
    {
        value: 128,
        label: '1 gal',
        oz: 128,
    },
    {
        value: 256,
        label: '2 gal',
        oz: 256,
    },
    {
        value: 320,
        label: '2.5 gal',
        oz: 320,
    },
    {
        value: 640,
        label: '5 gal',
        oz: 640,
    },
];

export default class AddLiquid extends Component {
    constructor(props) {
        super(props);

        inputs = inputs.map(input => ({
            ref: React.createRef(),
            ...input,
        }));

        const { params } = this.props.navigation.state;

        if(params.sizeOfContainer === '' || params.sizeOfContainer == 0 || params.sizeOfContainer === undefined ){
           params.sizeOfContainer = 32;
        }

        this.state = {
            sizeoflawn: params.sizeoflawn,
            poundsofNitronper: '',
            productAnN: params.productAnN,
            productAnP: params.productAnP,
            productAnK: params.productAnK,
            weightofbags: '',
            costPerBag: '',

            targetRateofNitrogen: params.targetRateofNitrogen,
            weightofContainer: params.weightofContainer,
            sizeOfContainer: params.sizeOfContainer,
            costPerContainer: params.costPerContainer,

            addpresetName: params.addpresetName,
            netweightofpounds: '',
            liquidPresets: [],
            granularPresets: [],
            isShowAnalysisInfo: false,
            currentPreset: params.currentPreset,
            isUpdate: params.isUpdate,

            activeInputIndex: 0,
            nextFocusDisabled: false,
            previousFocusDisabled: false,
            buttonsDisabled: false,
            buttonsHidden: false,
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

    componentDidMount(): void {

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
    addAsyncItem = async (data) => {
        var preset = {
            name: this.state.addpresetName,
            sizeoflawn: this.state.sizeoflawn,
            targetRateofNitrogen: this.state.targetRateofNitrogen,
            isType :1,
            targetRateOfPhosphorus: '',
            targetRateOfPotassium: '',

            productAnN: this.state.productAnN,
            productAnP: this.state.productAnP,
            productAnK: this.state.productAnK,
            weightofContainer: this.state.weightofContainer,
            sizeOfContainer: this.state.sizeOfContainer,
            costPerContainer: this.state.costPerContainer,
        };
        console.log('add preset:', preset);
        if (data !== null) {
            var presetarray = JSON.parse(data);
            // if (presetarray.length >= 4) {
            //   Alert.alert(
            //     'Preset Limit Reached',
            //     '',
            //     [
            //       {
            //         text: 'OK',
            //         onPress: () => console.log('Fail'),
            //       },
            //     ],
            //     {cancelable: false},
            //   );
            //   return;
            // }
            if (this.state.isUpdate) {
                presetarray.forEach((x, index, object) => {
                    if (x.name == this.state.currentPreset.name) {
                        object.splice(index, 1);
                        console.log('found the same array item', x);
                    }
                });
            }
            presetarray.push(preset);
            this.setState({
                liquidPresets: presetarray,
            });
            var stringofPresets = JSON.stringify(presetarray);
            await AsyncStorage.setItem('liquidpresets', stringofPresets);
            await this.props.navigation.state.params.onGoBack();
            this.setState({isUpdate: false});
            this.props.navigation.goBack()

        } else {
            var presetarray = [];
            presetarray.push(preset);
            this.setState({granularPresets: presetarray});
            var stringofPresets = JSON.stringify(presetarray);
            await AsyncStorage.setItem('liquidpresets', stringofPresets);
            await this.props.navigation.state.params.onGoBack();
            this.props.navigation.goBack()
        }
    }


    addLiquidPreset() {
        if (this.state.addpresetName !== '') {
            AsyncStorage.getItem('liquidpresets').then(data => this.addAsyncItem(data));
        } else {
            Alert.alert(
                'Presets name is empty',
                'Please enter presets name',
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

                <ScrollView style={{flex: 1}}>
                    <View style={styles.add_preset_container}>

                        <View style={styles.preset_above_container}>
                            <Text style={styles.preset_name_text}>Preset name</Text>
                            <Input
                                containerStyle={styles.overlay_text_input_content}
                                inputContainerStyle={{borderBottomWidth: 0}}
                                labelStyle={styles.text_label_input}
                                inputStyle={{fontSize: 16,fontFamily:'OpenSans',color:Colors.textBlackColor}}
                                placeholder={'Enter name'}
                                key = {`0`}
                                ref = {inputs[0].ref}
                                blurOnSubmit={false}
                                onFocus={this.handleFocus(0)}
                                fontSize={Layout.font.medium_size}
                                value={this.state.addpresetName}
                                onChangeText={text => {
                                    this.setState({addpresetName: text});
                                }}
                                placeholder="-"
                            />

                            <View style={styles.app_data_input_container}>
                                <View style={styles.input_share_items}>
                                    <Input
                                        containerStyle={styles.preset_inputbox_container}
                                        labelStyle={styles.text_label_input}
                                        paddingTop={5}
                                        inputContainerStyle={{borderBottomWidth:0}}
                                        inputStyle={{textAlign:'center'}}
                                        paddingBottom={0}
                                        key={`1`}
                                        ref={inputs[1].ref}
                                        blurOnSubmit={false}
                                        onFocus={this.handleFocus(1)}
                                        keyboardType={'numeric'}
                                        fontSize={Layout.font.medium_size}
                                        value={this.state.sizeoflawn}
                                        onChangeText={text => {
                                            const filteredText = this.getNumberFormatText(text);
                                            this.setState({sizeoflawn: filteredText});
                                        }}
                                        placeholder="-"
                                    />
                                </View>
                                <Text style={styles.app_data_text}> Size of Lawn (sq ft)
                                </Text>
                            </View>
                            <View style={styles.project_sum_row_container}/>
                        </View>

                        <View style={styles.add_preset_input_container}>
                            <View contentContainerStyle={{flex: 1}}>
                                <View style={styles.analysis_container}>
                                    <Text style={styles.analysis_container_text}>Product Analysis</Text>
                                    <TouchableOpacity
                                        style={styles.infobtn_container}
                                        onPress={() => {
                                            this.setState({isShowAnalysisInfo: true});
                                        }}>
                                        <View style={{width: '70%', height: '70%'}}>
                                            <Image
                                                style={styles.fit_image}
                                                source={require('../../assets/images/new/info.png')}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.preset_above_container,{paddingHorizontal:0}]}>
                                    <View
                                        style={{
                                            justifyContent: 'space-between',
                                            flexDirection: 'row',
                                            marginBottom: 10,
                                            marginTop: 10,
                                        }}>

                                        <View style={styles.input_add_preset}>
                                            <Input
                                                containerStyle={styles.containerborder}
                                                inputContainerStyle={{borderBottomWidth: 0,padding:0}}
                                                labelStyle={styles.text_label_input}
                                                inputStyle={styles.text_input_gray_border}
                                                paddingTop={5}
                                                paddingBottom={0}
                                                label="N"
                                                keyboardType={'numeric'}
                                                key = {`2`}
                                                ref = {inputs[2].ref}
                                                blurOnSubmit={false}
                                                onFocus={this.handleFocus(2)}
                                                fontSize={Layout.font.medium_size}
                                                value={this.state.productAnN}
                                                onChangeText={text => {
                                                    const filteredText = this.getNumberFormatText(text);
                                                    this.setState({productAnN: filteredText});
                                                }}
                                                placeholder="-"
                                            />
                                        </View>

                                        <View style={styles.input_add_preset}>
                                            <Input
                                                containerStyle={styles.containerborder}
                                                inputContainerStyle={{borderBottomWidth: 0}}
                                                labelStyle={styles.text_label_input}
                                                inputStyle={styles.text_input_gray_border}
                                                paddingTop={5}
                                                paddingBottom={0}
                                                label="P"
                                                keyboardType={'numeric'}
                                                key = {`3`}
                                                ref = {inputs[3].ref}
                                                blurOnSubmit={false}
                                                onFocus={this.handleFocus(3)}
                                                fontSize={Layout.font.medium_size}
                                                value={this.state.productAnP}
                                                onChangeText={text => {
                                                    const filteredText = this.getNumberFormatText(text);
                                                    this.setState({productAnP: filteredText});
                                                }}
                                                placeholder="-"
                                            />
                                        </View>

                                        <View style={styles.input_add_preset}>
                                            <Input
                                                containerStyle={styles.containerborder}
                                                inputContainerStyle={{borderBottomWidth: 0}}
                                                labelStyle={styles.text_label_input}
                                                inputStyle={styles.text_input_gray_border}
                                                paddingTop={5}
                                                paddingBottom={0}
                                                label="K"
                                                keyboardType={'numeric'}
                                                key = {`4`}
                                                ref = {inputs[4].ref}
                                                blurOnSubmit={false}
                                                onFocus={this.handleFocus(4)}
                                                fontSize={Layout.font.medium_size}
                                                value={this.state.productAnK}
                                                onChangeText={text => {
                                                    const filteredText = this.getNumberFormatText(text);
                                                    this.setState({productAnK: filteredText});
                                                }}
                                                placeholder="-"
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.preset_input_container}>
                                        <View style={styles.picker_width}>
                                            <View style={[styles.rn_picker_container,{borderColor:Colors.borderGreyColor}]}>
                                                <Dropdown
                                                    key = {`5`}
                                                    ref = {inputs[5].ref}
                                                    blurOnSubmit={false}
                                                    onFocus={this.handleFocus(5)}
                                                    value={this.state.sizeOfContainer}
                                                    labelFontSize={2}
                                                    containerStyle={{width: '100%',height: 40,marginTop:0,padding:0,justifyContent:'center'}}
                                                    pickerStyle={{width: '100%',}}
                                                    data={ContainerSizes}
                                                    fontSize={14}
                                                    itemTextStyle={styles.app_data_text}
                                                    onChangeText={(value,index,data)=> {
                                                        console.log(value);
                                                        this.setState({sizeOfContainer:value})
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={styles.app_data_text}>Size of Container</Text>
                                            <Text style={styles.app_data_text1}>(fertilizer of choice)</Text>
                                        </View>
                                    </View>

                                    <View style={styles.preset_input_container}>
                                        <View style={styles.input_share_items}>
                                            <Input
                                                containerStyle={styles.preset_inputbox_container}
                                                labelStyle={styles.text_label_input}
                                                paddingTop={5}
                                                inputContainerStyle={{borderBottomWidth:0}}
                                                inputStyle={{textAlign:'center'}}
                                                paddingBottom={0}
                                                key = {`6`}
                                                ref = {inputs[6].ref}
                                                blurOnSubmit={false}
                                                onFocus={this.handleFocus(6)}
                                                keyboardType={'numeric'}
                                                fontSize={Layout.font.medium_size}
                                                value={this.state.weightofContainer}
                                                onChangeText={text => {
                                                    const filteredText = this.getNumberFormatText(text);
                                                    this.setState({weightofContainer: filteredText});
                                                }}
                                                placeholder="-"
                                            />
                                        </View>
                                        <Text style={styles.app_data_text}>Container Weight (lbs)</Text>
                                    </View>



                                    <View style={styles.preset_input_container}>
                                        <View style={styles.input_share_items}>
                                            <Input
                                                containerStyle={styles.preset_inputbox_container}
                                                labelStyle={styles.text_label_input}
                                                paddingTop={5}
                                                inputContainerStyle={{borderBottomWidth:0}}
                                                inputStyle={{textAlign:'center'}}
                                                paddingBottom={0}
                                                keyboardType={'numeric'}
                                                key = {`7`}
                                                ref = {inputs[7].ref}
                                                blurOnSubmit={false}
                                                onFocus={this.handleFocus(7)}
                                                fontSize={Layout.font.medium_size}
                                                value={this.state.costPerContainer}
                                                onChangeText={(text) => {
                                                    const filteredText = this.getNumberFormatText(text);
                                                    this.setState({costPerContainer: filteredText});
                                                }}
                                                placeholder="-"
                                            />
                                        </View>
                                        <View>
                                            <Text style={styles.app_data_text}>Cost Per Container($) </Text>
                                            <Text style={styles.app_data_text1}>With taxes increases accuracy</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.add_preset_action_container}>
                            <ListItem
                                containerStyle={[styles.home_item_container, styles.radius_btn_shadow]}
                                Component={TouchableOpacity}
                                leftElement={
                                    <View style={styles.action_bar}>
                                        <TouchableOpacity
                                            style={styles.radius_btn_item}
                                            onPress={() => {
                                                this.props.navigation.goBack();
                                            }}>
                                            <Text style={styles.action_item_text}>Cancel</Text>
                                        </TouchableOpacity>

                                        <View style={{backgroundColor:Colors.lightGrayColor,width:1,height:'100%'}}/>
                                        <TouchableOpacity
                                            style={styles.radius_btn_item}
                                            onPress={() => {
                                                this.addLiquidPreset();
                                            }}>
                                            <Text style={[styles.action_item_text,{color:Colors.textGreenColor}]}>{this.state.isUpdate ? 'Save' : 'Add'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            >
                            </ListItem>
                        </View>
                    </View>
                </ScrollView>

                <Overlay
                    isVisible={this.state.isShowAnalysisInfo}
                    overlayBackgroundColor={Colors.whiteColor}
                    overlayStyle={styles.overlay_container}
                    windowBackgroundColor={Colors.overlayWindowColor}
                    onBackdropPress={() => this.setState({isShowAnalysisInfo: false})}
                    width={LW - 50}
                    height="auto">
                    <View style={styles.fit_parent}>
                        <Text style={styles.info_title_text}>Product Analysis</Text>

                        <TouchableOpacity style={styles.overlay_close_btn}
                                          onPress={() => {
                                              this.setState({isShowAnalysisInfo: false});
                                          }}>
                            <View style={{width: '100%', height: '100%'}}>
                                <Image
                                    style={styles.fit_image}
                                    source={require('../../assets/images/new/Close.png')}
                                />
                            </View>
                        </TouchableOpacity>

                        <Text style={styles.info_content_text}>
                            Enter the amounts (%) of nitrogen (N), phosphorus (P), and
                            potassium (K) in the fertilizer you selected. For example, 24-1-8 would be the
                            percentages of N-P-K.
                        </Text>
                    </View>
                </Overlay>

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
