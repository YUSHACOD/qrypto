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

const secretKeyFile = document.getElementById('secretKeyFile');
const secretKeyFileName = document.getElementById('secretKeyFileName');

secretKeyFile.addEventListener('change', function() {
    if (secretKeyFile.files.length > 0) {
        secretKeyFileName.textContent = secretKeyFile.files[0].name;
        console.log('File selected:', secretKeyFile.files[0].name);
    } else {
        secretKeyFile.textContent = 'No file chosen';
        console.log('No file selected');
    }
});

document.getElementById('submitButton').addEventListener('click', async () => {
	const signatureAlgorithm = document.getElementById('signatureAlgorithm').value;
	const file = document.getElementById('fileInput');
	const secretKeyFile = document.getElementById('secretKeyFile');
	const signatureFileName = document.getElementById('signatureFileName').value;
	const signatureFileUrl = document.getElementById('signatureFileUrl');

    // Ensure a file is selected
    if (!file.files.length) {
        alert('Please select a file');
        console.warn('Attempted to submit without selecting a file');
        return;
    }

    // Ensure a signature name is selected
    if (signatureFileName.value == "") {
        alert('Please give a signature name');
        console.warn('Attempted to submit without a signature name');
        return;
    }

    // Ensure a file is selected
    if (!secretKeyFile.files.length) {
        alert('Please select secret key file');
        console.warn('Attempted to submit without selecting a secret key file');
        return;
    }

	// Create FormData to send file and options to server
	const formData = new FormData();
	formData.append('signatureAlgorithm', signatureAlgorithm);
	formData.append('file', file.files[0]);
	formData.append('secretKeyFile', secretKeyFile.files[0]);
	formData.append('signatureFileName', signatureFileName);

	try {
		console.log('Submitting form data to server...');
		const response = await fetch('http://wsl.localhost:3000/sign', {
			method: 'POST',
			body: formData,
		});

		if (response.ok) {
			const result = await response.json();
			console.log('Server response:', result);

			signatureFileUrl.href = result.signatureFileUrl;
			signatureFileUrl.textContent = "[Signature File]";
			console.log('Loaded signature url');
		} else {
			console.error('Server returned error:', response.statusText);
			alert('Error during submission: ' + response.statusText);
		}
	} catch (error) {
		console.error('Submission error:', error);
		alert('An unexpected error occurred: ' + error.message);
	}
});
