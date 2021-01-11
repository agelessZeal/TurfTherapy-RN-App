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
    AsyncStorage,
    FlatList, ImageBackground, Keyboard,
} from 'react-native';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import {KeyboardAccessoryNavigation, KeyboardAccessoryView} from 'react-native-keyboard-accessory'
// eslint-disable-next-line no-unused-vars
import {
    Avatar,
    CheckBox, Icon,
    Input,
    ListItem,
    Overlay,
} from 'react-native-elements';
import GranularPageStyle from './GranularPageStyle';


import {StackActions} from '@react-navigation/native';
import LinearGradient from "react-native-linear-gradient";
import MaterialTabs from "react-native-material-tabs";
import {Dropdown} from "react-native-material-dropdown";

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
    {
        keyboardType: 'numeric',
        placeholder: 'K',
        name: 'productK',
    },
    {
        placeholder: 'Target Rate',
        name: 'targetRate',
    },
    {
        keyboardType: 'numeric',
        placeholder: 'Size of Lawn',
        name: 'sizeofLawn'
    },
    {
        keyboardType: 'numeric',
        placeholder: 'Bag Weight',
        name: 'bagWeight'
    },
    {
        keyboardType: 'numeric',
        placeholder: 'Cost Per Bag',
        name: 'costPerBag'
    },
];

let TargetRates = [
    {
        value: 1,
        label: 'Target Rate of Nitrogen(N)',
    },
    {
        value: 2,
        label: 'Target Rate of Phosphorus(P)',
    },
    {
        value: 3,
        label: 'Target Rate of Potassium(K)',
    },
];


export default class GranularPage extends Component {
    constructor(props) {
        super(props);

        inputs = inputs.map(input => ({
            ref: React.createRef(),
            ...input,
        }));


        const {params} = this.props.navigation.state;
        var isAddNewApplication = false;

        if (params != undefined && params.isAddNewApplication != undefined) {
            isAddNewApplication = params.isAddNewApplication;
        }


        this.state = {
            isType:1,

            isAddNewApplication: isAddNewApplication,

            sizeoflawn: '',
            poundsofNitronper: '',
            targetRateOfPhosphorus: '',
            targetRateOfPotassium: '',
            productAnN: '',
            productAnP: '',
            productAnK: '',
            weightofbags: '',
            costPerBag: '',

            appRateinLBS: '',
            totallbsneeded: '',
            bagsneeded: '',
            totalCost: '',
            totalAppAnofpoundsN: '',
            totalAppAnofpoundsP: '',
            totalAppAnofpoundsK: '',

            isShowOutput: false,
            isShowPresets: false,
            presetArray: [],
            isShowContainer: false,
            isShowAnalysisInfo: false,
            isShowAppDataInfo: false,
            isShowPresetNameOverlay: false,


            currentPreset: undefined,
            addpresetName: '',

            activeInputIndex: 0,
            nextFocusDisabled: false,
            previousFocusDisabled: false,
            buttonsDisabled: false,
            buttonsHidden: false,


            isShowCreateNewProjectShowIndex: 0,
            isShowProjectList: false,

            isShowSaveToJournal: false,

            newProjectName: '',
            newApplicationName: '',

            granularProjectList: [],
            selectAddProject: {},
            isShowAddApplicationNameOverlay: false,
            saveJournalSelectedIndex: 0,
        };
    }

    getTargetRateOf = () => {
        if(this.state.isType === 3){
            return this.state.targetRateOfPotassium
        }else if(this.state.isType === 2){
            return this.state.targetRateOfPhosphorus
        }else{
            return this.state.poundsofNitronper
        }
    }


    saveJournalTabIndexChange = index => {
        if (index == 1) {
            this.setState({
                ...this.state,
                saveJournalSelectedIndex: index,
                // isShowCreateNewProjectNameOverlay:true,
            });
        } else {
            this.setState({
                ...this.state,
                isShowCreateNewProjectNameOverlay: false,
                saveJournalSelectedIndex: index,
            });
        }
    };


    reduce_add_journal() {
        const showindex = this.state.isShowCreateNewProjectShowIndex;
        this.setState({
            isShowCreateNewProjectShowIndex: showindex - 1
        })
    }

    plus_add_journal() {
        const showindex = this.state.isShowCreateNewProjectShowIndex;
        this.setState({
            isShowCreateNewProjectShowIndex: showindex + 1
        })
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


    goToJournal = async (isNewProject) => {
        this.setState({
            isShowOutput: false,
            isShowSaveToJournal: false,
            saveJournalSelectedIndex: 0,
        }, async () => {

            const {params} = this.props.navigation.state;
            var isAddNewApplication = false;

            if (params != undefined && params.isAddNewApplication != undefined) {
                isAddNewApplication = params.isAddNewApplication;
            }

            const newApp = {
                name: this.state.newApplicationName,
                sizeoflawn: this.state.sizeoflawn,
                poundsofNitronper: this.state.poundsofNitronper,
                // targetRateOfPhosphorus: this.state.targetRateOfPhosphorus,
                // targetRateOfPotassium: this.state.targetRateOfPotassium,

                productAnN: this.state.productAnN,
                productAnP: this.state.productAnP,
                productAnK: this.state.productAnK,
                weightofbags: this.state.weightofbags,
                costPerBag: this.state.costPerBag,
                appRateinLBS: this.state.appRateinLBS,
                totallbsneeded: this.state.totallbsneeded,
                bagsneeded: this.state.bagsneeded,
                totalCost: this.state.totalCost,
                totalAppN: this.state.totalAppAnofpoundsN,
                totalAppP: this.state.totalAppAnofpoundsP,
                totalAppK: this.state.totalAppAnofpoundsK,
            }

            if (isAddNewApplication) {
                const {params} = this.props.navigation.state;
                var currentProject = {};

                if (params != undefined && params.currentProject != undefined) {
                    currentProject = params.currentProject;
                }

                console.log('is add new save application');

                this.props.navigation.navigate('AddProject', {
                    isUpdate: false,
                    newApp: newApp,
                    FromEntry: false,
                    isGranular: true,
                    isNewProject: isNewProject,
                    currentProject: currentProject,
                    projectName: this.state.newProjectName,
                    applicationName: this.state.newApplicationName,
                });
            } else {
                this.props.navigation.navigate('AddProject', {
                    isUpdate: false,
                    newApp: newApp,
                    FromEntry: false,
                    isGranular: true,
                    isNewProject: isNewProject,
                    currentProject: this.state.selectAddProject,
                    projectName: this.state.newProjectName,
                    applicationName: this.state.newApplicationName,
                });
            }
        });

    }

    addGranularPreset() {
        console.log('update currentPreset:', this.state.currentPreset);
        var name = this.state.addpresetName;
        if (name == '' || name == undefined) {
            Alert.alert(
                'Presets Input empty',
                'Please enter all information',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Fail'),
                    },
                ],
                {cancelable: false},
            );
            return;
        }
        this.setState({isShowOutput: false});
        // if (this.state.currentPreset == undefined){
        //   name = 'undefine name' + this.state.presetArray.length;
        // } else {
        //   name = this.state.currentPreset.name
        // }

        var preset = {
            name: name,
            isType:this.state.isType,
            sizeoflawn: this.state.sizeoflawn,
            poundsofNitronper: this.state.poundsofNitronper,
            // targetRateOfPhosphorus: this.state.targetRateOfPhosphorus,
            // targetRateOfPotassium: this.state.targetRateOfPotassium,
            productAnN: this.state.productAnN,
            productAnP: this.state.productAnP,
            productAnK: this.state.productAnK,
            weightofbags: this.state.weightofbags,
            costPerBag: this.state.costPerBag,
        };
        AsyncStorage.getItem('granularpresets').then(data => {
            if (data !== null) {
                var presetarray = JSON.parse(data);
                console.log('the async data ', presetarray);
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

                // presetarray.forEach((x, index, object) => {
                //   if (x.name == this.state.currentPreset.name) {
                //     object.splice(index, 1);
                //     console.log('found the same array item', x);
                //   }
                // })
                console.log('before remove  preset', presetarray);
                presetarray.push(preset);
                this.setState({
                    presetArray: presetarray,
                });
                console.log('after remove  preset', presetarray);
                var stringofPresets = JSON.stringify(presetarray);
                AsyncStorage.setItem('granularpresets', stringofPresets);
            } else {
                var presetarray = [];
                presetarray.push(preset);
                var stringofPresets = JSON.stringify(presetarray);
                AsyncStorage.setItem('granularpresets', stringofPresets);
            }
        });

    }

    getOutputValue() {

        this.setState({
            appRateinLBS: '',
            totallbsneeded: '',
            bagsneeded: '',

            totalCost: '',
            totalAppAnofpoundsN: '',
            totalAppAnofpoundsP: '',
            totalAppAnofpoundsK: '',
        }, () => {

            var target = 0;

            if(this.state.poundsofNitronper !== ''){
                if(this.state.isType === 1){
                    if(
                        this.state.productAnN != '' &&
                        this.state.productAnN != '0'){
                        target =
                            (parseFloat(this.state.poundsofNitronper) * 100) /
                            parseFloat(this.state.productAnN);
                        this.setState({
                            appRateinLBS: '' + target.toFixed(2),
                        });
                    }

                } else if(this.state.isType === 2){

                    if(
                        this.state.productAnP != '' &&
                        this.state.productAnP != '0'){
                        target =
                            (parseFloat(this.state.poundsofNitronper) * 100) /
                            parseFloat(this.state.productAnP);
                        this.setState({
                            appRateinLBS: '' + target.toFixed(2),
                        });
                    }

                }else  if(this.state.isType === 3){
                    if(
                        this.state.productAnK != '' &&
                        this.state.productAnK != '0'){
                        target =
                            (parseFloat(this.state.poundsofNitronper) * 100) /
                            parseFloat(this.state.productAnK);
                        this.setState({
                            appRateinLBS: '' + target.toFixed(2),
                        });
                    }
                }
            }

            if ( target !== 0 ) {

                if (this.state.sizeoflawn != '') {
                    var target2 = (parseFloat(this.state.sizeoflawn) / 1000) * target;
                    this.setState({
                        totallbsneeded: '' + this.decimalFormat(target2.toFixed(2)),
                    });

                    if (this.state.weightofbags != '' && this.state.weightofbags != '0') {
                        var target3 = target2 / parseFloat(this.state.weightofbags);
                        this.setState({
                            bagsneeded: '' + target3.toFixed(2),
                        });
                        if (this.state.costPerBag != '') {
                            var costperbag = parseFloat(this.state.costPerBag);
                            this.setState({
                                totalCost: '' + (target3 * costperbag).toFixed(2),
                            });
                        }
                    }
                }

                if (this.state.productAnN != '') {
                    var totalAppAnofpoundsN =
                        (target * parseFloat(this.state.productAnN)) / 100;
                    this.setState({
                        totalAppAnofpoundsN: '' + totalAppAnofpoundsN.toFixed(2),
                    });
                }

                if (this.state.productAnP != '') {
                    var target2 = (target * parseFloat(this.state.productAnP)) / 100;
                    var target1 = target2.toFixed(2);
                    this.setState({
                        totalAppAnofpoundsP: '' + target1,
                    });
                }

                if (this.state.productAnK != '') {
                    var target2 = (target * parseFloat(this.state.productAnK)) / 100;
                    var target1 = target2.toFixed(2);
                    this.setState({
                        totalAppAnofpoundsK: '' + target1,
                    });
                }
            }
        } );



        // if (this.state.poundsofNitronper) {
        //     var target = parseFloat(this.state.poundsofNitronper).toFixed(2);
        //     this.setState({
        //         totalAppAnofpoundsN: '' + target,
        //     });
        // }
    }

    async componentDidMount(): void {
        AsyncStorage.getItem('granularpresets').then(data => {
            if (data !== null) {
                var presetarray = JSON.parse(data);
                this.setState({presetArray: presetarray});
            }
        });

        await AsyncStorage.getItem('granularprojects').then(data => {
            if (data !== null) {
                var projectarray = JSON.parse(data);
                this.setState({granularProjectList: projectarray});
                console.log('get granular projects :', projectarray);
            }
        });
    }

    navigateToScreen = route => () => {
        this.props.navigation.navigate(route);
    };

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

    onSwipeUp(gestureState) {
        this.setState({myText: 'You swiped up!'});
    }

    onSwipeDown(gestureState) {
        this.setState({myText: 'You swiped down!'});
        // this.setState({isShowContainer: false}, () => {
        //   this.props.navigation.goBack();
        // });
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

    decimalFormat(num) {
        return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    showCalcResult() {

        let value = parseFloat(this.state.poundsofNitronper)
        console.log('showCalcResult',this.state.poundsofNitronper,value)
        if (
            this.state.poundsofNitronper !== '' && !isNaN(value) &&
            this.state.sizeoflawn !== '' &&
            this.state.productAnN !== '' &&
            this.state.productAnP !== '' &&
            this.state.productAnK !== ''
        ) {
            this.getOutputValue()
            this.setState({
                isShowOutput: true,
            });
        }
    }

    saveApplication() {
        if (
            this.state.poundsofNitronper !== ''
        ) {
            this.getOutputValue()
            this.setState({isShowAddApplicationNameOverlay: true})
        } else {
            Alert.alert(
                'Please fill all application data.',
                '',
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

    refreshInput() {
        this.setState({
            sizeoflawn: '',
            poundsofNitronper: '',
            // targetRateOfPhosphorus: '',
            // targetRateOfPotassium: '',
            productAnN: '',
            productAnP: '',
            productAnK: '',
            weightofbags: '',
            costPerBag: '',

            appRateinLBS: '',
            totallbsneeded: '',
            bagsneeded: '',

            totalCost: '',
            totalAppAnofpoundsN: '',
            totalAppAnofpoundsP: '',
            totalAppAnofpoundsK: '',
        });
    }

    refreshOutPut() {
        this.setState({
            appRateinLBS: '',
            totallbsneeded: '',
            bagsneeded: '',

            totalCost: '',
            totalAppAnofpoundsN: '',
            totalAppAnofpoundsP: '',
            totalAppAnofpoundsK: '',
        });
    }


    showPresetsLists() {
        if (this.state.presetArray.length > 0) {
            this.setState({isShowPresets: true});
        }
    }

    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80,
        };

        const {params} = this.props.navigation.state;
        var isAddNewApplication = false;

        if (params != undefined && params.isAddNewApplication != undefined) {
            isAddNewApplication = params.isAddNewApplication;
        }
        // console.log("LH",LH)

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
                        <Icon type='material-community' iconStyle={styles.right_chevron_icon_image} size={24}
                              name={'arrow-left'} color={Colors.titleBlack}/>
                        {/*<View style={{width: '40%', height: '40%'}}>*/}
                        {/*    <Image*/}
                        {/*        style={styles.fit_image}*/}
                        {/*        source={require('../../assets/images/left.png')}*/}
                        {/*    />*/}
                        {/*</View>*/}
                    </TouchableOpacity>
                </View>
                <Text style={styles.view_type_title}>Granular</Text>

                <ScrollView style={{flex: 1}}>

                    <View style={styles.inputContainer}>

                        <View style={styles.analysis_container}>
                            <Text style={styles.analysis_container_text}>
                                Product Analysis
                            </Text>
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

                        <View  style={styles.product_analysis_container}>
                            <View style={styles.input_share_items1}>
                                <Input
                                    containerStyle={styles.containerborder}
                                    inputContainerStyle={{borderBottomWidth: 0}}
                                    labelStyle={styles.text_label_input}
                                    inputStyle={[styles.text_input, styles.border_green]}
                                    paddingTop={5}
                                    paddingBottom={0}
                                    label="N"
                                    key={`0`}
                                    ref={inputs[0].ref}
                                    blurOnSubmit={false}
                                    onFocus={this.handleFocus(0)}
                                    keyboardType={'decimal-pad'}
                                    fontSize={Layout.font.medium_size}
                                    value={this.state.productAnN}
                                    onChangeText={text => {
                                        const filteredText = this.getNumberFormatText(text);
                                        this.setState({productAnN: filteredText});
                                    }}
                                    placeholder="-"
                                />
                            </View>

                            <View style={styles.input_share_items1}>
                                <Input
                                    containerStyle={styles.containerborder}
                                    inputContainerStyle={{borderBottomWidth: 0}}
                                    labelStyle={styles.text_label_input}
                                    inputStyle={[styles.text_input, styles.border_green]}
                                    paddingTop={5}
                                    paddingBottom={0}
                                    label="P"
                                    keyboardType={'number-pad'}
                                    key={`1`}
                                    ref={inputs[1].ref}
                                    blurOnSubmit={false}
                                    onFocus={this.handleFocus(1)}
                                    fontSize={Layout.font.medium_size}
                                    value={this.state.productAnP}
                                    onChangeText={text => {
                                        const filteredText = this.getNumberFormatText(text);
                                        this.setState({productAnP: filteredText});
                                    }}
                                    placeholder="-"
                                />
                            </View>

                            <View style={styles.input_share_items1}>
                                <Input
                                    containerStyle={styles.containerborder}
                                    inputContainerStyle={{borderBottomWidth: 0}}
                                    labelStyle={styles.text_label_input}
                                    inputStyle={[styles.text_input, styles.border_green]}
                                    paddingTop={5}
                                    paddingBottom={0}
                                    label="K"
                                    key={`2`}
                                    ref={inputs[2].ref}
                                    blurOnSubmit={false}
                                    onFocus={this.handleFocus(2)}
                                    keyboardType={'decimal-pad'}
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

                        <View style={styles.analysis_container}>
                            <Text style={styles.analysis_container_text}>Application Data</Text>
                            <TouchableOpacity
                                style={styles.infobtn_container}
                                onPress={() => {
                                    this.setState({isShowAppDataInfo: true});
                                }}>
                                <View style={{width: '70%', height: '70%'}}>
                                    <Image
                                        style={styles.fit_image}
                                        source={require('../../assets/images/new/info.png')}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.app_data_total_container}>
                            <View style={styles.preset_input_container}>
                                <View style={styles.input_share_items}>
                                    <Input
                                        containerStyle={styles.text_input_box_container}
                                        labelStyle={styles.text_label_input}
                                        paddingTop={5}
                                        inputContainerStyle={{borderBottomWidth:0}}
                                        inputStyle={{textAlign:'center'}}
                                        paddingBottom={0}
                                        key={`3`}
                                        ref={inputs[3].ref}
                                        blurOnSubmit={false}
                                        onFocus={this.handleFocus(3)}
                                        // label='pounds of Nitrogen desired per 1,000 sqft'
                                        keyboardType={'decimal-pad'}
                                        fontSize={Layout.font.medium_size}
                                        value={this.state.poundsofNitronper}
                                        onChangeText={text => {
                                            const filteredText = this.getNumberFormatText(text);
                                            console.log('poundsofNitronper',filteredText)
                                            this.setState({poundsofNitronper: filteredText});
                                        }}
                                        placeholder="-"
                                    />
                                </View>
                                <View>
                                    <View style={styles.rn_type_picker_container}>
                                        <Dropdown
                                            value={this.state.isType}
                                            containerStyle={{paddingTop:0,minWidth:220,padding:0, borderBottomWidth:0 ,justifyContent:'center', marginTop:0,height: 25}}
                                            pickerStyle={{width: '100%',}}
                                            data={TargetRates}
                                            fontSize={14}
                                            itemTextStyle={styles.app_data_text}
                                            onChangeText={(value,index,data)=> {
                                                this.setState({isType:value})
                                            }}
                                        />
                                    </View>
                                    <Text style={styles.app_data_text1}>(lbs/1,000 sq ft)</Text>
                                </View>


                            </View>

                            <View style={styles.preset_input_container}>
                                <View style={styles.input_share_items}>
                                    <Input
                                        containerStyle={styles.text_input_box_container}
                                        labelStyle={styles.text_label_input}
                                        paddingTop={5}
                                        inputContainerStyle={{borderBottomWidth:0}}
                                        inputStyle={{textAlign:'center'}}
                                        paddingBottom={0}
                                        key={`4`}
                                        ref={inputs[4].ref}
                                        blurOnSubmit={false}
                                        onFocus={this.handleFocus(4)}
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
                                <Text style={styles.app_data_text}>
                                    Size of Lawn (sq ft)
                                </Text>
                            </View>

                            <View style={styles.preset_input_container}>
                                <View style={styles.input_share_items}>
                                    <Input
                                        containerStyle={[styles.text_input_box_container,{borderColor:Colors.borderGreyColor}]}
                                        labelStyle={styles.text_label_input}
                                        paddingTop={5}
                                        inputContainerStyle={{borderBottomWidth:0}}
                                        inputStyle={{textAlign:'center'}}
                                        paddingBottom={0}
                                        key={`5`}
                                        ref={inputs[5].ref}
                                        blurOnSubmit={false}
                                        onFocus={this.handleFocus(5)}
                                        keyboardType={'numeric'}
                                        fontSize={Layout.font.medium_size}
                                        value={this.state.weightofbags}
                                        onChangeText={text => {
                                            const filteredText = this.getNumberFormatText(text);
                                            this.setState({weightofbags: filteredText});
                                        }}
                                        placeholder="-"
                                    />
                                </View>
                                <Text style={styles.app_data_text}>
                                    Bag Weight (lbs)
                                </Text>
                            </View>

                            <View style={[styles.preset_input_container,{marginBottom:15}]}>
                                <View style={styles.input_share_items}>
                                    <Input
                                        containerStyle={[styles.text_input_box_container,{borderColor:Colors.borderGreyColor}]}
                                        labelStyle={styles.text_label_input}
                                        paddingTop={5}
                                        inputContainerStyle={{borderBottomWidth:0}}
                                        inputStyle={{textAlign:'center'}}
                                        paddingBottom={0}
                                        key={`6`}
                                        ref={inputs[6].ref}
                                        blurOnSubmit={false}
                                        onFocus={this.handleFocus(6)}
                                        keyboardType={'numeric'}
                                        fontSize={Layout.font.medium_size}
                                        value={this.state.costPerBag}
                                        onChangeText={text => {
                                            const filteredText = this.getNumberFormatText(text);
                                            this.setState({costPerBag: filteredText});
                                        }}
                                        placeholder="-"
                                    />
                                </View>
                                <View>
                                    <Text style={styles.app_data_text}>Cost Per Bag ($)</Text>
                                    <Text style={styles.app_data_text1}>With taxes increases accuracy</Text>
                                </View>
                            </View>
                        </View>
                    </View>


                    {
                        isAddNewApplication ? (
                            <View style={styles.radius_action_bar}>
                                <ListItem
                                    containerStyle={[styles.home_item_container, styles.radius_btn_shadow]}
                                    Component={TouchableOpacity}
                                    leftElement={
                                        <View style={styles.action_bar}>
                                            <TouchableOpacity
                                                style={styles.radius_btn_item}
                                                onPress={() => {

                                                }}>
                                                <Text style={styles.action_item_text}>Cancel</Text>
                                            </TouchableOpacity>
                                            <View style={{backgroundColor:Colors.lightGrayColor,width:1,height:'100%'}}/>
                                            <TouchableOpacity
                                                style={styles.radius_btn_item}
                                                onPress={() => {
                                                    this.saveApplication();
                                                }}>
                                                <Text style={[styles.action_item_text,{color:Colors.textGreenColor}]}>Add</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                >
                                </ListItem>
                            </View>
                        ) : (
                            <View style={styles.radius_action_bar}>
                                <ListItem
                                    containerStyle={[styles.home_item_container, styles.radius_btn_shadow]}
                                    Component={TouchableOpacity}
                                    leftElement={
                                        <View style={styles.action_bar}>
                                            <TouchableOpacity
                                                style={styles.radius_btn_item}
                                                onPress={() => {
                                                    this.showPresetsLists();
                                                }}>
                                                <Text style={styles.action_item_text}>Preset</Text>
                                            </TouchableOpacity>
                                            <View style={{backgroundColor:Colors.lightGrayColor,width:1,height:'100%'}}/>
                                            <TouchableOpacity
                                                style={[styles.radius_btn_item, {borderWidth: 0}]}
                                                onPress={() => {
                                                    this.refreshInput();
                                                }}>
                                                <View style={styles.refresh_btn_container}>
                                                    <Image
                                                        style={styles.fit_image}
                                                        source={require('../../assets/images/new/refresh.png')}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                            <View style={{backgroundColor:Colors.lightGrayColor,width:1,height:'100%'}}/>
                                            <TouchableOpacity
                                                style={styles.radius_btn_item}
                                                onPress={() => {
                                                    this.showCalcResult();
                                                }}>
                                                <Text style={styles.action_item_text}>Calculate</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                >
                                </ListItem>
                            </View>
                        )
                    }


                </ScrollView>


                <Overlay
                    isVisible={this.state.isShowOutput}
                    onBackdropPress={() => this.setState({isShowOutput: false})}
                    overlayBackgroundColor={Colors.whiteColor}
                    overlayStyle={styles.overlay_container}
                    windowBackgroundColor={Colors.overlayWindowColor}
                    width={LW - 40}
                    height="auto">
                    <ScrollView style={styles.border_topline}>

                        <TouchableOpacity style={styles.overlay_close_btn}
                                          onPress={() => {
                                              this.setState({isShowOutput: false});
                                          }}>
                            <View style={{width: '100%', height: '100%'}}>
                                <Image
                                    style={styles.fit_image}
                                    source={require('../../assets/images/new/Close.png')}
                                />
                            </View>
                        </TouchableOpacity>


                        <View style={[styles.analysis_container, {marginTop: 4}]}>
                            <Text style={styles.analysis_container_text}>Calculation Results</Text>
                        </View>
                        <View style={styles.app_rate_container}>
                            <View style={[styles.calc_result_text_container, styles.border_green]}>
                                <Text style={styles.app_rate_output}>
                                    {this.state.appRateinLBS}
                                </Text>
                            </View>

                            <View>
                                <Text style={styles.app_data_text}>Application rate</Text>
                                <Text style={styles.app_data_text1}>lbs/1,000 (sq ft)</Text>
                            </View>
                        </View>

                        <View style={styles.bottom_divide_line}/>

                        <View style={styles.app_rate_container}>
                            <View style={styles.calc_result_text_container}>
                                <Text style={styles.app_rate_output}>
                                    {this.state.totallbsneeded}
                                </Text>
                            </View>

                            <View style={styles.row_center_align}>
                                <Text style={styles.app_data_text}>Total lbs</Text>
                            </View>
                        </View>

                        <View style={styles.app_rate_container}>
                            <View style={styles.calc_result_text_container}>
                                <Text style={styles.app_rate_output}>
                                    {this.state.bagsneeded}
                                </Text>
                            </View>

                            <View style={styles.row_center_align}>
                                <Text style={styles.app_data_text}>Total Bags</Text>
                            </View>
                        </View>

                        <View style={styles.app_rate_container}>
                            <View style={styles.calc_result_text_container}>
                                <Text style={styles.app_rate_output}>
                                    {this.state.totalCost}
                                </Text>
                            </View>

                            <View style={styles.row_center_align}>
                                <Text style={styles.app_data_text}>Est. Total Cost</Text>
                            </View>
                        </View>

                        {/*<View*/}
                        {/*    style={{*/}
                        {/*        width: '100%',*/}
                        {/*        marginBottom: 0,*/}
                        {/*        justifyContent: 'space-around',*/}
                        {/*        flexDirection: 'row',*/}
                        {/*        marginTop: 15,*/}
                        {/*    }}>*/}
                        {/*    <View style={styles.output_border}>*/}
                        {/*        <Text style={styles.output_normal}>*/}
                        {/*            {this.state.totallbsneeded}*/}
                        {/*        </Text>*/}
                        {/*        <Text style={styles.text_label_input_for_less_than}>Total lbs</Text>*/}
                        {/*    </View>*/}
                        {/*    <View style={styles.output_border}>*/}
                        {/*        <Text style={styles.output_normal}>*/}
                        {/*            {this.state.bagsneeded}*/}
                        {/*        </Text>*/}
                        {/*        <Text style={styles.text_label_input_for_less_than}>Total Bags</Text>*/}
                        {/*    </View>*/}
                        {/*    <View style={styles.output_border}>*/}
                        {/*        <Text style={styles.output_normal}>*/}
                        {/*            {this.state.totalCost}*/}
                        {/*        </Text>*/}
                        {/*        <Text style={styles.text_label_input_for_less_than}>Est. Total Cost</Text>*/}
                        {/*    </View>*/}
                        {/*</View>*/}

                        <View style={styles.output_bigcontainer}>

                            <Text style={styles.text_output_subtitle}>
                                Total Application Analysis
                            </Text>
                            <View
                                style={{
                                    width: '100%',
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',
                                    marginTop: 5,
                                }}>
                                <View style={styles.output_border}>
                                    <Text style={styles.text_label_input}>N</Text>
                                    <Text style={styles.output_normal}>
                                        {this.state.totalAppAnofpoundsN}
                                    </Text>

                                </View>

                                <View style={styles.output_border}>
                                    <Text style={styles.text_label_input}>P</Text>
                                    <Text style={styles.output_normal}>
                                        {this.state.totalAppAnofpoundsP}
                                    </Text>

                                </View>

                                <View style={styles.output_border}>
                                    <Text style={styles.text_label_input}>K</Text>
                                    <Text style={styles.output_normal}>
                                        {this.state.totalAppAnofpoundsK}
                                    </Text>

                                </View>
                            </View>
                        </View>

                        <View style={styles.output_save_container}>
                            <TouchableOpacity style={{flex: 1}}
                                              onPress={() => {
                                                  this.setState({isShowOutput: false}, () => {
                                                      this.setState({
                                                          isShowSaveToJournal: true
                                                      })
                                                  })
                                              }}>
                                <LinearGradient
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 1}}
                                    colors={[Colors.gradient1, Colors.gradient2]}
                                    style={styles.gradient_btn}
                                >
                                    <Text style={styles.gradient_btn_text}>Save to Journal</Text>
                                </LinearGradient>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={[styles.action_item, {marginRight: 10}]}>
                                <Text style={styles.action_item_text}>or</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.gradient_btn, styles.gray_bk]}
                                onPress={() => {
                                    this.setState({
                                        isShowOutput: false,
                                        isShowPresetNameOverlay: true,
                                    })


                                }}>
                                <Text style={styles.action_item_text}>Save as Preset</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </Overlay>

                <Overlay
                    isVisible={this.state.isShowPresets}
                    overlayBackgroundColor={Colors.whiteColor}
                    overlayStyle={styles.overlay_full_screen_container}
                    windowBackgroundColor={Colors.overlayWindowColor}
                    onBackdropPress={() => this.setState({isShowPresets: false})}
                    fullScreen={true}>
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
                                onPress={() => this.setState({isShowPresets: false})}>
                                <Icon type='material-community' iconStyle={styles.right_chevron_icon_image} size={24}
                                      name={'arrow-left'} color={Colors.titleBlack}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.view_type_title}>Presets</Text>

                        <View style={styles.inputContainer}>

                            <View style={styles.analysis_container}>
                                <Text style={styles.analysis_container_text}>
                                    Granular Presets
                                </Text>
                            </View>

                            <ScrollView style={{flex: 1}}>
                                {this.state.presetArray.map((item, i) => (
                                    <ListItem
                                        containerStyle={styles.preset_list_item_container}
                                        Component={TouchableOpacity}
                                        onPress={() => {
                                            if (item != null) {
                                                this.setState(
                                                    {
                                                        currentPreset: item,
                                                        // addpresetName: item.name,
                                                        isType:item.isType,
                                                        isShowPresets: false,
                                                        sizeoflawn: item.sizeoflawn,
                                                        poundsofNitronper: item.poundsofNitronper,
                                                        // targetRateOfPhosphorus: item.targetRateOfPhosphorus,
                                                        // targetRateOfPotassium: item.targetRateOfPotassium,
                                                        productAnN: item.productAnN,
                                                        productAnP: item.productAnP,
                                                        productAnK: item.productAnK,
                                                        weightofbags: item.weightofbags,
                                                        costPerBag: item.costPerBag,
                                                    },
                                                    () => {
                                                        this.getOutputValue();
                                                    },
                                                );
                                            } else {
                                                this.setState({
                                                    isShowPresets: false,
                                                });
                                            }
                                        }}
                                        key={i}
                                        title={i + 1 + '.  ' + item.name}
                                        titleStyle={styles.preset_list_item_text}
                                    />
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </Overlay>

                <Overlay
                    isVisible={this.state.isShowSaveToJournal}
                    overlayBackgroundColor={Colors.whiteColor}
                    overlayStyle={styles.overlay_full_screen_container}
                    windowBackgroundColor={Colors.overlayWindowColor}
                    onBackdropPress={() => this.setState({isShowSaveToJournal: false})}
                    fullScreen={true}>
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
                                onPress={() => this.setState({isShowSaveToJournal: false})}>
                                <Icon type='material-community' iconStyle={styles.right_chevron_icon_image} size={24}
                                      name={'arrow-left'} color={Colors.titleBlack}/>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.view_type_title}>Save to Journal</Text>

                        <View style={styles.saveJournalContainer}>

                            <MaterialTabs
                                items={['Add to Project', 'Create New']}
                                selectedIndex={this.state.saveJournalSelectedIndex}
                                onChange={this.saveJournalTabIndexChange}
                                barColor="transparent"
                                textStyle={{color: Colors.textBlackColor, fontSize: 18, fontFamily: 'Muli-SemiBold'}}
                                indicatorColor={Colors.bkGreen}
                                uppercase={false}
                                activeTextColor={Colors.textBlackColor}
                            />
                            {
                                this.state.saveJournalSelectedIndex == 0 ? (
                                    <ScrollView style={{flex: 1}}>
                                        {this.state.granularProjectList.map((item, i) => (
                                            <ListItem
                                                containerStyle={styles.preset_list_item_container}
                                                Component={TouchableOpacity}
                                                onPress={() => {
                                                    if (item != null) {
                                                        console.log('project item', item)
                                                        this.setState(
                                                            {
                                                                isShowProjectList: false,
                                                                selectAddProject: item,
                                                                isShowAddApplicationNameOverlay: true,
                                                            }
                                                        );
                                                    }
                                                }}
                                                key={i}
                                                title={i + 1 + '.  ' + item.name}
                                                titleStyle={styles.preset_list_item_text}
                                                subtitle={'Total (' + item.totalN + ' - ' + item.totalP + ' - ' + item.totalK + ')'}
                                                subtitleStyle={styles.preset_list_item_sub_text}
                                            />
                                        ))}
                                    </ScrollView>
                                ) : (
                                    <View>
                                        <View style={styles.create_new_container}>
                                            <Text style={styles.overlay_text_input_title}>Enter your project name</Text>
                                            <Input
                                                containerStyle={styles.overlay_text_input_content}
                                                inputContainerStyle={{borderBottomWidth: 0}}
                                                labelStyle={styles.text_label_input}
                                                inputStyle={{fontSize: 13}}
                                                placeholder={'Enter name'}
                                                value={this.state.newProjectName}
                                                onChangeText={text => {
                                                    this.setState({newProjectName: text});
                                                }}
                                            />
                                            <Text style={styles.overlay_text_input_title}>Enter your application name</Text>
                                            <Input
                                                containerStyle={styles.overlay_text_input_content}
                                                inputContainerStyle={{borderBottomWidth: 0}}
                                                labelStyle={styles.text_label_input}
                                                inputStyle={{fontSize: 13}}
                                                placeholder={'Enter name'}
                                                value={this.state.newApplicationName}
                                                onChangeText={text => {
                                                    this.setState({newApplicationName: text});
                                                }}
                                            />

                                        </View>
                                        <View style={styles.overlay_text_input_save_box}>
                                            <TouchableOpacity style={{flex: 1}}
                                                              onPress={() => {
                                                                  Keyboard.dismiss;
                                                                  var name = this.state.newProjectName;
                                                                  if (name != '' && name != undefined && this.state.newApplicationName != '') {
                                                                      this.goToJournal(true)
                                                                  }
                                                              }}>
                                                <LinearGradient
                                                    start={{x: 0, y: 0}}
                                                    end={{x: 1, y: 1}}
                                                    colors={[Colors.gradient1, Colors.gradient2]}
                                                    style={styles.gradient_btn}
                                                >
                                                    <Text style={styles.gradient_btn_text}>Save</Text>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }


                        </View>
                    </View>
                </Overlay>


                <Overlay
                    isVisible={this.state.isShowAddApplicationNameOverlay}
                    overlayBackgroundColor={Colors.whiteColor}
                    overlayStyle={styles.overlay_container}
                    windowBackgroundColor={Colors.overlayWindowColor}
                    width={LW - 60}
                    height="auto">
                    <View style={styles.overlay_text_input_container}>
                        <Text style={styles.overlay_text_input_title}>Enter application name</Text>
                        <Input
                            containerStyle={styles.overlay_text_input_content}
                            inputContainerStyle={{borderBottomWidth: 0}}
                            labelStyle={styles.text_label_input}
                            inputStyle={{fontSize: 13}}
                            placeholder={'Enter name'}
                            value={this.state.newApplicationName}
                            onChangeText={text => {
                                this.setState({newApplicationName: text});
                            }}
                        />
                        <Icon
                            name={'window-close'}
                            type={"material-community"}
                            containerStyle={styles.overlay_close_btn}
                            Component={TouchableOpacity}
                            size={20}
                            color={Colors.chevronColor}
                            onPress={() => {
                                this.setState({isShowAddApplicationNameOverlay: false});
                            }}
                        />
                        <View style={styles.overlay_text_input_save_box}>
                            <TouchableOpacity style={{flex: 1}}
                                              onPress={() => {
                                                  Keyboard.dismiss;
                                                  if (this.state.newApplicationName != '') {
                                                      this.setState({isShowAddApplicationNameOverlay: false}, () => {
                                                          if (this.state.saveJournalSelectedIndex === 0) {
                                                              this.goToJournal(false)
                                                          } else if (this.state.saveJournalSelectedIndex === 1) {
                                                              this.goToJournal(true)
                                                          }else if(isAddNewApplication){
                                                              this.goToJournal(false)
                                                          }
                                                      })
                                                  }
                                              }}>
                                <LinearGradient
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 1}}
                                    colors={[Colors.gradient1, Colors.gradient2]}
                                    style={styles.gradient_btn}
                                >
                                    <Text style={styles.gradient_btn_text}>Save</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Overlay>


                <Overlay
                    isVisible={this.state.isShowPresetNameOverlay}
                    overlayBackgroundColor={Colors.whiteColor}
                    overlayStyle={styles.overlay_container}
                    windowBackgroundColor={Colors.overlayWindowColor}
                    width={LW - 60}
                    height="auto">
                    <View style={styles.overlay_text_input_container}>
                        <Text style={styles.overlay_text_input_title}>Enter preset name</Text>
                        <Input
                            containerStyle={styles.overlay_text_input_content}
                            inputContainerStyle={{borderBottomWidth: 0}}
                            labelStyle={styles.text_label_input}
                            inputStyle={{fontSize: 13}}
                            placeholder={'Enter name'}
                            value={this.state.addpresetName}
                            onChangeText={text => {
                                this.setState({addpresetName: text});
                            }}
                        />
                        <Icon
                            name={'window-close'}
                            type={"material-community"}
                            containerStyle={styles.overlay_close_btn}
                            Component={TouchableOpacity}
                            size={20}
                            color={Colors.chevronColor}
                            onPress={() => {
                                this.setState({isShowPresetNameOverlay: false});
                            }}
                        />
                        <View style={styles.overlay_text_input_save_box}>
                            <TouchableOpacity style={{flex: 1}}
                                              onPress={() => {
                                                  Keyboard.dismiss;
                                                  var name = this.state.addpresetName;
                                                  if (name != '' && name != undefined) {
                                                      this.setState({isShowPresetNameOverlay: false}, () => {
                                                          this.addGranularPreset();
                                                      })
                                                  }
                                              }}>
                                <LinearGradient
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 1}}
                                    colors={[Colors.gradient1, Colors.gradient2]}
                                    style={styles.gradient_btn}
                                >
                                    <Text style={styles.gradient_btn_text}>Save</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Overlay>


                <Overlay
                    isVisible={this.state.isShowAnalysisInfo}
                    overlayBackgroundColor={Colors.whiteColor}
                    overlayStyle={styles.overlay_container}
                    windowBackgroundColor={Colors.overlayWindowColor}
                    onBackdropPress={() => this.setState({isShowAnalysisInfo: false})}
                    width={LW - 60}
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
                <Overlay
                    isVisible={this.state.isShowAppDataInfo}
                    onBackdropPress={() => this.setState({isShowAppDataInfo: false})}
                    overlayBackgroundColor={Colors.whiteColor}
                    overlayStyle={styles.overlay_container}
                    windowBackgroundColor={Colors.overlayWindowColor}
                    width={LW - 40}
                    height="auto"
                    maxHeight={LH - 40}
                >
                    <ScrollView style={styles.fit_parent}>

                        <Text style={styles.info_title_text}>Granular Application Data</Text>

                        <TouchableOpacity style={styles.overlay_close_btn}
                                          onPress={() => {
                                              this.setState({isShowAppDataInfo: false});
                                          }}>
                            <View style={{width: '100%', height: '100%'}}>
                                <Image
                                    style={styles.fit_image}
                                    source={require('../../assets/images/new/Close.png')}
                                />
                            </View>
                        </TouchableOpacity>

                        <Text style={styles.info_content_emphasize_text}>Target Rate of N, P, or K</Text>
                        <Text style={styles.info_content_text}>This represents the desired amount of N, P, or K you intend to apply per 1000 sq ft.</Text>

                        <Text style={styles.info_content_emphasize_text}>Size of Lawn</Text>
                        <Text style={styles.info_content_text}>The total surface area (in sq ft) of your lawn. This is required in order to determine how much product you will need.
                        </Text>

                        <Text style={styles.info_content_emphasize_text}>Bag Weight</Text>

                        <Text style={styles.info_content_text}>The total weight of your fertilizer bad (in lbs). This is commonly found on the front of the bad near the bottom.
                        </Text>

                        <Text style={styles.info_content_emphasize_text}>Cost per bag</Text>
                        <Text style={styles.info_content_text}>Retail cost of each bag. Include taxes to increase accuracy.
                        </Text>


                        <Text style={styles.info_content_emphasize_text}>Soil Testing</Text>

                        <Text style={styles.info_content_text}>Performing a soil test on your lawn can prevent unnecessary fertilizer applications. It will indicate what nutrients your soil contains and lacks. Knowing the pH of the soil is also important to understand the available nutrients in your lawn.
                        </Text>

                        <Text style={styles.info_last_content_text}>
                            *Disclaimer Turf Therapy LLC does NOT accept responsibility for any loss which may occur from reliance on the software or materials published in this application.
                        </Text>
                    </ScrollView>
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

const styles = StyleSheet.create(GranularPageStyle);
