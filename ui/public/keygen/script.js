document.getElementById('submitButton').addEventListener('click', async () => {
	const signatureAlgorithm = document.getElementById('signatureAlgorithm').value;
	const kemAlgorithm = document.getElementById('kemAlgorithm').value;
	const mecMode = document.querySelector('input[name="mechanismMode"]:checked').value;
	const pubFileName = document.getElementById('publicKeyName').value;
	const secFileName = document.getElementById('secretKeyName').value;
	const pubKeyUrl = document.getElementById('pubKeyFile');
	const secKeyUrl = document.getElementById('secKeyFile');

	// Ensure all required options are selected
	if (!mecMode) {
		alert('Please select mechanism option');
		console.warn('Missing mechanism mode selection');
		return;
	}

	if (pubFileName == "" || pubFileName == null) {
		alert('Please give Public Key File Name');
		console.warn('Missing Public Key Name');
		return;
	}

	if (secFileName == "" || secFileName == null) {
		alert('Please give Secret Key File Name');
		console.warn('Missing Secret Key Name');
		return;
	}

	// Create FormData to send file and options to server
	const formData = new FormData();
	formData.append('signatureAlgorithm', signatureAlgorithm);
	formData.append('kemAlgorithm', kemAlgorithm);
	formData.append('mechanismMode', mecMode);
	formData.append('publicFileName', pubFileName); 
	formData.append('secretFileName', secFileName);

	try {
		console.log('Submitting form data to server...');
		const response = await fetch('http://wsl.localhost:3000/keygen', {
			method: 'POST',
			body: formData,
		});

		if (response.ok) {
			const result = await response.json();
			console.log('Server response:', result);

			pubKeyUrl.href = result.pubKeyUrl;
			pubKeyUrl.textContent = "[Public Key File]";
			console.log('Loaded pub key url');

			secKeyUrl.href = result.secKeyUrl;
			secKeyUrl.textContent = "[Secret Key File]";
			console.log('Loaded sec key url');
		} else {
			console.error('Server returned error:', response.statusText);
			alert('Error during submission: ' + response.statusText);
		}
	} catch (error) {
		console.error('Submission error:', error);
		alert('An unexpected error occurred: ' + error.message);
	}
});
