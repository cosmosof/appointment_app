import React from "react";
import { Text, Platform } from "react-native";
import PropTypes from "prop-types";
import { Fonts, Colors } from "./../themes/";
import styles from "./styles/ErrorTextStyles";

export default (ErrorText = ({ text }) => {
  return <Text style={styles.text}>{text}</Text>;
});

ErrorText.propTypes = {
  text: PropTypes.string.isRequired
};
