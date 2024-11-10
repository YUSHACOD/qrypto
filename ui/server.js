import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import { generateKey } from './commands/keygen.js';
import { sign } from './commands/sign.js';

const dir_name = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Configure `multer` storage to use original file names
const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (_req, file, cb) => {
		cb(null, file.originalname);
	}
});

const upload = multer({ storage: storage });
const uploadFields = upload.fields([
	{ name: 'file', maxCount: 1 },
	{ name: 'secretKeyFile', maxCount: 1 }
]);

app.use(express.static(path.join(dir_name, 'public'))); // Serving from 'public'
app.use(express.json());

app.post('/submit', uploadFields, (req, res) => {
	const data = req.body;
	console.log('Received data:', data);
	console.log('Uploaded file:', req.files); // Check the uploaded file metadata

	// Process the data as needed

	res.json({ message: 'Data received successfully', receivedData: data, file: req.file });
});

app.post('/keygen', uploadFields, (req, res) => {
	const data = req.body;
	console.log('Received data:', data);
	console.log('Uploaded file:', req.files); // Check the uploaded file metadata

	// Process the data as needed
	const urls = generateKey(
		data.mechanismMode,
		data.kemAlgorithm,
		data.signatureAlgorithm,
		data.publicFileName,
		data.secretFileName
	);


	res.json({
		message: 'Data received successfully',
		receivedData: data,
		pubKeyUrl: urls.pubKeyUrl,
		secKeyUrl: urls.secKeyUrl
	});
});

app.post('/sign', uploadFields, (req, res) => {
	const data = req.body;
	const files = req.files;
	console.log('Received data:', data);
	console.log('Uploaded file:', files); // Check the uploaded file metadata

	// Process the data and files as needed
	if (!req.files || !req.files.file || !req.files.secretKeyFile) {
		return res.status(400).json({ error: 'Missing required file uploads' });
	}

	// Process the data as needed
	const signature_url = sign(
		data.signatureAlgorithm,
		files.file[0].path,
		files.secretKeyFile[0].path,
		data.signatureFileName
	);

	console.log(signature_url);

	res.json({
		message: 'Data received successfully',
		receivedData: data,
		file: req.files,
		signatureFileUrl: signature_url
	});
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://wsl.localhost:${PORT}`);
});
