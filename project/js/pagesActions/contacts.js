router.route('contacts', function() {

    setHeaderLinkColor(4);

    mainContent.innerHTML = window.Templates.Contacts({});

    var contactsButton = document.querySelector(".contacts__button");
    var form = document.querySelector(".contacts__form");
    var inputs = document.querySelectorAll(".form__input");

    contactsButton.onclick = function(){
        form.style.transition = "all .5s";
        if(getComputedStyle(form).getPropertyValue("opacity") == '0' ||
            getComputedStyle(form).getPropertyValue("filter") == 'alpha(opacity=0)') {
            form.style.opacity = "1";
            form.style.filter = "alpha(opacity=100)";
            form.style.zIndex = "200";
            form.style.transform = "translateY(0)";
            form.style.msTransform = "translateY(0)"; // !!! ms - not Ms IE9
        }
        else {
            form.style.opacity = "";
            form.style.filter = "alpha(opacity=0)";
            form.style.zIndex = "-1";
            form.style.transform = "";
            form.style.msTransform = "";
        }
    };

    form.onsubmit = function(){
        for(var i = 0; i < inputs.length; i++){
            if(!inputs[i].value.length) {
                uncorectData(inputs[i]);
                return false;
            }
            if(inputs[i].getAttribute("data-type") == 'email') {
                if(!checkEmail(inputs[i])){
                    uncorectData(inputs[i]);
                    return false;
                }
            }
        }
    }
});
