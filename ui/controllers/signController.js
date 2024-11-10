import { sign } from '../commands/sign.js';

export const handleSign = (req, res) => {
	const data = req.body;
	const files = req.files;
	console.log('Received data:', data);
	console.log('Uploaded file:', files);

	if (!files || !files.file || !files.secretKeyFile) {
		return res.status(400).json({ error: 'Missing required file uploads' });
	}

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
		file: files,
		signatureFileUrl: signature_url
	});
};

