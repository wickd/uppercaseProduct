(function ($) {
    $(document).ready(function () {
        //$.get("/dashboard/settings/skin", function (data) {
        //  if (!$('body').hasClass('no-skin-config'))
        //    $('body').append(data);
        //});

        $('.footable').footable();
    });

    $(document).ready(function () {
        // $('*[data-checkbox="iCheck"]').iCheck({
        $('*[data-checkbox="iCheck"]').iCheck({
            checkboxClass: 'icheckbox_square-green',
            increaseArea: '20%'
        });

        // $('.iCheck-helper').on("click", () => {
        //     let input = $(this).parent().find('input[type="checkbox"]');
        //
        //     if(input.is(":checked") == true)
        //     {
        //         input.attr('value', 1);
        //     } else {
        //         input.prop('checked', true);
        //
        //         input.attr('value', 0);
        //     }
        // });
    });

    $(document).ready(function () {
        // $('*[data-checkbox="iCheck"]').iCheck({
        $('*[data-input_type="datepicker"]').iCheck({
            checkboxClass: 'icheckbox_square-green',
            increaseArea: '20%'
        });
    });

    // activate language switcher
    $('button[data-locale]').click(function() {
        var fn = $(this), locale = fn.data('locale'),
            trans_block = fn.closest('.translatable-block');

        trans_block
            .find('button.active')
            .removeClass("active");

        fn.addClass("active");

        var translatable = trans_block.find('.translatable');

        translatable.map(function(index, item) {
            var fn = $(item);
            if (fn.data('locale') == locale) {
                fn.removeClass('hidden');
            } else {
                fn.addClass('hidden');
            }
        });
    });
})(jQuery);