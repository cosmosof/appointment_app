import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Agenda } from "react-native-calendars";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "./../actions";
import Swipeout from "react-native-swipeout";
import AppointmentView from "./../components/AppointmentView";
import { Colors } from "../themes/";
import EmptyDay from "./../components/EmptyDay"

class CalendarScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      selectedAppointment: "selectedAppointment"
    };
  }

  render() {
    console.log(this.state.selectedAppointment);
    return (
      <Agenda
        renderEmptyData={() => {
          return <EmptyDay />
        }}
        items={this.props.appointments.appointments || {}}
        loadItemsForMonth={this.loadItems.bind(this)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
    );
  }

  loadItems(day) {
    this.setState({
      items: this.props.appointments.appointments
    });
  }

  renderItem(item) {
    console.log("render renderItem");
    let swipeRightBtns = [
      {
        text: "Delete",
        backgroundColor: `${Colors.pastelRed}`,
        onPress: () => {
          this._onPressDeeleteItem(item);
        }
      }
    ];
    const swipeLeftBtns = [
      {
        text: "Edit",
        backgroundColor: `${Colors.steel}`,
        onPress: () => {
          this._onPressEditItem(item);
        }
      }
    ];
    return (
      <View style={{ marginTop: 20 }}>
        <Swipeout
          left={swipeLeftBtns}
          right={swipeRightBtns}
          autoClose={true}
          backgroundColor="transparent"
        >
          <AppointmentView item={item} />
        </Swipeout>
      </View>
    );
  }

  _onPressItem(item) {
    console.log(`_onPressItem ${item}`);
    console.log(item);
    console.log(`actions: ${actions}`);
    console.log(actions);

    this.props.addAppointment({
      startTime: "a",
      endTime: "b",
      date: "2019-02-01",
      month: "d",
      description: "e",
      location: "f",
      person: "ffg"
    });
  }
  _onPressEditItem(item) {

    this.props.navigation.navigate("UpdateAppointment", { item });
    /*  this.props.updateAppointment(
      {
        id: item.id,
        startTime: 'a',
        endTime: 'b',
        date: '2019-01-31',
        month: 'd',
        description: 'e',
        location: 'f',
        person:  'updated'

      }
    )  */
  }
  _onPressDeeleteItem(item) {
    console.log("_onPressDeeleteItem");
    console.log(item);
    this.props.deleteAppointment(item.id, item.date);
  }
  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.id !== r2.id;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }
}

const styles = StyleSheet.create({
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});

const mapStateToProps = state => {
  console.log(`mapStateToProps`);
  console.log(state);
  return {
    appointments: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAppointment: payload => dispatch(actions.addAppointment(payload)),
    deleteAppointment: (id, date) =>
      dispatch(actions.deleteAppointment(id, date)),
    updateAppointment: payload => dispatch(actions.updateAppointment(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarScreen);
