
import {
  Dimensions,
} from 'react-native';

const deviceW = Dimensions.get('window').width;
const basePx = 375;
// Dynamically Font Size
export const fontSizeDevice = (px) => {
  return px *  deviceW / basePx
}
