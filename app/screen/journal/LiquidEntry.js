import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    TextInput,
    ScrollView,
    Switch,
    Text, TouchableOpacity, Image, AsyncStorage, Alert, Keyboard,
} from 'react-native';

import {KeyboardAccessoryNavigation} from 'react-native-keyboard-accessory';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import JournalStyle from "./JournalStyle";
import Colors from "../../constants/Colors";
import {Icon, Input, ListItem} from "react-native-elements";
import Layout from "../../constants/Layout";
import ActionSheet from "react-native-action-sheet";
import ImagePicker from "react-native-image-crop-picker";

let inputs = [
    {
        placeholder: 'Entry Name',
        name: 'entryName',
    },
    {
        placeholder: 'App Notes',
        name: 'note',
    },
];

export default class LiquidEntry extends Component {
    constructor(props) {
        super(props);
        inputs = inputs.map(input => ({
            ref: React.createRef(),
            ...input,
        }));
        const {params} = this.props.navigation.state;
        var datestr = params.currentEntry.date;
        var date = null;
        if (datestr != null && datestr != undefined) {
            date = new Date(datestr);
            console.log('the date moment object',date)
        } else {
            date = new Date();
            datestr = moment(date).format("MMM DD YYYY");
        }

        console.log('the new date',new Date())
        console.log('the file',date);
        this.state = {
            currentEntry: params.currentEntry,
            entryName: '',
            sizeoflawn:'',

            appRateinLBS: '',
            totallbsneeded: '',
            bagsneeded: '',
            totalCost: '',
            totalAppAnofpoundsN: '',
            totalAppAnofpoundsP: '',
            totalAppAnofpoundsK: '',


            appNote:'',

            date: datestr,
            isUpdate: params.isUpdate,
            selectedDate: date,
            isDatePickerVisible: false,

            activeInputIndex: 0,
            nextFocusDisabled: false,
            previousFocusDisabled: false,
            buttonsDisabled: false,
            buttonsHidden: false,

            isGranular: params.isGranular,

            targetRateofNitrogen: '',
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
            image:'',

        };
        this.hideDatePicker = this.hideDatePicker.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    hideDatePicker = () => {
        this.setState({
            isDatePickerVisible: false,
        })
    };
    handleConfirm = date => {
        let showDate = moment(date).format("MMM DD YYYY");
        console.warn("A date has been picked: ", date);
        this.setState({
            selectedDate: date,
            date: showDate,
            isDatePickerVisible: false,
        })
    };

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

    duplicate = async  () => {
        var currentEntry =  this.state.currentEntry;
        currentEntry.name = this.state.entryName;
        currentEntry.date = this.state.date;


        var stringofEntry = JSON.stringify(currentEntry);
        await AsyncStorage.setItem('dupentry', stringofEntry);
        await this.props.navigation.state.params.onGoBack();
        this.props.navigation.navigate('AddProject', {
            FromEntry: true,
        });
    }


    goBack =  async  () => {
        if (this.state.entryName != '') {

            var currentEntry =  this.state.currentEntry;
            currentEntry.name = this.state.entryName;
            currentEntry.date = this.state.date;
            currentEntry.note = this.state.appNote;
            currentEntry.image = this.state.image;



            var stringofEntry = JSON.stringify(currentEntry);
            await AsyncStorage.setItem('entry', stringofEntry);
            await this.props.navigation.state.params.onGoBack();
            this.props.navigation.navigate('AddProject', {
                FromEntry: true,
            });
        } else {
            Alert.alert(
                '',
                'Please enter all information',
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


    showImageActionSheet = () => {
        var BUTTONSiOS = [
            'Camera',
            'Gallery',
            'Delete',
            'Cancel'
        ];

        var BUTTONSandroid = [
            'Camera',
            'Gallery',
            'Delete',
        ];

        var DESTRUCTIVE_INDEX = 2;
        var CANCEL_INDEX = 3;

        ActionSheet.showActionSheetWithOptions({
                options: (Platform.OS == 'ios') ? BUTTONSiOS : BUTTONSandroid,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                tintColor: 'blue'
            },
            (buttonIndex) => {
                if(buttonIndex === 0){
                    ImagePicker.openCamera({
                        width: 300,
                        height: 200,
                        cropping: true
                    }).then(image => {
                        console.log(image);
                        this.setState({
                            image:image.path,
                        })
                    });
                }else if(buttonIndex === 1){

                    ImagePicker.openPicker({
                        width: 300,
                        height: 200,
                        cropping: true
                    }).then(image => {
                        console.log(image);
                        this.setState({
                            image:image.path,
                        })
                    });
                }else if(buttonIndex === 2){
                    this.setState({image:''})
                }else if(buttonIndex === 3){

                }
                console.log('button clicked :', buttonIndex);
            });
    }


    componentDidMount(): void {
        console.log('the current entry:', this.state.currentEntry)
        const {params} = this.props.navigation.state;

        var note  = '';
        if(this.state.currentEntry.note != undefined){
            note = this.state.currentEntry.note;
        }

        if (this.state.currentEntry.totalCost != undefined && this.state.currentEntry.totalAppN != undefined) {
            console.log('the current entry is not empty')

            let image = ''
            if(this.state.currentEntry.image != undefined){
                image = this.state.currentEntry.image;
            }


            this.setState({
                entryName: this.state.currentEntry.name,

                weightofContainer: this.state.currentEntry.weightofContainer,
                sizeOfContainer: this.state.currentEntry.sizeOfContainer,
                costPerContainer: this.state.currentEntry.costPerContainer,

                weightperOz: this.state.currentEntry.weightperOz,

                appWeightinlbs: this.state.currentEntry.appWeightinlbs,
                appRateinOz: this.state.currentEntry.appRateinOz,
                totalOzneeded: this.state.currentEntry.totalOzneeded,
                totalGal: this.state.currentEntry.totalGal,

                totalCost: this.state.currentEntry.totalCost,
                totalAppAnofpoundsN: this.state.currentEntry.totalAppN,
                totalAppAnofpoundsP: this.state.currentEntry.totalAppP,
                totalAppAnofpoundsK: this.state.currentEntry.totalAppK,
                sizeoflawn:this.state.currentEntry.sizeoflawn,
                appNote:note,
                image:image,

            })

        }
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

    render() {
        const {selectedStartDate} = this.state;
        // const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <View style={styles.container}>

                <View style={styles.title_container}>

                    <View style={styles.setting_header}>
                        <View style={styles.header_title_input_container}>
                            <Input
                                inputContainerStyle={{borderBottomWidth: 0}}
                                labelStyle={[styles.text_label_input, {marginBottom: 2}]}
                                inputStyle={{
                                    textAlign: 'center',
                                    marginVertical: 0,
                                    paddingVertical: 0,
                                    borderRadius:3,
                                }}
                                key={`0`}
                                ref={inputs[0].ref}
                                blurOnSubmit={false}
                                onFocus={this.handleFocus(0)}

                                fontSize={Layout.font.medium_size}
                                value={this.state.entryName}
                                onChangeText={text => {
                                    this.setState({entryName: text});
                                }}
                            />
                        </View>
                    </View>
                    <View
                        style={styles.headerRightLogo}>
                        <View style={{width: 80, aspectRatio:1}}>
                            <Image
                                style={styles.fit_image}
                                source={require('../../assets/images/logo.png')}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.headerLeftBack}
                        onPress={() => {
                            this.goBack();
                        }}>
                        <Icon type='material-community' iconStyle={styles.right_chevron_icon_image} size={24}
                              name={'arrow-left'} color={Colors.titleBlack}/>
                    </TouchableOpacity>


                    {/*<TouchableOpacity*/}
                    {/*    style={styles.headerLeftBack}*/}
                    {/*    onPress={() => {*/}
                    {/*        this.goBack();*/}
                    {/*    }}>*/}
                    {/*    <View style={{width: '30%', height: '30%'}}>*/}
                    {/*        <Image*/}
                    {/*            style={styles.fit_image}*/}
                    {/*            source={require('../../assets/images/left.png')}*/}
                    {/*        />*/}
                    {/*    </View>*/}
                    {/*</TouchableOpacity>*/}
                </View>

                <ScrollView>
                    <View style={styles.add_entry_content}>
                        <View style={styles.add_entry_header_content}>

                            <DateTimePickerModal
                                isVisible={this.state.isDatePickerVisible}
                                mode="date"
                                locale={'en_US'}
                                display={"calendar"}
                                date={this.state.selectedDate}
                                onConfirm={this.handleConfirm}
                                onCancel={this.hideDatePicker}
                            />

                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        isDatePickerVisible: true,
                                    })
                                    console.log('the calendar picker')
                                }}
                            >
                                <Text style={[styles.text_output_subtitle, {marginBottom: 5,color:Colors.textGreenColor}]}>
                                    Application Date:
                                </Text>

                                <Text>
                                    {this.state.date}
                                </Text>
                            </TouchableOpacity>
                        </View>



                        <View style={[styles.add_entry_header_content,{flexDirection:'column'}]}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.showImageActionSheet();
                                }}
                            >
                                <Text style={[styles.text_output_subtitle, { textAlign:'left',marginBottom: 13,color:Colors.textGreenColor}]}>
                                    Application Image +
                                </Text>
                                {
                                    this.state.image !== '' && (
                                        <Image
                                            style={{ width:'100%', aspectRatio:1.5,resizeMode:'stretch' }}
                                            source={{
                                                isStatic:true,
                                                uri:this.state.image,
                                            }}
                                        />
                                    )
                                }

                            </TouchableOpacity>
                        </View>

                        <View style={[styles.output_bigcontainer,{marginTop: 0,paddingHorizontal: 20}]}>

                            <Text style={[styles.text_output_subtitle,{color:Colors.textGreenColor}]}>
                                Application Notes
                            </Text>

                            <View>
                                <Input
                                    containerStyle={styles.app_note_content_container}
                                    inputContainerStyle={{borderBottomWidth: 0}}
                                    labelStyle={styles.text_label_input}
                                    multiline={true}
                                    inputStyle={{fontSize: 13, fontFamily: 'OpenSans', color: Colors.textBlackColor}}
                                    autoFocus={false}
                                    onChangeText={text => {
                                        this.setState({
                                            appNote: text,
                                        });
                                    }}
                                    key={`1`}
                                    ref={inputs[1].ref}
                                    blurOnSubmit={false}
                                    onFocus={this.handleFocus(1)}

                                    value={this.state.appNote}
                                    placeholder="Enter your app note"
                                    onSubmitEditing={Keyboard.dismiss}
                                />
                            </View>
                        </View>

                        <View
                            style={{
                                width: '100%',
                                marginBottom: 0,
                                justifyContent: 'space-around',
                                flexDirection: 'row',
                                marginTop: 15,
                            }}>
                            <View style={styles.entry_item_text_container}>
                                <Text style={styles.entry_item_text}>
                                    {this.state.appRateinOz}
                                </Text>
                                <Text style={styles.text_label_output}>Application Rate</Text>
                                <Text style={styles.text_label_output}>(fl oz/1,000 sq ft)</Text>
                            </View>
                            <View style={styles.entry_item_text_container}>
                                <Text style={styles.entry_item_text}>
                                    {this.state.sizeoflawn}
                                </Text>
                                <Text style={styles.text_label_output}>Size of Lawn(sq ft)</Text>
                            </View>
                        </View>

                        <View
                            style={{
                                marginBottom: 0,
                                justifyContent: 'space-around',
                                flexDirection: 'row',
                                paddingHorizontal: 10,
                                marginTop: 15,
                            }}>
                            <View style={styles.output_border}>
                                <Text style={styles.output_normal}>
                                    {this.state.totalOzneeded}
                                </Text>
                                <Text style={styles.text_label_input_for_less_than}>Total Oz</Text>
                            </View>
                            <View style={styles.output_border}>
                                <Text style={styles.output_normal}>
                                    {this.state.totalGal}
                                </Text>
                                <Text style={styles.text_label_input_for_less_than}>Total Gal</Text>
                            </View>
                            <View style={styles.output_border}>
                                <Text style={styles.output_normal}>
                                    {this.state.totalCost}
                                </Text>
                                <Text style={styles.text_label_input_for_less_than}>Est. Total Cost</Text>
                            </View>
                        </View>
                        {/*<Text style={styles.text_less_than}>*/}
                        {/*  (less than 1 is equivalent to 1 Gal or less)*/}
                        {/*</Text>*/}
                        <View style={styles.output_bigcontainer}>
                            <Text style={[styles.text_output_subtitle,{marginLeft:20}]}>
                                Total Application Analysis
                            </Text>
                            <View
                                style={{
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',
                                    paddingHorizontal: 10,
                                    marginTop: 5,
                                }}>
                                <View style={styles.output_border}>
                                    <Text style={styles.output_normal}>
                                        {this.state.totalAppAnofpoundsN}
                                    </Text>
                                    <Text style={styles.text_label_input}>N</Text>
                                </View>

                                <View style={styles.output_border}>
                                    <Text style={styles.output_normal}>
                                        {this.state.totalAppAnofpoundsP}
                                    </Text>
                                    <Text style={styles.text_label_input}>P</Text>
                                </View>

                                <View style={styles.output_border}>
                                    <Text style={styles.output_normal}>
                                        {this.state.totalAppAnofpoundsK}
                                    </Text>
                                    <Text style={styles.text_label_input}>K</Text>
                                </View>
                            </View>
                        </View>


                        <View
                            style={{
                                width: '100%',
                                marginBottom: 0,
                                justifyContent: 'space-around',
                                flexDirection: 'row',
                                marginTop: 15,
                            }}>
                            <View style={styles.entry_item_text_container}>
                                <Text style={styles.entry_item_text}>
                                    {this.state.appWeightinlbs}
                                </Text>
                                <Text style={styles.text_label_output}>Total Application Weight(lbs)</Text>
                            </View>
                            <View style={styles.entry_item_text_container}>
                                <Text style={styles.entry_item_text}>
                                    {this.state.weightperOz}
                                </Text>
                                <Text style={styles.text_label_output}>Weight of 1 fl oz (lbs)</Text>
                            </View>
                        </View>




                        <View style={styles.add_preset_action_container}>
                            <TouchableOpacity
                                style={styles.save_application_btn}
                                onPress={() => {
                                    this.goBack()
                                }}>
                                {
                                    this.state.isUpdate ? (<Text style={styles.action_item_text}>Save</Text>) : (
                                        <Text style={styles.action_item_text}>Add</Text>)
                                }
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
const styles = StyleSheet.create(JournalStyle);
