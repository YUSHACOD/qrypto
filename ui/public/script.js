const fileInput = document.getElementById('fileInput');
const fileNameDisplay = document.getElementById('fileName');
const resultDisplay = document.getElementById('result');

fileInput.addEventListener('change', function() {
    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = fileInput.files[0].name;
        console.log('File selected:', fileInput.files[0].name);
    } else {
        fileNameDisplay.textContent = 'No file chosen';
        console.log('No file selected');
    }
});

document.getElementById('submitButton').addEventListener('click', async () => {
    const encryptionAlgorithm = document.getElementById('encryptionAlgorithm').value;
    const signatureAlgorithm = document.getElementById('signatureAlgorithm').value;
    const encryptionMode = document.querySelector('input[name="encryptionMode"]:checked');
    const signatureMode = document.querySelector('input[name="signatureMode"]:checked');

    // Ensure a file is selected
    if (!fileInput.files.length) {
        alert('Please select a file');
        console.warn('Attempted to submit without selecting a file');
        return;
    }

    // Ensure all required options are selected
    if (!encryptionMode || !signatureMode) {
        alert('Please select all encryption and signature options');
        console.warn('Missing encryption or signature mode selection');
        return;
    }

    // Create FormData to send file and options to server
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('encryptionAlgorithm', encryptionAlgorithm);
    formData.append('signatureAlgorithm', signatureAlgorithm);
    formData.append('encryptionMode', encryptionMode.value);
    formData.append('signatureMode', signatureMode.value);

    try {
        console.log('Submitting form data to server...');
        const response = await fetch('http://wsl.localhost:3000/submit', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Server response:', result);
            alert('File submitted successfully!');
        } else {
            console.error('Server returned error:', response.statusText);
            alert('Error during file submission: ' + response.statusText);
        }
    } catch (error) {
        console.error('Submission error:', error);
        alert('An unexpected error occurred: ' + error.message);
    }
});
