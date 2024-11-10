import multer from 'multer';

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (_req, file, cb) => {
		cb(null, file.originalname);
	}
});

export const upload = multer({ storage: storage });
export const uploadFields = upload.fields([
	{ name: 'file', maxCount: 1 },
	{ name: 'secretKeyFile', maxCount: 1 },
	{ name: 'publicKeyFile', maxCount: 1 },
	{ name: 'signatureFile', maxCount: 1 },
	{ name: 'cipherKeyFile', maxCount: 1 },
	{ name: 'sharedSecFile', maxCount: 1 }
]);
