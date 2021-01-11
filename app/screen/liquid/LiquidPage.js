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
    ImageBackground, Keyboard,
} from 'react-native';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {
    Avatar,
    CheckBox, Icon,
    Input,
    ListItem,
    Overlay,
} from 'react-native-elements';
import LiquidPageStyle from './LiquidPageStyle';
import RNPickerSelect from "react-native-picker-select";
import {KeyboardAccessoryNavigation} from "react-native-keyboard-accessory";
import MaterialTabs from "react-native-material-tabs";
import LinearGradient from "react-native-linear-gradient";
import { Dropdown } from 'react-native-material-dropdown';


const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH / LW;

let inputs = [
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
      placeholder: 'Size of Container',
      name: 'sizeOfContainer'
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

export default class LiquidPage extends Component {
    constructor(props) {
        super(props);
        inputs = inputs.map(input => ({
            ref: React.createRef(),
            ...input,
        }));

        this.state = {
            isType:1,
            sizeoflawn: '',
            targetRateofNitrogen: '',
            targetRateOfPhosphorus: '',
            targetRateOfPotassium: '',

            productAnN: '',
            productAnP: '',
            productAnK: '',


            weightofContainer: '',
            sizeOfContainer: 32,
            costPerContainer: '',

            weightperOz: '',

            appWeightinlbs: '',
            appRateinOz: '',
            totalOzneeded: '',
            totalGal: '',
            totalCost: '',

            totalAppAnofpoundsN: '',
            totalAppAnofpoundsP: '',
            totalAppAnofpoundsK: '',

            presetArray: [],
            isShowOutput: false,
            isShowPresets: false,
            isShowContainer: true,
            isShowAnalysisInfo: false,
            isShowAppDataInfo: false,
            currentPreset: undefined,
            addpresetName: '',

            activeInputIndex: 0,
            nextFocusDisabled: false,
            previousFocusDisabled: false,
            buttonsDisabled: false,
            buttonsHidden: false,


            isShowCreateNewProjectShowIndex: 0,
            isShowProjectList: false,

            newProjectName: '',
            newApplicationName: '',

            liquidProjectsList: [],
            selectAddProject: {},
            isShowAddApplicationName: false,

            isShowPresetNameOverlay: false,

            isShowSaveToJournal: false,
            granularProjectList: [],
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
            return this.state.targetRateofNitrogen
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
    saveApplication() {
        if (
            this.state.poundsofNitronper !== ''
        ) {
            this.getOutputValue()
            this.setState({isShowAddApplicationNameOverlay:true})
        }else{
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

    goToJournal = async (isNewProject) => {
        this.setState({
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
                targetRateofNitrogen: this.state.targetRateofNitrogen,
                // targetRateOfPhosphorus: this.state.targetRateOfPhosphorus,
                // targetRateOfPotassium: this.state.targetRateOfPotassium,


                weightofContainer: this.state.weightofContainer,
                sizeOfContainer: this.state.sizeOfContainer,
                costPerContainer: this.state.costPerContainer,

                weightperOz: this.state.weightperOz,

                appWeightinlbs: this.state.appWeightinlbs,
                appRateinOz: this.state.appRateinOz,
                totalOzneeded: this.state.totalOzneeded,
                totalGal: this.state.totalGal,

                totalCost: this.state.totalCost,
                totalAppN: this.state.totalAppAnofpoundsN,
                totalAppP: this.state.totalAppAnofpoundsP,
                totalAppK: this.state.totalAppAnofpoundsK,

            }

            if(isAddNewApplication) {
                const {params} = this.props.navigation.state;
                var currentProject = {};

                if (params != undefined && params.currentProject != undefined) {
                    currentProject = params.currentProject;
                }

                console.log('is add new save application');

                this.props.navigation.navigate('AddProject', {
                    isUpdate: false,
                    newApp: newApp,
                    FromEntry:false,
                    isGranular: false,
                    isNewProject: isNewProject,
                    currentProject: currentProject,
                    projectName: this.state.newProjectName,
                    applicationName: this.state.newApplicationName,
                });
            }else{
                this.props.navigation.navigate('AddProject', {
                    isUpdate: false,
                    newApp: newApp,
                    FromEntry:false,
                    isGranular: false,
                    isNewProject: isNewProject,
                    currentProject: this.state.selectAddProject,
                    projectName: this.state.newProjectName,
                    applicationName: this.state.newApplicationName,
                });
            }
        });

    }




    componentDidMount = async () =>  {
        // this.setState({sizeOfContainer:this.state.ContainerSizes[0]});
        await AsyncStorage.getItem('liquidpresets').then(data => {
            if (data !== null) {
                var presetarray = JSON.parse(data);
                this.setState({presetArray: presetarray});
            }
        });

        await AsyncStorage.getItem('liquidprojects').then(data => {
            if (data !== null) {
                var projectarray = JSON.parse(data);
                console.log('get granular projects :',projectarray);
                this.setState({liquidProjectsList: projectarray});
            }
        });
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
        console.log('handleFocusNext:', nextFocusDisabled, activeInputIndex);

        if (nextFocusDisabled) {
            return;
        }
        console.log('next ref:', inputs[activeInputIndex + 1])
        if( activeInputIndex + 1 == 5 ){
             Keyboard.dismiss();
            inputs[activeInputIndex + 1].ref.current.focus();
        }else{
            inputs[activeInputIndex + 1].ref.current.focus();
        }
    }

    handleFocusPrevious = () => {
        const {previousFocusDisabled, activeInputIndex} = this.state;
        if (previousFocusDisabled) {
            return;
        }

        if(activeInputIndex - 1 == 5){
            Keyboard.dismiss();
            inputs[activeInputIndex - 1].ref.current.focus();
        }else{
            inputs[activeInputIndex - 1].ref.current.focus();
        }
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

    getOutputValue() {


        this.setState({
            weightperOz: '',

            appWeightinlbs: '',
            appRateinOz: '',
            totalOzneeded: '',
            totalGal: '',
            totalCost: '',

            totalAppAnofpoundsN: '',
            totalAppAnofpoundsP: '',
            totalAppAnofpoundsK: '',
        },()=>{
            console.log('get outvalue  size of container:',this.state.sizeOfContainer)

            var appWeightinlbs = 0;
            if(this.state.targetRateofNitrogen !== ''){
                if(this.state.isType === 1){
                    if (
                        this.state.productAnN != '' &&
                        this.state.productAnN != '0'
                    ){
                        appWeightinlbs =
                            (parseFloat(this.state.targetRateofNitrogen) * 100) /
                            parseFloat(this.state.productAnN);
                        this.setState({
                            appWeightinlbs: '' + appWeightinlbs.toFixed(2),
                        });
                    }
                }else if(this.state.isType === 2){
                    if (
                        this.state.productAnP != '' &&
                        this.state.productAnP != '0'
                    ){
                        appWeightinlbs =
                            (parseFloat(this.state.targetRateofNitrogen) * 100) /
                            parseFloat(this.state.productAnP);
                        this.setState({
                            appWeightinlbs: '' + appWeightinlbs.toFixed(2),
                        });
                    }

                }else if(this.state.isType === 3){
                    if (
                        this.state.productAnK != '' &&
                        this.state.productAnK != '0'
                    ){
                        appWeightinlbs =
                            (parseFloat(this.state.targetRateofNitrogen) * 100) /
                            parseFloat(this.state.productAnK);
                        this.setState({
                            appWeightinlbs: '' + appWeightinlbs.toFixed(2),
                        });
                    }

                }

                if (this.state.productAnN != '') {
                    var totalAppAnofpoundsN =
                        (appWeightinlbs * parseFloat(this.state.productAnN)) / 100;
                    this.setState({
                        totalAppAnofpoundsN: '' + totalAppAnofpoundsN.toFixed(2),
                    });
                }


                if (this.state.productAnP != '') {
                    var totalAppAnofpoundsP =
                        (appWeightinlbs * parseFloat(this.state.productAnP)) / 100;
                    this.setState({
                        totalAppAnofpoundsP: '' + totalAppAnofpoundsP.toFixed(2),
                    });
                }

                if (this.state.productAnK != '') {
                    var totalAppAnofpoundsK =
                        (appWeightinlbs * parseFloat(this.state.productAnK)) / 100;
                    this.setState({
                        totalAppAnofpoundsK: '' + totalAppAnofpoundsK.toFixed(2),
                    });
                }

            }



            if (this.state.weightofContainer != '' && this.state.sizeOfContainer != 0) {

                var weightperOz = parseFloat(this.state.weightofContainer) / this.state.sizeOfContainer;
                var target1 = weightperOz.toFixed(3);
                this.setState({
                    weightperOz: '' + target1,
                });



                if ( appWeightinlbs !== 0 ) {
                    // appWeightinlbs =
                    //     (parseFloat(this.state.targetRateofNitrogen) * 100) /
                    //     parseFloat(this.state.productAnN);
                    // this.setState({
                    //     appWeightinlbs: '' + appWeightinlbs.toFixed(2),
                    // });

                    var appRateinOz = appWeightinlbs / weightperOz;

                    this.setState({
                        appRateinOz: '' + appRateinOz.toFixed(2),
                    });

                    if (this.state.sizeoflawn != '') {
                        var totalOzneeded =
                            (appRateinOz * parseFloat(this.state.sizeoflawn)) / 1000;
                        this.setState({
                            totalOzneeded: '' + this.decimalFormat(totalOzneeded.toFixed(2)),
                        });

                        var totalGal = totalOzneeded / this.state.sizeOfContainer;

                        this.setState({
                            totalGal: '' + totalGal.toFixed(2),
                        });

                        if (this.state.costPerContainer != '') {
                            this.setState({
                                totalCost:
                                    '' + (totalGal.toFixed(2) * parseFloat(this.state.costPerContainer)).toFixed(2),
                            });
                        }
                    }



                }
            }

        })



        //
        // if (this.state.isType === 1) {
        //     var target = parseFloat(this.state.poundsofNitronper).toFixed(2);
        //     this.setState({
        //         totalAppAnofpoundsN: target,
        //     });
        // }
        //
        //
        //
        // if (this.state.isType === 2) {
        //
        //     var target = parseFloat(this.state.targetRateOfPhosphorus).toFixed(2);
        //     this.setState({
        //         totalAppAnofpoundsP: '' + target,
        //     });
        // }
        //
        // if (this.state.isType === 3) {
        //
        //     var target = parseFloat(this.state.targetRateOfPotassium).toFixed(2);
        //     this.setState({
        //         totalAppAnofpoundsK: '' + target,
        //     });
        // }
    }

    getNumberFormatText(text) {
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

    decimalFormat(num) {
        return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    showCalcResult() {
        if (
            this.state.targetRateofNitrogen != ''
        ) {
            this.getOutputValue();
            this.setState({
                isShowOutput: true,
            });
        }
    }

    refreshInput() {
        this.setState({
            sizeoflawn: '',
            targetRateofNitrogen: '',
            targetRateOfPhosphorus: '',
            targetRateOfPotassium: '',

            productAnN: '',
            productAnP: '',
            productAnK: '',


            weightofContainer: '',
            sizeOfContainer: 0,
            costPerContainer: '',

            weightperOz: '',

            appWeightinlbs: '',
            appRateinOz: '',
            totalOzneeded: '',
            totalGal: '',
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

    addLiquidPreset() {
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
        // if (this.state.currentPreset == undefined) {
        //   name = 'undefine name' + this.state.presetArray.length;
        // } else {
        //   name = this.state.currentPreset.name;
        // }

        var preset = {
            name: name,
            isType:this.state.isType,
            sizeoflawn: this.state.sizeoflawn,
            targetRateofNitrogen: this.state.targetRateofNitrogen,
            // targetRateOfPhosphorus: this.state.targetRateOfPhosphorus,
            // targetRateOfPotassium: this.state.targetRateOfPotassium,
            productAnN: this.state.productAnN,
            productAnP: this.state.productAnP,
            productAnK: this.state.productAnK,
            weightofContainer: this.state.weightofContainer,
            sizeOfContainer: this.state.sizeOfContainer,
            costPerContainer: this.state.costPerContainer,
        };
        console.log('add preset:', preset);

        AsyncStorage.getItem('liquidpresets').then(data => {
            this.setState({isShowLiquidPreset: false});
            if (data !== null) {
                var presetarray = JSON.parse(data);
                // presetarray.forEach((x, index, object) => {
                //   if (x.name === this.state.currentPreset.name) {
                //     object.splice(index, 1);
                //   }
                // });
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
                presetarray.push(preset);
                this.setState({
                    presetArray: presetarray,
                });
                var stringofPresets = JSON.stringify(presetarray);
                AsyncStorage.setItem('liquidpresets', stringofPresets);
            } else {
                var presetarray = [];
                presetarray.push(preset);
                var stringofPresets = JSON.stringify(presetarray);
                AsyncStorage.setItem('liquidpresets', stringofPresets);
            }
        });
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
                    </TouchableOpacity>
                </View>
                <Text style={styles.view_type_title}>Liquid</Text>

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
                                    inputStyle={[styles.text_input, styles.border_blue]}
                                    paddingTop={5}
                                    paddingBottom={0}
                                    label="N"
                                    key = {`0`}
                                    ref = {inputs[0].ref}
                                    blurOnSubmit={false}
                                    onFocus={this.handleFocus(0)}
                                    keyboardType={'numeric'}
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
                                    inputStyle={[styles.text_input, styles.border_blue]}
                                    paddingTop={5}
                                    paddingBottom={0}
                                    label="P"
                                    key = {`1`}
                                    ref = {inputs[1].ref}
                                    blurOnSubmit={false}
                                    onFocus={this.handleFocus(1)}

                                    keyboardType={'numeric'}
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
                                    inputStyle={[styles.text_input, styles.border_blue]}
                                    paddingTop={5}
                                    paddingBottom={0}
                                    label="K"
                                    key = {`2`}
                                    ref = {inputs[2].ref}
                                    blurOnSubmit={false}
                                    onFocus={this.handleFocus(2)}

                                    keyboardType={'numeric'}
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

                            <View style={styles.app_data_input_container}>

                                <View style={styles.preset_input_container}>
                                    <View style={styles.input_share_items}>
                                        <Input
                                            containerStyle={styles.text_input_box_container}
                                            labelStyle={styles.text_label_input}
                                            paddingTop={5}
                                            inputContainerStyle={{borderBottomWidth:0}}
                                            inputStyle={{textAlign:'center'}}
                                            paddingBottom={0}
                                            key = {`3`}
                                            ref = {inputs[3].ref}
                                            blurOnSubmit={false}
                                            onFocus={this.handleFocus(3)}
                                            keyboardType={'numeric'}
                                            fontSize={Layout.font.medium_size}
                                            value={this.state.targetRateofNitrogen}
                                            onChangeText={text => {
                                                const filteredText = this.getNumberFormatText(text);

                                                this.setState({targetRateofNitrogen: filteredText});

                                                // if(this.state.isType === 3){
                                                //     this.setState({targetRateOfPotassium: filteredText});
                                                // }else if(this.state.isType === 2){
                                                //     this.setState({targetRateOfPhosphorus: filteredText});
                                                // }else{
                                                //     this.setState({targetRateofNitrogen: filteredText});
                                                // }


                                            }}
                                            placeholder="-"
                                        />
                                    </View>
                                    <View>

                                        <View style={styles.rn_type_picker_container}>
                                            <Dropdown
                                                value={this.state.isType}
                                                containerStyle={{minWidth:220,padding:0, borderBottomWidth:0 ,justifyContent:'center', marginTop:0,height: 25}}
                                                pickerStyle={{width: '100%',}}
                                                data={TargetRates}
                                                fontSize={14}
                                                itemTextStyle={styles.app_data_text}
                                                onChangeText={(value,index,data)=> {
                                                    console.log(value);
                                                    this.setState({isType:value})
                                                }}
                                            />
                                        </View>
                                        <Text style={styles.app_data_text1}>(lbs/1,000 sq ft)</Text>
                                    </View>
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
                                        key = {`4`}
                                        ref = {inputs[4].ref}
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
                                <Text style={styles.app_data_text}>Size of Lawn (sq ft)</Text>
                            </View>

                            <View style={styles.preset_input_container}>
                                <View style={styles.picker_width}>
                                    <View style={styles.rn_picker_container}>
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
                                        containerStyle={styles.text_input_box_container}
                                        labelStyle={styles.text_label_input}
                                        inputContainerStyle={{borderBottomWidth:0}}
                                        inputStyle={{textAlign:'center'}}
                                        paddingBottom={0}
                                        paddingTop={5}
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

                            <View style={[styles.preset_input_container,{marginBottom:15}]}>
                                <View style={styles.input_share_items}>
                                    <Input
                                        containerStyle={[styles.text_input_box_container,{borderColor:Colors.borderGreyColor}]}
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
                                        onChangeText={text => {
                                            const filteredText = this.getNumberFormatText(text);
                                            this.setState({costPerContainer: filteredText});
                                        }}
                                        placeholder="-"
                                    />
                                </View>
                                <View>
                                    <Text style={styles.app_data_text}>Cost Per Container($) </Text>
                                    <Text style={[styles.app_data_text,{fontSize: 14}]}>With taxes increases accuracy</Text>
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
                                    {this.state.appRateinOz}
                                </Text>
                            </View>

                            <View>
                                <Text style={styles.app_data_text}>Application rate</Text>
                                <Text style={styles.app_data_text1}>(fl oz/1,000 sq ft)</Text>
                            </View>
                        </View>

                        <View style={styles.bottom_divide_line}/>

                        <View style={styles.output_bigcontainer}>
                            <View
                                style={{
                                    width: '100%',
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',
                                    marginTop: 5,
                                }}>
                                <View style={styles.output_border}>
                                    <Text style={styles.text_label_left_input}>{'Total\n Oz'}</Text>
                                    <Text style={styles.output_normal}>
                                        {this.state.totalOzneeded}
                                    </Text>

                                </View>

                                <View style={styles.output_border}>
                                    <Text style={styles.text_label_left_input}>{'Total\n Gal'}</Text>
                                    <Text style={styles.output_normal}>
                                        {this.state.totalGal}
                                    </Text>

                                </View>

                                <View style={styles.output_border}>
                                    <Text style={styles.text_label_left_input}>{'Est. Total\n Cost'} </Text>
                                    <Text style={styles.output_normal}>
                                        {this.state.totalCost}
                                    </Text>

                                </View>
                            </View>
                        </View>

                        {/*<View style={styles.app_rate_container}>*/}
                        {/*    <View style={styles.calc_result_text_container}>*/}
                        {/*        <Text style={styles.app_rate_output}>*/}
                        {/*            {this.state.appWeightinlbs}*/}
                        {/*        </Text>*/}
                        {/*    </View>*/}
                        {/*    <Text style={styles.app_data_text}>Total Application Weight(lbs)</Text>*/}
                        {/*</View>*/}

                        {/*<View style={styles.app_rate_container}>*/}
                        {/*    <View style={styles.calc_result_text_container}>*/}
                        {/*        <Text style={styles.app_rate_output}>*/}
                        {/*            {this.state.weightperOz}*/}
                        {/*        </Text>*/}
                        {/*    </View>*/}
                        {/*    <Text style={styles.app_data_text}>Weight of 1 fl oz (lbs)</Text>*/}
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
                                        {this.state.liquidProjectsList.map((item, i) => (
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
                                                          }
                                                          else if(isAddNewApplication){
                                                              this.goToJournal(false);
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
                                                          this.addLiquidPreset();
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
                                    Liquid Presets
                                </Text>
                            </View>

                            <ScrollView style={{flex: 1}}>
                                {this.state.presetArray.map((item, i) => (
                                    <ListItem
                                        containerStyle={styles.preset_list_item_container}
                                        Component={TouchableOpacity}
                                        onPress={() => {
                                            if (item != null) {
                                                var sizeOfContainer = 32;
                                                if(item.sizeOfContainer  != undefined && item.sizeOfContainer != null  && item.sizeOfContainer != 0){
                                                    sizeOfContainer = item.sizeOfContainer;
                                                }

                                                this.setState(
                                                    {
                                                        isShowPresets: false,
                                                        // addpresetName: item.name,
                                                        currentPreset: item,
                                                        sizeoflawn: item.sizeoflawn,
                                                        targetRateofNitrogen: item.targetRateofNitrogen,

                                                        isType :item.isType,
                                                        // targetRateOfPhosphorus: item.targetRateOfPhosphorus,
                                                        // targetRateOfPotassium: item.targetRateOfPotassium,

                                                        weightofContainer: item.weightofContainer,
                                                        sizeOfContainer: sizeOfContainer,
                                                        productAnN: item.productAnN,
                                                        productAnP: item.productAnP,
                                                        productAnK: item.productAnK,
                                                        costPerContainer: item.costPerContainer,
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
                            potassium (K) in the fertilizer you selected. For example, 24-1-8 would be the percentages
                            of N-P-K.
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
                        <Text style={styles.info_content_text}>This represents the desired amount of N, P, or K you intend to apply per 1000 sq ft</Text>


                        <Text style={styles.info_content_emphasize_text}>Size of Lawn</Text>
                        <Text style={styles.info_content_text}>The total surface area (in sq ft) of your lawn.  This is required in order to determine how much product you will need.</Text>

                        <Text style={styles.info_content_emphasize_text}>Container Weight</Text>
                        <Text style={styles.info_content_text}>The total weight of your liquid fertilizer (in lbs).  This is commonly found on the front of the container near the bottom.</Text>


                        <Text style={styles.info_content_emphasize_text}>Cost per Container</Text>
                        <Text style={styles.info_content_text}>Retail cost of each container. Include taxes to increase accuracy.</Text>

                        <Text style={styles.info_content_emphasize_text}>Soil Testing</Text>
                        <Text style={styles.info_content_text}>Performing a soil test on your lawn can prevent unnecessary fertilizer applications.  It will indicate what nutrients your soil contains and lacks.  Knowing the pH level of your soil is also important to understand the available nutrients in your lawn. </Text>

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

const styles = StyleSheet.create(LiquidPageStyle);

