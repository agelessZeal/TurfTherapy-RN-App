import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    TextInput,
    ScrollView,
    Switch,
    Text, TouchableOpacity, Image, AsyncStorage,
} from 'react-native';

import {KeyboardAccessoryNavigation} from 'react-native-keyboard-accessory';

import JournalStyle from "./JournalStyle";
import Colors from "../../constants/Colors";
import {Input, ListItem, Icon} from "react-native-elements";
import Layout from "../../constants/Layout";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default class AddProject extends Component {
    constructor(props) {
        super(props);

        const {params} = this.props.navigation.state;
        var entries = [];
        console.log('add project params', params)

        if (params.currentProject.entries != undefined) {
            entries = params.currentProject.entries
        }
        var name = '';

        if (params.currentProject != undefined && params.currentProject.name != undefined) {
            name = params.currentProject.name
        }

        if (params.projectName != undefined && params.projectName != '') {
            name = params.projectName;
        }


        // newApp: newApp,
        // isGranular: true,
        // currentProject: this.state.selectAddProject,
        // projectName: this.state.newProjectName,
        // applicationName:this.state.newApplicationName,

        console.log('entries', entries)


        this.state = {

            projectName: name,
            currentProject: params.currentProject,

            totalN: 0,
            totalP: 0,
            totalK: 0,
            totalCost: 0,


            entries: entries,
            isGranular: params.isGranular,
            isUpdate: params.isUpdate,

            date: '',
            selectedDate: new Date(),
            isDatePickerVisible: false,
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

    goToNewApplication() {

        if (this.state.isGranular) {
            this.props.navigation.navigate('Granular', {
                onAddNewApp: () => this.addNewApps(),
                isAddNewApplication: true,
                currentProject: this.state.currentProject,
            });
        } else {
            this.props.navigation.navigate('Liquid', {
                onAddNewApp: () => this.addNewApps(),
                isAddNewApplication: true,
                currentProject: this.state.currentProject,
            });
        }
    }

    addNewEntryRefresh = async () => {
        await AsyncStorage.getItem('entry').then(data => {
            if (data !== null && data != '') {
                var entry = JSON.parse(data);
                console.log('the entry in the addproject:', entry);
                var entries = this.state.entries;

                if (entry.index != undefined && entry.index != null) {
                    entries[entry.index] = entry;
                    console.log('entry update;', entries);
                } else {
                    // entry.index = entries.length;
                    // entries.push(entry);
                    // console.log('new entry add', entries);
                }

                this.setState({entries: entries}, () => {
                    this.updateSumTotal()
                });
                AsyncStorage.setItem('entry', '');
            }
        });
        await AsyncStorage.getItem('dupentry').then(async data => {
            if (data !== null && data != '') {
                var entry = JSON.parse(data);
                console.log('the  dup  entry in the addproject:', entry);
                var entries = this.state.entries;

                entry.index = entries.length;
                entries.push(entry);
                console.log('new entry add', entries);

                this.setState({entries: entries}, () => {
                    this.updateSumTotal()
                });
                AsyncStorage.setItem('dupentry', '');
            }
        });

        this.saveCurrentProject();
    }

    updateSumTotal() {
        var totalN = 0;
        var totalP = 0;
        var totalK = 0;
        var n = 0;
        var p = 0;
        var k = 0;
        var totalCost = 0;
        var cost = 0;
        this.state.entries.map((item, i) => {
                if (item.totalAppN != undefined && item.totalAppN != '') {
                    n = parseFloat(item.totalAppN);
                }
                if (item.totalAppP != undefined && item.totalAppP != '') {
                    p = parseFloat(item.totalAppP);
                }
                if (item.totalAppK != undefined && item.totalAppK != '') {
                    k = parseFloat(item.totalAppK);
                }
                if (item.totalCost != undefined && item.totalCost != '') {
                    cost = parseFloat(item.totalCost);
                }

                totalCost += cost;
                totalN += n;
                totalP += p;
                totalK += k;
            }
        );
        console.log(totalP, totalN, totalK, totalCost)
        this.setState({
            totalN: totalN.toFixed(2),
            totalP: totalP.toFixed(2),
            totalK: totalK.toFixed(2),
            totalCost: totalCost.toFixed(2),
        })
    }

    // componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    //     console.log('teh refresh page')
    //     // this.addNewApps()
    // }


    componentWillUnmount() {
        // Remove the event listener before removing the screen from the stack
        this.focusListener.remove();
        clearTimeout(this.t);
    }

    saveCurrentProject = async () => {
        return;
        var project = this.state.currentProject;
        project.entries = this.state.entries;
        project.name = this.state.projectName;
        project.totalCost = this.state.totalCost;
        project.totalN = this.state.totalN;
        project.totalP = this.state.totalP;
        project.totalK = this.state.totalK;
        console.log('save back item update', project)
        if (this.state.isGranular) {
            await AsyncStorage.getItem('granularprojects').then(async data => {
                if (data !== null) {
                    var projectarray = JSON.parse(data);
                    if (project.index != undefined && project.index != null) {
                        projectarray[project.index] = project;
                        console.log('project update;', projectarray);
                        var granularProjectsString = JSON.stringify(projectarray);
                        await AsyncStorage.setItem('granularprojects', granularProjectsString);
                        if (this.props.navigation.state.params.onGoBack != undefined) {
                            await this.props.navigation.state.params.onGoBack();
                        }
                    }
                }
            });
        } else {
            await AsyncStorage.getItem('liquidprojects').then(async (data) => {
                if (data !== null) {
                    var projectarray = JSON.parse(data);

                    if (project.index != undefined && project.index != null) {
                        projectarray[project.index] = project;
                        console.log('project update;', projectarray);
                        var liquidProjectsString = JSON.stringify(projectarray);
                        await AsyncStorage.setItem('liquidprojects', liquidProjectsString);
                        if (this.props.navigation.state.params.onGoBack != undefined) {
                            await this.props.navigation.state.params.onGoBack();
                        }
                    }
                }
            });
        }
    }

    saveBack = async () => {

        console.log('current entries:', this.state.entries)

        // if (this.state.entries.length == 0) {
        //     this.props.navigation.goBack()
        //     return;
        // }

        var project = this.state.currentProject;
        project.entries = this.state.entries;
        project.name = this.state.projectName;
        project.totalCost = this.state.totalCost;
        project.totalN = this.state.totalN;
        project.totalP = this.state.totalP;
        project.totalK = this.state.totalK;
        console.log('save back item update', project)
        if (this.state.isGranular) {
            await AsyncStorage.getItem('granularprojects').then(async data => {
                if (data !== null) {
                    var projectarray = JSON.parse(data);
                    if (project.index != undefined && project.index != null) {
                        projectarray[project.index] = project;
                        console.log('project update;', projectarray);
                        var granularProjectsString = JSON.stringify(projectarray);
                        await AsyncStorage.setItem('granularprojects', granularProjectsString);
                        if (this.props.navigation.state.params.onGoBack != undefined) {
                            await this.props.navigation.state.params.onGoBack();
                        }
                        this.props.navigation.goBack()
                    } else {

                        project.index = projectarray.length;
                        projectarray.push(project);

                        var granularProjectsString = JSON.stringify(projectarray);
                        console.log('project update granularProjectsString;', granularProjectsString);
                        await AsyncStorage.setItem('granularprojects', granularProjectsString);
                        if (this.props.navigation.state.params.onGoBack != undefined) {
                            await this.props.navigation.state.params.onGoBack();
                        }
                        this.props.navigation.goBack()
                    }
                } else {
                    var projectarray = [];
                    project.index = 0;
                    projectarray.push(project);

                    var granularProjectsString = JSON.stringify(projectarray);
                    console.log('project update granularProjectsString;', granularProjectsString);
                    await AsyncStorage.setItem('granularprojects', granularProjectsString);
                    if (this.props.navigation.state.params.onGoBack != undefined) {
                        await this.props.navigation.state.params.onGoBack();
                    }
                    this.props.navigation.goBack()
                }
            });
        } else {
            await AsyncStorage.getItem('liquidprojects').then(async (data) => {
                if (data !== null) {
                    var projectarray = JSON.parse(data);

                    if (project.index != undefined && project.index != null) {
                        projectarray[project.index] = project;
                        console.log('project update;', projectarray);
                        var liquidProjectsString = JSON.stringify(projectarray);
                        await AsyncStorage.setItem('liquidprojects', liquidProjectsString);
                        if (this.props.navigation.state.params.onGoBack != undefined) {
                            await this.props.navigation.state.params.onGoBack();
                        }
                        this.props.navigation.goBack()
                    } else {
                        project.index = projectarray.length;
                        projectarray.push(project);
                        console.log('project update;', projectarray);
                        var liquidProjectsString = JSON.stringify(projectarray);
                        await AsyncStorage.setItem('liquidprojects', liquidProjectsString);
                        if (this.props.navigation.state.params.onGoBack != undefined) {
                            await this.props.navigation.state.params.onGoBack();
                        }
                        this.props.navigation.goBack()
                    }
                } else {
                    var projectarray = [];
                    project.index = 0;
                    projectarray.push(project);
                    console.log('project update;', projectarray);
                    var liquidProjectsString = JSON.stringify(projectarray);
                    await AsyncStorage.setItem('liquidprojects', liquidProjectsString);
                    if (this.props.navigation.state.params.onGoBack != undefined) {
                        await this.props.navigation.state.params.onGoBack();
                    }
                    this.props.navigation.goBack()
                }
            });
        }


        // var project = {
        //     totalN: this.state.totalN,
        //     totalP: this.state.totalP,
        //     totalK: this.state.totalK,
        //     name: this.state.projectName,
        //     entries: this.state.entries,
        //     totalCost: this.state.totalCost,
        //     index: this.state.currentProject.index,
        //     isUpdate: this.state.isUpdate,
        //     isGranular: this.state.isGranular,
        // }
        //
        //
        // var projectstring = JSON.stringify(project);
        //
        // if (this.state.isGranular) {
        //     await AsyncStorage.setItem('granularproject', projectstring)
        // } else {
        //     await AsyncStorage.setItem('liquidproject', projectstring);
        // }
        // console.log('**************************************')
        // console.log('project back item string:', projectstring)
        // console.log('project back item:', project)

    }

    componentDidMount(): void {
        // this.addNewEntryFromCalc();
        this.updateSumTotal();
        // this.addNewApps();

        //Here is the Trick
        const {navigation} = this.props;
        //Adding an event listner om focus
        //So whenever the screen will have focus it will set the state to zero
        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({count: 0});
            console.log('the did focus')

            const {params} = this.props.navigation.state;
            console.log(' did focus', params)
            if (params != undefined && params.FromEntry != undefined && params.FromEntry) {

            } else {
                console.log('the add newapps')
                this.addNewApps();
                this.saveCurrentProject();
            }
        });

    }


    addNewApps = async () => {
        const {params} = this.props.navigation.state;
        var entries = [];
        if (params.isUpdate != undefined && params.isUpdate == false) {
            if (params.newApp != undefined && params.newApp.name != undefined && params.newApp.name != '') {

                var newApp = params.newApp;
                var datestr = moment().format("MMM DD YYYY");
                newApp.date = datestr;
                var entries = this.state.entries;
                entries.push(newApp);
                // console.log('the new app is parsed ', newApp)
                this.setState({entries: entries}, async () => {
                    this.updateSumTotal();
                    // console.log('entries', entries)
                    // console.log('params_', params)
                    if (params.isNewProject != undefined) {
                        if (params.isNewProject) {
                            if (params.projectName != undefined && params.projectName != '') {
                                const name = params.projectName;
                                ////////create new project
                                entries = [];
                                entries.push(newApp);
                                var project = {
                                    totalN: newApp.totalAppN,
                                    totalP: newApp.totalAppP,
                                    totalK: newApp.totalAppK,
                                    totalCost: newApp.totalCost,
                                    name: name,
                                    entries: entries,
                                    // isUpdate: this.state.isUpdate,
                                    isGranular: this.state.isGranular,
                                };

                                // console.log('new project and app is added', project)
                                this.setState(
                                    {
                                        currentProject: project,
                                    })

                                if (params.isGranular) {
                                    await AsyncStorage.getItem('granularprojects').then(data => {
                                        if (data !== null) {
                                            var projectarray = JSON.parse(data);

                                            project.index = projectarray.length;
                                            projectarray.push(project);
                                            // console.log('new project add', projectarray);
                                            var granularProjectsString = JSON.stringify(projectarray);
                                            AsyncStorage.setItem('granularprojects', granularProjectsString);

                                        }
                                    });
                                } else {
                                    await AsyncStorage.getItem('liquidprojects').then(data => {
                                        if (data !== null) {
                                            var projectarray = JSON.parse(data);

                                            project.index = projectarray.length;
                                            projectarray.push(project);
                                            // console.log('new project add', projectarray);
                                            var liquidProjectsString = JSON.stringify(projectarray);
                                            AsyncStorage.setItem('liquidprojects', liquidProjectsString);
                                        }
                                    });
                                }
                            }

                        } else {
                            if (params.currentProject != undefined && params.currentProject.name != undefined && params.currentProject.name != '') {
                                ///// update the original project
                                var project = this.state.currentProject;
                                project.entries = entries;
                                project.totalCost = this.state.totalCost;
                                project.totalN = this.state.totalN;
                                project.totalP = this.state.totalP;
                                project.totalK = this.state.totalK;

                                this.setState(
                                    {
                                        currentProject: project,
                                    })
                                // console.log('new app is added', project)
                                if (params.isGranular) {
                                    await AsyncStorage.getItem('granularprojects').then(data => {
                                        if (data !== null) {
                                            var projectarray = JSON.parse(data);
                                            if (project.index != undefined && project.index != null) {
                                                projectarray[project.index] = project;
                                                console.log('project update;', projectarray);
                                                var granularProjectsString = JSON.stringify(projectarray);
                                                AsyncStorage.setItem('granularprojects', granularProjectsString);
                                            }
                                        }
                                    });
                                } else {
                                    await AsyncStorage.getItem('liquidprojects').then(data => {
                                        if (data !== null) {
                                            var projectarray = JSON.parse(data);

                                            if (project.index != undefined && project.index != null) {
                                                projectarray[project.index] = project;
                                                console.log('project update;', projectarray);
                                                var liquidProjectsString = JSON.stringify(projectarray);
                                                AsyncStorage.setItem('liquidprojects', liquidProjectsString);
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    }
                })
            }
        }
    }

    addNewEntryFromCalc = () => {
        const {params} = this.props.navigation.state;
        if (params.isAdded != undefined && params.isAdded) {

            var entries = this.state.entries;
            var datestr = moment().format("MMM DD YYYY");
            var entry = {
                isUpdate: false,
                name: 'New Entry',
                n: params.entryN,
                p: params.entryP,
                k: params.entryK,
                date: datestr,
            };

            entry.index = entries.length;
            entries.push(entry);
            console.log('new from the calc entry add', entries);
            this.setState({entries: entries});
        }
    }

    goToEntry = (item,i) => {
        console.log('select item', item);
        if (item != null) {
            if (this.state.isGranular) {
                this.props.navigation.navigate('NewEntry', {
                    onGoBack: () => this.addNewEntryRefresh(),
                    currentEntry: item,
                    isGranular: this.state.isGranular,
                    isUpdate: true,
                });
            } else {
                this.props.navigation.navigate('LiquidEntry', {
                    onGoBack: () => this.addNewEntryRefresh(),
                    currentEntry: item,
                    isGranular: this.state.isGranular,
                    isUpdate: true,
                });
            }

        }
    }

    deleteEntry = (item) => {
        console.log('select item', item);
        var array = this.state.entries;
        array.splice(item.index, 1);

        array.map((item, i) => {
            item.index = i;
        });
        console.log('after delete', array);
        this.setState({entries: array}, () => {
            this.updateSumTotal();
        });
    }

    render() {


        var entries = this.state.entries;
        console.log('the entries  fg', entries)
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
                            this.saveBack();
                        }}>
                        <Icon type='material-community' iconStyle={styles.right_chevron_icon_image} size={24}
                              name={'arrow-left'} color={Colors.titleBlack}/>
                    </TouchableOpacity>
                </View>
                {/*<Text style={styles.view_type_title}>{this.state.projectName}</Text>*/}

                <View style={styles.view_type_title} >
                    <Input
                        inputContainerStyle={{borderBottomWidth: 0}}
                        labelStyle={[styles.text_label_input, {marginBottom: 2}]}
                        inputStyle={{
                            textAlign: 'left',
                            marginVertical: 0,
                            paddingVertical: 0,
                            color: Colors.textBlackColor,
                            fontFamily: 'Muli-Bold',
                            fontSize: 24,
                        }}
                        fontSize={Layout.font.medium_size}
                        value={this.state.projectName}
                        onChangeText={text => {
                            this.setState({projectName: text});
                        }}
                    />
                </View>



                <View style={styles.add_preset_container}>
                    <View style={styles.row_between_container}>
                        <Text style={styles.project_sub_title_text}>Project Sum</Text>
                    </View>

                    <View style={styles.project_sum_container}>
                        <View style={styles.project_sum_row_container}>
                            <View style={styles.output_border}>
                                <Text style={styles.text_label_input}>N</Text>
                                <Text style={styles.output_normal}>
                                    {this.state.totalN}
                                </Text>
                            </View>

                            <View style={styles.output_border}>
                                <Text style={styles.text_label_input}>P</Text>
                                <Text style={styles.output_normal}>
                                    {this.state.totalP}
                                </Text>

                            </View>

                            <View style={styles.output_border}>
                                <Text style={styles.text_label_input}>K</Text>
                                <Text style={styles.output_normal}>
                                    {this.state.totalK}
                                </Text>

                            </View>
                        </View>

                        <View style={styles.project_sum_row_container}>
                            <View style={styles.app_rate_container}>
                                <View style={[styles.calc_result_text_container, styles.border_green]}>
                                    <Text style={styles.app_rate_output}>
                                        {this.state.totalCost}
                                    </Text>
                                </View>

                                <View style={styles.row_center_align}>
                                    <Text style={styles.app_data_text}>Est. Total Cost</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.row_between_container, {marginTop: 15}]}>
                        <Text style={styles.project_sub_title_text}>Application Log</Text>
                        <TouchableOpacity
                            style={styles.new_entry_btn}
                            onPress={() => {
                                this.goToNewApplication();
                            }}
                        >
                            <Text style={styles.add_new_project_text}>Add New</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.entries_container}>
                        {entries.map((item, i) => (
                            <ListItem
                                containerStyle={[styles.preset_list_item_container,{padding:0}]}
                                leftElement={
                                    <View style={styles.project_total_container}>

                                        <View style={styles.project_list_item_container}>
                                            <View style={styles.project_item}>
                                                <View style={{width:'70%'}}>
                                                    <Text style={styles.project_item_title}> {i + 1}. {item.name}</Text>
                                                    <Text style={styles.fontProjectSubtitle}> {item.date}</Text>
                                                </View>


                                                <Icon name={'edit'}
                                                      color={Colors.chevronColor}
                                                      containerStyle={styles.project_item_icon_container}
                                                      type={"feather"}
                                                      size={20}
                                                      Component={TouchableOpacity}
                                                      onPress={()=>{
                                                          console.log('select item', item);
                                                          if (item != null) {
                                                              this.goToEntry(item,i)
                                                          }
                                                      }}
                                                />

                                                <View style={{backgroundColor:Colors.borderGreyColor,width:1,height:'60%'}}/>

                                                <Icon name={'trash'}
                                                      color={Colors.chevronColor}
                                                      containerStyle={styles.project_item_icon_container}
                                                      type={"simple-line-icon"}
                                                      size={20}
                                                      Component={TouchableOpacity}
                                                      onPress={()=>{this.deleteEntry(item)}}
                                                />
                                            </View>
                                        </View>

                                        <View style={styles.project_sum_row_container}>
                                            <View style={styles.output_border}>
                                                <Text style={styles.text_label_input}>N</Text>
                                                <Text style={styles.output_normal}>
                                                    {item.totalAppN}
                                                </Text>

                                            </View>

                                            <View style={styles.output_border}>
                                                <Text style={styles.text_label_input}>P</Text>
                                                <Text style={styles.output_normal}>
                                                    {item.totalAppP}
                                                </Text>

                                            </View>

                                            <View style={styles.output_border}>
                                                <Text style={styles.text_label_input}>K</Text>
                                                <Text style={styles.output_normal}>
                                                    {item.totalAppK}
                                                </Text>

                                            </View>
                                        </View>
                                    </View>
                                }
                            ></ListItem>

                        ))}
                    </ScrollView>
                </View>
            </View>
        );
    }


}
const styles = StyleSheet.create(JournalStyle);
