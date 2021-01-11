import {Dimensions, Platform, StatusBar} from 'react-native';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import GlobalStyle from '../../constants/GlobalStyle';

const LW = Layout.window.width;
const LH = Layout.window.height;
const CW = LW;
const CH =
  Platform.OS === 'ios'
    ? LH - (Layout.statusHeight + Layout.menuHeight)
    : LH - Layout.menuHeight;

export default {
  ...GlobalStyle,

  container: {
    flex: 1,
    backgroundColor: Colors.lightGrayBkColor
  },
  contentContainer: {
    padding: 30,
  },
  textInput: {
    flexGrow: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#CCC',
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  switchInput: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  switchInputText: {
    alignSelf: 'center',
    fontSize: 16,
    marginLeft: 10,
  },
  mainContent: {
    position: 'absolute',
    left: 0,
    width: CW,
    height: CH,
  },
  setting_presets_title: {
    fontSize: Layout.font.btn_size,
    color: Colors.textBlackColor,
  },
  setting_preset_container: {
    borderRadius: 5,
    borderColor: Colors.textGreySettingColor,
    backgroundColor: 'transparent',
  },

  setting_header: {
    marginTop: 5,
    width:'100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_title_input_container:{
    minWidth: '50%'
  },
  setting_icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  setting_title: {
    color: Colors.bkBlackColor,
    fontWeight: 'bold',
    fontSize: Layout.font.h2_size,
  },
  setting_sub_container: {
    marginTop: '30%',
    marginHorizontal: 30,
    height: '60%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  setting_button_container: {
    width: '80%',
    borderWidth: 2,
    borderColor: Colors.lightGrayColor,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setting_sub_button: {
    fontSize: Layout.font.h1_size,
    padding: 15,
  },


  project_container: {
    paddingHorizontal: 15,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    // borderColor: Colors.borderGreyColor,
    // borderRadius: 15,
    // borderWidth: 2,
    height: LH *0.9 - 50,
  },
  project_item:{

    width:'100%',
    // borderColor: Colors.textBlackColor,
    // borderRadius: 2,
    // borderWidth: 1,
    marginTop:1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-around',
  },
  project_item_title:{
    fontFamily: 'OpenSans-SemiBold',
    fontSize:14,
    color:Colors.textBlackColor1
  },
  entry_item_title:{
    fontSize: Layout.font.h3_size,
    width:LW*0.2,
    justifyContent:'center'
  },

  project_item_total_title:{
    fontSize: Layout.font.h3_size,
    width:'100%',
    justifyContent:'center',
    alignItems: 'center',
  },

  project_item_delete_title:{
    justifyContent:'center',
    fontSize: Layout.font.h3_size,
    width:LW*0.1,
  },


  project_subTitle:{
    padding:5,
    fontSize: Layout.font.normal_size,
    fontWeight:'bold',
    borderWidth:2,
    borderRadius:4,
    borderColor:Colors.textBlackColor,
  },
  emphasize:{
    fontWeight:'bold',
  },
  project_total_cost:{
    textAlign:'center',
    borderRadius:3,
    borderWidth:1,
    marginHorizontal:8,
    borderColor:Colors.bkBlackColor,
    fontSize: Layout.font.h2_size,
    minWidth:'50%',
  },
  project_entries_container:{
    height:LH *0.5,
  },
  add_button: {
    fontSize: Layout.font.normal_size,
  },
  add_sub_text: {
    fontSize: Layout.font.btn_size,
  },
  npk_sub_container:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'center',

  },
  npk_container:{
    width:'70%',
    flexDirection:'column',
    justifyContent:'center',
  },
  npk_text:{
    width:'34%',
    borderWidth:1,
    textAlign:'center',
    borderColor: Colors.textBlackColor,
    fontWeight:'bold',
    fontSize:Layout.font.h3_size,
  },
  npk_text_normal:{
    width:'33.35%',
    borderWidth:1,
    textAlign:'center',
    borderColor: Colors.textBlackColor,
    fontSize:Layout.font.medium_size,
  },
  npk_label_text:{
    width:'33.333%',
    textAlign:'center',
    fontSize:Layout.font.medium_size,
  },

  new_entry_btn:{
    justifyContent:'center'
  },
  entry_list_btn_container:{
    flexDirection:'row',
    justifyContent:'space-around',
  },
  entry_item_container:{
    width:'95%',
    marginTop:1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-around',
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.borderDarkGreyColor,
    // marginTop:LH/50,
  },

  entries_container:{
    maxHeight: LH*0.4,
    width: '100%',
    marginTop:  LH/60,
  },
  feedback_container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 40,
  },
  feedback_sub_container: {
    flexDirection: 'row',
  },
  feedback_input_container: {
    flex: 1,
  },
  feedbackContent_container: {
    borderColor: Colors.lightGrayColor,
    borderWidth: 2,
    borderRadius: 5,
  },
  regular_text: {
    marginHorizontal: 5,
    fontSize: Layout.font.h2_size,
    fontWeight: 'bold',
  },
  send_email_container: {
    width: '100%',
    position: 'absolute',
    bottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  send_email_text: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.lightGrayColor,
    paddingHorizontal: 15,
    fontSize: Layout.font.h2_size,
  },
  project_list_item_container:{
    paddingHorizontal:10,
    flexDirection:'column',
    width:'100%',
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom:15,
  },
  project_total_container:{
    paddingTop:6,
    flexDirection:'column',
    width:'100%',
    justifyContent:'center',
    alignItems: 'center',
  },

  app_note_content_container: {
    borderRadius: 8,
    borderWidth:1,
    borderColor:Colors.borderGreyColor,
    marginVertical:10,
    minHeight:50,
  },

};
