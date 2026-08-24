const getStartedButton = document.querySelector('#get-started');
const accountForm = document.querySelector('#account-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const passwordToggle = document.querySelector('#password-toggle');
const eyeIcon = passwordToggle.querySelector('.eye-icon');
const eyeOffIcon = passwordToggle.querySelector('.eye-off-icon');
const formError = document.querySelector('#form-error');

getStartedButton.addEventListener('click', () => {
  getStartedButton.hidden = true;
  accountForm.hidden = false;
  usernameInput.focus();
});

passwordToggle.addEventListener('click', () => {
  const isVisible = passwordInput.type === 'text';

  passwordInput.type = isVisible ? 'password' : 'text';
  passwordToggle.setAttribute('aria-label', isVisible ? 'Show password' : 'Hide password');
  passwordToggle.setAttribute('aria-pressed', String(!isVisible));
  eyeIcon.hidden = !isVisible;
  eyeOffIcon.hidden = isVisible;
});

accountForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const hasMissingField = !usernameInput.value.trim() || !passwordInput.value;
  formError.hidden = !hasMissingField;

  if (hasMissingField) {
    (usernameInput.value.trim() ? passwordInput : usernameInput).focus();
  } else {
    window.location.href = `dashboard.html?username=${encodeURIComponent(usernameInput.value.trim())}`;
  }
});
