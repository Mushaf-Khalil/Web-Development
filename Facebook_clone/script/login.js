console.log("Script login.js loaded.");

const loginform = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

// --- FIX START ---
// Corrected ID to match HTML: 'forgot-password' instead of 'forgotten-password'
const forgotPasswordLink = document.getElementById('forgot-password');
console.log("forgotPasswordLink element:", forgotPasswordLink); // Debugging: Check if element is found
// --- FIX END ---

const createAccountBtn = document.getElementById('createAccount');
console.log("createAccountBtn element:", createAccountBtn); // Debugging: Check if element is found

const signupModal = document.getElementById('signupModal');
console.log("signupModal element:", signupModal); // Debugging: Check if element is found
const signupForm = document.getElementById('signupForm');
const closeModalBtn = document.getElementById('closeModal');

const forgotModal = document.getElementById('forgotModal');
const forgotForm = document.getElementById('forgotForm');
const closeForgotModalBtn = document.getElementById('closeForgotModal');
const cancelForgotBtn = document.getElementById('cancelForgot');

function hideMessage() {
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

function showError(message) {
    hideMessage();
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function showSuccess(message) {
    hideMessage();
    successMessage.textContent = message;
    successMessage.style.display = 'block';
}

function showToast(message, type = 'success') {
    const existingToast = document.querySelectorAll('.toast');
    existingToast.forEach(toast => toast.remove());

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? '✅' : '❌';

    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${icon}</span>
            <span>${message}</span>
            <button class="toast-close">&times;</button>
        </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);

    const closeButton = toast.querySelector('.toast-close');
    closeButton.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
}

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Event listener for login form submission
loginform.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log("Login form submitted."); // Debugging
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        showError('Please enter both email and password.');
        return;
    }

    if (!isValidEmail(email)) {
        showError('Please enter a valid email address.');
        emailInput.focus();
        return;
    }

    if (password.length < 6) {
        showError('Password must be at least 6 characters long.');
        passwordInput.focus();
        return;
    }

    showSuccess('Login successful! Redirecting...');
    setTimeout(() => {
        emailInput.value = '';
        passwordInput.value = '';
        hideMessage();
    }, 2000);
});

// Event listener for "Forgotten password?" link
if (forgotPasswordLink) { // Ensure the element exists before adding listener
    forgotPasswordLink.addEventListener('click', function (e) {
        e.preventDefault();
        console.log("Forgotten password link clicked!"); // Debugging
        forgotModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
} else {
    console.error("Error: 'forgot-password' element not found. Check HTML ID.");
}


// Event listener for closing forgot password modal
closeForgotModalBtn.addEventListener('click', function () {
    console.log("Close Forgot Modal button clicked."); // Debugging
    forgotModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Event listener for clicking outside forgot password modal
forgotModal.addEventListener('click', function (e) {
    if (e.target === forgotModal) {
        console.log("Clicked outside Forgot Modal."); // Debugging
        forgotModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Event listener for cancel button in forgot password modal
cancelForgotBtn.addEventListener('click', function () {
    console.log("Cancel Forgot button clicked."); // Debugging
    forgotModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Event listener for forgot password form submission
forgotForm.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log("Forgot form submitted."); // Debugging
    const email = document.getElementById('forgotEmail').value.trim();

    if (!email) {
        showToast('Please enter your email address.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
    }

    forgotModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    showToast('Password reset request sent! Please check your email.', 'success');
    forgotForm.reset();
});

// Event listener for "Create New Account" button
if (createAccountBtn) { // Ensure the element exists before adding listener
    createAccountBtn.addEventListener('click', function () {
        console.log("Create Account button clicked!"); // Debugging
        signupModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log("signupModal active class added. Current classList:", signupModal.classList); // Debugging
    });
} else {
    console.error("Error: 'createAccount' element not found. Check HTML ID.");
}


// Event listener for closing signup modal
closeModalBtn.addEventListener('click', function () {
    console.log("Close Signup Modal button clicked."); // Debugging
    signupModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Event listener for clicking outside signup modal
signupModal.addEventListener('click', function (e) {
    if (e.target === signupModal) {
        console.log("Clicked outside Signup Modal."); // Debugging
        signupModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Event listener for signup form submission
signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log("Signup form submitted."); // Debugging
    const firstname = document.getElementById('firstName').value.trim();
    const lastname = document.getElementById('lastName').value.trim();
    const email = document.getElementById('emailSignup').value.trim();
    const password = document.getElementById('passwordSignup').value.trim();
    const gender = signupForm.querySelector('input[name="gender"]:checked');

    if (!firstname || !lastname || !email || !password || !gender) {
        showToast('Please fill in all fields.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
    }

    if (password.length < 6) {
        showToast('Password must be at least 6 characters long.', 'error');
        return;
    }

    signupModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    showToast(`Welcome ${firstname}! Your account has been created successfully.`, 'success');
    signupForm.reset();
});

// Event listeners to hide messages on input
emailInput.addEventListener('input', hideMessage);
passwordInput.addEventListener('input', hideMessage);
