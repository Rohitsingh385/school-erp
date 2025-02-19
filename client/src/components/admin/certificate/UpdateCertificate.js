// client/src/components/admin/certificate/UpdateCertificate.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCertificate } from '../../../redux/actions/certificateActions';

const UpdateCertificate = ({ match }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    studentId: '',
    certificateType: '',
    issuedBy: '',
    remarks: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCertificate(match.params.id, value));
    setValue({ studentId: '', certificateType: '', issuedBy: '', remarks: '' }); // Reset form
  };

  return (
    <div>
      <h1>Update Certificate</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student ID"
          value={value.studentId}
          onChange={(e) => setValue({ ...value, studentId: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Certificate Type"
          value={value.certificateType}
          onChange={(e) => setValue({ ...value, certificateType: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Issued By"
          value={value.issuedBy}
          onChange={(e) => setValue({ ...value, issuedBy: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Remarks"
          value={value.remarks}
          onChange={(e) => setValue({ ...value, remarks: e.target.value })}
        />
        <button type="submit">Update Certificate</button>
      </form>
    </div>
  );
};

export default UpdateCertificate;