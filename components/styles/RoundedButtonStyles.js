import { StyleSheet, Platform } from 'react-native';
import { Fonts, Colors } from '../../themes/';

export default StyleSheet.create({
  button: {
    height: 36,
    borderRadius: 4,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
    borderWidth: 1,
    borderColor: Colors.darkMatPurple,
    backgroundColor: Colors.medMatPurple,
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontSize: Fonts.size.medium,
    fontFamily: Platform.OS == 'ios' ? Fonts.typeIOS.condensed :  Fonts.typeAndroid.condensed
  }
});
