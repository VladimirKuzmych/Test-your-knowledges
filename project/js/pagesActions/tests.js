var testsAllData; // global variable that saves all tests's data
var testsData = {}; // variable that saves all tests's data for current queries(filter, sort, searching)

// TESTS PAGE
router.route('tests', function() {

    setHeaderLinkColor(1);

    var startTest = false;

    var arrPath = window.location.hash.slice(1).split("/");

    if (arrPath[arrPath.length - 1] === "[-start-]") startTest = arrPath.pop();

    if(!startTest) {

        if (!testsAllData) {

            var testsxhr = new XMLHttpRequest();

            testsxhr.open('GET', 'data/testsNames.json', true);

            testsxhr.send();

            testsxhr.onreadystatechange = function() {
                if (testsxhr.readyState != 4) return;

                if (testsxhr.status != 200) {
                    // error
                    mainContent.innerHTML = "<div class = 'error'>" +
                        "<p>Произошла ошибка! Тесты недоступны (((</p>" +
                        "<p>Извините за неудобства</p>" +
                        "<p><button class = 'button' onClick='history.back();'>" +
                        "&#8592;Вернуться назад</button></p></div>";

                } else {

                    testsAllData = JSON.parse(testsxhr.responseText); // save JSON object in global variable testsAllData
                    renderTests();

                }

            };

        }
        else renderTests();

        function renderTests() {

            var paginationPage = false;
            var sortedAlph, sortedReverseAlph, sortedSmallToBig, sortedBigToSmall;

            if (/^\d+$/.test(arrPath[arrPath.length - 1])) paginationPage = arrPath.pop();

            else {
                router.toPath(window.location.hash.slice(1) + "/1");
                return;
            }

            if(currentPath.replace(/\d+$/, "") !== previousPath.replace(/\d+$/, "") || currentPath === previousPath) {
                // rerecord all tests and apply filters and sortings
                testsData.tests = testsAllData.tests;

                if (arrPath[1] == "sortedAlph") sortedAlph = arrPath.splice(1, 1); // delete "sortedAlph" from path
                else if (arrPath[1] == "sortedReverseAlph") sortedReverseAlph = arrPath.splice(1, 1);// delete "sortedReverseAlph" from path
                else if (arrPath[1] == "sortedSmallToBig") sortedSmallToBig = arrPath.splice(1, 1); // delete "sortedSmallToBig" from path
                else if (arrPath[1] == "sortedBigToSmall") sortedBigToSmall = arrPath.splice(1, 1);// delete "sortedBigToSmall" from path

                for (var i = 1; i < arrPath.length; i++) {
                    testsData.tests = testsData.tests.filter(function (test) {
                        return !!~test.name.toLowerCase().indexOf(arrPath[i].toLowerCase()); //searching and filtering
                    });
                }

                if (sortedAlph) testsData.tests = testsData.tests.slice().sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    return -1;
                });
                else if (sortedReverseAlph) testsData.tests = testsData.tests.slice().sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                    return 1;
                });
                else if (sortedSmallToBig) testsData.tests = testsData.tests.slice().sort(function (a, b) {
                    return a.questionsCount - b.questionsCount;
                });
                else if (sortedBigToSmall) testsData.tests = testsData.tests.slice().sort(function (a, b) {
                    return b.questionsCount - a.questionsCount;
                });

            }

            var testsCurrentData = {};
            testsCurrentData.tests = [];
            testsCurrentData.paginationCount = 0;
            testsCurrentData.currentPage = paginationPage;

            if (testsData.tests.length > 12) { // pagination
                var pagesCount = Math.ceil(testsData.tests.length / 12);
                if (paginationPage < pagesCount && paginationPage > 0) {
                    testsCurrentData.paginationCount = pagesCount;
                    testsCurrentData.tests = testsData.tests.slice((paginationPage - 1) * 12, (paginationPage * 12));
                }
                else if (paginationPage == pagesCount && paginationPage > 0) {
                    testsCurrentData.paginationCount = pagesCount;
                    testsCurrentData.tests = testsData.tests.slice((paginationPage - 1) * 12);
                }
                else {
                    mainContent.innerHTML = window.Templates.NotFound({});
                    return;
                }
            }
            else { // tests.length < 12
                if(paginationPage && paginationPage != 1){
                    mainContent.innerHTML = window.Templates.NotFound({});
                    return;
                }
                else testsCurrentData.tests = testsData.tests.slice();
            }

            mainContent.innerHTML = window.Templates.Tests(testsCurrentData);

            var sort = document.querySelector(".sort");
            var filter = document.querySelector(".filter");

            if(filter) {
                filter.onchange = function () {
                    
                    var path = window.location.hash.replace(/(basic|intermediate|hard)\//, "").replace(/\d+$/, "1");

                    var indexToPaste = 7; // if sort - change index; 7 - "#tests/".length
                    if (sortedAlph) indexToPaste += 'sortedAlph/'.length;
                    else if (sortedReverseAlph) indexToPaste += 'sortedReverseAlph/'.length;
                    else if (sortedSmallToBig || sortedBigToSmall) indexToPaste += 'sortedSmallToBig/'.length;
                    if (this.selectedIndex == 0) {
                        window.location.hash = path;
                    }
                    else if (this.selectedIndex == 1) {
                        window.location.hash = path.slice(0, indexToPaste) + "basic/" + path.slice(indexToPaste);
                    }
                    else if (this.selectedIndex == 2) {
                        window.location.hash = path.slice(0, indexToPaste) + "intermediate/" + path.slice(indexToPaste);
                    }
                    else {
                        window.location.hash = path.slice(0, indexToPaste) + "hard/" + path.slice(indexToPaste);
                    }
                    return;
                };
            }

            if(sort) {
                sort.onchange = function () {
                    //remove sorts from path
                    var path = window.location.hash.replace(/sorted\w+\//, "").replace(/\d+$/, "1");// to first page

                    if (this.selectedIndex == 0) {
                        window.location.hash =  path;
                    }
                    else if (this.selectedIndex == 1) {
                        window.location.hash = path.slice(0, 7) + "sortedAlph/" + path.slice(7);
                    }
                    else if (this.selectedIndex == 2) {
                        window.location.hash = path.slice(0, 7) + "sortedReverseAlph/" + path.slice(7);
                    }
                    else if (this.selectedIndex == 3) {
                        window.location.hash = path.slice(0, 7) + "sortedSmallToBig/" + path.slice(7);
                    }
                    else if (this.selectedIndex == 4) {
                        window.location.hash = path.slice(0, 7) + "sortedBigToSmall/" + path.slice(7);
                    }
                    return;
                };
            }

            function changeColumnCount() { // responsive ie8
                if (navigator.userAgent.toLowerCase().indexOf('msie') != -1) {
                    if (!document.createElement('SVG').getAttributeNS) {

                        //the browser is IE8

                        var testItems = document.querySelectorAll(".tests__item");

                        if (testItems[0]) {
                            if (document.body.clientWidth < 640) {
                                for (var i = 0; i < testItems.length; i++) {
                                    testItems[i].style.width = "94%";
                                }
                            }
                            else if (document.body.clientWidth < 960) {
                                for (i = 0; i < testItems.length; i++) {
                                    testItems[i].style.width = "45%";
                                }
                            }
                            else if (document.body.clientWidth < 1920) {
                                for (i = 0; i < testItems.length; i++) {
                                    testItems[i].style.width = "";
                                }
                            }
                            else {
                                for (i = 0; i < testItems.length; i++) {
                                    testItems[i].style.width = "20%";
                                }
                            }
                        }
                    }
                }
            }

            changeColumnCount();

            window.addEventListener('resize', function () {
                changeColumnCount();
            });
        }
    }
    else { // start test if hash ends "[-start-]"

        var startTestXHR = new XMLHttpRequest(); //get JSON with test

        var testURL = "data/" + window.location.hash.slice(7, window.location.hash.length - 10).replace(/\//g, " ").toLowerCase() + ".json"; // from index after "#tests/" and before "/[-start-]"
        startTestXHR.open('GET', testURL, true);

        startTestXHR.send();
        startTestXHR.onreadystatechange = function () {
            if (startTestXHR.readyState != 4) return;
            if (startTestXHR.status != 200) { // Error
                mainContent.innerHTML = "<div class = 'error'><p>К сожалению, тест еще не готов или недоступен(((</p><p><button class = 'button' onClick='history.back();'>&#8592;Вернуться назад</button></p></div>"
            } else {
                startTestNow(JSON.parse(startTestXHR.responseText));
            }
        };

        function startTestNow(questions) {

            mainContent.innerHTML = window.Templates.StartTest(questions);

            var milisecondsLeft = questions.time * 60 * 1000;
            var timerOutput = document.querySelector(".quiz__time");
            var timeSwitcher = document.querySelector(".quiz__time-switcher"); // checkbox
            var timeIsLeft; // variable that check when time is left in quizEnd()

            var quizClock = setInterval(function () { // TIMER

                var minutes = Math.floor(milisecondsLeft / 60000) + "";
                if (minutes.length == 1) minutes = 0 + minutes;

                var seconds = Math.floor(milisecondsLeft / 1000 % 60) + "";
                if (seconds.length == 1) seconds = 0 + seconds;

                timerOutput.innerHTML = minutes + ":" + seconds;

                if (milisecondsLeft ==  1000 * 60) {
                    timerOutput.style.visibility = "visible";
                    timeSwitcher.checked = "checked";
                }

                if (milisecondsLeft <= 0) {
                    timeIsLeft = true;
                    quizEnd();
                }

                milisecondsLeft -= 1000;
            }, 1000);

            window.addEventListener('hashchange', function () {
                clearTimeout(quizClock);
            }, false);

            timeSwitcher.onclick = function () { // show / hide timer
                if (getComputedStyle(timerOutput).getPropertyValue("visibility") === "visible") {
                    timerOutput.style.visibility = "hidden";
                }
                else timerOutput.style.visibility = "visible";
            };

            var endButton = document.querySelector(".quiz__button_end");
            var backButton = document.querySelector(".quiz__button_back");
            var forwardButton = document.querySelector(".quiz__button_forward");
            var showStatsButton = document.querySelector(".quiz__button_show-stats");
            var toTestsButton = document.querySelector(".quiz__button_to-tests");
            var quizResult = document.querySelector(".quiz__result");
            var questionItems = document.querySelectorAll(".question");

            var visibleQuestionIndex = 0; // the first question is visible
            questionItems[visibleQuestionIndex].style.display = "block";

            forwardButton.onclick = function () { // hide and show questions
                if (visibleQuestionIndex < questionItems.length - 1) {
                    questionItems[visibleQuestionIndex].style.display = "";
                    questionItems[++visibleQuestionIndex].style.display = "block";
                    if (visibleQuestionIndex == questionItems.length - 1) {
                        forwardButton.style.cursor = "default";
                        forwardButton.style.opacity = "0.2";
                        forwardButton.style.filter = "alpha(opacity=20)";
                    }
                }
                if (visibleQuestionIndex == 1) {
                    backButton.style.opacity = "1";
                    backButton.style.filter = "alpha(opacity=100)";
                    backButton.style.cursor = "pointer";
                }
            };

            backButton.onclick = function () {  // hide and show questions
                if (visibleQuestionIndex > 0) {
                    questionItems[visibleQuestionIndex].style.display = "";
                    questionItems[--visibleQuestionIndex].style.display = "block";
                    if (visibleQuestionIndex === 0) {
                        backButton.style.cursor = "default";
                        backButton.style.opacity = "0.2";
                        backButton.style.filter = "alpha(opacity=20)";
                    }
                }
                if (visibleQuestionIndex == questionItems.length - 2) {
                    forwardButton.style.opacity = "1";
                    forwardButton.style.filter = "alpha(opacity=100)";
                    forwardButton.style.cursor = "pointer";
                }
            };

            function quizEnd() { // count points

                var result = 0;
                var uncheckedQuestions = [];

                for (var i = 0; i < questionItems.length; i++) {

                    var inputs = questionItems[i].querySelectorAll(".question__input");
                    var correctInputs = questionItems[i].querySelectorAll(".question__input[data-correct = '1']");
                    var correctInputsCount = correctInputs.length;
                    var checkedCount = 0;

                    questionItems[i].style.display = "none";

                    for (var j = 0; j < inputs.length; j++) {
                        if (inputs[j].checked) checkedCount++;
                    }

                    if(!checkedCount) uncheckedQuestions.push(i + 1); // add unchecked question

                    for (var k = 0; k < correctInputsCount; k++) {

                        if (correctInputs[k].checked) {
                            if (checkedCount > correctInputsCount) result += 1 / checkedCount;
                            else result += 1 / correctInputsCount; // only Math, nothing else
                        }

                    }

                }
                if(!timeIsLeft){
                    if(uncheckedQuestions.length) var conf = confirm("Вы не ответили на вопрос №" +
                        uncheckedQuestions + ". Вернуться к выполнению этих заданий?");
                }

                if(conf) {

                    forwardButton.style.display = backButton.style.display = endButton.style.cssFloat = "none";

                    for (i = 0; i < uncheckedQuestions.length; i++) {
                        questionItems[uncheckedQuestions[i] - 1].style.display = "block"; // set visible unchecked questions
                    }

                }

                else {

                    clearTimeout(quizClock);
                    document.querySelector(".quiz__timer").style.display = "none";

                    result = Math.round(result * 100) / 100; // remove bit's inexactitude
                    var percentage = Math.round(result / questionItems.length * 10000) / 100;

                    forwardButton.style.display = backButton.style.display = endButton.style.display = "none";

                    showStatsButton.style.display = toTestsButton.style.display = "inline-block";
                    quizResult.innerHTML = "Ваш результат - " + result + " из " + questionItems.length +
                        " (" + percentage + "%)";

                    showStatsButton.onclick = function () {
                        this.style.display = "none";
                        for (var i = 0; i < questionItems.length; i++) {
                            questionItems[i].style.display = "block";

                            var inputs = questionItems[i].querySelectorAll(".question__input");
                            var correctInputs = questionItems[i].querySelectorAll(".question__input[data-correct = '1']");

                            for (var j = 0; j < inputs.length; j++) {
                                inputs[j].setAttribute("disabled", "disabled");
                                inputs[j].parentNode.style.color = "gray";
                                if (inputs[j].checked) {
                                    inputs[j].parentNode.style.outline = "1px solid red";
                                    inputs[j].parentNode.style.color = "red";
                                }
                                if (inputs[j].getAttribute("data-correct") == 1) {
                                    inputs[j].parentNode.style.color = "lime";
                                    if (inputs[j].checked) inputs[j].parentNode.style.outlineColor = "lime";
                                }
                            }
                        }
                    }
                }
            }
            endButton.onclick = quizEnd;
        }
    }
});

