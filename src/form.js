const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

}


//Validación de formulario



const emailField = document.getElementById("email-field");
const emailLabel = document.getElementById("email");
const emailError = document.getElementById("email-error");

const passwordField = document.getElementById("password-field");
const passwordLabel = document.getElementById("password");
const passwordError = document.getElementById("password-error");

const userField = document.getElementById("user-field");
const userLabel = document.getElementById("user");
const userError = document.getElementById("user-error");

//Para que no colisionen los id de ambos formularios al estar en el mismo index

const passwordField2 = document.getElementById("password-field2");
const passwordLabel2 = document.getElementById("password2");
const passwordError2 = document.getElementById("password-error2");

const userField2 = document.getElementById("user-field2");
const userLabel2 = document.getElementById("user2");
const userError2 = document.getElementById("user-error2");

function validateUser(){
  userLabel.style.bottom = "45px";

  if(!userField.value.match(/^[a-zA-Z0-9\_\-]{4,16}$/)){
      userError.innerHTML = "El nombre de usuario debe ser de 4 a 16 caracteres alfanuméricos";  // Corrige el mensaje de error
      userField.style.borderBottomColor = "red";
      userError.style.top = "132%";
      return false;
  }
  userError.innerHTML = "";
  userField.style.borderBottomColor = "green";
  userError.style.top = "100%";
  return true;
}

function validateEmail(){
    emailLabel.style.bottom = "45px";

    if(!emailField.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        emailError.innerHTML = "Escribe un email valido";
        emailField.style.borderBottomColor = "red";
        emailError.style.top = "120%";
        return false;
    }
    emailError.innerHTML = "";
    emailField.style.borderBottomColor = "green";
    emailError.style.top = "100%";
    return true;
}

function validatePassword(){
  passwordLabel.style.bottom = "45px";

  if(!passwordField.value.match(/^.{4,12}$/)){  
      passwordError.innerHTML = "La contraseña debe ser de 4-16 caracteres"; 
      passwordField.style.borderBottomColor = "red";
      passwordError.style.top = "120%";
      return false;
  }

  passwordError.innerHTML = "";
  passwordField.style.borderBottomColor = "green";
  passwordError.style.top = "100%";
  return true;
}



function validatePassword2(){
  passwordLabel2.style.bottom = "45px";

  if(!passwordField2.value.match(/^.{4,12}$/)){  
      passwordError2.innerHTML = "La contraseña debe ser de 4-16 caracteres";  
      passwordField2.style.borderBottomColor = "red";
      passwordError2.style.top = "120%";
      return false;
  }

  passwordError2.innerHTML = "";
  passwordField2.style.borderBottomColor = "green";
  passwordError2.style.top = "100%";
  return true;
}


function validateUser2(){
  userLabel.style.bottom = "45px";

  if(!userField2.value.match(/^[a-zA-Z0-9\_\-]{4,16}$/)){
      userError2.innerHTML = "El nombre de usuario debe ser de 4 a 16 caracteres alfanuméricos";  
      userField2.style.borderBottomColor = "red";
      userError2.style.top = "120%";
      return false;
  }
  userError2.innerHTML = "";
  userField2.style.borderBottomColor = "green";
  userError2.style.top = "100%";
  return true;
}






const form = document.querySelector('#registrationForm');

form.addEventListener('submit',(e)=>{
  e.preventDefault();

  const captchaResponse = grecaptcha.getResponse();


  if (!captchaResponse.length > 0) {
    // Muestra una alerta si el reCAPTCHA no está completo
    alert("Por favor, completa el reCAPTCHA antes de enviar el formulario.");
    return;
  }

  window.location.href = "../index.html";


  const fd =new FormData(e.target);
  const params =new URLSearchParams(fd);

  fetch ('http://localhost:3000/upload',{
    method:"POST",
    body:params,

  })


  .then(res=> res.json())
  .then (data=> {
    if (data.captchaSuccess){
     console.log("Validación correcta");
    }else{
      console.error("Validation incorrecta");
    }
  })

  .catch(err => console.error(err))

})