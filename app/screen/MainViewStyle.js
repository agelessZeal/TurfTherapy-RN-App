import {Dimensions, Platform, StatusBar} from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import GlobalStyle from '../constants/GlobalStyle';

const LW = Layout.window.width;
const LH = Layout.window.height;
const CW = LW;
const CH =
  Platform.OS === 'ios'
    ? LH - (Layout.statusHeight + Layout.menuHeight)
    : LH - Layout.menuHeight;

export default {
  ...GlobalStyle,

  mainContent: {
    backgroundColor:Colors.lightGrayBkColor,
    flex: 1,
    width: CW,
    height: CH,
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  main_bottom_action_container:{
    flexDirection: 'row',
    height:'80%',
    alignItems:'center',
    justifyContent: 'space-around',
    flex:1,
    width:'100%',
    marginBottom:'5%',
    paddingHorizontal: LW*0.1,
  },
  main_bottom_action_item:{
    width: '20%',
    height: '50%',
    alignItems: 'center',
    aspectRatio: 1,
  },
  mainSettingIcon: {
    // position: 'absolute',

    // right: 30,
    // bottom: '7%',
    width: '50%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerLeftIcon: {
    position: 'absolute',
    left: 15,
    top: 20,
    width: 25,
    height: 25,
  },

  headerRightIcon: {
    backgroundColor: 'red',
    width: '10%',
    aspectRatio: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    width: '100%',
    height: '70%',
    alignItems: 'center',
    marginTop: 15,
    flexDirection: 'row',
  },
  logo_image: {
    width: '95%',
    aspectRatio: 463/800,
  },
  actionContainer: {
    marginTop: 10,
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  actionItem: {
    width: '20%',
    aspectRatio: 1,
  },

  main_header_logo_container:{
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: LH/40,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  main_header_logo_image :{
    // width: (LW - 60 - 60) / 4,
    width:60,
    height:'100%',
    justifyContent:'center',
    right:5,
  },
  main_header_logo_title1:{
    color: Colors.textBlueColor,
  },
  main_header_logo_title2:{
    color: Colors.textGreenColor,
    marginLeft: 5,
  },

  main_item_left_logo:{
    paddingVertical:10,
    justifyContent: 'flex-start',
    width: '30%',
    height:'100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  shadowStyle: {
    borderRadius: 10,
    // borderBottomWidth: 0,
    shadowColor: '#30C1dd',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 0.3,
  },
  main_row:{
    justifyContent: 'flex-start',
    width: '80%',
    height:'100%',
    alignItems: 'center',
    flexDirection: 'row',
  },

  mail_item_left_bar:{
    width:LW/100,
    height:'100%',
    backgroundColor: Colors.bkGreen,
    borderBottomLeftRadius:50,
    borderTopLeftRadius:50,
  },
  main_item_logo_image:{
    marginVertical: 10,
    // width:LW*0.13,
    width:40,
    aspectRatio:1,
    marginLeft:LW/25,
  },
  item_title_container:{
    marginLeft:LW/25,
    width:LW*0.5
  },
  item_title:{
    color: Colors.titleBlack,
    fontSize: 18,
    fontFamily:'Muli-Bold',
  },
  item_subtitle:{
    color: Colors.subtitleBlack,
    fontSize: 13,
    fontFamily: 'OpenSans',
  },
  right_chevron_icon:{
    marginLeft:5,
    marginRight:3,
    height:25,
    aspectRatio:1,
  },
  right_chevron_icon_image:{
    justifyContent:'flex-start',
  },

  home_item_container:{
    marginVertical:5,
    paddingHorizontal:0,
    paddingVertical: 3,
    marginHorizontal:5,
  }
};
