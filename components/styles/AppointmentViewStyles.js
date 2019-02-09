import { StyleSheet, Platform } from "react-native";
import { Fonts, Colors } from "../../themes/";

export default StyleSheet.create({
  item: {
    backgroundColor: Colors.snow,
    flex: 1,
    borderRadius: 5,
    padding: 20
  },
  row: {
    flexDirection: "row",
    flex: 1
  },
  content: {
    flex: 0.7,
    fontFamily:
      Platform.OS == "ios"
        ? Fonts.typeIOS.semiBold
        : Fonts.typeAndroid.condensed,
    fontWeight: "400"
  },
  label: {
    fontFamily:
      Platform.OS == "ios"
        ? Fonts.typeIOS.condensed
        : Fonts.typeAndroid.condensed,
    fontSize: 14,
    fontWeight: "600",
    flex: 0.3
  }
});
