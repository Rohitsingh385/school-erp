// client/src/components/admin/certificate/DeleteCertificate.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCertificate } from '../../../redux/actions/certificateActions'; // Adjust the import path
import { useNavigate } from 'react-router-dom';

const DeleteCertificate = ({ certificateId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteCertificate(certificateId)); // Dispatch the action to delete the certificate
    navigate('/certificates'); // Redirect to the certificates list after deletion
  };

  const handleCancel = () => {
    navigate('/certificates'); // Redirect to the certificates list if canceled
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Delete Certificate</h1>
      <p className="text-gray-700 mb-4">Are you sure you want to delete this certificate?</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Yes, Delete
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteCertificate;