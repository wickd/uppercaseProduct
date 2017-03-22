Dropzone.autoDiscover = false;
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

$('document').ready(function () {
    $('#home-slider').slick({dots: true, arrows: false});
    $(".chosen-select").chosen({disable_search_threshold: 12});

    if ($('.dropzone').length) {
        var myDropzone = new Dropzone(".dropzone", {
            url: "some_upload_url ",
            addRemoveLinks: true
        });
        myDropzone.on("addedfile", function (file) {
            $('.dropzone').removeClass("error");
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
        if (!myDropzone.files.length > 0) {
            $(".dropzone").addClass("error");
        }
        if (valid_email && myDropzone.files.length > 0) {
            console.log('iuhuuu');
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
        if (valid_email && $('#message').val().trim().length <= 0) {
            console.log('iuhuuu');
        }

    });
    if ($('.details').length) {
        $(window).on('scroll', function (e) {
            console.log($(window).scrollTop());
            if ($(window).scrollTop() > 120) {
                $('body').addClass("fixed");
            } else {
                $('body').removeClass("fixed");
            }
        });
    }


});
function initMap() {
    var uluru = {lat: 47.0358392, lng: 28.8376207};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: uluru,
        disableDefaultUI: true,
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dadada"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c9c9c9"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            }
        ]
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon: '/assets/img/marker.png'
    });
}

