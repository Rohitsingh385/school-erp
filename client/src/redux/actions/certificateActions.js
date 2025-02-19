// client/src/redux/actions/certificateActions.js
import { ADD_CERTIFICATE, UPDATE_CERTIFICATE, DELETE_CERTIFICATE, FETCH_CERTIFICATES } from '../actionTypes';
import * as api from '../api'; // Import API methods

// Action to add a certificate
// certificateActions.js
export const addCertificate = (certificateData) => async (dispatch) => {
  try {
    const { data } = await api.addCertificate(certificateData);
    if (data.success) {
      dispatch({ type: ADD_CERTIFICATE, payload: data.response });
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error adding certificate:', error);
    throw error; // Propagate error to component
  }
};

// Action to update a certificate
export const updateCertificate = (id, certificateData) => async (dispatch) => {
  try {
    const { data } = await api.updateCertificate(id, certificateData); // Call the API method
    dispatch({ type: UPDATE_CERTIFICATE, payload: data.response });
  } catch (error) {
    console.error('Error updating certificate:', error);
  }
};

// Action to delete a certificate
export const deleteCertificate = (id) => async (dispatch) => {
  try {
    await api.deleteCertificate(id); // Call the API method
    dispatch({ type: DELETE_CERTIFICATE, payload: id });
  } catch (error) {
    console.error('Error deleting certificate:', error);
  }
};

// Action to fetch all certificates
export const fetchCertificates = () => async (dispatch) => {
  try {
    const { data } = await api.getAllCertificates(); // Call the API method
    console.log("API Response:", data);
    dispatch({ type: FETCH_CERTIFICATES, payload: data.response });
  } catch (error) {
    console.error('Error fetching certificates:', error);
  }
};
