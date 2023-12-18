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

  // const textSlider = document.querySelector(".text-group");
  // textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

 
}




//Codigo para que funcione el captha
    //This event listener is triggered when the HTML document has been completely loaded and parsed.
    document.addEventListener("DOMContentLoaded", function () {
      const inputbox = document.querySelector(".captcha_form input"); //It selects the input box inside an element  
      const login = document.querySelector(".form .botons");          //with the class "captcha_form" and the button 
                                                                      //inside an element with the class "form" and "botons".
  
  
      //This event is triggered when a key is released in the input box. It checks if the input has any 
      //non-whitespace characters. If yes, it adds the "active" class to the login button; otherwise, it removes the class.
      inputbox.onkeyup = () => {
          let userdata = inputbox.value;
          if (userdata.trim() !== "") {
              login.classList.add("active");
          } else {
              login.classList.remove("active");
          }
      };
      
      // (Captcha Generation) Functions to generate a random captcha value and store it in the captchavalue variable.
      const fonts = ['cursive'];
      let captchavalue = "";
  
      function gencaptch() {
          // Generating a random number, multiplying it by 10000000, and converting it to base64
          let value = btoa(Math.random() * 10000000);
      
          // Taking a substring of the generated base64 value
          value = value.substr(0, 5 + Math.random() * 5);
      
          // Setting the generated value to the captchavalue variable
          captchavalue = value;
      }
      //(Captcha Rendering) Function to render the captcha value with randomized rotation and font styling 
      //into an HTML element with the class "preview".
      function setcaptcha() {
          let previewElement = document.querySelector(".preview");
          let captchaElement = document.querySelector(".captcha_form");
          
          console.log("Preview Element:", previewElement);
          console.log("Preview Element:", captchaElement);
      
          if (previewElement) {
              let html = captchavalue.split("").map((char) => {
                  const rotate = -20 + Math.trunc(Math.random() * 50);
                  const font = Math.trunc(Math.random() * fonts.length);
      
                  return `<span style="transform:rotate(${rotate}deg); font-family:${fonts[font]};">${char}</span>`;
              }).join("");
      
              previewElement.innerHTML = html;
          } else {
              console.error("Preview element not found.");
          }
      }
      //(Initialization) Function to initialize the captcha on page load, including setting up the initial captcha, 
      //and adding a click event listener to refresh the captcha.
      function initcaptcha() {
          gencaptch();
          setcaptcha();
  
          document.querySelector(".captcha_form .captcha_refresh").addEventListener("click", function () {
              console.log("Refresh button clicked!");
              gencaptch();
              setcaptcha();
          });
          gencaptch();
          setcaptcha();
      }
  
      // Call initcaptcha to initialize captcha when the page loads
      initcaptcha();
  
      //(Login Validation) Event listener for the click event on the login button. It checks if the entered 
      //captcha value matches the generated captcha value and shows a corresponding alert message.
  
      document.querySelector(".form .botons").addEventListener("click", function () {
          let inputcaptchavalue = document.querySelector(".form #captcha_form").value;
          if (inputcaptchavalue === captchavalue) {
              alert("log in successful");
          } else {
              alert("invalid captcha");
          }
      });
  });


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

  if(!passwordField.value.match(/^.{4,12}$/)){  // Elimina la coma adicional
      passwordError.innerHTML = "La contraseña debe ser de 4-16 caracteres";  // Corrige el mensaje de error
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

  if(!passwordField2.value.match(/^.{4,12}$/)){  // Elimina la coma adicional
      passwordError2.innerHTML = "La contraseña debe ser de 4-16 caracteres";  // Corrige el mensaje de error
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