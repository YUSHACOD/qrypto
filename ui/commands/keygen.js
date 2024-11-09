import { spawn } from 'child_process';

/**
 * Function to create a child process that executes the 'qrypto keygen' command with given parameters.
 * @param {string} keyType - The type of key to generate.
 * @param {string} algorithmKEM - The KEM (Key Encapsulation Mechanism) algorithm to use.
 * @param {string} algorithmSIG - The signature algorithm to use.
 * @param {string} fileNamePub - The signature algorithm to use.
 * @param {string} fileNameSec - The signature algorithm to use.
 * @param {Array<string>} [options=[]] - Additional options for the command.
 */
export function generateKey(keyType, algorithmKEM, algorithmSIG, fileNamePub, fileNameSec) {
	const pubFilePath = "./public/downloads/" + fileNamePub;
	const secFilePath = "./public/downloads/" + fileNameSec;

	const options = [
		"--public-key",
		pubFilePath,
		"--secret-key",
		secFilePath
	];

	const args = ['keygen', ...options, keyType, algorithmKEM, algorithmSIG];

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
	
	let pub_key_extension;
	let sec_key_extension;
	if (keyType == "kem") {
		pub_key_extension = "." + algorithmKEM.replace("-", "_") + ".kem_pub_key"
		sec_key_extension = "." + algorithmKEM.replace("-", "_") + ".kem_sec_key"
	} else {
		pub_key_extension = "." + algorithmSIG.replace("-", "_") + ".sig_pub_key"
		sec_key_extension = "." + algorithmSIG.replace("-", "_") + ".sig_sec_key"
	}

	return {
		"pubKeyUrl": "http://wsl.localhost:3000/downloads/" + fileNamePub + pub_key_extension,
		"secKeyUrl": "http://wsl.localhost:3000/downloads/" + fileNameSec + sec_key_extension,
	}
}

