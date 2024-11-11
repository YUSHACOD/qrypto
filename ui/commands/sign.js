import { spawn } from 'child_process';

/**
 * Function to create a child process that executes the 'qrypto keygen' command with given parameters.
 * @param {string} algorithm - The signature algorithm to use.
 * @param {string} filePath - The File to sign
 * @param {string} secFilePath - The secret key file
 * @param {string} signatureName - The signature key file name
 */
export function sign(algorithm, filePath, secFilePath, signatureName) {
	const secPath = "./" + secFilePath;
	const file = "./" + filePath;
	const signaturePath = "./public/downloads/" + signatureName;

	const options = [
		"--file",
		file,
		"--secret-key",
		secPath,
		"--signature-file",
		signaturePath,
		algorithm
	];

	console.log(options);

	const args = ['sign', ...options];

	const child = spawn('qrypto', args);

	child.stdout.on('data', (data) => {
		console.log(`Output: ${data}`);
	});

	child.stderr.on('data', (data) => {
		console.error(`Error: ${data}`);
	});

	child.on('close', (code) => {
		console.log(`Process exited with code ${code}`);
	});

	let signature_extension = "." + algorithm.replace("-", "_") + ".signature";

	return "http://wsl.localhost:3000/downloads/" + signatureName + signature_extension;
}
