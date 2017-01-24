router.route('login', function() {

    setHeaderLinkColor(-1);

    mainContent.innerHTML = window.Templates.Login({});

    var openRegistration = document.querySelector(".form__open_registration");
    var openLogin = document.querySelector(".form__open_login");
    var formRegistration = document.querySelector(".form_registration");
    var formLogin = document.querySelector(".form_login");
    var formRegistrationInputs = document.querySelectorAll(".form_registration .form__input");
    var formLoginInputs = document.querySelectorAll(".form_login .form__input");

    openRegistration.onclick = function(){
        formLogin.style.display = "none";
        formRegistration.style.display = "block";
        openLogin.style.background = "white";
        this.style.background = "turquoise";
    }

    openLogin.onclick = function(){
        formRegistration.style.display = "none";
        formLogin.style.display = "block";
        openRegistration.style.background = "white";
        this.style.background = "turquoise";
    }

    formRegistration.onsubmit = function(){
        for(var i = 0; i < formRegistrationInputs.length; i++) {
            if(!formRegistrationInputs[i].value.length) {
                uncorectData(formRegistrationInputs[i]);
                return false;
            }
            if(formRegistrationInputs[i].getAttribute("data-type") == 'email') {
                if(!checkEmail(formRegistrationInputs[i])){
                    uncorectData(formRegistrationInputs[i]);
                    return false;
                }
            }
            if(formRegistrationInputs[i].getAttribute("data-type") == 'repeatPassword') {
                if(formRegistrationInputs[i].value != formRegistrationInputs[i - 1].value) {
                    uncorectData(formRegistrationInputs[i]);
                    alert("Ваши пароли не совпадают");
                    return false;
                }
            }
        }
    }

    formLogin.onsubmit = function(){
        for(var i = 0; i < formLoginInputs.length; i++) {
            if(!formLoginInputs[i].value.length) {
                uncorectData(formLoginInputs[i]);
                return false;
            }
        }
    }

});