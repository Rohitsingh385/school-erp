// client/src/redux/reducers/certificateReducer.js
import { ADD_CERTIFICATE, UPDATE_CERTIFICATE, DELETE_CERTIFICATE, FETCH_CERTIFICATES } from '../actionTypes';

const initialState = {
  certificates: [],
  loading: false,
  error: null,
};

const certificateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CERTIFICATE:
      return { ...state, certificates: [...state.certificates, action.payload] };
    case UPDATE_CERTIFICATE:
      return {
        ...state, 
        certificates: state.certificates.map((cert) =>
          cert._id === action.payload._id ? action.payload : cert
        ),
      };
    case DELETE_CERTIFICATE:
      return {
        ...state,
        certificates: state.certificates.filter((cert) => cert._id !== action.payload),
      };
    case FETCH_CERTIFICATES:
      return { ...state, certificates: action.payload };
    default:
      return state;
  }
};

export default certificateReducer;