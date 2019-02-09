import { StyleSheet, Platform } from 'react-native';
import { Fonts, Colors } from '../../themes/';

export default StyleSheet.create({
text: {
    fontFamily: Platform.OS == 'ios' ? Fonts.typeIOS.condensed :  Fonts.typeAndroid.condensed,
        color: Colors.pastelRed,
        fontSize: 12,
        fontWeight: "400",
        paddingTop: 5
      }
});
