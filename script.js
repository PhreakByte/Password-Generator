document.getElementById('generate').addEventListener('click', function () {
    var length = document.getElementById('length').value;
    var charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    var password = '';

    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    document.getElementById('password').value = password;
    
    var strength = evaluatePasswordStrength(password);
    var strengthIndicator = document.getElementById('strength');
    strengthIndicator.textContent = strength.charAt(0).toUpperCase() + strength.slice(1);
    strengthIndicator.className = strength; // Apply the strength class for styling
});

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
