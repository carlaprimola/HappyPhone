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