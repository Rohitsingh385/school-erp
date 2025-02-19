// Certificate.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateCertificate from './CreateCertificate';
import UpdateCertificate from './UpdateCertificate';
import DeleteCertificate from './DeleteCertificate';
import ViewCertificates from './ViewCertificates';

const Certificate = () => {
  return (
    <Routes>
      <Route path="createcertificate" element={<CreateCertificate />} />
      <Route path="updatecertificate" element={<UpdateCertificate />} />
      <Route path="deletecertificate" element={<DeleteCertificate />} />
      <Route path="" element={<ViewCertificates />} />
    </Routes>
  );
};

export default Certificate;