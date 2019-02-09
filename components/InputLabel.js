import React from "react";
import { Text, Platform } from "react-native";
import PropTypes from "prop-types";
import { Fonts, Colors } from './../themes/';

export default (InputLabel = ({ label }) => {
  return (
    <Text
      style={{
        fontFamily: Platform.OS == 'ios' ? Fonts.typeIOS.condensed :  Fonts.typeAndroid.condensed,
        color: Colors.lightBlue,
        width: 90,
        fontSize: 14,
        fontWeight: "500",
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10
      }}
    >
      {label}
    </Text>
  );
});

InputLabel.propTypes = {
  label: PropTypes.string.isRequired
};