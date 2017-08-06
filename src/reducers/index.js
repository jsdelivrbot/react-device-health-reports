import { combineReducers } from 'redux';
import DeviceDataReducer from './reducer_device_data';

const rootReducer = combineReducers({
    deviceData: DeviceDataReducer
});

export default rootReducer;
