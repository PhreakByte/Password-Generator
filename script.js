document.addEventListener('DOMContentLoaded', function() {
    var body = document.body;
    var darkModeToggle = document.getElementById('dark-mode-toggle');

    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
    });

    document.getElementById('generate').addEventListener('click', function () {
        var length = document.getElementById('length').value;
        var charset = document.getElementById('charset').value || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
        var password = '';

        if (document.getElementById('passphrase').checked) {
            password = generatePassphrase();
        } else {
            for (var i = 0; i < length; i++) {
                var randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }
        }

        document.getElementById('password').value = password;

        var strength = evaluatePasswordStrength(password);
        var strengthIndicator = document.getElementById('strength');
        strengthIndicator.textContent = strength.charAt(0).toUpperCase() + strength.slice(1);
        strengthIndicator.className = 'password-strength strength-' + strength; // Apply the strength class for styling
        
        generateQRCode(password); // Generate QR code
    });

    function generatePassphrase() {
        var words = ['apple', 'banana', 'cherry', 'dog', 'elephant', 'flower', 'gorilla', 'happy', 'icecream', 'jelly'];
        var passphrase = '';

        for (var i = 0; i < 4; i++) {
            var randomIndex = Math.floor(Math.random() * words.length);
            passphrase += words[randomIndex];
            if (i !== 3) {
                passphrase += '-';
            }
        }

        return passphrase;
    }

    function evaluatePasswordStrength(password) {
        var strength = 'weak';

        if (password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*()_+]/.test(password)) {
            strength = 'strong';
        } else if (password.length >= 6) {
            strength = 'medium';
        }

        return strength;
    }

    document.getElementById('copy').addEventListener('click', function () {
        var passwordField = document.getElementById('password');
        
        passwordField.select();
        passwordField.setSelectionRange(0, 99999);
        document.execCommand('copy');
        passwordField.setSelectionRange(0, 0);
    });

    function generateQRCode(password) {
        var qr = new QRious({
            element: document.getElementById('qrCanvas'),
            size: 150,
            value: password
        });
    }
});
