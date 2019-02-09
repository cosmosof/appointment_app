import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  DatePickerIOS,
  DatePickerAndroid,
  Platform
} from "react-native";
import { Icon } from "expo";
import { connect } from "react-redux";
import RoundedButton from "../components/RoundedButton";
import InputLabel from "../components/InputLabel";
import ErrorText from "../components/ErrorText";
import * as actions from "../actions";
import moment from "moment";
import DatePicker from "react-native-datepicker";
import { Colors } from "./../themes/";

import styles from "./styles/AddAppointmentStyles";

const timeFormat = "HH:MM:SS";

class UpdateAppointmentScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Update",
      headerLeft: (
        <Icon.Ionicons
          name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
          size={26}
          style={{ marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    console.warn(params.item.id);
    this.state = {
      id: params.item.id,
      person: params.item.person,
      notes: params.item.notes,
      location: params.item.location,
      chosenStartDate: params.item.startTime,
      chosenEndDate: params.item.endTime,
      locationErr: false,
      personErr: false,
      startTimeConflict: false,
      endTimeConflict: false
    };
    this.onPressButton = this.onPressButton.bind(this);
  }
  onPressButton() {
    const {
      notes,
      chosenStartDate,
      chosenEndDate,
      location,
      person,
      startTimeConflict,
      endTimeConflict,
      id
    } = this.state;
    console.warn(id);
    switch (true) {
      case !person:
        this.setState({ personErr: true, locationErr: false });
        break;
      case !location:
        this.setState({ locationErr: true, personErr: false });
        break;
      case !startTimeConflict || !endTimeConflict:
        this.setState({ locationErr: false, personErr: false });
        this.props.updateAppointment({
          id: id,
          startTime: chosenStartDate,
          endTime: chosenEndDate,
          date: moment(chosenStartDate).format("YYYY-MM-DD"),
          notes: notes,
          location: location,
          person: person
        });
        this.props.navigation.goBack();
        break;
      default:
        break;
    }
  }

  checkTimeConflict = (e, f) => {
    const appointmentsForTheDay = this.props.appointments[
      `${moment(e).format("YYYY-MM-DD")}`
    ];

    const selected = moment(e).format(`HH:mm:ss`);

    if (appointmentsForTheDay) {
      appointmentsForTheDay.some(el => {
        const beforeTime = moment(el.startTime).format(timeFormat);
        const afterTime = moment(el.endTime).format(timeFormat);

        const isBetween = moment(selected, "hh:mm").isBetween(
          moment(beforeTime, "hh:mm"),
          moment(afterTime, "hh:mm")
        );
        switch (f) {
          case "startTime":
            isBetween
              ? this.setState({ startTimeConflict: true })
              : this.setState({ chosenStartDate: e, startTimeConflict: false });
            break;
          case "endTime":
            isBetween
              ? this.setState({ endTimeConflict: true })
              : this.setState({ chosenEndDate: e, endTimeConflict: false });
            break;
          default:
            break;
        }
        return isBetween === true;
      });
    }
  };
  render() {
    const {
      personErr,
      locationErr,
      startTimeConflict,
      endTimeConflict,
      person,
      location,
      notes,
      chosenStartDate,
      chosenEndDate
    } = this.state;

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.inputRow}>
          <InputLabel label="Person" />
          <View style={styles.inputCol}>
            <TextInput
              value={person}
              autoCorrect={false}
              style={styles.input}
              placeholder="enter a name"
              onChangeText={person => this.setState({ person })}
            />
            {personErr && <ErrorText text="enter a person name" />}
          </View>
        </View>
        <View style={styles.inputRow}>
          <InputLabel label="Location" />
          <View style={styles.inputCol}>
            <TextInput
              value={location}
              autoCorrect={false}
              style={styles.input}
              placeholder="enter a location"
              onChangeText={location => this.setState({ location })}
            />
            {locationErr && <ErrorText text="enter a location" />}
          </View>
        </View>
        <View style={styles.inputRow}>
          <InputLabel label="Notes" />
          <TextInput
            value={notes}
            multiline={true}
            style={styles.textArea}
            placeholder="enter notes"
            onChangeText={notes => this.setState({ notes })}
          />
        </View>

        <View style={styles.inputRow}>
          <InputLabel label="Start Time" />
          <DatePicker
            minDate={moment().toISOString()}
            showIcon={false}
            style={{ width: 220 }}
            date={chosenStartDate}
            mode="datetime"
            placeholder="select date"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                borderRadius: 5,
                borderColor: "transparent",
                backgroundColor: "white"
              },
              dateText: {
                color: Colors.charcoal
              }
            }}
            onDateChange={date => this.checkTimeConflict(date, "startTime")}
          />
        </View>
        <Text style={styles.error}>
          {startTimeConflict && "start time conflict"}
        </Text>

        <View style={styles.inputRow}>
          <InputLabel label="End Time" />
          <DatePicker
            minDate={moment().toISOString()}
            showIcon={false}
            style={{ width: 220 }}
            date={chosenEndDate}
            mode="datetime"
            placeholder="select date"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                borderRadius: 5,
                borderColor: "transparent",
                backgroundColor: "white"
              },
              dateText: {
                color: Colors.charcoal
              }
            }}
            onDateChange={date => this.checkTimeConflict(date, "endTime")}
          />
        </View>
        <Text style={styles.error}>
          {endTimeConflict && "end time conflict"}
        </Text>

        <RoundedButton
          onPress={this.onPressButton}
          title="update"
          buttonStyle={styles.button}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    appointments: state.appointments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateAppointment: payload => dispatch(actions.updateAppointment(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateAppointmentScreen);
