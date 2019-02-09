import { combineReducers } from 'redux';
import appointmentsReducer from './appointments.js';


// Combine all the reducers
const rootReducer = combineReducers({
    appointments: appointmentsReducer
});

export default rootReducer;
