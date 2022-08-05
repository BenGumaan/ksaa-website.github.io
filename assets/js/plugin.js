(function($) {
    "use strict";
    $('.sellers').slick({
        // arrows: true,
        infinite: true,
        rtl: true,
        // centerMode: true,
        // centerPadding: '50px',
        responsive: [
            {
            breakpoint: 1500,
            settings: { slidesToShow: 3, slidesToScroll: 3 }
            }, {
                breakpoint: 1040,
                settings: { slidesToShow: 2, slidesToScroll: 2 }
            }, {
                breakpoint: 480,
                settings: { slidesToShow: 1, slidesToScroll: 1 }
            }
        ],
        // nextArrow: '<i class="fas fa-chevron-right"></i>',
        // prevArrow: '<i class="fas fa-chevron-left"></i>',
    });
})(jQuery);