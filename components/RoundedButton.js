import React from "react";
import PropTypes from "prop-types";
import {  TouchableOpacity, Text } from "react-native";
import styles from "./styles/RoundedButtonStyles";

export default (RoundedButton = ({
  onPress,
  title,
  buttonStyle,
  buttonTextStyles
}) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, buttonTextStyles]}>{title}</Text>
    </TouchableOpacity>
  );
});

RoundedButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  buttonTextStyles: PropTypes.object,
  styles: PropTypes.object
};
