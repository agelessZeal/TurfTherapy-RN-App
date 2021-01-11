import { Dimensions ,Platform,StatusBar} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const statusHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const headerHeight = 50;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  statusHeight: statusHeight,
  headerHeight: headerHeight,
  menuHeight: 80,
  font: {
    small_size: 14,
    normal_size: 16,
    medium_size: 18,
    h1_size: 30,
    h2_size: 24,
    h3_size: 20,
    h4_size: 18,
    h5_size: 16,
    h6_size: 14,
    btn_size: 20,
  }
};
