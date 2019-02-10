import * as actionTypes from "./actionTypes";

export const addAppointment = appointment =>{
    console.log(`appointment create: ${appointment}`);
    //console.warn(appointment);

    return ({
        type: 'ADD_APPOINTMENT',
        appointment
      })
} 
export const deleteAppointment = (id, date) =>{
    console.log(`appointment delete: ${id} ${date}`);

    return ({
        type: 'DELETE_APPOINTMENT',
        date: date,
        id: id
      })
} 

export const updateAppointment = appointment =>{
    console.warn(`appointment update: ${appointment}`);

    return ({
        type: 'UPDATE_APPOINTMENT',
        appointment
      })
} 