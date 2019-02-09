import React from "react";
import { Text, View, Platform } from "react-native";
import { Icon } from "expo";

import styles from "./styles/EmptyDayStyles.js";
import { Colors } from "./../themes/";

export default class EmptyDay extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No activity, </Text>
        <Icon.Ionicons
          name={"ios-calendar"}
          size={32}
          color={Colors.steel}
        />
      </View>
    );
  }
}
