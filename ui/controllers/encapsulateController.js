import { encapsulate } from '../commands/encapsulate.js';

export const handleEncapsulate = (req, res) => {
	const data = req.body;
	const files = req.files;
	console.log('Received data:', data);
	console.log('Uploaded file:', req.files);

	if (!files || !files.publicKeyFile) {
		return res.status(400).json({ error: 'Missing required file uploads' });
	}

	const urls = encapsulate(
		data.kemAlgorithm,
		files.publicKeyFile[0].path,
		data.cipherKeyName,
		data.sharedSecretName
	);

	res.json({
		message: 'Data received successfully',
		receivedData: data,
		cipherKeyUrl: urls.cipherKeyUrl,
		sharedSecUrl: urls.sharedSecUrl
	});
};

