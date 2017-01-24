router.route('team', function() {

    setHeaderLinkColor(3);

    if(!document.querySelector("link[href='css/team.css']")) {

        var style = document.createElement("link"); // add style to main page
        style.rel = "stylesheet";
        style.href = "css/team.css";
        head.appendChild(style);

    }

    var team = {
        people: ["Олег Евдокимов", "Павел Сорокин", "Ирина Наумова", "Фаина Ситникова",
            "Алёна Воронцова", "Гавриил Иванов","Денис Евсеев", "Инна Шубина",
            "Матвей Гуляев", "Валерий Ермаков", "Никита Панфилов", "Варвара Сысоева",
            "Людмила Кулакова", "Юлия Лобанова", "Марина Потапова", "Владимир Тихонов",
            "Евгения Хохлова", "Данила Трофимов", "Людмила Дьячкова", "Борис Казаков",
            "Жанна Бадина", "Андрей Кутовой", "Сергей Пынзарь", "Юрий Григорьев"
        ]
    };

    mainContent.innerHTML = window.Templates.Team(team);
});