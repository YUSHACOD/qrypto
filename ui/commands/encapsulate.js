import { spawn } from 'child_process';

/**
 * Function to create a child process that executes the 'qrypto keygen' command with given parameters.
 * @param {string} algorithm- The KEM (Key Exchange Mechanism) algorithm to use.
 * @param {string} publicKeyPath - The public key to use.
 * @param {string} cipherKeyName - The cipher key Name to use.
 * @param {string} sharedSecName - The shared secret Name to use.
 */
export function encapsulate(algorithm, publicKeyPath, cipherKeyName, sharedSecName) {
	const publicKey = "./" + publicKeyPath;
	const cipherKey = "./public/downloads/" + cipherKeyName;
	const sharedSec = "./public/downloads/" + sharedSecName;

	const options = [
		"--kem-pub-key",
		publicKey,
		"--kem-cipher-key",
		cipherKey,
		"--kem-shared-key",
		sharedSec,
		algorithm
	];

	console.log(options);

	const args = ['encapsulate', ...options];

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
	
	let cipher_key_extension;
	let shared_sec_extension;

	cipher_key_extension = "." + algorithm.replace("-", "_") + ".kem_cipher_key"
	shared_sec_extension = "." + algorithm.replace("-", "_") + ".kem_shared_secret"

	return {
		"cipherKeyUrl": "http://wsl.localhost:3000/downloads/" + cipherKeyName + cipher_key_extension,
		"sharedSecUrl": "http://wsl.localhost:3000/downloads/" + sharedSecName + shared_sec_extension
	}
}

