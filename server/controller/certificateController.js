import Certificate from '../models/certificate.js';
import Student from '../models/student.js';

// Create a new certificate
export const createCertificate = async (req, res) => {
  try {
    const { studentId, certificateType, issuedBy, remarks } = req.body;

    // Create the certificate
    const newCertificate = new Certificate({ studentId, certificateType, issuedBy, remarks });
    await newCertificate.save();

    // If the certificate is a Transfer Certificate, block the student
    if (certificateType === 'Transfer Certificate') {
      await Student.findByIdAndUpdate(studentId, { isActive: false });
    }

    res.status(201).json({ success: true, message: 'Certificate created successfully', response: newCertificate });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating certificate', error });
  }
};

// Get all certificates
export const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().populate('studentId', 'name'); // Populate student name
    res.status(200).json({ success: true, response: certificates });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching certificates', error });
  }
};

// Get a specific certificate by ID
export const getCertificateById = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await Certificate.findById(id).populate('studentId', 'name');
    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }
    res.status(200).json({ success: true, response: certificate });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching certificate', error });
  }
};

// Update a certificate
export const updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCertificate = await Certificate.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCertificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }
    res.status(200).json({ success: true, message: 'Certificate updated successfully', response: updatedCertificate });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating certificate', error });
  }
};

// Reprint a certificate
export const reprintCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await Certificate.findById(id);
    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    // Logic for reprinting (e.g., changing status)
    certificate.status = 'Reprint';
    await certificate.save();

    res.status(200).json({ success: true, message: 'Certificate reprinted successfully', response: certificate });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error reprinting certificate', error });
  }
};

// Delete a certificate (or mark as cancelled)
export const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await Certificate.findByIdAndDelete(id); // Or mark as cancelled
    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }
    res.status(200).json({ success: true, message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting certificate', error });
  }
};