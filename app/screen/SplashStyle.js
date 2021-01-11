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
    position: 'absolute',
    left: 0,
    width: CW,
    height: CH,
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo_image: {
    width: '45%',
    aspectRatio: 1 / 2,
    resizeMode: 'contain',
  },
};
