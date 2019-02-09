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

class AddAppointmentScreen extends React.Component {
  static navigationOptions = {
    title: "Add New Appointment"
  };
  constructor(props) {
    super(props);
    this.state = {
      person: "",
      notes: "",
      location: "",
      chosenStartDate: new Date(),
      chosenEndDate: new Date(),
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
      endTimeConflict
    } = this.state;
    console.log(notes, chosenStartDate, chosenEndDate, location, person);

    switch (true) {
      case !person:
        this.setState({ personErr: true, locationErr: false });
        break;
      case !location:
        this.setState({ locationErr: true, personErr: false });
        break;
      case !startTimeConflict || !endTimeConflict:
        this.setState({ locationErr: false, personErr: false });
        this.props.addAppointment({
          startTime: chosenStartDate,
          endTime: chosenEndDate,
          date: moment(chosenStartDate).format("YYYY-MM-DD"),
          notes: notes,
          location: location,
          person: person
        });
        this.props.navigation.navigate("Calendar");
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
      endTimeConflict
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
            date={this.state.chosenStartDate}
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
            date={this.state.chosenEndDate}
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
          title="submit"
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
    addAppointment: payload => dispatch(actions.addAppointment(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAppointmentScreen);
