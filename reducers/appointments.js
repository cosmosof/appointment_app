import * as actionTypes from "../actions/actionTypes";
import uniqueId from "uuid/v1";

const initialState = {};

const addAppointment = (prevState, action) => {
  const appointment = {
    id: uniqueId(),
    startTime: action.appointment.startTime,
    endTime: action.appointment.endTime,
    date: action.appointment.date,
    notes: action.appointment.notes,
    location: action.appointment.location,
    person: action.appointment.person
  };
  return {
    ...prevState,
    [action.appointment.date]: prevState[action.appointment.date]
      ? prevState[action.appointment.date].concat(appointment)
      : [appointment]
  };
};
const deleteAppointment = (prevState, action) => {
  console.log(`appointment del reducer`);
  console.log(action);

  return {
    ...prevState,
    [action.date]: [...prevState[action.date]].filter(appointment => {
      return appointment.id !== action.id;
    })
  };
}
const updateAppointment = (prevState, action) => {
  console.log(`updateAppointment reducer`);
  console.log(action);
  return {...prevState, [action.appointment.date]: prevState[action.appointment.date].map(el => {
      if(el.id!==action.appointment.id) return el
      return action.appointment
   })}
  };
const appointmentsReducer = (prevState = initialState, action) => {
    switch (action.type) {
      case actionTypes.ADD_APPOINTMENT:
        return addAppointment(prevState, action);
      case actionTypes.DELETE_APPOINTMENT:
        return deleteAppointment(prevState, action);
      case actionTypes.UPDATE_APPOINTMENT:
        return updateAppointment(prevState, action);
      default:
        return prevState;
    }
  };
  
export default appointmentsReducer