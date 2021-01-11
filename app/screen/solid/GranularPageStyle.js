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

  mainContent: {
    flex: 1,
    backgroundColor:Colors.lightGrayBkColor
  },

};
