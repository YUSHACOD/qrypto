import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';

const dir_name = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// Serve static files from the 'public' directory
app.use(express.static(path.join(dir_name, 'public')));

// Route for handling POST requests with `multipart/form-data`
app.post('/submit', upload.single('file'), (req, res) => {
	const data = req.body;
	console.log('Received data:', data);
	console.log('Uploaded file:', req.file); // Check the uploaded file metadata

	// Process the data as needed

	res.json({ message: 'Data received successfully', receivedData: data, file: req.file });
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

