// INFO PAGE
router.route('info', function() {

    setHeaderLinkColor(2);

    if(!document.querySelector("link[href='css/info.css']")) {

        var style = document.createElement("link"); // add style to main page
        style.rel = "stylesheet";
        style.href = "css/info.css";
        head.appendChild(style);

    }

    var info = {
        headers:['Молодым специалистам', 'IT компаниям', 'ВУЗам'],
        paragraphs:['Выпускникам ВУЗов, которые хотят заниматься разработкой ПО в IT компаниях и соответствовать высоким профессиональным требованиям этих компаний.',
            'Хорошие результаты тестирования по ключевым технологиям - это показатель, позволяющий меньше времени и сил тратить на проверку базовых знаний кандидата на вакансию разработчика в компании. Это инструмент, который способен значительно повысить эффективность работы отдела по поиску и подбору специалистов.',
            'TEST YOUR KNOWLEDGES может использоваться в учебном процессе при подготовке программистов для оценки уровня знаний по отдельным технологиям.']
    }

    mainContent.innerHTML = window.Templates.Info(info);
});