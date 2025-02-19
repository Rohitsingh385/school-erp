import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCertificate } from '../../../redux/actions/certificateActions';
import * as api from '../../../redux/api/index'; // Ensure this exists

const CreateCertificate = () => {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    studentId: '',
    certificateType: '',
    issuedBy: '',
    remarks: '',
  });

  // Fetch students on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await api.getAllCertificates(); // Ensure this API call exists
        console.log('Fetched Students:', data); // Debug API response
        setStudents(data?.response || []); // Prevents errors if response is undefined
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to fetch students');
      }
    };
    fetchStudents();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addCertificate(formData));
      setFormData({
        studentId: '',
        certificateType: '',
        issuedBy: '',
        remarks: '',
      });
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to create certificate');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Create Certificate</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        
        {/* Student Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentId">
            Student ID
          </label>
          <select
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student.studentId} value={student.studentId}>
                {student.name} - {student.studentId}
              </option>
            ))}
          </select>
        </div>

        {/* Certificate Type */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="certificateType">
            Certificate Type
          </label>
          <select
            name="certificateType"
            value={formData.certificateType}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Certificate Type</option>
            <option value="Transfer Certificate">Transfer Certificate</option>
            <option value="Character Certificate">Character Certificate</option>
            <option value="Course Completion">Course Completion</option>
          </select>
        </div>

        {/* Issued By */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="issuedBy">
            Issued By
          </label>
          <input
            type="text"
            name="issuedBy"
            value={formData.issuedBy}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Issued By"
          />
        </div>

        {/* Remarks */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="remarks">
            Remarks
          </label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Remarks"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Create Certificate
        </button>

      </form>
    </div>
  );
};

export default CreateCertificate;
