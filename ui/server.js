import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';

const dir_name = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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

// Serve static files from the 'public' directory
app.use(express.static(path.join(dir_name, 'public')));

app.post('/submit', upload.single('file'), (req, res) => {
    const data = req.body;
    console.log('Received data:', data);
    console.log('Uploaded file:', req.file); // Check the uploaded file metadata

    // Process the data as needed

    res.json({ message: 'Data received successfully', receivedData: data, file: req.file });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://wsl.localhost:${PORT}`);
});
