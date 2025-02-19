import express from 'express';
import {
  createCertificate,
  getCertificates,
  getCertificateById,
  updateCertificate,
  reprintCertificate,
  deleteCertificate,
} from '../controller/certificateController.js';

const router = express.Router();

router.post('/', createCertificate);

router.get('/', getCertificates);

router.get('/:id', getCertificateById);

router.put('/:id', updateCertificate);

router.post('/reprint/:id', reprintCertificate);

router.delete('/:id', deleteCertificate);

export default router;