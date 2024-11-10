import { generateKey } from '../commands/keygen.js';

export const handleKeygen = (req, res) => {
	const data = req.body;
	console.log('Received data:', data);
	console.log('Uploaded file:', req.files);

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
};

