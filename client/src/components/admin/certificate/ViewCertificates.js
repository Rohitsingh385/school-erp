import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCertificates } from '../../../redux/actions/certificateActions';

const ViewCertificates = () => {
  const dispatch = useDispatch();
  const certificates = useSelector((state) => state.certificates.certificates || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCertificates());
      } catch (err) {
        setError('Failed to fetch certificates.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">View Certificates</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <ul className="bg-white shadow-md rounded-lg">
        {certificates.length > 0 ? (
          certificates.map((cert) => (
            <li key={cert._id} className="border-b last:border-b-0 p-4 hover:bg-gray-100 transition">
              <div className="flex justify-between">
                <span className="font-semibold">{cert.certificateType}</span>
                <span className="text-gray-600">{cert.issuedBy}</span>
              </div>
              <div className="text-sm text-gray-500">{new Date(cert.issueDate).toLocaleDateString()}</div>
            </li>
          ))
        ) : (
          <p className="text-center p-4">No certificates found.</p>
        )}
      </ul>
    </div>
  );
};

export default ViewCertificates;