import { decapsulate } from '../commands/decapsulate.js';

export const handleDecapsulate = (req, res) => {
	const data = req.body;
	const files = req.files;
	console.log('Received data:', data);
	console.log('Uploaded file:', req.files);

	if (!files || !files.secretKeyFile || !files.cipherKeyFile) {
		return res.status(400).json({ error: 'Missing required file uploads' });
	}

	const sharedSecUrl = decapsulate(
		data.kemAlgorithm,
		files.secretKeyFile[0].path,
		files.cipherKeyFile[0].path,
		data.sharedSecretName
	);

	res.json({
		message: 'Data received successfully',
		receivedData: data,
		sharedSecUrl: sharedSecUrl
	});
};

