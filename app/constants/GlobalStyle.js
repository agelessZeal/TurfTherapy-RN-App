import {Platform, Dimensions} from 'react-native';

// constant
import Colors from './Colors';
import Layout from './Layout';

const LW = Layout.window.width;
const LH = Layout.window.height;
const CW = LW;
const CH =
  Platform.OS === 'ios'
    ? LH - (Layout.statusHeight + Layout.headerHeight)
    : LH - Layout.headerHeight;

import {responsiveFontSize} from 'react-native-responsive-dimensions';

export default {

  fontforSubtitle: {
    fontFamily:'Muli-Bold',
    fontSize:24,
  },
  fontProjectSubtitle: {
    marginTop:5,
    marginLeft:10,
    fontSize: 13,
    fontFamily:'OpenSans',
    color:Colors.textBlackColor1,
  },

  fontTitleHarabara: {
    fontSize: responsiveFontSize(4.5),
  },
  fontTitleHarabaraGranular: {
    fontWeight:'bold',
    fontSize: responsiveFontSize(3.5),
  },
  fontTitleHarabaraSmall: {
    fontSize: responsiveFontSize(4.0),
  },
  loading: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: LW,
    height: LH,
  },
  mainContainer:{
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width: LW,
    height: LH,
    backgroundColor:Colors.lightGrayBkColor
  },
  project_item_icon_container:{
    marginHorizontal:15,
  },

  preset_list_item_container:{
    marginTop:12,
    backgroundColor:Colors.whiteColor,
    borderRadius:15,
    // borderBottomWidth: 0,
    shadowColor: "rgba(250,250,250,0.8)",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 3,

  },
  preset_list_item_text:{
    marginVertical:6,
    fontSize:14,
    fontFamily:'OpenSans-SemiBold',
    color:Colors.textBlackColor1,
  },
  preset_list_item_sub_text:{
    fontSize:13,
    fontFamily:'OpenSans',
    marginLeft:15,
    color:Colors.textBlackColor1,c
  },
  containerborder: {
    padding:0
  },

  project_add_button_container: {
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  project_sub_title_text:{
    fontFamily:'Muli-SemiBold',
    fontSize:18,
  },
  add_new_project_text:{
    fontWeight:'normal',
    fontSize:15,
    color:Colors.textGreenColor
  },

  saveJournalContainer:{
    width: '100%',
    minHeight: LH*0.73 - 30,
    flexDirection:'column',
    justifyContent:'flex-start',
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    minHeight: LH*0.73 - 30,
    flexDirection:'column',
    justifyContent:'space-around',
    paddingHorizontal: 20,
  },
  add_entry_header_content:{
    paddingHorizontal:20,
    width: '100%',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  add_entry_content:{
    padding:15,
    minHeight:LH*0.6,
    width: '100%',
    flexDirection:'column',
    justifyContent:'space-around',
  },
  add_preset_container:{
    width: '100%',
    minHeight: LH*0.73 - 30,
    flexDirection:'column',
    justifyContent:'space-around',
    paddingHorizontal: 20,

  },
  product_analysis_container:{
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
    paddingTop: LH>800? LH*0.02:0,
    borderRadius: 15,
    backgroundColor: Colors.whiteColor,
    height: LH * 0.13,
  },

  add_preset_input_container:{
    width: '100%',
  },
  input_share_items: {
    // width: (LW - 60 - 60) / 3,
    width:110 > (LW - 60 - 60) / 3 ? (LW - 60 - 60) / 3 :110,
  },
  input_share_items1: {
    // width: (LW - 60 ) / 3,
    width:125 > (LW - 60 ) / 3 ? (LW - 60 ) / 3 : 125,
  },
  picker_width: {
    // minWidth: (LW - 60) / 3,
    width:110 > (LW - 120)/3 ? (LW-120)/3:110,
    // width: (LW) / 3 - 40,
  },
  input_add_preset: {
    // width: (LW - 64) / 3,
    width:130 > (LW - 64) / 3 ? (LW - 64) / 3 :130,
  },
  text_input_box_container:{
    padding:0,
    textAlignVertical: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: Colors.textGreenColor,
    borderWidth: 1,
    borderRadius: 8,
    color: Colors.textBlackColor,
    fontWeight: 'normal',
    fontSize: 16,
    fontFamily: 'OpenSans',
    textAlign: 'center',
  },
  text_label_input: {
    color: Colors.textBlackColor1,
    textAlign: 'center',
    fontWeight:'normal',
    fontSize: Layout.font.h6_size,
    marginBottom: 10,
    marginTop: 3,
    fontFamily:'OpenSans-SemiBold',
  },
  text_label_left_input: {
    color: Colors.textBlackColor1,
    textAlign: 'left',
    fontWeight:'normal',
    fontSize: Layout.font.h6_size,
    marginBottom: 10,
    marginTop: 3,
    fontFamily:'OpenSans-SemiBold',
  },
  text_label_output: {
    color: Colors.textBlackColor1,
    textAlign: 'center',
    fontSize: 14,
    fontFamily:'OpenSans',
    marginTop: 3,
  },
  text_label_input_for_less_than: {
    color: Colors.textBlackColor1,
    textAlign: 'center',
    marginBottom: 0,
    marginTop: 7,
    width: '100%',
    fontSize: 14,
    fontFamily:'OpenSans',
    // fontSize: responsiveFontSize(2),
  },
  text_less_than:{
    color: Colors.bkBlackColor20,
    width: '100%',
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 10,
    fontSize: 16,
  },
  text_input: {
    textAlignVertical: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: Colors.bkGreen,
    borderWidth: 1,
    borderRadius: 5,
    color: Colors.textBlackColor,
    fontWeight: 'normal',
    fontSize: Layout.font.medium_size,
    textAlign: 'center',
  },
  text_input_gray_border: {
    margin: 0,
    textAlignVertical: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: Colors.borderGreyColor,
    borderWidth: 1,
    borderRadius: 5,
    color: Colors.textBlackColor,
    fontWeight: 'normal',
    fontSize: Layout.font.medium_size,
    textAlign: 'center',
  },
  picker_style:{
    alignSelf: 'stretch',
    paddingHorizontal: 0,
    paddingVertical: 0,
    margin: 0,
    borderColor: Colors.borderBlueColor,
    borderWidth: 1,
    borderRadius: 5,
  },
  rn_picker_container: {
    paddingLeft:6,
    paddingVertical:0,
    textAlignVertical: 'center',
    alignSelf: 'center',
    alignItems: 'flex-start',
    borderColor: Colors.textGreenColor,
    borderWidth: 1,
    borderRadius: 8,
    width:'100%',
    color: Colors.textBlackColor,
    fontWeight: 'normal',
    fontSize: Layout.font.medium_size,
    textAlign: 'center',
  },
  rn_type_picker_container: {
    paddingVertical:0,
    marginLeft:5,
  },
  refresh_btn_container:{
    width:40,
    aspectRatio:1,
  },
  text_center: {
    textAlign: 'center',
  },
  text_medium: {
    fontSize: Layout.font.medium_size,
    fontWeight: 'normal',
  },
  border_topline: {
    marginTop: 10,
    marginVertical: 5,
    borderTopWidth: 0,
    borderTopColor: Colors.mainGreenColor,
  },
  output_border: {
    width:'25%',
    // width:130,
    marginBottom: 5,
    paddingHorizontal: 2,
  },
  project_sum_container:{
    marginTop: 8,
    borderRadius: 15,
    backgroundColor:Colors.whiteColor,
    paddingTop:8,
    padding:5,
  },
  project_sum_row_container:{
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal:10,
    marginBottom:13,
  },
  project_sum_cost_container:{
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 5,
    paddingHorizontal:10,
  },
  output_bigcontainer: {
    marginTop: 5,
    borderRadius: 5,
  },
  text_output: {
    color: Colors.textBlueColor,
  },
  title_text: {
    width: '100%',
    color: Colors.bkBlackColor,
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  title_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: LH/40,
    height: '10%',
    alignItems: 'center',
    borderBottomColor: Colors.mainGreenColor,
  },
  title_logo_container:{
    width: 80,
    aspectRatio:1,
  },
  output_big: {
    width: '100%',
    color: Colors.bkBlackColor,
    fontWeight: 'bold',
    fontSize: Layout.font.h2_size,
  },
  output_normal: {
    width: '100%',
    color: Colors.textBlackColor,
    fontWeight: 'normal',
    fontFamily:'OpenSans',
    fontSize: Layout.font.h5_size,
    borderColor: Colors.lightGrayColor,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical:7,
    textAlign: 'center',
  },
  text_output_subtitle: {
    textAlign: 'left',
    color: Colors.bkBlackColor20,
    fontWeight: 'normal',
    fontSize: Layout.font.h4_size,
    fontFamily:'Muli-SemiBold',
    marginBottom: 2,
    marginTop: 5,
  },

  shadowStyle: {
    borderWidth: 1,
    borderColor: '#ddd',
    // borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 1,
  },
  radius_btn_shadow: {
    shadowColor: Colors.bkBlackColor,
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: LH*0.07,
    borderRadius: LH*0.07,
    elevation: 0.1,
  },
  radius_btn_item:{
    width: '25%',
    aspectRatio: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main_header_logo_home:{
    marginLeft:10,
    marginVertical:10,
    color: Colors.textBlackColor,
  },
  view_type_title:{
    marginLeft:20,
    marginTop:10,
    color: Colors.textBlackColor,
    fontFamily: 'Muli-Bold',
    fontSize: 24,
  },
  fit_image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  action_bar: {
    height:'100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  radius_action_bar: {
    width: '100%',
    height:LH*0.15,
    paddingHorizontal:20,
    marginTop:LH/50,
  },
  gradient_btn:{
    paddingHorizontal:40,
    justifyContent:'center',
    alignItems:'center',
    flex:1,
    paddingVertical:10,
    borderRadius:LH*0.05,
  },
  gray_bk:{
    backgroundColor: Colors.lightGrayColor
  },
  gradient_btn_text:{
    color:Colors.whiteColor,
    fontFamily:'OpenSans-SemiBold',
    fontSize:14,

  },
  action_item: {
    borderRadius: 30,
    paddingHorizontal: 10,
    width: '25%',
    aspectRatio: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  save_application_btn: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.bkGreen,
    paddingHorizontal: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
  },
  save_application_btn_text:{
    fontSize:Layout.font.btn_size,
    fontWeight: 'bold',
  },
  action_item_text: {
    fontWeight:'normal',
    fontSize:Layout.font.h6_size,
    fontFamily:'OpenSans-SemiBold',
  },
  analysis_container: {
    marginTop: 5,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  analysis_container_text: {
    fontSize: Layout.font.h4_size,
    fontFamily:'Muli-SemiBold',
  },
  infobtn_container: {
    marginLeft: 10,
    height: 30,
    aspectRatio: 1,
    justifyContent:'flex-end',
    alignItems:'center',
  },
  app_data_total_container: {
    marginTop:10,
    backgroundColor: Colors.whiteColor,
    flex:1,
    borderRadius:15,
    flexDirection:'column',
    justifyContent:'space-around'
  },

  app_data_input_container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  preset_input_container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal:10,
  },
  project_name_input_container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  row_between_container:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal:10,
  },
  row_center_container:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: LH /32,
  },

  row_center_align:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  app_data_text: {
    marginLeft:6,
    flex: 1,
    fontSize: Layout.font.h6_size,
    fontWeight: 'normal',
    fontFamily:'OpenSans',
    color:Colors.textBlackColor1,
  },
  app_data_text1: {
    flex: 1,
    fontSize: 13,
    fontWeight: 'normal',
    fontFamily:'OpenSans',
    color:Colors.textGreyColor,
    marginLeft:6,
  },
  output_save_container: {
    marginTop: 10,
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  add_preset_action_container: {
    alignItems: 'center',
    width: '100%',
    height:LH*0.15,
    paddingHorizontal:10,
    marginTop:LH/50,

  },
  bottom_divide_line:{
    marginTop:15,
    marginHorizontal:15,
    marginBottom:5,
    height:1,
    backgroundColor: Colors.divideLineBkGray,
  },
  app_rate_container: {
    marginTop: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  entry_item_text_container: {
    marginTop: 15,
    width: '48%',
    flexDirection: 'column',
    justifyContent:'flex-start',
    alignItems: 'center',
  },
  entry_item_text: {
    paddingVertical:8,
    width: '80%',
    color: Colors.textBlackColor1,
    fontSize: 16,
    fontFamily:'OpenSans',
    borderColor: Colors.lightGrayColor,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
  },
  calc_result_text_container:{
    minWidth: '25%',
    // width:120,
    borderColor: Colors.lightGrayColor,
    borderWidth: 1,
    borderRadius: 5,
    marginRight:15,
  },
  app_rate_output: {
    paddingVertical:7,
    color: Colors.bkBlackColor,
    fontWeight: 'normal',
    fontSize: Layout.font.h5_size,
    textAlign: 'center',
  },
  overlay_container:{
    borderRadius: 15,
    borderColor: Colors.borderBlueColor,
    borderWidth: 0,
    paddingHorizontal:10,
  },
  overlay_full_screen_container:{
    borderWidth: 0,
    padding: 0,
  },
  overlay_text_input_container:{
    paddingHorizontal:5,
    paddingVertical:10,
  },
  overlay_text_input_title:{
    fontFamily:'Muli-Bold',
    fontSize:18,
    color:Colors.textBlackColor,
  },

  overlay_text_input_content:{
    borderRadius: 8,
    borderWidth:1,
    borderColor:Colors.borderGreyColor,
    marginVertical:10,
  },
  overlay_text_input_save_box:{
    marginVertical:10,
    height:45,
    paddingHorizontal:LW*0.1,
  },

  overlay_close_btn:{
    position:'absolute',
    top:2,
    right:0,
    width:40,
    padding:5,
    aspectRatio:1,
  },
  create_new_container:{
    backgroundColor:Colors.whiteColor,
    borderRadius:15,
    marginVertical:10,
    padding:15,
  },
  headerLeftIcon: {
    width:'25%',
  },
  headerLeftBack: {
    borderColor: Colors.lightGrayColor,
    borderWidth: 1,
    borderRadius: 10,
    width: 40,
    aspectRatio:1,
    position: 'absolute',
    left:25,
    justifyContent:'center',
    alignItems:'center'
  },

  headerRightLogo: {
    width: (LW - 60 - 60) / 3,
    height:'100%',
    position: 'absolute',
    justifyContent:'center',
    alignItems:'flex-end',
    right:15,
  },
  info_title_text: {
    fontSize: Layout.font.h4_size,
    fontWeight: 'normal',
    fontFamily:'Muli-SemiBold',
    textAlign:'left',
    color:Colors.textBlackColor,
    marginTop:10,
  },


  info_content_emphasize_text: {
    color:Colors.textBlackColor,
    fontSize:13,
    fontFamily:'Muli-Bold',
    marginTop:LH*0.03,
  },

  info_content_text: {
    marginTop:LH*0.01,
    fontSize: 13,
    fontFamily:'OpenSans',
    color:Colors.textBlackColor1
  },
  info_last_content_text: {
    marginVertical:LH*0.03,
    fontSize: 13,
    color:Colors.textBlackColor1
  },
  info_btn_container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info_ok_btn: {
    paddingHorizontal: 15,
    borderColor: Colors.lightGrayColor,
    borderWidth: 1,
    borderRadius: 5,
  },
  fit_parent: {
    width: '100%',
    marginBottom:15,
  },
  border_blue: {
    borderColor: Colors.bkGreen,
  },
  border_green: {
    borderColor: Colors.bkGreen,
  },

  journal_select_container:{
    width:'100%',
    marginVertical:15,
    flexDirection:'row',
    justifyContent:'space-around'
  },
  journal_select_btn:{
    borderWidth:1,
    borderColor:Colors.lightGrayColor,
    borderRadius:3,
    width:'40%',
    justifyContent:'center'
  },
  journal_select_btn_text:{
    fontSize:Layout.font.btn_size,
    fontWeight:'bold',
    textAlign:'center',
  }
};
