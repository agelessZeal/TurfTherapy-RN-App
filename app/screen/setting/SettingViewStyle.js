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

  feedback_view:{
    flex:1,
    backgroundColor:Colors.lightGrayBkColor
  },

  mainContent: {
    flex:1,
    backgroundColor: Colors.lightGrayBkColor
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
    paddingHorizontal:15,
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
  add_container: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 15,
    height: LH*0.9 -50,
  },
  add_button_container: {
    borderWidth: 2,
    borderColor: Colors.lightGrayColor,
    borderRadius: 40,
    width: '80%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preset_above_container:{
    marginTop: 8,
    borderRadius: 15,
    backgroundColor:Colors.whiteColor,
    paddingTop:8,
    padding:15,
  },
  preset_name_text:{
    fontSize:13,
    fontFamily:'Muli-SemiBold',
    color:Colors.textBlackColor
  },
  preset_inputbox_container:{
    padding:0,
    textAlignVertical: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: Colors.borderGreyColor,
    borderWidth: 1,
    borderRadius: 8,
    color: Colors.textBlackColor,
    fontWeight: 'normal',
    fontSize: 16,
    fontFamily: 'OpenSans',
    textAlign: 'center',
  },
  add_button: {
    fontSize: Layout.font.h2_size,
  },
  add_sub_text: {
    fontSize: Layout.font.btn_size,
  },
  feedback_container: {
    padding:8,
    marginHorizontal: 20,
    marginTop: 5,
    maxHeight:LH*0.8,
    backgroundColor:Colors.whiteColor,
    borderRadius:8,
  },
  feedback_sub_container: {
    flexDirection: 'row',
    color:Colors.textBlackColor,
    justifyContent:'space-between',
    alignItems:'center',
  },
  feedback_input_container: {
    flex: 1,
  },
  feedback_content_container: {
    borderRadius: 8,
    borderWidth:1,
    borderColor:Colors.borderGreyColor,
    marginVertical:10,
    minHeight:200,

  },
  regular_text: {
    width:50,
    marginHorizontal: 5,
    fontSize: 14,
    color:Colors.textBlackColor1,
    fontFamily:'OpenSans'
  },
  send_email_container: {
    justifyContent: 'center',
    alignItems: 'center',

    marginVertical:10,
    height:45,
    paddingHorizontal:LW*0.1,
  },
  send_email_text: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.lightGrayColor,
    paddingHorizontal: 15,
    fontSize: Layout.font.h2_size,
  },
};
