Dropzone.autoDiscover = false;
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
var body = $('body');
$('document').ready(function () {
    var input = $("input[name=cv]");
    $('#home-slider').slick({dots: true, arrows: false});
    $(".chosen-select").chosen({disable_search_threshold: 12});

    $("#upload_cv").on("click", function() {
        input.click();
    });

    if ($('.dropzone').length) {
        var myDropzone = new Dropzone(".dropzone", {
            url: "some_upload_url ",
            maxFiles: 1,
            autoProcessQueue : false,
            addRemoveLinks: true
        });
        myDropzone.on("addedfile", function (file) {
            console.log('file is added');
            input.click();

            $('.dropzone').removeClass("error");

            return;
        });

        myDropzone.on("drop", function (file) {
            input.click();
            return;
            // $('.dropzone').removeClass("error");
        });

        myDropzone.on("click", function (file) {
            input.click();
            return;
            // $('.dropzone').removeClass("error");
        });
    }
    var valid_email = false;
    $("form input,form textarea").bind("change keyup", function () {
        if ($(this)[0].type === 'email') {
            if (validateEmail($(this).val())) {
                $(this).removeClass("error");
                $(this).addClass("non-empty");
                valid_email = true;

            } else {
                $(this).removeClass("non-empty");
                $(this).addClass("error");
                valid_email = true;
            }
        } else {
            if ($(this).val().trim().length > 0) {
                $(this).removeClass("error");
                $(this).addClass("non-empty");
            }
            else
                $(this).removeClass("non-empty");
        }
    });
    $('#careers-form-submit').on("click", function (e) {

        e.preventDefault();
        e.stopPropagation();

        if (!valid_email) {
            $("#email").addClass("error");
        }
        // if (!myDropzone.files.length > 0) {
        //     $(".dropzone").addClass("error");
        // }
        // if (valid_email && myDropzone.files.length > 0)
        // {
        //     $(this).closest('form').submit();
        //     // console.log('iuhuuu');
        // }

        if(valid_email)
        {
            $(this).closest('form').submit();
        }

    });
    $('#contact-form-submit').on("click", function (e) {

        e.preventDefault();
        e.stopPropagation();

        if (!valid_email) {
            $("#contact-email").addClass("error");
        }
        if ($('#message').val().trim().length <= 10) {
            $("#message").addClass("error");
        }

        if (valid_email && $('#message').val().trim().length >= 0) 
        {
            $(this).parents('form').submit();
        }

    });
    if ($('.details').length && $(window).width() > 767) {
        $(window).on('scroll', function (e) {
            var top = 120;
            if ($(window).width() < 768) {
                top = 65;
            }
            if ($(window).scrollTop() > top) {
                body.addClass("fixed");
            } else {
                body.removeClass("fixed");
            }
        });
    }
    body.on('click', '.mobile-menu', function () {
        body.addClass('no-scroll');
        $('header .right').fadeIn();
    });
    body.on('click', '.close-menu', function () {
        body.removeClass('no-scroll');
        $('header .right').fadeOut();
    });
    $(document).mouseup(function (e) {
        var container = $("header .right .menu");
        if ($(window).width() < 768) {
            if (!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0) // ... nor a descendant of the container
            {
                body.removeClass('no-scroll');
                $('header .right').fadeOut();
            }
        }


    });
    body.on('click', '.go-back', function () {
        window.history.back();
    });
});
function initMap() {
    var uluru = {lat: 47.0358392, lng: 28.8376207};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: uluru,
        disableDefaultUI: true,

    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon: '/assets/img/marker.png'
    });
}