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
  resetlogIn()
  e.preventDefault();
});

displayLogin.addEventListener("click", function (e) {
  displayLoginCard();
  resetSignUp()
  e.preventDefault();
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

// &=========================> Login and Signup Functions =======================
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

function resetSignUp(){
  signUpForm.classList.remove('was-validated')
  firstNameInput.value = null; 
  lastNameInput.value = null; 
  signUpEmailInput.value = null; 
  signUpPasswordInput.value = null; 
}

function resetlogIn(){
  logInEmailInput.classList.remove('is-valid')
  logInEmailInput.classList.remove('is-invalid')
  loginHelp.classList.add('d-none')
  logInEmailInput.value = null; 
  logInPasswordInput.value = null; 
}


// !=========================> Movies Generator Variables =======================
let navLoginBtn = document.getElementById('navLoginBtn');
let navRegisterBtn = document.getElementById('navRegisterBtn');

// &=========================> Movies Generator Functions =======================
let moviesList = []

let movies = {
  movie1:{
    name:"Schindler's List",
    date:"1993",
    bg:"R",
    duration:"3h 15m",
    desc:"In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    director:"Steven Spielberg",
    writers:["Thomas Keneally","Steven Zaillian"],
    stars:["Liam Neeson" , "Ralph Fiennes" ,"Ben Kingsley"],
    link: "https://www.imdb.com/title/tt0108052/"
  },

  movie2:{
    name:"The Godfather",
    date:"1972",
    bg:"R",
    duration:"2h 55m",
    desc:"The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    director:"Francis Ford Coppola",
    writers:["Mario Puzo" , "Francis Ford Coppola"],
    stars:["Marlon Brando" , "Al Pacino", "James Caan"],
    link: "https://www.imdb.com/title/tt0068646/"
  }
}