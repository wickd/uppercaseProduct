(function($){
    if(maps && Object.keys(maps).length)
    {
        $.each(maps, (map, fn) => {
            // Init all gmaps from page.
            fn(map);
        });
    }

})(jQuery);