! function(i) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery) }(function(i) {
    "use strict";
    var e = window.Slick || {};
    (e = function() {
        var e = 0;
        return function(t, o) {
            var s, n = this;
            n.defaults = { accessibility: !0, adaptiveHeight: !1, appendArrows: i(t), appendDots: i(t), arrows: !0, asNavFor: null, prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>', nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>', autoplay: !1, autoplaySpeed: 3e3, centerMode: !1, centerPadding: "50px", cssEase: "ease", customPaging: function(e, t) { return i('<button type="button" />').text(t + 1) }, dots: !1, dotsClass: "slick-dots", draggable: !0, easing: "linear", edgeFriction: .35, fade: !1, focusOnSelect: !1, focusOnChange: !1, infinite: !0, initialSlide: 0, lazyLoad: "ondemand", mobileFirst: !1, pauseOnHover: !0, pauseOnFocus: !0, pauseOnDotsHover: !1, respondTo: "window", responsive: null, rows: 1, rtl: !1, slide: "", slidesPerRow: 1, slidesToShow: 1, slidesToScroll: 1, speed: 500, swipe: !0, swipeToSlide: !1, touchMove: !0, touchThreshold: 5, useCSS: !0, useTransform: !0, variableWidth: !1, vertical: !1, verticalSwiping: !1, waitForAnimate: !0, zIndex: 1e3 }, n.initials = { animating: !1, dragging: !1, autoPlayTimer: null, currentDirection: 0, currentLeft: null, currentSlide: 0, direction: 1, $dots: null, listWidth: null, listHeight: null, loadIndex: 0, $nextArrow: null, $prevArrow: null, scrolling: !1, slideCount: null, slideWidth: null, $slideTrack: null, $slides: null, sliding: !1, slideOffset: 0, swipeLeft: null, swiping: !1, $list: null, touchObject: {}, transformsEnabled: !1, unslicked: !1 }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
        }
    }()).prototype.activateADA = function() { this.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" }) }, e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) {
        var s = this;
        if ("boolean" == typeof t) o = t, t = null;
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function(e, t) { i(t).attr("data-slick-index", e) }), s.$slidesCache = s.$slides, s.reinit()
    }, e.prototype.animateHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({ height: e }, i.options.speed)
        }
    }, e.prototype.animateSlide = function(e, t) {
        var o = {},
            s = this;
        s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({ left: e }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({ top: e }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({ animStart: s.currentLeft }).animate({ animStart: e }, { duration: s.options.speed, easing: s.options.easing, step: function(i) { i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o)) }, complete: function() { t && t.call() } })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function() { s.disableTransition(), t.call() }, s.options.speed))
    }, e.prototype.getNavTarget = function() {
        var e = this,
            t = e.options.asNavFor;
        return t && null !== t && (t = i(t).not(e.$slider)), t
    }, e.prototype.asNavFor = function(e) {
        var t = this.getNavTarget();
        null !== t && "object" == typeof t && t.each(function() {
            var t = i(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0)
        })
    }, e.prototype.applyTransition = function(i) {
        var e = this,
            t = {};
        !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.autoPlay = function() {
        var i = this;
        i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
    }, e.prototype.autoPlayClear = function() {
        var i = this;
        i.autoPlayTimer && clearInterval(i.autoPlayTimer)
    }, e.prototype.autoPlayIterator = function() {
        var i = this,
            e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e))
    }, e.prototype.buildArrows = function() { var e = this;!0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" })) }, e.prototype.buildDots = function() {
        var e, t, o = this;
        if (!0 === o.options.dots) {
            for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
            o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active")
        }
    }, e.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) { i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "") }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
    }, e.prototype.buildRows = function() {
        var i, e, t, o, s, n, r, l = this;
        if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) {
            for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
                var d = document.createElement("div");
                for (e = 0; e < l.options.rows; e++) {
                    var a = document.createElement("div");
                    for (t = 0; t < l.options.slidesPerRow; t++) {
                        var c = i * r + (e * l.options.slidesPerRow + t);
                        n.get(c) && a.appendChild(n.get(c))
                    }
                    d.appendChild(a)
                }
                o.appendChild(d)
            }
            l.$slider.empty().append(o), l.$slider.children().children().children().css({ width: 100 / l.options.slidesPerRow + "%", display: "inline-block" })
        }
    }, e.prototype.checkResponsive = function(e, t) {
        var o, s, n, r = this,
            l = !1,
            d = r.$slider.width(),
            a = window.innerWidth || i(window).width();
        if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            s = null;
            for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
            null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l])
        }
    }, e.prototype.changeSlide = function(e, t) {
        var o, s, n, r = this,
            l = i(e.currentTarget);
        switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
            case "previous":
                s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                break;
            case "next":
                s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                break;
            case "index":
                var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
                break;
            default:
                return
        }
    }, e.prototype.checkNavigable = function(i) {
        var e, t;
        if (e = this.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1];
        else
            for (var o in e) {
                if (i < e[o]) { i = t; break }
                t = e[o]
            }
        return i
    }, e.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.cleanUpRows = function() {
        var i, e = this;
        e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i))
    }, e.prototype.clickHandler = function(i) {!1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault()) }, e.prototype.destroy = function(e) {
        var t = this;
        t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() { i(this).attr("style", i(this).data("originalStyling")) }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
    }, e.prototype.disableTransition = function(i) {
        var e = this,
            t = {};
        t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.fadeSlide = function(i, e) { var t = this;!1 === t.cssTransitions ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }), t.$slides.eq(i).animate({ opacity: 1 }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }), e && setTimeout(function() { t.disableTransition(i), e.call() }, t.options.speed)) }, e.prototype.fadeSlideOut = function(i) { var e = this;!1 === e.cssTransitions ? e.$slides.eq(i).animate({ opacity: 0, zIndex: e.options.zIndex - 2 }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 })) }, e.prototype.filterSlides = e.prototype.slickFilter = function(i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
    }, e.prototype.focusHandler = function() {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(t) {
            t.stopImmediatePropagation();
            var o = i(this);
            setTimeout(function() { e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay()) }, 0)
        })
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() { return this.currentSlide }, e.prototype.getDotCount = function() {
        var i = this,
            e = 0,
            t = 0,
            o = 0;
        if (!0 === i.options.infinite)
            if (i.slideCount <= i.options.slidesToShow) ++o;
            else
                for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else if (!0 === i.options.centerMode) o = i.slideCount;
        else if (i.options.asNavFor)
            for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1
    }, e.prototype.getLeft = function(i) {
        var e, t, o, s, n = this,
            r = 0;
        return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e
    }, e.prototype.getOption = e.prototype.slickGetOption = function(i) { return this.options[i] }, e.prototype.getNavigableIndexes = function() {
        var i, e = this,
            t = 0,
            o = 0,
            s = [];
        for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i;) s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return s
    }, e.prototype.getSlick = function() { return this }, e.prototype.getSlideCount = function() { var e, t, o = this; return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(s, n) { if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1 }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll }, e.prototype.goTo = e.prototype.slickGoTo = function(i, e) { this.changeSlide({ data: { message: "index", index: parseInt(i) } }, e) }, e.prototype.init = function(e) {
        var t = this;
        i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
    }, e.prototype.initADA = function() {
        var e = this,
            t = Math.ceil(e.slideCount / e.options.slidesToShow),
            o = e.getNavigableIndexes().filter(function(i) { return i >= 0 && i < e.slideCount });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
            var s = o.indexOf(t);
            i(this).attr({ role: "tabpanel", id: "slick-slide" + e.instanceUid + t, tabindex: -1 }), -1 !== s && i(this).attr({ "aria-describedby": "slick-slide-control" + e.instanceUid + s })
        }), e.$dots.attr("role", "tablist").find("li").each(function(s) {
            var n = o[s];
            i(this).attr({ role: "presentation" }), i(this).find("button").first().attr({ role: "tab", id: "slick-slide-control" + e.instanceUid + s, "aria-controls": "slick-slide" + e.instanceUid + n, "aria-label": s + 1 + " of " + t, "aria-selected": null, tabindex: "-1" })
        }).eq(e.currentSlide).find("button").attr({ "aria-selected": "true", tabindex: "0" }).end());
        for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.$slides.eq(s).attr("tabindex", 0);
        e.activateADA()
    }, e.prototype.initArrowEvents = function() { var i = this;!0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler))) }, e.prototype.initDotEvents = function() { var e = this;!0 === e.options.dots && (i("li", e.$dots).on("click.slick", { message: "index" }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1)) }, e.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
    }, e.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", { action: "start" }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", { action: "move" }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", { action: "end" }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition)
    }, e.prototype.initUI = function() { var i = this;!0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show() }, e.prototype.keyHandler = function(i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({ data: { message: !0 === e.options.rtl ? "next" : "previous" } }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({ data: { message: !0 === e.options.rtl ? "previous" : "next" } }))
    }, e.prototype.lazyLoad = function() {
        function e(e) {
            i("img[data-lazy]", e).each(function() {
                var e = i(this),
                    t = i(this).attr("data-lazy"),
                    o = i(this).attr("data-srcset"),
                    s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                    r = document.createElement("img");
                r.onload = function() { e.animate({ opacity: 0 }, 100, function() { o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({ opacity: 1 }, 200, function() { e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading") }), n.$slider.trigger("lazyLoaded", [n, e, t]) }) }, r.onerror = function() { e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t]) }, r.src = t
            })
        }
        var t, o, s, n = this;
        if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad)
            for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++) r < 0 && (r = n.slideCount - 1), t = (t = t.add(d.eq(r))).add(d.eq(l)), r--, l++;
        e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
    }, e.prototype.loadSlider = function() {
        var i = this;
        i.setPosition(), i.$slideTrack.css({ opacity: 1 }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
    }, e.prototype.next = e.prototype.slickNext = function() { this.changeSlide({ data: { message: "next" } }) }, e.prototype.orientationChange = function() {
        var i = this;
        i.checkResponsive(), i.setPosition()
    }, e.prototype.pause = e.prototype.slickPause = function() {
        var i = this;
        i.autoPlayClear(), i.paused = !0
    }, e.prototype.play = e.prototype.slickPlay = function() {
        var i = this;
        i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
    }, e.prototype.postSlide = function(e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
    }, e.prototype.prev = e.prototype.slickPrev = function() { this.changeSlide({ data: { message: "previous" } }) }, e.prototype.preventDefault = function(i) { i.preventDefault() }, e.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var t, o, s, n, r, l = this,
            d = i("img[data-lazy]", l.$slider);
        d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function() { s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad() }, r.onerror = function() { e < 3 ? setTimeout(function() { l.progressiveLazyLoad(e + 1) }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad()) }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
    }, e.prototype.refresh = function(e) {
        var t, o, s = this;
        o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, { currentSlide: t }), s.init(), e || s.changeSlide({ data: { message: "index", index: t } }, !1)
    }, e.prototype.registerBreakpoints = function() {
        var e, t, o, s = this,
            n = s.options.responsive || null;
        if ("array" === i.type(n) && n.length) {
            s.respondTo = s.options.respondTo || "window";
            for (e in n)
                if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
                    for (t = n[e].breakpoint; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                    s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings
                }
            s.breakpoints.sort(function(i, e) { return s.options.mobileFirst ? i - e : e - i })
        }
    }, e.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
    }, e.prototype.resize = function() {
        var e = this;
        i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() { e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition() }, 50))
    }, e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) {
        var o = this;
        if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
        o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit()
    }, e.prototype.setCSS = function(i) {
        var e, t, o = this,
            s = {};
        !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)))
    }, e.prototype.setDimensions = function() { var i = this;!1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({ padding: "0px " + i.options.centerPadding }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({ padding: i.options.centerPadding + " 0px" })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length))); var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();!1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e) }, e.prototype.setFade = function() {
        var e, t = this;
        t.$slides.each(function(o, s) { e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({ position: "relative", right: e, top: 0, zIndex: t.options.zIndex - 2, opacity: 0 }) : i(s).css({ position: "relative", left: e, top: 0, zIndex: t.options.zIndex - 2, opacity: 0 }) }), t.$slides.eq(t.currentSlide).css({ zIndex: t.options.zIndex - 1, opacity: 1 })
    }, e.prototype.setHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e)
        }
    }, e.prototype.setOption = e.prototype.slickSetOption = function() {
        var e, t, o, s, n, r = this,
            l = !1;
        if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s;
        else if ("multiple" === n) i.each(o, function(i, e) { r.options[i] = e });
        else if ("responsive" === n)
            for (t in s)
                if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];
                else {
                    for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                    r.options.responsive.push(s[t])
                }
        l && (r.unload(), r.reinit())
    }, e.prototype.setPosition = function() {
        var i = this;
        i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
    }, e.prototype.setProps = function() {
        var i = this,
            e = document.body.style;
        i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
    }, e.prototype.setSlideClasses = function(i) {
        var e, t, o, s, n = this;
        if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) {
            var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
            e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center")
        } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
    }, e.prototype.setupInfinite = function() {
        var e, t, o, s = this;
        if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) {
            for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
            s.$slideTrack.find(".slick-cloned").find("[id]").each(function() { i(this).attr("id", "") })
        }
    }, e.prototype.interrupt = function(i) {
        var e = this;
        i || e.autoPlay(), e.interrupted = i
    }, e.prototype.selectHandler = function(e) {
        var t = this,
            o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
            s = parseInt(o.attr("data-slick-index"));
        s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s)
    }, e.prototype.slideHandler = function(i, e, t) {
        var o, s, n, r, l, d = null,
            a = this;
        if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i))
            if (!1 === e && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() { a.postSlide(o) }) : a.postSlide(o));
            else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() { a.postSlide(o) }) : a.postSlide(o));
        else { if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function() { a.postSlide(s) })) : a.postSlide(s), void a.animateHeight();!0 !== t ? a.animateSlide(d, function() { a.postSlide(s) }) : a.postSlide(s) }
    }, e.prototype.startLoad = function() { var i = this;!0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading") }, e.prototype.swipeDirection = function() { var i, e, t, o, s = this; return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical" }, e.prototype.swipeEnd = function(i) {
        var e, t, o = this;
        if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
        if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
                case "left":
                case "down":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
            }
            "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
    }, e.prototype.swipeHandler = function(i) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
            case "start":
                e.swipeStart(i);
                break;
            case "move":
                e.swipeMove(i);
                break;
            case "end":
                e.swipeEnd(i)
        }
    }, e.prototype.swipeMove = function(i) { var e, t, o, s, n, r, l = this; return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft)))) }, e.prototype.swipeStart = function(i) {
        var e, t = this;
        if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
        void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
        var i = this;
        null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
    }, e.prototype.unload = function() {
        var e = this;
        i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, e.prototype.unslick = function(i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]), e.destroy()
    }, e.prototype.updateArrows = function() {
        var i = this;
        Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, e.prototype.updateDots = function() {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
    }, e.prototype.visibility = function() {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
    }, i.fn.slick = function() {
        var i, t, o = this,
            s = arguments[0],
            n = Array.prototype.slice.call(arguments, 1),
            r = o.length;
        for (i = 0; i < r; i++)
            if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t) return t;
        return o
    }
});
! function(i) { "undefined" != typeof jQuery && jQuery || "function" != typeof define || !define.amd ? "undefined" != typeof jQuery && jQuery || "object" != typeof exports ? i(jQuery, document, window, navigator) : i(require("jquery"), document, window, navigator) : define(["jquery"], function(t) { return i(t, document, window, navigator) }) }(function(a, c, l, t, _) {
    "use strict";
    var i, s, o = 0,
        e = (i = t.userAgent, s = /msie\s\d+/i, 0 < i.search(s) && s.exec(i).toString().split(" ")[1] < 9 && (a("html").addClass("lt-ie9"), !0));
    Function.prototype.bind || (Function.prototype.bind = function(o) {
        var e = this,
            h = [].slice;
        if ("function" != typeof e) throw new TypeError;
        var r = h.call(arguments, 1),
            n = function() {
                if (this instanceof n) {
                    var t = function() {};
                    t.prototype = e.prototype;
                    var i = new t,
                        s = e.apply(i, r.concat(h.call(arguments)));
                    return Object(s) === s ? s : i
                }
                return e.apply(o, r.concat(h.call(arguments)))
            };
        return n
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function(t, i) {
        var s;
        if (null == this) throw new TypeError('"this" is null or not defined');
        var o = Object(this),
            e = o.length >>> 0;
        if (0 == e) return -1;
        var h = +i || 0;
        if (Math.abs(h) === 1 / 0 && (h = 0), e <= h) return -1;
        for (s = Math.max(0 <= h ? h : e - Math.abs(h), 0); s < e;) {
            if (s in o && o[s] === t) return s;
            s++
        }
        return -1
    });

    function h(t, i, s) {
        this.VERSION = "2.3.1", this.input = t, this.plugin_count = s, this.current_plugin = 0, this.calc_count = 0, this.update_tm = 0, this.old_from = 0, this.old_to = 0, this.old_min_interval = null, this.raf_id = null, this.dragging = !1, this.force_redraw = !1, this.no_diapason = !1, this.has_tab_index = !0, this.is_key = !1, this.is_update = !1, this.is_start = !0, this.is_finish = !1, this.is_active = !1, this.is_resize = !1, this.is_click = !1, i = i || {}, this.$cache = { win: a(l), body: a(c.body), input: a(t), cont: null, rs: null, min: null, max: null, from: null, to: null, single: null, bar: null, line: null, s_single: null, s_from: null, s_to: null, shad_single: null, shad_from: null, shad_to: null, edge: null, grid: null, grid_labels: [] }, this.coords = { x_gap: 0, x_pointer: 0, w_rs: 0, w_rs_old: 0, w_handle: 0, p_gap: 0, p_gap_left: 0, p_gap_right: 0, p_step: 0, p_pointer: 0, p_handle: 0, p_single_fake: 0, p_single_real: 0, p_from_fake: 0, p_from_real: 0, p_to_fake: 0, p_to_real: 0, p_bar_x: 0, p_bar_w: 0, grid_gap: 0, big_num: 0, big: [], big_w: [], big_p: [], big_x: [] }, this.labels = { w_min: 0, w_max: 0, w_from: 0, w_to: 0, w_single: 0, p_min: 0, p_max: 0, p_from_fake: 0, p_from_left: 0, p_to_fake: 0, p_to_left: 0, p_single_fake: 0, p_single_left: 0 };
        var o, e, h, r = this.$cache.input,
            n = r.prop("value");
        for (h in o = { skin: "flat", type: "single", min: 10, max: 100, from: null, to: null, step: 1, min_interval: 0, max_interval: 0, drag_interval: !1, values: [], p_values: [], from_fixed: !1, from_min: null, from_max: null, from_shadow: !1, to_fixed: !1, to_min: null, to_max: null, to_shadow: !1, prettify_enabled: !0, prettify_separator: " ", prettify: null, force_edges: !1, keyboard: !0, grid: !1, grid_margin: !0, grid_num: 4, grid_snap: !1, hide_min_max: !1, hide_from_to: !1, prefix: "", postfix: "", max_postfix: "", decorate_both: !0, values_separator: " â€” ", input_values_separator: ";", disable: !1, block: !1, extra_classes: "", scope: null, onStart: null, onChange: null, onFinish: null, onUpdate: null }, "INPUT" !== r[0].nodeName && console && console.warn && console.warn("Base element should be <input>!", r[0]), (e = { skin: r.data("skin"), type: r.data("type"), min: r.data("min"), max: r.data("max"), from: r.data("from"), to: r.data("to"), step: r.data("step"), min_interval: r.data("minInterval"), max_interval: r.data("maxInterval"), drag_interval: r.data("dragInterval"), values: r.data("values"), from_fixed: r.data("fromFixed"), from_min: r.data("fromMin"), from_max: r.data("fromMax"), from_shadow: r.data("fromShadow"), to_fixed: r.data("toFixed"), to_min: r.data("toMin"), to_max: r.data("toMax"), to_shadow: r.data("toShadow"), prettify_enabled: r.data("prettifyEnabled"), prettify_separator: r.data("prettifySeparator"), force_edges: r.data("forceEdges"), keyboard: r.data("keyboard"), grid: r.data("grid"), grid_margin: r.data("gridMargin"), grid_num: r.data("gridNum"), grid_snap: r.data("gridSnap"), hide_min_max: r.data("hideMinMax"), hide_from_to: r.data("hideFromTo"), prefix: r.data("prefix"), postfix: r.data("postfix"), max_postfix: r.data("maxPostfix"), decorate_both: r.data("decorateBoth"), values_separator: r.data("valuesSeparator"), input_values_separator: r.data("inputValuesSeparator"), disable: r.data("disable"), block: r.data("block"), extra_classes: r.data("extraClasses") }).values = e.values && e.values.split(","), e) e.hasOwnProperty(h) && (e[h] !== _ && "" !== e[h] || delete e[h]);
        n !== _ && "" !== n && ((n = n.split(e.input_values_separator || i.input_values_separator || ";"))[0] && n[0] == +n[0] && (n[0] = +n[0]), n[1] && n[1] == +n[1] && (n[1] = +n[1]), i && i.values && i.values.length ? (o.from = n[0] && i.values.indexOf(n[0]), o.to = n[1] && i.values.indexOf(n[1])) : (o.from = n[0] && +n[0], o.to = n[1] && +n[1])), a.extend(o, i), a.extend(o, e), this.options = o, this.update_check = {}, this.validate(), this.result = { input: this.$cache.input, slider: null, min: this.options.min, max: this.options.max, from: this.options.from, from_percent: 0, from_value: null, to: this.options.to, to_percent: 0, to_value: null }, this.init()
    }
    h.prototype = {
            init: function(t) { this.no_diapason = !1, this.coords.p_step = this.convertToPercent(this.options.step, !0), this.target = "base", this.toggleInput(), this.append(), this.setMinMax(), t ? (this.force_redraw = !0, this.calc(!0), this.callOnUpdate()) : (this.force_redraw = !0, this.calc(!0), this.callOnStart()), this.updateScene() },
            append: function() {
                var t = '<span class="irs irs--' + this.options.skin + " js-irs-" + this.plugin_count + " " + this.options.extra_classes + '"></span>';
                this.$cache.input.before(t), this.$cache.input.prop("readonly", !0), this.$cache.cont = this.$cache.input.prev(), this.result.slider = this.$cache.cont, this.$cache.cont.html('<span class="irs"><span class="irs-line" tabindex="0"></span><span class="irs-min">0</span><span class="irs-max">1</span><span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span></span><span class="irs-grid"></span>'), this.$cache.rs = this.$cache.cont.find(".irs"), this.$cache.min = this.$cache.cont.find(".irs-min"), this.$cache.max = this.$cache.cont.find(".irs-max"), this.$cache.from = this.$cache.cont.find(".irs-from"), this.$cache.to = this.$cache.cont.find(".irs-to"), this.$cache.single = this.$cache.cont.find(".irs-single"), this.$cache.line = this.$cache.cont.find(".irs-line"), this.$cache.grid = this.$cache.cont.find(".irs-grid"), "single" === this.options.type ? (this.$cache.cont.append('<span class="irs-bar irs-bar--single"></span><span class="irs-shadow shadow-single"></span><span class="irs-handle single"><i></i><i></i><i></i></span>'), this.$cache.bar = this.$cache.cont.find(".irs-bar"), this.$cache.edge = this.$cache.cont.find(".irs-bar-edge"), this.$cache.s_single = this.$cache.cont.find(".single"), this.$cache.from[0].style.visibility = "hidden", this.$cache.to[0].style.visibility = "hidden", this.$cache.shad_single = this.$cache.cont.find(".shadow-single")) : (this.$cache.cont.append('<span class="irs-bar"></span><span class="irs-shadow shadow-from"></span><span class="irs-shadow shadow-to"></span><span class="irs-handle from"><i></i><i></i><i></i></span><span class="irs-handle to"><i></i><i></i><i></i></span>'), this.$cache.bar = this.$cache.cont.find(".irs-bar"), this.$cache.s_from = this.$cache.cont.find(".from"), this.$cache.s_to = this.$cache.cont.find(".to"), this.$cache.shad_from = this.$cache.cont.find(".shadow-from"), this.$cache.shad_to = this.$cache.cont.find(".shadow-to"), this.setTopHandler()), this.options.hide_from_to && (this.$cache.from[0].style.display = "none", this.$cache.to[0].style.display = "none", this.$cache.single[0].style.display = "none"), this.appendGrid(), this.options.disable ? (this.appendDisableMask(), this.$cache.input[0].disabled = !0) : (this.$cache.input[0].disabled = !1, this.removeDisableMask(), this.bindEvents()), this.options.disable || (this.options.block ? this.appendDisableMask() : this.removeDisableMask()), this.options.drag_interval && (this.$cache.bar[0].style.cursor = "ew-resize")
            },
            setTopHandler: function() {
                var t = this.options.min,
                    i = this.options.max,
                    s = this.options.from,
                    o = this.options.to;
                t < s && o === i ? this.$cache.s_from.addClass("type_last") : o < i && this.$cache.s_to.addClass("type_last")
            },
            changeLevel: function(t) {
                switch (t) {
                    case "single":
                        this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_single_fake), this.$cache.s_single.addClass("state_hover");
                        break;
                    case "from":
                        this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake), this.$cache.s_from.addClass("state_hover"), this.$cache.s_from.addClass("type_last"), this.$cache.s_to.removeClass("type_last");
                        break;
                    case "to":
                        this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_to_fake), this.$cache.s_to.addClass("state_hover"), this.$cache.s_to.addClass("type_last"), this.$cache.s_from.removeClass("type_last");
                        break;
                    case "both":
                        this.coords.p_gap_left = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake), this.coords.p_gap_right = this.toFixed(this.coords.p_to_fake - this.coords.p_pointer), this.$cache.s_to.removeClass("type_last"), this.$cache.s_from.removeClass("type_last")
                }
            },
            appendDisableMask: function() { this.$cache.cont.append('<span class="irs-disable-mask"></span>'), this.$cache.cont.addClass("irs-disabled") },
            removeDisableMask: function() { this.$cache.cont.remove(".irs-disable-mask"), this.$cache.cont.removeClass("irs-disabled") },
            remove: function() { this.$cache.cont.remove(), this.$cache.cont = null, this.$cache.line.off("keydown.irs_" + this.plugin_count), this.$cache.body.off("touchmove.irs_" + this.plugin_count), this.$cache.body.off("mousemove.irs_" + this.plugin_count), this.$cache.win.off("touchend.irs_" + this.plugin_count), this.$cache.win.off("mouseup.irs_" + this.plugin_count), e && (this.$cache.body.off("mouseup.irs_" + this.plugin_count), this.$cache.body.off("mouseleave.irs_" + this.plugin_count)), this.$cache.grid_labels = [], this.coords.big = [], this.coords.big_w = [], this.coords.big_p = [], this.coords.big_x = [], cancelAnimationFrame(this.raf_id) },
            bindEvents: function() { this.no_diapason || (this.$cache.body.on("touchmove.irs_" + this.plugin_count, this.pointerMove.bind(this)), this.$cache.body.on("mousemove.irs_" + this.plugin_count, this.pointerMove.bind(this)), this.$cache.win.on("touchend.irs_" + this.plugin_count, this.pointerUp.bind(this)), this.$cache.win.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this)), this.$cache.line.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.line.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.line.on("focus.irs_" + this.plugin_count, this.pointerFocus.bind(this)), this.options.drag_interval && "double" === this.options.type ? (this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "both")), this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "both"))) : (this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"))), "single" === this.options.type ? (this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.s_single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.shad_single.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.s_single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.edge.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.shad_single.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"))) : (this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, null)), this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, null)), this.$cache.from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.s_from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.s_to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.shad_from.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.shad_to.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.s_from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.s_to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.shad_from.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.shad_to.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"))), this.options.keyboard && this.$cache.line.on("keydown.irs_" + this.plugin_count, this.key.bind(this, "keyboard")), e && (this.$cache.body.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this)), this.$cache.body.on("mouseleave.irs_" + this.plugin_count, this.pointerUp.bind(this)))) },
            pointerFocus: function(t) {
                var i, s;
                this.target || (i = (s = "single" === this.options.type ? this.$cache.single : this.$cache.from).offset().left, i += s.width() / 2 - 1, this.pointerClick("single", { preventDefault: function() {}, pageX: i }))
            },
            pointerMove: function(t) {
                if (this.dragging) {
                    var i = t.pageX || t.originalEvent.touches && t.originalEvent.touches[0].pageX;
                    this.coords.x_pointer = i - this.coords.x_gap, this.calc()
                }
            },
            pointerUp: function(t) { this.current_plugin === this.plugin_count && this.is_active && (this.is_active = !1, this.$cache.cont.find(".state_hover").removeClass("state_hover"), this.force_redraw = !0, e && a("*").prop("unselectable", !1), this.updateScene(), this.restoreOriginalMinInterval(), (a.contains(this.$cache.cont[0], t.target) || this.dragging) && this.callOnFinish(), this.dragging = !1) },
            pointerDown: function(t, i) {
                i.preventDefault();
                var s = i.pageX || i.originalEvent.touches && i.originalEvent.touches[0].pageX;
                2 !== i.button && ("both" === t && this.setTempMinInterval(), t = t || (this.target || "from"), this.current_plugin = this.plugin_count, this.target = t, this.is_active = !0, this.dragging = !0, this.coords.x_gap = this.$cache.rs.offset().left, this.coords.x_pointer = s - this.coords.x_gap, this.calcPointerPercent(), this.changeLevel(t), e && a("*").prop("unselectable", !0), this.$cache.line.trigger("focus"), this.updateScene())
            },
            pointerClick: function(t, i) {
                i.preventDefault();
                var s = i.pageX || i.originalEvent.touches && i.originalEvent.touches[0].pageX;
                2 !== i.button && (this.current_plugin = this.plugin_count, this.target = t, this.is_click = !0, this.coords.x_gap = this.$cache.rs.offset().left, this.coords.x_pointer = +(s - this.coords.x_gap).toFixed(), this.force_redraw = !0, this.calc(), this.$cache.line.trigger("focus"))
            },
            key: function(t, i) {
                if (!(this.current_plugin !== this.plugin_count || i.altKey || i.ctrlKey || i.shiftKey || i.metaKey)) {
                    switch (i.which) {
                        case 83:
                        case 65:
                        case 40:
                        case 37:
                            i.preventDefault(), this.moveByKey(!1);
                            break;
                        case 87:
                        case 68:
                        case 38:
                        case 39:
                            i.preventDefault(), this.moveByKey(!0)
                    }
                    return !0
                }
            },
            moveByKey: function(t) {
                var i = this.coords.p_pointer,
                    s = (this.options.max - this.options.min) / 100;
                s = this.options.step / s, t ? i += s : i -= s, this.coords.x_pointer = this.toFixed(this.coords.w_rs / 100 * i), this.is_key = !0, this.calc()
            },
            setMinMax: function() {
                if (this.options) {
                    if (this.options.hide_min_max) return this.$cache.min[0].style.display = "none", void(this.$cache.max[0].style.display = "none");
                    if (this.options.values.length) this.$cache.min.html(this.decorate(this.options.p_values[this.options.min])), this.$cache.max.html(this.decorate(this.options.p_values[this.options.max]));
                    else {
                        var t = this._prettify(this.options.min),
                            i = this._prettify(this.options.max);
                        this.result.min_pretty = t, this.result.max_pretty = i, this.$cache.min.html(this.decorate(t, this.options.min)), this.$cache.max.html(this.decorate(i, this.options.max))
                    }
                    this.labels.w_min = this.$cache.min.outerWidth(!1), this.labels.w_max = this.$cache.max.outerWidth(!1)
                }
            },
            setTempMinInterval: function() {
                var t = this.result.to - this.result.from;
                null === this.old_min_interval && (this.old_min_interval = this.options.min_interval), this.options.min_interval = t
            },
            restoreOriginalMinInterval: function() { null !== this.old_min_interval && (this.options.min_interval = this.old_min_interval, this.old_min_interval = null) },
            calc: function(t) {
                if (this.options && (this.calc_count++, 10 !== this.calc_count && !t || (this.calc_count = 0, this.coords.w_rs = this.$cache.rs.outerWidth(!1), this.calcHandlePercent()), this.coords.w_rs)) {
                    this.calcPointerPercent();
                    var i = this.getHandleX();
                    switch ("both" === this.target && (this.coords.p_gap = 0, i = this.getHandleX()), "click" === this.target && (this.coords.p_gap = this.coords.p_handle / 2, i = this.getHandleX(), this.options.drag_interval ? this.target = "both_one" : this.target = this.chooseHandle(i)), this.target) {
                        case "base":
                            var s = (this.options.max - this.options.min) / 100,
                                o = (this.result.from - this.options.min) / s,
                                e = (this.result.to - this.options.min) / s;
                            this.coords.p_single_real = this.toFixed(o), this.coords.p_from_real = this.toFixed(o), this.coords.p_to_real = this.toFixed(e), this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max), this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max), this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max), this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real), this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real), this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real), this.target = null;
                            break;
                        case "single":
                            if (this.options.from_fixed) break;
                            this.coords.p_single_real = this.convertToRealPercent(i), this.coords.p_single_real = this.calcWithStep(this.coords.p_single_real), this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max), this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real);
                            break;
                        case "from":
                            if (this.options.from_fixed) break;
                            this.coords.p_from_real = this.convertToRealPercent(i), this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real), this.coords.p_from_real > this.coords.p_to_real && (this.coords.p_from_real = this.coords.p_to_real), this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max), this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from"), this.coords.p_from_real = this.checkMaxInterval(this.coords.p_from_real, this.coords.p_to_real, "from"), this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
                            break;
                        case "to":
                            if (this.options.to_fixed) break;
                            this.coords.p_to_real = this.convertToRealPercent(i), this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real), this.coords.p_to_real < this.coords.p_from_real && (this.coords.p_to_real = this.coords.p_from_real), this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max), this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to"), this.coords.p_to_real = this.checkMaxInterval(this.coords.p_to_real, this.coords.p_from_real, "to"), this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
                            break;
                        case "both":
                            if (this.options.from_fixed || this.options.to_fixed) break;
                            i = this.toFixed(i + .001 * this.coords.p_handle), this.coords.p_from_real = this.convertToRealPercent(i) - this.coords.p_gap_left, this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real), this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max), this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from"), this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real), this.coords.p_to_real = this.convertToRealPercent(i) + this.coords.p_gap_right, this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real), this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max), this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to"), this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
                            break;
                        case "both_one":
                            if (this.options.from_fixed || this.options.to_fixed) break;
                            var h = this.convertToRealPercent(i),
                                r = this.result.from_percent,
                                n = this.result.to_percent - r,
                                a = n / 2,
                                c = h - a,
                                l = h + a;
                            c < 0 && (l = (c = 0) + n), 100 < l && (c = (l = 100) - n), this.coords.p_from_real = this.calcWithStep(c), this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max), this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real), this.coords.p_to_real = this.calcWithStep(l), this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max), this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real)
                    }
                    "single" === this.options.type ? (this.coords.p_bar_x = this.coords.p_handle / 2, this.coords.p_bar_w = this.coords.p_single_fake, this.result.from_percent = this.coords.p_single_real, this.result.from = this.convertToValue(this.coords.p_single_real), this.result.from_pretty = this._prettify(this.result.from), this.options.values.length && (this.result.from_value = this.options.values[this.result.from])) : (this.coords.p_bar_x = this.toFixed(this.coords.p_from_fake + this.coords.p_handle / 2), this.coords.p_bar_w = this.toFixed(this.coords.p_to_fake - this.coords.p_from_fake), this.result.from_percent = this.coords.p_from_real, this.result.from = this.convertToValue(this.coords.p_from_real), this.result.from_pretty = this._prettify(this.result.from), this.result.to_percent = this.coords.p_to_real, this.result.to = this.convertToValue(this.coords.p_to_real), this.result.to_pretty = this._prettify(this.result.to), this.options.values.length && (this.result.from_value = this.options.values[this.result.from], this.result.to_value = this.options.values[this.result.to])), this.calcMinMax(), this.calcLabels()
                }
            },
            calcPointerPercent: function() { this.coords.w_rs ? (this.coords.x_pointer < 0 || isNaN(this.coords.x_pointer) ? this.coords.x_pointer = 0 : this.coords.x_pointer > this.coords.w_rs && (this.coords.x_pointer = this.coords.w_rs), this.coords.p_pointer = this.toFixed(this.coords.x_pointer / this.coords.w_rs * 100)) : this.coords.p_pointer = 0 },
            convertToRealPercent: function(t) { return t / (100 - this.coords.p_handle) * 100 },
            convertToFakePercent: function(t) { return t / 100 * (100 - this.coords.p_handle) },
            getHandleX: function() {
                var t = 100 - this.coords.p_handle,
                    i = this.toFixed(this.coords.p_pointer - this.coords.p_gap);
                return i < 0 ? i = 0 : t < i && (i = t), i
            },
            calcHandlePercent: function() { "single" === this.options.type ? this.coords.w_handle = this.$cache.s_single.outerWidth(!1) : this.coords.w_handle = this.$cache.s_from.outerWidth(!1), this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100) },
            chooseHandle: function(t) { return "single" === this.options.type ? "single" : this.coords.p_from_real + (this.coords.p_to_real - this.coords.p_from_real) / 2 <= t ? this.options.to_fixed ? "from" : "to" : this.options.from_fixed ? "to" : "from" },
            calcMinMax: function() { this.coords.w_rs && (this.labels.p_min = this.labels.w_min / this.coords.w_rs * 100, this.labels.p_max = this.labels.w_max / this.coords.w_rs * 100) },
            calcLabels: function() { this.coords.w_rs && !this.options.hide_from_to && ("single" === this.options.type ? (this.labels.w_single = this.$cache.single.outerWidth(!1), this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100, this.labels.p_single_left = this.coords.p_single_fake + this.coords.p_handle / 2 - this.labels.p_single_fake / 2) : (this.labels.w_from = this.$cache.from.outerWidth(!1), this.labels.p_from_fake = this.labels.w_from / this.coords.w_rs * 100, this.labels.p_from_left = this.coords.p_from_fake + this.coords.p_handle / 2 - this.labels.p_from_fake / 2, this.labels.p_from_left = this.toFixed(this.labels.p_from_left), this.labels.p_from_left = this.checkEdges(this.labels.p_from_left, this.labels.p_from_fake), this.labels.w_to = this.$cache.to.outerWidth(!1), this.labels.p_to_fake = this.labels.w_to / this.coords.w_rs * 100, this.labels.p_to_left = this.coords.p_to_fake + this.coords.p_handle / 2 - this.labels.p_to_fake / 2, this.labels.p_to_left = this.toFixed(this.labels.p_to_left), this.labels.p_to_left = this.checkEdges(this.labels.p_to_left, this.labels.p_to_fake), this.labels.w_single = this.$cache.single.outerWidth(!1), this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100, this.labels.p_single_left = (this.labels.p_from_left + this.labels.p_to_left + this.labels.p_to_fake) / 2 - this.labels.p_single_fake / 2, this.labels.p_single_left = this.toFixed(this.labels.p_single_left)), this.labels.p_single_left = this.checkEdges(this.labels.p_single_left, this.labels.p_single_fake)) },
            updateScene: function() { this.raf_id && (cancelAnimationFrame(this.raf_id), this.raf_id = null), clearTimeout(this.update_tm), this.update_tm = null, this.options && (this.drawHandles(), this.is_active ? this.raf_id = requestAnimationFrame(this.updateScene.bind(this)) : this.update_tm = setTimeout(this.updateScene.bind(this), 300)) },
            drawHandles: function() { this.coords.w_rs = this.$cache.rs.outerWidth(!1), this.coords.w_rs && (this.coords.w_rs !== this.coords.w_rs_old && (this.target = "base", this.is_resize = !0), this.coords.w_rs === this.coords.w_rs_old && !this.force_redraw || (this.setMinMax(), this.calc(!0), this.drawLabels(), this.options.grid && (this.calcGridMargin(), this.calcGridLabels()), this.force_redraw = !0, this.coords.w_rs_old = this.coords.w_rs, this.drawShadow()), this.coords.w_rs && (this.dragging || this.force_redraw || this.is_key) && ((this.old_from !== this.result.from || this.old_to !== this.result.to || this.force_redraw || this.is_key) && (this.drawLabels(), this.$cache.bar[0].style.left = this.coords.p_bar_x + "%", this.$cache.bar[0].style.width = this.coords.p_bar_w + "%", "single" === this.options.type ? (this.$cache.bar[0].style.left = 0, this.$cache.bar[0].style.width = this.coords.p_bar_w + this.coords.p_bar_x + "%", this.$cache.s_single[0].style.left = this.coords.p_single_fake + "%") : (this.$cache.s_from[0].style.left = this.coords.p_from_fake + "%", this.$cache.s_to[0].style.left = this.coords.p_to_fake + "%", this.old_from === this.result.from && !this.force_redraw || (this.$cache.from[0].style.left = this.labels.p_from_left + "%"), this.old_to === this.result.to && !this.force_redraw || (this.$cache.to[0].style.left = this.labels.p_to_left + "%")), this.$cache.single[0].style.left = this.labels.p_single_left + "%", this.writeToInput(), this.old_from === this.result.from && this.old_to === this.result.to || this.is_start || (this.$cache.input.trigger("change"), this.$cache.input.trigger("input")), this.old_from = this.result.from, this.old_to = this.result.to, this.is_resize || this.is_update || this.is_start || this.is_finish || this.callOnChange(), (this.is_key || this.is_click) && (this.is_key = !1, this.is_click = !1, this.callOnFinish()), this.is_update = !1, this.is_resize = !1, this.is_finish = !1), this.is_start = !1, this.is_key = !1, this.is_click = !1, this.force_redraw = !1)) },
            drawLabels: function() {
                if (this.options) {
                    var t, i, s, o, e, h = this.options.values.length,
                        r = this.options.p_values;
                    if (!this.options.hide_from_to)
                        if ("single" === this.options.type) t = h ? this.decorate(r[this.result.from]) : (o = this._prettify(this.result.from), this.decorate(o, this.result.from)), this.$cache.single.html(t), this.calcLabels(), this.labels.p_single_left < this.labels.p_min + 1 ? this.$cache.min[0].style.visibility = "hidden" : this.$cache.min[0].style.visibility = "visible", this.labels.p_single_left + this.labels.p_single_fake > 100 - this.labels.p_max - 1 ? this.$cache.max[0].style.visibility = "hidden" : this.$cache.max[0].style.visibility = "visible";
                        else {
                            s = h ? (this.options.decorate_both ? (t = this.decorate(r[this.result.from]), t += this.options.values_separator, t += this.decorate(r[this.result.to])) : t = this.decorate(r[this.result.from] + this.options.values_separator + r[this.result.to]), i = this.decorate(r[this.result.from]), this.decorate(r[this.result.to])) : (o = this._prettify(this.result.from), e = this._prettify(this.result.to), this.options.decorate_both ? (t = this.decorate(o, this.result.from), t += this.options.values_separator, t += this.decorate(e, this.result.to)) : t = this.decorate(o + this.options.values_separator + e, this.result.to), i = this.decorate(o, this.result.from), this.decorate(e, this.result.to)), this.$cache.single.html(t), this.$cache.from.html(i), this.$cache.to.html(s), this.calcLabels();
                            var n = Math.min(this.labels.p_single_left, this.labels.p_from_left),
                                a = this.labels.p_single_left + this.labels.p_single_fake,
                                c = this.labels.p_to_left + this.labels.p_to_fake,
                                l = Math.max(a, c);
                            this.labels.p_from_left + this.labels.p_from_fake >= this.labels.p_to_left ? (this.$cache.from[0].style.visibility = "hidden", this.$cache.to[0].style.visibility = "hidden", this.$cache.single[0].style.visibility = "visible", l = this.result.from === this.result.to ? ("from" === this.target ? this.$cache.from[0].style.visibility = "visible" : "to" === this.target ? this.$cache.to[0].style.visibility = "visible" : this.target || (this.$cache.from[0].style.visibility = "visible"), this.$cache.single[0].style.visibility = "hidden", c) : (this.$cache.from[0].style.visibility = "hidden", this.$cache.to[0].style.visibility = "hidden", this.$cache.single[0].style.visibility = "visible", Math.max(a, c))) : (this.$cache.from[0].style.visibility = "visible", this.$cache.to[0].style.visibility = "visible", this.$cache.single[0].style.visibility = "hidden"), n < this.labels.p_min + 1 ? this.$cache.min[0].style.visibility = "hidden" : this.$cache.min[0].style.visibility = "visible", l > 100 - this.labels.p_max - 1 ? this.$cache.max[0].style.visibility = "hidden" : this.$cache.max[0].style.visibility = "visible"
                        }
                }
            },
            drawShadow: function() {
                var t, i, s, o, e = this.options,
                    h = this.$cache,
                    r = "number" == typeof e.from_min && !isNaN(e.from_min),
                    n = "number" == typeof e.from_max && !isNaN(e.from_max),
                    a = "number" == typeof e.to_min && !isNaN(e.to_min),
                    c = "number" == typeof e.to_max && !isNaN(e.to_max);
                "single" === e.type ? e.from_shadow && (r || n) ? (t = this.convertToPercent(r ? e.from_min : e.min), i = this.convertToPercent(n ? e.from_max : e.max) - t, t = this.toFixed(t - this.coords.p_handle / 100 * t), i = this.toFixed(i - this.coords.p_handle / 100 * i), t += this.coords.p_handle / 2, h.shad_single[0].style.display = "block", h.shad_single[0].style.left = t + "%", h.shad_single[0].style.width = i + "%") : h.shad_single[0].style.display = "none" : (e.from_shadow && (r || n) ? (t = this.convertToPercent(r ? e.from_min : e.min), i = this.convertToPercent(n ? e.from_max : e.max) - t, t = this.toFixed(t - this.coords.p_handle / 100 * t), i = this.toFixed(i - this.coords.p_handle / 100 * i), t += this.coords.p_handle / 2, h.shad_from[0].style.display = "block", h.shad_from[0].style.left = t + "%", h.shad_from[0].style.width = i + "%") : h.shad_from[0].style.display = "none", e.to_shadow && (a || c) ? (s = this.convertToPercent(a ? e.to_min : e.min), o = this.convertToPercent(c ? e.to_max : e.max) - s, s = this.toFixed(s - this.coords.p_handle / 100 * s), o = this.toFixed(o - this.coords.p_handle / 100 * o), s += this.coords.p_handle / 2, h.shad_to[0].style.display = "block", h.shad_to[0].style.left = s + "%", h.shad_to[0].style.width = o + "%") : h.shad_to[0].style.display = "none")
            },
            writeToInput: function() { "single" === this.options.type ? (this.options.values.length ? this.$cache.input.prop("value", this.result.from_value) : this.$cache.input.prop("value", this.result.from), this.$cache.input.data("from", this.result.from)) : (this.options.values.length ? this.$cache.input.prop("value", this.result.from_value + this.options.input_values_separator + this.result.to_value) : this.$cache.input.prop("value", this.result.from + this.options.input_values_separator + this.result.to), this.$cache.input.data("from", this.result.from), this.$cache.input.data("to", this.result.to)) },
            callOnStart: function() { this.writeToInput(), this.options.onStart && "function" == typeof this.options.onStart && (this.options.scope ? this.options.onStart.call(this.options.scope, this.result) : this.options.onStart(this.result)) },
            callOnChange: function() { this.writeToInput(), this.options.onChange && "function" == typeof this.options.onChange && (this.options.scope ? this.options.onChange.call(this.options.scope, this.result) : this.options.onChange(this.result)) },
            callOnFinish: function() { this.writeToInput(), this.options.onFinish && "function" == typeof this.options.onFinish && (this.options.scope ? this.options.onFinish.call(this.options.scope, this.result) : this.options.onFinish(this.result)) },
            callOnUpdate: function() { this.writeToInput(), this.options.onUpdate && "function" == typeof this.options.onUpdate && (this.options.scope ? this.options.onUpdate.call(this.options.scope, this.result) : this.options.onUpdate(this.result)) },
            toggleInput: function() { this.$cache.input.toggleClass("irs-hidden-input"), this.has_tab_index ? this.$cache.input.prop("tabindex", -1) : this.$cache.input.removeProp("tabindex"), this.has_tab_index = !this.has_tab_index },
            convertToPercent: function(t, i) {
                var s, o = this.options.max - this.options.min,
                    e = o / 100;
                return o ? (s = (i ? t : t - this.options.min) / e, this.toFixed(s)) : (this.no_diapason = !0, 0)
            },
            convertToValue: function(t) {
                var i, s, o = this.options.min,
                    e = this.options.max,
                    h = o.toString().split(".")[1],
                    r = e.toString().split(".")[1],
                    n = 0,
                    a = 0;
                if (0 === t) return this.options.min;
                if (100 === t) return this.options.max;
                h && (n = i = h.length), r && (n = s = r.length), i && s && (n = s <= i ? i : s), o < 0 && (o = +(o + (a = Math.abs(o))).toFixed(n), e = +(e + a).toFixed(n));
                var c, l = (e - o) / 100 * t + o,
                    _ = this.options.step.toString().split(".")[1];
                return l = _ ? +l.toFixed(_.length) : (l /= this.options.step, +(l *= this.options.step).toFixed(0)), a && (l -= a), (c = _ ? +l.toFixed(_.length) : this.toFixed(l)) < this.options.min ? c = this.options.min : c > this.options.max && (c = this.options.max), c
            },
            calcWithStep: function(t) { var i = Math.round(t / this.coords.p_step) * this.coords.p_step; return 100 < i && (i = 100), 100 === t && (i = 100), this.toFixed(i) },
            checkMinInterval: function(t, i, s) { var o, e, h = this.options; return h.min_interval ? (o = this.convertToValue(t), e = this.convertToValue(i), "from" === s ? e - o < h.min_interval && (o = e - h.min_interval) : o - e < h.min_interval && (o = e + h.min_interval), this.convertToPercent(o)) : t },
            checkMaxInterval: function(t, i, s) { var o, e, h = this.options; return h.max_interval ? (o = this.convertToValue(t), e = this.convertToValue(i), "from" === s ? e - o > h.max_interval && (o = e - h.max_interval) : o - e > h.max_interval && (o = e + h.max_interval), this.convertToPercent(o)) : t },
            checkDiapason: function(t, i, s) {
                var o = this.convertToValue(t),
                    e = this.options;
                return "number" != typeof i && (i = e.min), "number" != typeof s && (s = e.max), o < i && (o = i), s < o && (o = s), this.convertToPercent(o)
            },
            toFixed: function(t) { return +(t = t.toFixed(20)) },
            _prettify: function(t) { return this.options.prettify_enabled ? this.options.prettify && "function" == typeof this.options.prettify ? this.options.prettify(t) : this.prettify(t) : t },
            prettify: function(t) { return t.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + this.options.prettify_separator) },
            checkEdges: function(t, i) { return this.options.force_edges && (t < 0 ? t = 0 : 100 - i < t && (t = 100 - i)), this.toFixed(t) },
            validate: function() {
                var t, i, s = this.options,
                    o = this.result,
                    e = s.values,
                    h = e.length;
                if ("string" == typeof s.min && (s.min = +s.min), "string" == typeof s.max && (s.max = +s.max), "string" == typeof s.from && (s.from = +s.from), "string" == typeof s.to && (s.to = +s.to), "string" == typeof s.step && (s.step = +s.step), "string" == typeof s.from_min && (s.from_min = +s.from_min), "string" == typeof s.from_max && (s.from_max = +s.from_max), "string" == typeof s.to_min && (s.to_min = +s.to_min), "string" == typeof s.to_max && (s.to_max = +s.to_max), "string" == typeof s.grid_num && (s.grid_num = +s.grid_num), s.max < s.min && (s.max = s.min), h)
                    for (s.p_values = [], s.min = 0, s.max = h - 1, s.step = 1, s.grid_num = s.max, s.grid_snap = !0, i = 0; i < h; i++) t = +e[i], t = isNaN(t) ? e[i] : (e[i] = t, this._prettify(t)), s.p_values.push(t);
                "number" == typeof s.from && !isNaN(s.from) || (s.from = s.min), "number" == typeof s.to && !isNaN(s.to) || (s.to = s.max), "single" === s.type ? (s.from < s.min && (s.from = s.min), s.from > s.max && (s.from = s.max)) : (s.from < s.min && (s.from = s.min), s.from > s.max && (s.from = s.max), s.to < s.min && (s.to = s.min), s.to > s.max && (s.to = s.max), this.update_check.from && (this.update_check.from !== s.from && s.from > s.to && (s.from = s.to), this.update_check.to !== s.to && s.to < s.from && (s.to = s.from)), s.from > s.to && (s.from = s.to), s.to < s.from && (s.to = s.from)), ("number" != typeof s.step || isNaN(s.step) || !s.step || s.step < 0) && (s.step = 1), "number" == typeof s.from_min && s.from < s.from_min && (s.from = s.from_min), "number" == typeof s.from_max && s.from > s.from_max && (s.from = s.from_max), "number" == typeof s.to_min && s.to < s.to_min && (s.to = s.to_min), "number" == typeof s.to_max && s.from > s.to_max && (s.to = s.to_max), o && (o.min !== s.min && (o.min = s.min), o.max !== s.max && (o.max = s.max), (o.from < o.min || o.from > o.max) && (o.from = s.from), (o.to < o.min || o.to > o.max) && (o.to = s.to)), ("number" != typeof s.min_interval || isNaN(s.min_interval) || !s.min_interval || s.min_interval < 0) && (s.min_interval = 0), ("number" != typeof s.max_interval || isNaN(s.max_interval) || !s.max_interval || s.max_interval < 0) && (s.max_interval = 0), s.min_interval && s.min_interval > s.max - s.min && (s.min_interval = s.max - s.min), s.max_interval && s.max_interval > s.max - s.min && (s.max_interval = s.max - s.min)
            },
            decorate: function(t, i) {
                var s = "",
                    o = this.options;
                return o.prefix && (s += o.prefix), s += t, o.max_postfix && (o.values.length && t === o.p_values[o.max] ? (s += o.max_postfix, o.postfix && (s += " ")) : i === o.max && (s += o.max_postfix, o.postfix && (s += " "))), o.postfix && (s += o.postfix), s
            },
            updateFrom: function() { this.result.from = this.options.from, this.result.from_percent = this.convertToPercent(this.result.from), this.result.from_pretty = this._prettify(this.result.from), this.options.values && (this.result.from_value = this.options.values[this.result.from]) },
            updateTo: function() { this.result.to = this.options.to, this.result.to_percent = this.convertToPercent(this.result.to), this.result.to_pretty = this._prettify(this.result.to), this.options.values && (this.result.to_value = this.options.values[this.result.to]) },
            updateResult: function() { this.result.min = this.options.min, this.result.max = this.options.max, this.updateFrom(), this.updateTo() },
            appendGrid: function() {
                if (this.options.grid) {
                    var t, i, s, o, e, h, r = this.options,
                        n = r.max - r.min,
                        a = r.grid_num,
                        c = 0,
                        l = 4,
                        _ = "";
                    for (this.calcGridMargin(), r.grid_snap && (a = n / r.step), 50 < a && (a = 50), s = this.toFixed(100 / a), 4 < a && (l = 3), 7 < a && (l = 2), 14 < a && (l = 1), 28 < a && (l = 0), t = 0; t < a + 1; t++) {
                        for (o = l, 100 < (c = this.toFixed(s * t)) && (c = 100), e = ((this.coords.big[t] = c) - s * (t - 1)) / (o + 1), i = 1; i <= o && 0 !== c; i++) _ += '<span class="irs-grid-pol small" style="left: ' + this.toFixed(c - e * i) + '%"></span>';
                        _ += '<span class="irs-grid-pol" style="left: ' + c + '%"></span>', h = this.convertToValue(c), _ += '<span class="irs-grid-text js-grid-text-' + t + '" style="left: ' + c + '%">' + (h = r.values.length ? r.p_values[h] : this._prettify(h)) + "</span>"
                    }
                    this.coords.big_num = Math.ceil(a + 1), this.$cache.cont.addClass("irs-with-grid"), this.$cache.grid.html(_), this.cacheGridLabels()
                }
            },
            cacheGridLabels: function() {
                var t, i, s = this.coords.big_num;
                for (i = 0; i < s; i++) t = this.$cache.grid.find(".js-grid-text-" + i), this.$cache.grid_labels.push(t);
                this.calcGridLabels()
            },
            calcGridLabels: function() {
                var t, i, s = [],
                    o = [],
                    e = this.coords.big_num;
                for (t = 0; t < e; t++) this.coords.big_w[t] = this.$cache.grid_labels[t].outerWidth(!1), this.coords.big_p[t] = this.toFixed(this.coords.big_w[t] / this.coords.w_rs * 100), this.coords.big_x[t] = this.toFixed(this.coords.big_p[t] / 2), s[t] = this.toFixed(this.coords.big[t] - this.coords.big_x[t]), o[t] = this.toFixed(s[t] + this.coords.big_p[t]);
                for (this.options.force_edges && (s[0] < -this.coords.grid_gap && (s[0] = -this.coords.grid_gap, o[0] = this.toFixed(s[0] + this.coords.big_p[0]), this.coords.big_x[0] = this.coords.grid_gap), o[e - 1] > 100 + this.coords.grid_gap && (o[e - 1] = 100 + this.coords.grid_gap, s[e - 1] = this.toFixed(o[e - 1] - this.coords.big_p[e - 1]), this.coords.big_x[e - 1] = this.toFixed(this.coords.big_p[e - 1] - this.coords.grid_gap))), this.calcGridCollision(2, s, o), this.calcGridCollision(4, s, o), t = 0; t < e; t++) i = this.$cache.grid_labels[t][0], this.coords.big_x[t] !== Number.POSITIVE_INFINITY && (i.style.marginLeft = -this.coords.big_x[t] + "%")
            },
            calcGridCollision: function(t, i, s) { var o, e, h, r = this.coords.big_num; for (o = 0; o < r && !(r <= (e = o + t / 2)); o += t) h = this.$cache.grid_labels[e][0], s[o] <= i[e] ? h.style.visibility = "visible" : h.style.visibility = "hidden" },
            calcGridMargin: function() { this.options.grid_margin && (this.coords.w_rs = this.$cache.rs.outerWidth(!1), this.coords.w_rs && ("single" === this.options.type ? this.coords.w_handle = this.$cache.s_single.outerWidth(!1) : this.coords.w_handle = this.$cache.s_from.outerWidth(!1), this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100), this.coords.grid_gap = this.toFixed(this.coords.p_handle / 2 - .1), this.$cache.grid[0].style.width = this.toFixed(100 - this.coords.p_handle) + "%", this.$cache.grid[0].style.left = this.coords.grid_gap + "%")) },
            update: function(t) { this.input && (this.is_update = !0, this.options.from = this.result.from, this.options.to = this.result.to, this.update_check.from = this.result.from, this.update_check.to = this.result.to, this.options = a.extend(this.options, t), this.validate(), this.updateResult(t), this.toggleInput(), this.remove(), this.init(!0)) },
            reset: function() { this.input && (this.updateResult(), this.update()) },
            destroy: function() { this.input && (this.toggleInput(), this.$cache.input.prop("readonly", !1), a.data(this.input, "ionRangeSlider", null), this.remove(), this.input = null, this.options = null) }
        }, a.fn.ionRangeSlider = function(t) { return this.each(function() { a.data(this, "ionRangeSlider") || a.data(this, "ionRangeSlider", new h(this, t, o++)) }) },
        function() {
            for (var h = 0, t = ["ms", "moz", "webkit", "o"], i = 0; i < t.length && !l.requestAnimationFrame; ++i) l.requestAnimationFrame = l[t[i] + "RequestAnimationFrame"], l.cancelAnimationFrame = l[t[i] + "CancelAnimationFrame"] || l[t[i] + "CancelRequestAnimationFrame"];
            l.requestAnimationFrame || (l.requestAnimationFrame = function(t, i) {
                var s = (new Date).getTime(),
                    o = Math.max(0, 16 - (s - h)),
                    e = l.setTimeout(function() { t(s + o) }, o);
                return h = s + o, e
            }), l.cancelAnimationFrame || (l.cancelAnimationFrame = function(t) { clearTimeout(t) })
        }()
});