let displaySignUp = document.getElementById("displaySignUp");
let displayLogin = document.getElementById("displayLogin");

let createAccountCard = document.getElementById("createAccountCard");
let loginCard = document.getElementById("loginCard");

function displaySignUpCard(event) {
  event.preventDefault();
  event.stopPropagation();
  createAccountCard.classList.remove("d-none");
  loginCard.classList.add("d-none");
}

function displayLoginCard() {
  event.preventDefault();
  event.stopPropagation();
  loginCard.classList.remove("d-none");
  createAccountCard.classList.add("d-none");
}

displaySignUp.addEventListener("click", displaySignUpCard);

displayLogin.addEventListener("click", displayLoginCard);

const signature = document.querySelector(".signature");

signature.innerText = signature.innerText.split("").join("\n");
