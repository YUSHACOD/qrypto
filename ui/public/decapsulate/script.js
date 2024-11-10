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

const cipherKeyFile = document.getElementById('cipherKeyFile');
const cipherKeyFileName = document.getElementById('cipherKeyFileName');

cipherKeyFile.addEventListener('change', function() {
    if (cipherKeyFile.files.length > 0) {
        cipherKeyFileName.textContent = cipherKeyFile.files[0].name;
        console.log('File selected:', cipherKeyFile.files[0].name);
    } else {
        cipherKeyFile.textContent = 'No file chosen';
        console.log('No file selected');
    }
});

document.getElementById('submitButton').addEventListener('click', async () => {
	const kemAlgorithm = document.getElementById('kemAlgorithm').value;
	const secretKeyFile = document.getElementById('secretKeyFile');
	const cipherKeyFile = document.getElementById('cipherKeyFile');
	const sharedSecretName = document.getElementById('sharedSecName').value;
	const sharedSecUrl = document.getElementById('sharedSecUrl');

    // Ensure a public key file is selected
    if (!secretKeyFile.files.length) {
        alert('Please select public key file');
        console.warn('Attempted to submit without selecting a public key file');
        return;
    }

    if (!cipherKeyFile.files.length) {
        alert('Please select cipher key file');
        console.warn('Attempted to submit without selecting a cipher key file');
        return;
    }

	if (sharedSecretName == "" || sharedSecretName == null) {
		alert('Please give Shared Secret File Name');
		console.warn('Missing Shared Secret File Name');
		return;
	}


	// Create FormData to send file and options to server
	const formData = new FormData();
	formData.append('kemAlgorithm', kemAlgorithm);
	formData.append('secretKeyFile', secretKeyFile.files[0]);
	formData.append('cipherKeyFile', cipherKeyFile.files[0]);
	formData.append('sharedSecretName', sharedSecretName);

	try {
		console.log('Submitting form data to server...');
		const response = await fetch('http://wsl.localhost:3000/decapsulate', {
			method: 'POST',
			body: formData,
		});

		if (response.ok) {
			const result = await response.json();
			console.log('Server response:', result);

			sharedSecUrl.href = result.sharedSecUrl;
			sharedSecUrl.textContent = "[Shared Secret File]";
			console.log('Loaded shared secret url');
		} else {
			console.error('Server returned error:', response.statusText);
			alert('Error during submission: ' + response.statusText);
		}
	} catch (error) {
		console.error('Submission error:', error);
		alert('An unexpected error occurred: ' + error.message);
	}
});
