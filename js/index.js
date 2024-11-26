//!
let cardContainer = document.getElementById("cardContainer");
let overlayBg = document.getElementById("overlayBg");

let displaySignUp = document.getElementById("displaySignUp");
let displayLogin = document.getElementById("displayLogin");

let createAccountCard = document.getElementById("createAccountCard");
let loginCard = document.getElementById("loginCard");

let firstNameInput = document.getElementById("firstNameInput");
let lastNameInput = document.getElementById("lastNameInput");
let signUpEmailInput = document.getElementById("signUpEmailInput");
let signUpPasswordInput = document.getElementById("signUpPasswordInput");
let logInEmailInput = document.getElementById("logInEmailInput");
let logInPasswordInput = document.getElementById("logInPasswordInput");

let createAccountBtn = document.getElementById("createAccountBtn");
let loginBtn = document.getElementById("loginBtn");

let signUpForm = document.getElementById("signUpForm");
let logInForm = document.getElementById("logInForm");

let successMsg = document.getElementById("successMsg");
let existsMsg = document.getElementById("existsMsg");

let loginHelp = document.getElementById("loginHelp");

let signature = document.querySelector(".signature");
signature.innerText = signature.innerText.split("").join("\n");

let usersList = [];

// ^====================> Event ======================
displaySignUp.addEventListener("click", function (e) {
  displaySignUpCard();
  e.preventDefault();
});

displayLogin.addEventListener("click", function (e) {
  displayLoginCard();
});

if (localStorage.getItem("Users") !== null) {
  usersList = JSON.parse(localStorage.getItem("Users"));
}

createAccountBtn.addEventListener("click", function (e) {
  validate(signUpForm);
  addUser();
  e.preventDefault();
  e.stopPropagation();
});

loginBtn.addEventListener("click", function (e) {
  if (!logInEmailInput.value) {
    logInEmailInput.classList.add("is-invalid");
  } else {
    logInEmailInput.classList.remove("is-invalid");
    login();
  }
  e.preventDefault();
  e.stopPropagation();
});

createAccountBtn.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    validate(signUpForm);
    addUser();
    e.preventDefault();
    e.stopPropagation();
  }
});

loginBtn.addEventListener("keyup", function (e) {
  if (!logInEmailInput.value) {
    logInEmailInput.classList.add("is-invalid");
  } else {
    logInEmailInput.classList.remove("is-invalid");
    login();
  }
  e.preventDefault();
  e.stopPropagation();
});

// &=========================> Function =======================
function validate(ele) {
  if (!ele.checkValidity()) {
    ele.classList.remove("is-valid");
    ele.classList.add("is-invalid");
  } else {
    ele.classList.remove("is-invalid");
    ele.classList.add("is-valid");
  }
  ele.classList.add("was-validated");
}

function displaySignUpCard() {
  createAccountCard.classList.remove("d-none");
  loginCard.classList.add("d-none");
}

function displayLoginCard() {
  loginCard.classList.remove("d-none");
  createAccountCard.classList.add("d-none");
}

function addUser() {
  let user = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: signUpEmailInput.value,
    password: signUpPasswordInput.value,
  };

  if (signUpForm.classList.contains("is-valid")) {
    if (localStorage.getItem("Users") !== null) {
      checkAccountExisting(user);
    } else {
      usersList.push(user);
      existsMsg.classList.add("d-none");
      successMsg.classList.remove("d-none");
      localStorage.setItem("Users", JSON.stringify(usersList));
    }
  }
}

function checkAccountExisting(obj) {
  let accountCheck = false;

  for (let i = 0; i < usersList.length; i++) {
    if (obj.email === usersList[i].email) {
      successMsg.classList.add("d-none");
      existsMsg.classList.remove("d-none");
      signUpEmailInput.classList.add("is-invalid");
      signUpEmailInput.classList.remove("is-valid");
      accountCheck = true;
    }
  }
  if (!accountCheck) {
    usersList.push(obj);
    successMsg.classList.remove("d-none");
    existsMsg.classList.add("d-none");
    signUpEmailInput.classList.add("is-valid");
    signUpEmailInput.classList.remove("is-invalid");
    localStorage.setItem("Users", JSON.stringify(usersList));
  }
}

function login() {
  let loginCheck = false;
  user = {
    email: logInEmailInput.value,
    password: logInPasswordInput.value,
  };

  for (let i = 0; i < usersList.length; i++) {
    if (
      user.email === usersList[i].email &&
      user.password === usersList[i].password
    ) {
      loginCheck = true;
      console.log("ok");
      cardContainer.classList.add("d-none");
      overlayBg.classList.add("d-none");
    }
  }
  if (!loginCheck) {
    loginHelp.classList.remove("d-none");
    loginHelp.classList.add("d-block");
  }
}
