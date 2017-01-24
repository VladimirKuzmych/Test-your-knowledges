// HOME PAGE
router.route('', function() {

        setHeaderLinkColor(0);

        var main = {
            slides:['images/slider/test.jpg', 'images/slider/books.jpg','images/slider/einstein.jpg',
                'images/slider/think.jpg','images/slider/tree.jpg'],
            paragraphs:[
                'Test Your Knowledges - сервис для проверки технических и школьных знаний через интернет. Он поможет вам организовать онлайн тестирование знаний, провести оценку качества знаний учащихся, промежуточную или итоговую аттестацию студентов.',
                'Онлайн тестирование знаний является самым современным способом использования тестов. Оно пришло на замену бумажных тестов и обычных компьютерных программ. Тестирование может быть применено как для подготовки учащихся, так и для проведения итоговых и промежуточных проверок знаний.',
                'Таким образом, автоматизация процесса тестирования - одна из приоритетных задач на пути повышения качества образования. Серьезный подход к данной задаче значительно сэкономит вам время и деньги.']
        };
        mainContent.innerHTML = window.Templates.Home(main);

        var sliderElem = document.querySelector(".slider");
        var sliderImages = document.querySelectorAll(".slider__image");
        var sliderImagesWrapper = document.querySelector(".slider__images-wrapper");
        var imageWidth = sliderImagesWrapper.clientWidth;
        sliderElem.style.height = imageWidth / 1.75 + "px";

        var resize = function(){ // Responsive slider
            imageWidth = sliderImagesWrapper.clientWidth;
            sliderElem.style.height = imageWidth / 1.75 + "px";
            changeFontSize();
        }

        window.addEventListener('resize', resize, false);
        window.addEventListener('load', resize, false);

        sliderElem.onmousedown = function(){ // cancel selecting
            return false;
        }
        sliderImagesWrapper.onmouseover = function(){
            clearTimeout(sliderInterval);
        }
        sliderImagesWrapper.onmouseout = function(){
            sliderInterval = setInterval(function(){
                animation(indexSlide, 1);
            },5000);
        }

        sliderImages[0].style.opacity = "1";
        sliderImages[0].style.filter = "alpha(opacity=100)"; // IE 8

        var indexSlide = 0; // current slide
        function animation(index, inc_dec){
            sliderImages[index].style.opacity = "0";
            sliderImages[index].style.filter = "alpha(opacity=0)";
            if(inc_dec > 0) { //Animation Right
                if(index == sliderImages.length - 1) index = -1;
                index++;
            }
            else { //Animation Left
                if(index === 0) index = sliderImages.length;
                index--;
            }
            sliderImages[index].style.opacity = "1";
            sliderImages[index].style.filter = "alpha(opacity=100)";
            indexSlide = index; // change current slide
        }

        var sliderInterval = setInterval(function(){
            animation(indexSlide, 1);
        },5000);

        var sliderArrowContainerLeft = document.querySelector(".slider__arrow-container_left");
        var sliderArrowContainerRight = document.querySelector(".slider__arrow-container_right");

        sliderArrowContainerLeft.onclick = function(){
            clearTimeout(sliderInterval);
            animation(indexSlide, -1);
            sliderInterval = setInterval(function(){
                animation(indexSlide, 1);
            },5000);
        }
        sliderArrowContainerRight.onclick = function(){
            clearTimeout(sliderInterval);
            animation(indexSlide, 1);
            sliderInterval = setInterval(function(){
                animation(indexSlide, 1);
            },5000);
        };

        var startButton = document.querySelector(".start__button");
        startButton.onclick = function(){
            window.location.hash = "#tests/1";
        };

        window.addEventListener('hashchange', function() {
            clearTimeout(sliderInterval); // stop animation
        }, false);

});