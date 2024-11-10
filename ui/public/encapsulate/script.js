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

document.getElementById('submitButton').addEventListener('click', async () => {
	const kemAlgorithm = document.getElementById('kemAlgorithm').value;
	const publicKeyFile = document.getElementById('publicKeyFile');
	const cipherKeyName = document.getElementById('cipherKeyName').value;
	const sharedSecretName = document.getElementById('sharedSecName').value;
	const cipherKeyUrl = document.getElementById('cipherKeyUrl');
	const sharedSecUrl = document.getElementById('sharedSecUrl');

    // Ensure a public key file is selected
    if (!publicKeyFile.files.length) {
        alert('Please select public key file');
        console.warn('Attempted to submit without selecting a public key file');
        return;
    }

	if (cipherKeyName == "" || cipherKeyName == null) {
		alert('Please give Cipher Key File Name');
		console.warn('Missing Cipher Key Name');
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
	formData.append('publicKeyFile', publicKeyFile.files[0]);
	formData.append('cipherKeyName', cipherKeyName);
	formData.append('sharedSecretName', sharedSecretName);

	try {
		console.log('Submitting form data to server...');
		const response = await fetch('http://wsl.localhost:3000/encapsulate', {
			method: 'POST',
			body: formData,
		});

		if (response.ok) {
			const result = await response.json();
			console.log('Server response:', result);

			cipherKeyUrl.href = result.cipherKeyUrl;
			cipherKeyUrl.textContent = "[Cipher Key File]";
			console.log('Loaded cipher key url');

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
