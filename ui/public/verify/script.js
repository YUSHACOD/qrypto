const fileInput = document.getElementById('fileInput');
const fileNameDisplay = document.getElementById('fileName');

fileInput.addEventListener('change', function() {
    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = fileInput.files[0].name;
        console.log('File selected:', fileInput.files[0].name);
    } else {
        fileNameDisplay.textContent = 'No file chosen';
        console.log('No file selected');
    }
});

const publicKeyFile = document.getElementById('publicKeyFile');
const publicKeyFileName = document.getElementById('publicKeyFileName');

publicKeyFile.addEventListener('change', function() {
    if (publicKeyFile.files.length > 0) {
        publicKeyFileName.textContent = publicKeyFile.files[0].name;
        console.log('File selected:', publicKeyFile.files[0].name);
    } else {
        publicKeyFile.textContent = 'No file chosen';
        console.log('No file selected');
    }
});

const signatureFile = document.getElementById('signatureFile');
const signatureFileName = document.getElementById('signatureFileName');

signatureFile.addEventListener('change', function() {
    if (signatureFile.files.length > 0) {
        signatureFileName.textContent = signatureFile.files[0].name;
        console.log('File selected:', signatureFile.files[0].name);
    } else {
        signatureFile.textContent = 'No file chosen';
        console.log('No file selected');
    }
});

document.getElementById('submitButton').addEventListener('click', async () => {
	const signatureAlgorithm = document.getElementById('signatureAlgorithm').value;
	const file = document.getElementById('fileInput');
	const publicKeyFile = document.getElementById('publicKeyFile');
	const signatureFile = document.getElementById('signatureFile');
	const result_space = document.getElementById('result');

    // Ensure a file is selected
    if (!file.files.length) {
        alert('Please select a file');
        console.warn('Attempted to submit without selecting a file');
        return;
    }

    // Ensure a public key file is selected
    if (!publicKeyFile.files.length) {
        alert('Please select public key file');
        console.warn('Attempted to submit without selecting a public key file');
        return;
    }

    // Ensure a file is selected
    if (!signatureFile.files.length) {
        alert('Please select secret key file');
        console.warn('Attempted to submit without selecting a signature file');
        return;
    }

	// Create FormData to send file and options to server
	const formData = new FormData();
	formData.append('signatureAlgorithm', signatureAlgorithm);
	formData.append('file', file.files[0]);
	formData.append('publicKeyFile', publicKeyFile.files[0]);
	formData.append('signatureFile', signatureFile.files[0]);

	try {
		console.log('Submitting form data to server...');
		const response = await fetch('http://wsl.localhost:3000/verify', {
			method: 'POST',
			body: formData,
		});

		if (response.ok) {
			const result = await response.json();
			console.log('Server response:', result);

			result_space.textContent = "[ " + result.result + "]";
			console.log('Loaded result');
		} else {
			console.error('Server returned error:', response.statusText);
			alert('Error during submission: ' + response.statusText);
		}
	} catch (error) {
		console.error('Submission error:', error);
		alert('An unexpected error occurred: ' + error.message);
	}
});
