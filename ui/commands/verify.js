import { spawn } from 'child_process';

/**
 * Function to create a child process that executes the 'qrypto verify' command with given parameters.
 * @param {string} algorithm - The signature algorithm to use.
 * @param {string} filePath - The file to verify.
 * @param {string} pubFilePath - The public key file.
 * @param {string} signatureFilePath - The signature file.
 * @returns {Promise<string>} - A promise that resolves with the result of the command.
 */
export async function verify(algorithm, filePath, pubFilePath, signatureFilePath) {
    const file = "./" + filePath;
    const publicKey = "./" + pubFilePath;
    const signature = "./" + signatureFilePath;

    const options = [
        '--file',
        file,
        '--signature-file',
        signature,
        '--public-key',
        publicKey,
        algorithm
    ];

    console.log(options);

    const args = ['verify', ...options];
    const child = spawn('qrypto', args);

    let result = '';

    // Wrap the child process logic in a Promise
    const output = await new Promise((resolve, reject) => {
        child.stdout.on('data', (data) => {
            console.log(`Output: ${data}`);
            result += `${data}`;
        });

        child.stderr.on('data', (data) => {
            console.error(`Error: ${data}`);
            result += `${data}`;
        });

        child.on('close', (code) => {
            console.log(`Process exited with code ${code}`);
            if (code === 0) {
                resolve(result);
            } else {
                reject(new Error(`Process exited with code ${code}: ${result}`));
            }
        });

        child.on('error', (err) => {
            reject(new Error(`Failed to start process: ${err.message}`));
        });
    });

    return output;
}
