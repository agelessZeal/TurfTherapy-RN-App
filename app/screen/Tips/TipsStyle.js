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
    backgroundColor:Colors.lightGrayBkColor
  },

  project_add_button_container: {
    padding: 5,
    borderBottomWidth:2,
    borderBottomColor:Colors.textBlackColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tips_title_container: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:8,
    borderColor:'black',
    borderWidth:2,
  },

  project_subTitle:{
    fontSize: Layout.font.h2_size,
  },

  add_button: {
    fontSize: Layout.font.h2_size,
  },
  add_sub_text: {
    fontSize: Layout.font.btn_size,
  },

  tips_container: {
    paddingVertical: 5,
    paddingHorizontal: 18,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  scroll_container:{
    width: '100%',
    marginTop: LH/80,
    flex: 1,
  },
  scroll_content_container:{
    justifyContent:'center',
    alignItems:'center',
  },

  column_center_container:{
    backgroundColor: Colors.whiteColor,
    borderRadius:15,
    padding:15,
    flex:1,
    marginTop:15,
  },


  tips_item:{
    width:LW-30-36,
    aspectRatio:1.8,
    overflow:'hidden',
    borderRadius:8,
    borderColor:Colors.borderGreyColor,
  },
  tips_item_text:{
    marginTop: 8,
    fontSize:14,
    fontFamily:'OpenSans-SemiBold',
    textAlign:'left',
  },
  tip_image:{
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
};
