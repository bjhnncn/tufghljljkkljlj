document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const successMessage = document.getElementById('successMessage');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        // Validate email format
        const email = document.getElementById('email').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Invalid email format.');
            return;
        }
        
        // Gather form data
        const data = {
            UserName: document.getElementById('username').value,
            Email: email,
            phone: document.getElementById('phone').value, // Ensure this matches the column name in your SheetDB
            Password: document.getElementById('password').value // Consider hashing this password before storing
        };
        
        // Replace 'YOUR_SHEETDB_API_KEY' with your actual SheetDB API key
        const apiKey = 'YOUR_SHEETDB_API_KEY';
        const apiUrl = 'https://sheetdb.io/api/v1/mp8v2vamaemoi';
        
        // Send data to SheetDB API
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Hide form and show success message
            form.style.display = 'none';
            successMessage.style.display = 'block';
            setTimeout(function() {
                window.location.href = '/main'; // Redirect to login page
            }, 3000); // Wait 3 seconds before redirecting
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to submit data. Please try again.');
        });
    });
});

function redirectToRegister() {
    window.location.href = '/ind'; // Assuming '/index1' is the route that renders index.html
}
