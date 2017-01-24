window.Templates = (function() { // add all templates here

    var templateElements = document.querySelectorAll('script[type="text/template"]');
    var compiledTemplates = {};

    Array.prototype.forEach.call(templateElements, function(templateElement) {

        var templateName = templateElement.getAttribute('data-name');
        var templateString = templateElement.innerHTML;
        compiledTemplates[templateName] = _.template(templateString);

    });

    return compiledTemplates;
})();

var previousPath = window.location.hash; // this variables are defined for comparing
var currentPath = window.location.hash; // pathes in "tests" route (if .../1, .../2 etc.) we will not change our tests

window.addEventListener('hashchange', function(){
    previousPath = currentPath;
    currentPath = window.location.hash;
},false);

var navLinks = document.querySelectorAll(".header__menu > .menu__item > .menu__link"); // main menu links

function setHeaderLinkColor(index){ // show what page is active
    for(var i = 0; i < navLinks.length; i++){
        if(i != index){
            navLinks[i].style.color = "";
            navLinks[i].parentNode.style.borderColor = "";
        }
        else {
            navLinks[i].style.color = "black";
            navLinks[i].parentNode.style.borderColor = "gray";
        }
    }
}

var head = document.querySelector("head");

var testsAllData; // global variable that saves all tests's data
var testsData = {}; // variable that saves all tests's data for current queries(filter, sort, searching)

var mainContent = document.querySelector('.mainContent');
var router = new window.Router();

router.notFound(function() {
    mainContent.innerHTML = window.Templates.NotFound({});
});

router.route('', function() {

    if(!document.querySelector("script[src='js/pagesActions/home.js']")){

        var script = document.createElement("script"); // add style to tests page
        script.src = "js/pagesActions/home.js";
        document.body.appendChild(script);

        script.onreadystatechange = script.onload = function(){
            router.toPath("");
        }

    }

});

router.route('tests', function() {

    if(!document.querySelector("script[src='js/pagesActions/tests.js']")){

        var script = document.createElement("script"); // add style to tests page
        script.src = "js/pagesActions/tests.js";
        document.body.appendChild(script);

        script.onreadystatechange = script.onload = function(){
            router.toPath(currentPath.slice(1));
        }

    }

});

router.route('info', function() {

    if(!document.querySelector("script[src='js/pagesActions/info.js']")){

        var script = document.createElement("script"); // add style to tests page
        script.src = "js/pagesActions/info.js";
        document.body.appendChild(script);

        script.onreadystatechange = script.onload = function(){
            router.toPath("info");
        }

    }

});

router.route('team', function() {

    if(!document.querySelector("script[src='js/pagesActions/team.js']")){

        var script = document.createElement("script"); // add style to tests page
        script.src = "js/pagesActions/team.js";
        document.body.appendChild(script);

        script.onreadystatechange = script.onload = function(){
            router.toPath("team");
        }

    }

});

router.route('contacts', function() {

    if(!document.querySelector("script[src='js/pagesActions/contacts.js']")){

        var script = document.createElement("script"); // add style to tests page
        script.src = "js/pagesActions/contacts.js";
        document.body.appendChild(script);

        script.onreadystatechange = script.onload = function(){
            router.toPath("contacts");
        }

    }

});

router.route('login', function() {

    if(!document.querySelector("script[src='js/pagesActions/login.js']")){

        var script = document.createElement("script"); // add style to tests page
        script.src = "js/pagesActions/login.js";
        document.body.appendChild(script);

        script.onreadystatechange = script.onload = function(){
            router.toPath("login");
        }

    }

});

var searchInput = document.querySelector(".search__input");
var search = document.querySelector(".search");
var formSubmitPermit = 1;

search.onsubmit = function(){
    if(!searchInput.value.length) return false;
    if(formSubmitPermit){ // permit submitting of form one time a second

        if(/\d+$/.test(searchInput.value) || ~searchInput.value.indexOf("sorted")){ // digits's path return paginated page of tests
            mainContent.innerHTML = '<div class = "tests">' +
                '<p class = "tests__nofound">По Вашему запросу' +
                '<span class = "tests__query"> ' + searchInput.value + ' </span> результатов не найдено </p>' +
                '<p class = "tests__all">' +
                '<a href = "#tests/1" class = "tests__all-link" onclick = "router.toPath(\"tests/1\")">' +
                    'Перейти ко всем тестам' +
                '</a></p></div>';
        } else window.location.hash = '#tests/' + searchInput.value + "/1";

        searchInput.value = "";
        formSubmitPermit = 0;
        setTimeout(function(){
            formSubmitPermit = 1;
        },1000);
    }
    return false;
};

function uncorectData(input){ // if input of form is empty (registration and question)
    input.style.background = "salmon";
    input.focus();
    setTimeout(function(){
        input.style.background = "";
    },500);
}

function checkEmail(input){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input.value);
}

function changeFontSize(){
    var mainPageImage = document.querySelector(".header__image");
    if(document.body.clientWidth > 1920){
        document.body.style.fontSize = "20px";
    }
    else{
        document.body.style.fontSize = mainPageImage.style.width = "";
    }
}

function changeHeaderSize() { // Responsive for IE 8
    if (navigator.userAgent.toLowerCase().indexOf('msie') != -1) {
        if (!document.createElement('SVG').getAttributeNS) {
            //the browser is IE8

            var headerImage = document.querySelector(".header__image");
            var menu = document.querySelector(".header__menu");

            if (document.body.clientWidth < 1080) {

                headerImage.style.cssFloat = "none";
                menu.style.display = "block";

            }

            else {

                headerImage.style.cssFloat = "";
                menu.style.display = "";

            }
        }
    }
}

window.addEventListener('load', function() {
    router.toPath(window.location.hash.slice(1));
    changeFontSize();
    changeHeaderSize();
}, false);
window.addEventListener('resize', function() {
    changeFontSize();
    changeHeaderSize();
}, false);
window.addEventListener('hashchange', function() {
    router.toPath(window.location.hash.slice(1));
    window.scrollTo(0,0);
}, false);