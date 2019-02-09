import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import styles from "./styles/AppointmentViewStyles";

export default (AppointmentView = props => {
  const { endTime, startTime, notes, location, person } = props.item;
  const { item, row, label, content } = styles;

  return (
    <View style={item}>
      <View style={row}>
        <Text style={label}>Name</Text>
        <Text style={content}>{person}</Text>
      </View>
      <View style={row}>
        <Text style={label}>Location</Text>
        <Text style={content}>{location}</Text>
      </View>
      <View style={row}>
        <Text style={label}>Time</Text>
        <Text style={content}>{`${moment(startTime).format("HH:mm")} - ${moment(
          endTime
        ).format("HH:mm")}`}</Text>
      </View>
      {notes && (
        <View style={row}>
          <Text style={label}>Notes</Text>
          <Text style={content}>{notes}</Text>
        </View>
      )}
    </View>
  );
});

AppointmentView.propTypes = {
  item: PropTypes.object.isRequired
};
