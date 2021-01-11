import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    TextInput,
    ScrollView,
    Switch,
    Text, TouchableOpacity, Image, AsyncStorage, Alert, Keyboard,
} from 'react-native';

const LW = Layout.window.width;
const LH = Layout.window.height;
const RateWH = LH / LW;

import {KeyboardAccessoryNavigation} from 'react-native-keyboard-accessory';

import JournalStyle from "./JournalStyle";
import Colors from "../../constants/Colors";
import {Icon, Input, ListItem, Overlay} from "react-native-elements";
import Layout from "../../constants/Layout";
import LinearGradient from "react-native-linear-gradient";

class Journal extends Component {
    constructor(props) {
        super(props);

        const {params} = this.props.navigation.state;
        var isAdded = false;
        if (params != undefined && params.isAdded != undefined) {
            isAdded = params.isAdded;
        }

        this.state = {
            liquidProjects: [],
            granularProjects: [],
            isAdded: isAdded,
            isShowCreateNewProjectShow: false,
            isGranular: false,
            newProjectName: '',
        };
    }

    createNewProject = async (isGranular) => {

        var project = {
            totalN: '',
            totalP: '',
            totalK: '',
            totalCost: '',
            name: this.state.newProjectName,
            entries: [],
            isGranular: isGranular,

        };

        if (isGranular) {
            this.setState({isAdded: false})

            this.props.navigation.navigate('AddProject', {
                onGoBack: () => this.addNewProjectRefreshG(),
                isUpdate: false,
                currentProject: {},
                FromEntry: true,
                isGranular: isGranular,
                isAdded: true,
                projectName: this.state.newProjectName,
            });
        } else {
            this.setState({isAdded: false})

            this.props.navigation.navigate('AddProject', {
                onGoBack: () => this.addNewProjectRefreshL(),
                isUpdate: false,
                FromEntry: true,
                currentProject: {},
                isGranular: isGranular,
                isAdded: true,
                projectName: this.state.newProjectName,
            });
        }
    }

    goToProjectG = (isUpdate, item) => {
        if (this.state.isAdded) {
            const {params} = this.props.navigation.state;
            if (params.isGranular === true) {

                this.setState({isAdded: false})

                this.props.navigation.navigate('AddProject', {
                    onGoBack: () => this.addNewProjectRefreshG(),
                    isUpdate: isUpdate,
                    currentProject: item,
                    isGranular: true,
                    isAdded: true,
                    FromEntry: true,
                    entryN: params.entryN,
                    entryP: params.entryP,
                    entryK: params.entryK,
                });
            } else {
                Alert.alert(
                    '',
                    'You should select the Liquid project.',
                    [
                        {
                            text: 'OK',
                            onPress: () => console.log('Fail'),
                        },
                    ],
                    {cancelable: false},
                );
            }
        } else {
            this.props.navigation.navigate('AddProject', {
                onGoBack: () => this.addNewProjectRefreshG(),
                isUpdate: isUpdate,
                FromEntry: true,
                currentProject: item,
                isGranular: true,
            });
        }
    }

    goToProjectL = (isUpdate, item) => {

        if (this.state.isAdded) {
            const {params} = this.props.navigation.state;
            if (params.isGranular === false) {
                this.setState({isAdded: false})
                this.props.navigation.navigate('AddProject', {
                    onGoBack: () => this.addNewProjectRefreshL(),
                    isUpdate: isUpdate,
                    currentProject: item,
                    isGranular: false,
                    FromEntry: true,
                    isAdded: true,
                    entryN: params.entryN,
                    entryP: params.entryP,
                    entryK: params.entryK,
                });
            } else {
                Alert.alert(
                    '',
                    'You should select the Granular project.',
                    [
                        {
                            text: 'OK',
                            onPress: () => console.log('Fail'),
                        },
                    ],
                    {cancelable: false},
                );
            }

        } else {
            this.props.navigation.navigate('AddProject', {
                onGoBack: () => this.addNewProjectRefreshL(),
                isUpdate: isUpdate,
                currentProject: item,
                FromEntry: true,
                isGranular: false,
            });
        }
    }

    addNewProjectRefreshG = async () => {
        this.refreshData()
        // await AsyncStorage.getItem('granularproject').then(data => {
        //     if (data !== null) {
        //         var project = JSON.parse(data);
        //         console.log(' journal  get project:', project);
        //         var granularProjects = this.state.granularProjects;
        //
        //         if (project.isUpdate && project.index != undefined && project.index != null) {
        //             granularProjects[project.index] = project;
        //             console.log('project update;', granularProjects);
        //         } else {
        //             project.index = granularProjects.length;
        //             granularProjects.push(project);
        //             console.log('new project add', granularProjects);
        //         }
        //         this.setState({granularProjects: granularProjects});
        //     }
        // });
    }

    addNewProjectRefreshL = async () => {
        this.refreshData()
        // await AsyncStorage.getItem('liquidproject').then( data => {
        //     if (data !== null) {
        //         var project = JSON.parse(data);
        //         console.log(' journal  get project:', project);
        //         var liquidProjects = this.state.liquidProjects;
        //
        //         if (project.isUpdate && project.index != undefined && project.index != null) {
        //             liquidProjects[project.index] = project;
        //             console.log('project update;', liquidProjects);
        //         } else {
        //             project.index = liquidProjects.length;
        //             liquidProjects.push(project);
        //             console.log('new project add', liquidProjects);
        //         }
        //         this.setState({liquidProjects: liquidProjects});
        //     }
        // });
    }


    saveBack = async () => {
        // var liquidProjectString = JSON.stringify(this.state.liquidProjects);
        // await AsyncStorage.setItem('liquidprojects', liquidProjectString);
        // var granularProjectsString = JSON.stringify(this.state.granularProjects);
        // await AsyncStorage.setItem('granularprojects', granularProjectsString);
        //
        // console.log('*************************************');
        // console.log('the back save in journal:',liquidProjectString)
        // console.log('the back save in journal:',granularProjectsString)
        this.props.navigation.goBack();
    }

    refreshData = async () => {
        await AsyncStorage.getItem('granularprojects').then(data => {
            if (data !== null) {
                var projectarray = JSON.parse(data);
                this.setState({granularProjects: projectarray});
                console.log('get granular projects :', projectarray);
            }
        });

        await AsyncStorage.getItem('liquidprojects').then(data => {
            if (data !== null) {
                var projectarray = JSON.parse(data);
                console.log('get granular projects :', projectarray);
                this.setState({liquidProjects: projectarray});
            }
        });
    }


    async componentDidMount(): void {
        this.refreshData()
    }

    deleteGranularProject = async (item, i) => {
        Alert.alert(
            'Are you sure?',
            'This action is irreversible, please confirm to delete this item.',
            [
                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {
                    text: 'Yes', onPress: async () => {
                        var array = this.state.granularProjects;
                        console.log('select item before', array.length, item.index);
                        array.splice(item.index, 1);
                        array.map((item, i) => {
                            item.index = i;
                        });
                        console.log('after delete', array.length);
                        this.setState({granularProjects: array});
                        var granularProjectsString = JSON.stringify(array);
                        await AsyncStorage.setItem('granularprojects', granularProjectsString);
                    }
                },
            ],
            {cancelable: false}
        );
    }

    deleteLiquidProject = async (item, i) => {
        Alert.alert(
            'Are you sure?',
            'This action is irreversible, please confirm to delete this item.',
            [
                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {
                    text: 'Yes', onPress: async () => {
                        var array = this.state.liquidProjects;
                        console.log('select item', array.length, item.index);
                        array.splice(item.index, 1);
                        console.log('after delete', array.length);

                        array.map((item, i) => {
                            item.index = i;
                        });

                        this.setState({liquidProjects: array});

                        var liquidProjectString = JSON.stringify(array);

                        await AsyncStorage.setItem('liquidprojects', liquidProjectString);
                    }
                },
            ],
            {cancelable: false}
        );
    }


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
                            this.saveBack();
                        }}>
                        <Icon type='material-community' iconStyle={styles.right_chevron_icon_image} size={24}
                              name={'arrow-left'} color={Colors.titleBlack}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.view_type_title}>Therapy Journal</Text>

                <View style={styles.project_container}>
                    <View style={styles.row_between_container}>
                        <Text style={styles.project_sub_title_text}>Granular Projects</Text>
                        <TouchableOpacity
                            style={styles.new_entry_btn}
                            onPress={() => {
                                this.setState({
                                    isGranular: true,
                                    isShowCreateNewProjectShow: true,
                                })
                            }}
                        >
                            <Text style={styles.add_new_project_text}>Add New</Text>
                        </TouchableOpacity>
                    </View>


                    <ScrollView style={{width: '100%', marginTop: 5}}>
                        {this.state.granularProjects.map((item, i) => (
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
                                rightContentContainerStyle={{backgroundColor: 'pink'}}
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
                                                      this.goToProjectG(true, item)
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
                                                  this.deleteGranularProject(item, i)
                                              }}
                                        />
                                    </View>
                                }
                            />

                        ))}
                    </ScrollView>


                    <View style={styles.row_between_container}>
                        <Text style={styles.project_sub_title_text}>Liquid Projects</Text>
                        <TouchableOpacity
                            style={styles.new_entry_btn}
                            onPress={() => {
                                this.setState({
                                    isGranular: false,
                                    isShowCreateNewProjectShow: true,
                                })
                            }}
                        >
                            <Text style={styles.add_new_project_text}>Add New</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={{width: '100%', marginTop: 5}}>
                        {this.state.liquidProjects.map((item, i) => (

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
                                rightContentContainerStyle={{backgroundColor: 'pink'}}
                                rightElement={<View style={{flexDirection: 'row', justifyContent: 'space-around'}}>

                                    <Icon name={'edit'}
                                          color={Colors.chevronColor}
                                          containerStyle={styles.project_item_icon_container}
                                          type={"feather"}
                                          size={20}
                                          Component={TouchableOpacity}
                                          onPress={() => {
                                              console.log('select item', item);
                                              if (item != null) {
                                                  this.goToProjectL(true, item)
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
                                              this.deleteLiquidProject(item, i)
                                          }}
                                    />
                                </View>}
                            />

                        ))}
                    </ScrollView>
                </View>


                <Overlay
                    isVisible={this.state.isShowCreateNewProjectShow}
                    overlayBackgroundColor={Colors.whiteColor}
                    overlayStyle={styles.overlay_container}
                    windowBackgroundColor={Colors.overlayWindowColor}
                    width={LW - 60}
                    height="auto">
                    <View style={styles.overlay_text_input_container}>
                        <Text style={styles.overlay_text_input_title}>New Project Name</Text>
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
                        <Icon
                            name={'window-close'}
                            type={"material-community"}
                            containerStyle={styles.overlay_close_btn}
                            Component={TouchableOpacity}
                            size={20}
                            color={Colors.chevronColor}
                            onPress={() => {
                                this.setState({isShowCreateNewProjectShow: false});
                            }}
                        />
                        <View style={styles.overlay_text_input_save_box}>
                            <TouchableOpacity style={{flex: 1}}
                                              onPress={() => {
                                                  Keyboard.dismiss;

                                                  if (this.state.newProjectName != '') {
                                                      this.setState({
                                                          isShowCreateNewProjectShow: false,
                                                      }, () => {
                                                          this.createNewProject(this.state.isGranular)
                                                      });
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

            </View>
        );
    }
}

const styles = StyleSheet.create(JournalStyle);
export default Journal;
