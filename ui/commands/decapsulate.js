import { spawn } from 'child_process';

/**
 * Function to create a child process that executes the 'qrypto keygen' command with given parameters.
 * @param {string} algorithm- The KEM (Key Exchange Mechanism) algorithm to use.
 * @param {string} secretKeyPath - The secret key to use.
 * @param {string} cipherKeyPath - The cipher key to use.
 * @param {string} sharedSecName - The shared secret name to use.
 */
export function decapsulate(algorithm, secretKeyPath, cipherKeyPath, sharedSecName) {
	const secretKey = "./" + secretKeyPath;
	const cipherKey = "./" + cipherKeyPath;
	const sharedSec = "./public/downloads/" + sharedSecName;

	const options = [
		"--kem-secret-key",
		secretKey,
		"--kem-cipher-key",
		cipherKey,
		"--kem-shared-key",
		sharedSec,
		algorithm
	];

	console.log(options);

	const args = ['decapsulate', ...options];

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


	let shared_sec_extension = "." + algorithm.replace("-", "_") + ".kem_shared_secret"

	return "http://wsl.localhost:3000/downloads/" + sharedSecName + shared_sec_extension;
}

