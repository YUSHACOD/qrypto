import express from 'express';
import { uploadFields } from '../middlewares/upload.js';
import { handleKeygen } from '../controllers/keygenController.js';
import { handleSign } from '../controllers/signController.js';
import { handleVerify } from '../controllers/verifyController.js';
import { handleEncapsulate } from '../controllers/encapsulateController.js';
import { handleDecapsulate } from '../controllers/decapsulateController.js';

const router = express.Router();

router.post('/submit', uploadFields, (req, res) => {
	const data = req.body;
	console.log('Received data:', data);
	console.log('Uploaded file:', req.files);

	res.json({ message: 'Data received successfully', receivedData: data, file: req.file });
});

router.post('/keygen', uploadFields, handleKeygen);
router.post('/sign', uploadFields, handleSign);
router.post('/verify', uploadFields, handleVerify);
router.post('/encapsulate', uploadFields, handleEncapsulate);
router.post('/decapsulate', uploadFields, handleDecapsulate);

export default router;
