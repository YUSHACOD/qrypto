// File Button
const fileInput = document.getElementById('fileInput');
const fileNameDisplay = document.getElementById('fileName');

fileInput.addEventListener('change', function() {
    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = fileInput.files[0].name;
    } else {
        fileNameDisplay.textContent = 'No file chosen';
    }
});



document.getElementById('submitButton').addEventListener('click', async () => {
	const fileInput = document.getElementById('fileInput');
	const encryptionAlgorithm = document.getElementById('encryptionAlgorithm').value;
	const signatureAlgorithm = document.getElementById('signatureAlgorithm').value;
	const encryptionMode = document.querySelector('input[name="encryptionMode"]:checked').value;
	const signatureMode = document.querySelector('input[name="signatureMode"]:checked').value;

	// Ensure a file is selected
	if (!fileInput.files.length) {
		alert('Please select a file');
		return;
	}

	// Create FormData to send file and options to server
	const formData = new FormData();
	formData.append('file', fileInput.files[0]);
	formData.append('encryptionAlgorithm', encryptionAlgorithm);
	formData.append('signatureAlgorithm', signatureAlgorithm);
	formData.append('encryptionMode', encryptionMode);
	formData.append('signatureMode', signatureMode);

	try {
		const response = await fetch('https://yourserver.com/api/encrypt-sign', {
			method: 'POST',
			body: formData,
		});

		if (response.ok) {
			const result = await response.json();
			document.getElementById('result').textContent = 'Success: ' + JSON.stringify(result);
		} else {
			document.getElementById('result').textContent = 'Error: ' + response.statusText;
		}
	} catch (error) {
		console.error('Error:', error);
		document.getElementById('result').textContent = 'Error: ' + error.message;
	}
});

