document.addEventListener("DOMContentLoaded", function () {
    // Function to handle form submission
    function handleFormSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phno: document.getElementById("phno").value,
            password: document.getElementById("password").value
        };

        // Make POST request to the API
        fetch("http://localhost:8070/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                // Display success message
                displayMessage("Success! Data saved successfully.");
                // You can perform additional actions here if needed
            })
            .catch(error => {
                // Display error message
                displayMessage("Error! Failed to save data.");
                console.error("Error saving data:", error);
                // Handle error appropriately, e.g., display error message to user
            });
    }

    // Function to display message
    function displayMessage(message) {
        // Create message element
        const messageElement = document.createElement("div");
        messageElement.className = "message";
        messageElement.textContent = message;

        // Append message element to the form
        const form = document.querySelector("form");
        form.appendChild(messageElement);

        // Remove message after 5 seconds
        setTimeout(() => {
            form.removeChild(messageElement);
        }, 5000);
    }

    // Add submit event listener to the form
    document.querySelector("form").addEventListener("submit", handleFormSubmit);
});
