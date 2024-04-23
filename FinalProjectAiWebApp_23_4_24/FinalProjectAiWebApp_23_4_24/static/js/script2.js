document.getElementById('forgetPasswordLink').addEventListener('click', function(event) {
    event.preventDefault();
    const recoveryWindow = window.open('', '_blank');
    recoveryWindow.document.write(`
        <html>
        <head>
            <title>Recovery Window</title>
            <style>
                /* Your recovery window styles go here */
                body {
                    font-family: 'Poppins', sans-serif;
                    background-color: #ffffff;
                    padding: 40px;
                }

                .recovery-form {
                    background-color: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                    padding: 40px;
                    max-width: 400px;
                    width: 100%;
                }

                h1 {
                    color: #6b38fb;
                    font-weight: 600;
                    margin-bottom: 20px;
                }

                label {
                    display: block;
                    margin-bottom: 10px;
                }

                input {
                    width: calc(100% - 40px);
                    padding: 12px;
                    margin-bottom: 20px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }

                button {
                    width: 100%;
                    background-color: #6b38fb;
                    color: white;
                    padding: 14px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                button:hover {
                    background-color: #8e44ad;
                }

                /* Additional styles as needed */
            </style>
        </head>
        <body>
            <div class="recovery-container">
                <div class="recovery-form">
                    <h1>Recover Password</h1>
                    <label for="email">Enter Email:</label>
                    <input type="email" id="email" placeholder="name@example.com" required><br>
                    <label for="newPassword">Enter New Password:</label>
                    <input type="password" id="newPassword" required><br>
                    <label for="confirmPassword">Confirm New Password:</label>
                    <input type="password" id="confirmPassword" required><br>
                    <button id="updatePasswordBtn">Update Password</button>
                    <span id="updateErrorMessage" style="color: red;"></span> <!-- Update error message placeholder -->
                </div>
            </div>
    `);

    recoveryWindow.document.getElementById('updatePasswordBtn').addEventListener('click', function() {
        const email = recoveryWindow.document.getElementById('email').value;
        const newPassword = recoveryWindow.document.getElementById('newPassword').value;
        const confirmPassword = recoveryWindow.document.getElementById('confirmPassword').value;
        const updateErrorMessageElement = recoveryWindow.document.getElementById('updateErrorMessage');

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            updateErrorMessageElement.textContent = 'Please enter a valid email address.';
            return;
        }

        if (newPassword === confirmPassword) {
            // Update password in dataset
            const newData = { Password: newPassword };
            fetch('https://sheetdb.io/api/v1/mp8v2vamaemoi/Email/' + email, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            })
            .then(response => response.json())
            .then(updatedData => {
                // Close the recovery window
                recoveryWindow.close();
                alert('Password updated successfully!');
            })
            .catch(error => {
                updateErrorMessageElement.textContent = 'Error updating password.';
                console.error('Error:', error);
            });
        } else {
            updateErrorMessageElement.textContent = 'Passwords do not match.';
        }
    });
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const errorMessageElement = document.getElementById('errorMessage');

    fetch('https://sheetdb.io/api/v1/mp8v2vamaemoi/search?Email=' + email)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0 && data[0].Password === password) {
            // Add fade-out effect
            document.body.classList.add('fade-out');

            // Redirect after the fade-out animation is completes
            setTimeout(function() {
                
                window.location.href = '/index1';
            }, 500); // Adjust the timeout to match your animation duration
        } else {
            errorMessageElement.textContent = 'Email or password is incorrect.';
        }
    })
    .catch(error => console.error('Error:', error));
});

// Clear error message on input
document.getElementById('emailInput').addEventListener('input', function() {
    document.getElementById('errorMessage').textContent = '';
});

document.getElementById('passwordInput').addEventListener('input', function() {
    document.getElementById('errorMessage').textContent = '';
});

function redirectToRegister() {
    window.location.href = '/inde'; // Assuming '/index1' is the route that renders index.html
}
