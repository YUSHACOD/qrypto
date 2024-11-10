import { verify } from '../commands/verify.js';

export const handleVerify = async (req, res) => {
    const data = req.body;
    const files = req.files;
    console.log('Received data:', data);
    console.log('Uploaded file:', files);

    if (!files || !files.file || !files.publicKeyFile || !files.signatureFile) {
        return res.status(400).json({ error: 'Missing required file uploads' });
    }

    try {
        // Await the result from the `verify` function
        const result = await verify(
            data.signatureAlgorithm,
            files.file[0].path,
            files.publicKeyFile[0].path,
            files.signatureFile[0].path
        );

        console.log(result);

        res.json({
            message: 'Data received successfully',
            receivedData: data,
            file: files,
            result: result // Return the result
        });
    } catch (error) {
        console.error('Error during verification:', error);
        res.status(500).json({ error: 'Verification failed', details: error.message });
    }
};

