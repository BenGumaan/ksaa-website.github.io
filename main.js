(function($) {
    "use strict";
    $(window).on('load', function() { $('#preloader').delay(350).fadeOut('slow'); });
    $(document).on('mouseup', function(e) { var searchresuls = $(".sidebar-search"); if (!searchresuls.is(e.target) && searchresuls.has(e.target).length === 0) { $("#datafetch").hide(); } });
    $('#keyword').on('keyup', function(event) {
        $.ajax({ url: prolancerAjaxUrlObj.ajaxurl, type: 'POST', data: { action: 'prolancer_ajax_search', keyword: $('#keyword').val() }, success: function(data) { if ($('#keyword').val().length !== 0) { $('#datafetch').html(data); } else { $('#datafetch').html(''); } } });
        $("#datafetch").show();
    });
    $('.ajax-quick-view-popup').on('click', function(event) {
        event.preventDefault();
        $('.ajax-quick-view-popup i').removeClass('fa-search-plus').addClass('fa-spinner fa-spin');
        $.ajax({
            url: prolancerAjaxUrlObj.ajaxurl,
            type: 'POST',
            data: { action: 'prolancer_ajax_quick_view', productid: $(this).attr('data-product-id') },
            success: function(data) {
                $.magnificPopup.open({ items: { src: data, type: 'inline' }, closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>', });
                $('.ajax-quick-view-popup i').removeClass('fa-spinner fa-spin').addClass('fa-search-plus');
            }
        });
    });
    $('.site-header .custom-logo-link img, .top-header .custom-logo-link img').attr("srcset", prolancerAjaxUrlObj.alt_logo);
    $(window).on('scroll', function() {
        if ($(document).scrollTop() > 100) { $('.site-header .custom-logo-link img').attr("srcset", prolancerAjaxUrlObj.logo); } else { $('.site-header .custom-logo-link img').attr("srcset", prolancerAjaxUrlObj.alt_logo); }
        if ($(document).scrollTop() > 80) { $('.sticky-header,.off-canvas-menu-bar').addClass('fixed-top'); } else { $('.sticky-header,.off-canvas-menu-bar').removeClass('fixed-top'); }
    });
    $(".profile-frontend-switcher").on("click", function() {
        var visit_as = $(this).attr('data-visit-as');
        $.cookie('visit_as', visit_as, { expires: 365, path: '/' });
        location.reload(true);
    });
    var storage = window.localStorage;
    $(window).on('load', function() {
        setTimeout(function() { if (storage.getItem('modal_stop') !== 'true') { $('#newsletterModal').modal('show'); } }, $('#newsletterModal').data('time'));
        $('#dont-show').on('click', function() { if ($(this).is(":checked")) { storage.setItem('modal_stop', true); } });
        $('#dont-show-hour').on('click', function() {
            storage.setItem('modal_stop', true);
            $('#newsletterModal').modal('hide');
        });
    });
    $('.prolancer-accordion-item:first-child').addClass('active');
    $('.prolancer-accordion-item:first-child .collapse').addClass('show');
    $('.collapse').on('shown.collapse', function() { $(this).parent().addClass('active'); });
    $('.collapse').on('hidden.collapse', function() { $(this).parent().removeClass('active'); });
    if ($('.off-canvas-menu').length) {
        var mobileMenuContent = $('.desktop-menu>ul').html();
        $('.off-canvas-menu .navigation').append(mobileMenuContent);
        $('.mobile-nav-toggler').on('click', function() { $('body').addClass('off-canvas-menu-visible'); });
        $('.off-canvas-menu .menu-backdrop,.off-canvas-menu .close-btn').on('click', function() { $('body').removeClass('off-canvas-menu-visible'); });
    }
    $('.off-canvas-menu li.menu-item-has-children').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');
    $('.off-canvas-menu li.menu-item-has-children .dropdown-btn').on('click', function() { $(this).prev('ul').slideToggle(500); });
    $(window).on('scroll', function() { if ($(this).scrollTop() >= 700) { $('#backtotop').fadeIn(500); } else { $('#backtotop').fadeOut(500); } });
    $('#backtotop').on('click', function() { $('body,html').animate({ scrollTop: 0 }, 500); });
})(jQuery);