const SERVER_URL = "http://localhost:90";

(function($) {
  "use strict"; // Start of use strict

  function Lesson(title, content) {
    this.title = title;
    this.content = content;
        
  }

  function setContent(language) {
    var engLanguage = language === "en";
    var title = engLanguage ? "Learn Android" : "Изучение Андроида";
    $("title").text(title);
    $("#nav-header").text(title);

    $("#nav-lessons").text(engLanguage ? "Lessons" : "Уроки");
    $("#nav-contact").text(engLanguage ? "Contacts" : "Контакты");
    $("#homeHeading").text(engLanguage ? "Learn Android from scratch creating twitter client" 
                                        : "Изучаем андроид с нуля, создавая twitter клиент");
    $("#courses-overview").text(engLanguage ? "Register for courses right now. This part is absolutely free. After finishing them you will be able to write client for popular api like vk, facebook, instagram." : 
                                                    "Зарегистрируйтесь прямо сейчас. Этот курс абсолютно бесплатный. После его завершения вы сможете создавать клиенты для таких популярных сетей как vk, facebook, instagram.");

    $("#email-input").attr("placeholder", engLanguage ? "Enter your email" : "Введите свой email");
    $("#email-submit").attr("value", engLanguage ? "Register" : "Подтвердить");
    $("#lessons-program").text(engLanguage ? "Lessons Program" : "Программа уроков");

    var lessons_languages = {
        "en": [
                new Lesson("Lesson 1", "Installing Android Studio. Building Hello world"),
                new Lesson("Lesson 2", "Project Structure. Activity, AndroidManifest"),
                new Lesson("Lesson 3", "Layot types: Linear, Relative, Frame layout"),
                new Lesson("Lesson 4", "Views: Button, TextView, EditText. Access views from Java code."),
                new Lesson("Lesson 5", "Practise. Create Twitter User Info screen"),
                new Lesson("Lesson 6", "RecyclerView: principle of working. Adapter pattern"),
                new Lesson("Lesson 7", "Practise. Add tweets RecyclerView with objects stubs"),
                new Lesson("Lesson 8", "Practise. Navigation between activities, create tweet details screen."),
                new Lesson("Lesson 9", "Asynctask. What is Thread? Why can't do all work in one thread?"),
                new Lesson("Lesson 10", "Practise. Add auth logic using twitter-kit library"),
                new Lesson("Lesson 11", "Http. How to do GET, POST requests. Read response, convert to String."),
                new Lesson("Lesson 12", "JSON format. Convert string to JsonObject, parse it to POJO objects"),
                new Lesson("Lesson 13", "Practise. add httpRequest for reading UserInfo. Replace stub responses with real reponses"),
                new Lesson("Lesson 14", "Practise. add httpRequest for reading User Tweets. Replace stub responses with real  reponses"),
                new Lesson("Lesson 15", "Handling Exceptions: show error msg to User."),
        ],
        "ru": [
                new Lesson("Урок 1", "Установка Android Studio. Создание Hello world."),
                new Lesson("Урок 2", "Структура проекта.Activity, AndroidManifest."),
                new Lesson("Урок 3", "Типы Layout: Linear, Relative, Frame"),
                new Lesson("Урок 4", "Views: Button, TextView, EditText. Доступ к  views из Java кода."),
                new Lesson("Урок 5", "Практика. Создание экрана информации о пользователе."),
                new Lesson("Урок 6", "RecyclerView. Принцип работы. Adapter паттерн"),
                new Lesson("Урок 7", "Практика. Добавление твитов в RecyclerView используя заглушки объектов"),
                new Lesson("Урок 8", "Практика. Навигация между Активити, создание детального экрана твита."),
                new Lesson("Урок 9", "Asynctask. Что такое Thread? Почему нельзя всё сделать в одном Thread?"),
                new Lesson("Урок 10", "Практика. Добавление логики авторизация используя twitter-kit библиотеку"),
                new Lesson("Урок 11", "Http. Как сделать GET, POST запросы. Считывание ответа, преобразование к строке."),
                new Lesson("Урок 12", "Формат обмена данными JSON. Преобразование строки к формату JsonObject, к обычному Java объекту"),
                new Lesson("Урок 13", "Практика. Добавление http запросов для считывания информации о пользователе"),
                new Lesson("Урок 14", "Практика. Добавление http запросов для считывания твитов пользователя."),
                new Lesson("Урок 15", "Обработка ощибок. Показ сообщения об ошибке пользователю."),
        ]
      };

    var rowLessonsCount = 4
    var lessons = lessons_languages[language]    
    var lessonsHtml="";
    var rowWasOpened = false;
    

    $("#lessons-container").empty()

    for (var i = 0; i < lessons.length; i++) {

      var lesson = lessons[i]
      
      var needOpenRow =  (i + 1) % rowLessonsCount == 1 && !rowWasOpened;
      var needCloseRow = (i + 1) % rowLessonsCount == 0 && rowWasOpened;

      if(needOpenRow) {
        rowWasOpened = true;
        lessonsHtml += '<div class="row">'; 
        console.log("add row before " + lesson.title);
      }

      lessonsHtml += '<div class="col-lg-3 col-md-6 text-center">' +
              '<div class="service-box">' +
                '<h3>' + lesson.title+ '</h3>' +
                '<p class="text-muted">'+lesson.content+'</p>' +
              '</div>'+
            '</div>'; 

      
      if(needCloseRow) {
        rowWasOpened = false;
        lessonsHtml += '</div>'
        console.log("add row after " + lesson.title) 
      }

    }
    
    $("#lessons-container").append(lessonsHtml);
  }  

//update this with your $form selector
$(window).on('load', function() {

// by default
setContent("ru")


var form_id = "email_form";

function onSuccess(data) {
    // remove this to avoid redirect
    console.log("onSuccess " + JSON.stringify(data));
    sendButton.prop('disabled',false);
}

function onError(error) {
    // remove this to avoid redirect
    console.log("onError")
    sendButton.prop('disabled',false);
}

var sendButton = $("#" + form_id + " [name='send']");

function send() {
    sendButton.prop('disabled',true);

    var message = $("#" + form_id + " [name='clientEmail']").val();
    var data = {
        "email" : message
    };

    console.log("Sent " + JSON.stringify(data));
    $.post(SERVER_URL,
        JSON.stringify(data),
        onSuccess
    ).fail(onError);

    return false;
}

  sendButton.on('click', send);

  var $form = $("#" + form_id);
  $form.submit(function( event ) {
      event.preventDefault();
  });
});  


  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 48
  });

  // Collapse the navbar when page is scrolled
  $(window).scroll(function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  });

  // Scroll reveal calls
  window.sr = ScrollReveal();
  sr.reveal('.sr-icons', {
    duration: 600,
    scale: 0.3,
    distance: '0px'
  }, 200);
  sr.reveal('.sr-button', {
    duration: 1000,
    delay: 200
  });
  sr.reveal('.sr-contact', {
    duration: 600,
    scale: 0.3,
    distance: '0px'
  }, 300);

  // Magnific popup calls
  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });

})(jQuery); // End of use strict
