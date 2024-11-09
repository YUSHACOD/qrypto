function submitForm() {
    // Get the values from the form inputs
    const name = document.getElementById("name").value;
    const stuff = document.getElementById("stuff").value;
    const option = document.getElementById("option").value;
    const fileInput = document.getElementById("fileUpload");
    const file = fileInput.files.length > 0 ? fileInput.files[0] : null;

    // Show the result below the form
    document.getElementById("resultName").innerText = name;
    document.getElementById("resultStuff").innerText = stuff;
    document.getElementById("resultOption").innerText = option;
    document.getElementById("resultFile").innerText = file ? file.name : "No file uploaded";

    // Display the result
    document.getElementById("result").style.display = "block";

    // Create a FormData object to append the form fields and file
    const formData = new FormData();
    formData.append("name", name);
    formData.append("stuff", stuff);
    formData.append("option", option);
    if (file) {
        formData.append("file", file);
    }

    // Send the FormData to the server using fetch
    fetch("http://localhost:3000/submit", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())  // Assuming the server responds with JSON
    .then(data => {
        console.log("Server Response:", data);
        alert("Data successfully sent!");
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error sending data.");
    });
}

