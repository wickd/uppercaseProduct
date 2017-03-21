Dropzone.autoDiscover = false;
$('document').ready(function () {
    $('#home-slider').slick({dots: true, arrows: false});
    $(".chosen-select").chosen({disable_search_threshold: 12});

    if ($('.dropzone').length) new Dropzone(".dropzone", {
        url: " some_upload_url ",
        addRemoveLinks: true,
        previewContainer: '#preview',
    });
    $("form input,form textarea").keyup(function () {
        if ($(this).val().trim().length > 0)
            $(this).addClass("non-empty");
        else
            $(this).removeClass("non-empty");
    });
});