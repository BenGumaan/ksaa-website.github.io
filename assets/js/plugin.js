(function($) {
    "use strict";
    $('#services').slick({
        // arrows: true,
        infinite: true,
        rtl: true,
        // centerMode: true,
        // variableWidth: true,
        // slickGoTo: 3,
        // centerMode: true,
        // centerPadding: '50px',
        responsive: [{
            breakpoint: 1550,
            settings: { slidesToShow: 3, slidesToScroll: 1 }
        }, {
            breakpoint: 1024,
            settings: { slidesToShow: 2, slidesToScroll: 1 }
        }, {
            breakpoint: 580,
            settings: { slidesToShow: 1, slidesToScroll: 1 }
        }],
        // nextArrow: '<i class="fas fa-chevron-right"></i>',
        // prevArrow: '<i class="fas fa-chevron-left"></i>',
    });
    $('#experts').slick({
        infinite: true,
        rtl: true,
        responsive: [{
            breakpoint: 1500,
            settings: { slidesToShow: 3, slidesToScroll: 1 }
        }, {
            breakpoint: 1024,
            settings: { slidesToShow: 2, slidesToScroll: 1 }
        }, {
            breakpoint: 580,
            settings: { slidesToShow: 1, slidesToScroll: 1 }
        }],
    });
})(jQuery);



// arrows: true,
// infinite: true,
// rtl: true,
// centerMode: true,
// variableWidth: true,
// slickGoTo: 3,
// centerMode: true,
// centerPadding: '50px',
// nextArrow: '<i class="fas fa-chevron-right"></i>',
// prevArrow: '<i class="fas fa-chevron-left"></i>',
// responsive: [{
//     breakpoint: 1600,
//     settings: { slidesToShow: 3, slidesToScroll: 1 }
// }, {
//     breakpoint: 1024,
//     settings: { slidesToShow: 2, slidesToScroll: 1 }
// }, {
//     breakpoint: 580,
//     settings: { slidesToShow: 1, slidesToScroll: 1 }
// }]