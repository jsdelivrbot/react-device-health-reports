import { UPLOAD_DATA } from '../actions';

export default function(state = [], action) {
    switch (action.type) {
        case UPLOAD_DATA:
        action.payload.forEach(data => {state.push(data);}, state);
            return state;
        default:
            return state;
    }
}
