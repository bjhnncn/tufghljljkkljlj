document.querySelector('.contact-form').addEventListener('submit', function(event) {
    var email = document.querySelector('input[name="email"]').value;
    var message = document.querySelector('textarea[name="message"]').value;

    if (email === '' || message === '') {
        alert('Please fill in all fields.');
        event.preventDefault(); // Prevent form submission
    }
});
