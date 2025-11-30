const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function showError(input, message) {
  input.parentElement.classList.add("error");
  input.nextElementSibling.textContent =
    message[0].toUpperCase() + message.slice(1);
}

function showSuccess(input) {
  input.parentElement.classList.remove("error");
  input.parentElement.classList.add("success");
}

function checkRequired(arrayOfInputs) {
  for (const input of arrayOfInputs) {
    if (!input.value.trim()) {
      showError(input, `${input.name} is required`);
    } else {
      showSuccess(input);
    }
  }
}

function checkLength(input, min, max) {
  if (input.value.length) {
    if (input.value.length < min || input.value.length > max) {
      showError(
        input,
        `${input.name} has to be between ${min} and ${max} characters`
      );
    } else {
      showSuccess(input);
    }
  }
}

function isValidEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function checkEmail(input) {
  if (!isValidEmail(input.value)) {
    showError(input, "Please enter a valid email address");
  } else {
    showSuccess(input);
  }
}

function checkPasswordMatch(password, password2) {
  if (password.value !== password2.value) {
    showError(password2, "Passwords do not match");
  } else {
    showSuccess(password2);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
