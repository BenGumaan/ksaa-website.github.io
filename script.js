// Navigation menu highlight selected

// const nav_menu = document.querySelectorAll('.primary-list li');

// nav_menu.forEach(function(item) {
//     item.addEventListener('click', function() {
//         nav_menu.forEach(function(item) {
//             item.classList.remove('active')
//         })
//         item.classList.add('active')
//     }, false)
// })


// Toggle navigation menu

const toggleMobileMenu = document.querySelector('.toggleMobileMenu');
const mobileMenu = document.querySelector('.mobileMenu');
toggleMobileMenu.addEventListener('click', function() {
    mobileMenu.classList.toggle('open');
    this.classList.toggle('open');
})


function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.dropdown > li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}
DropDown.prototype = {
    initEvents: function() {
        var obj = this;

        obj.dd.on('click', function(event) {
            $(this).toggleClass('active');
            return false;
        });

        obj.opts.on('click', function() {
            var opt = $(this);
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);
        });
    },
    getValue: function() {
        return this.val;
    },
    getIndex: function() {
        return this.index;
    }
}


$(function() {

    var ddList = new DropDown($('#ddList'));

    $(document).click(function() {
        // all dropdowns
        $('.wrapper-dropdown').removeClass('active');
    });

});



// Range Slider 

const range = document.querySelectorAll('.range-slider input');
progress = document.querySelector('.range-slider .progress');
let gap = 1000;
const inputValue = document.querySelectorAll('.numberVal input');

range.forEach(input => {
    input.addEventListener('input', e => {
        let minRange = parseInt(range[0].value),
            maxRange = parseInt(range[1].value);

        if (maxRange - minRange < gap) {
            if (e.target.className === "range-min") {
                range[0].value = maxRange - gap;
            } else {
                range[1].value = minRange + gap;
            }
        } else {
            progress.style.left = (minRange / range[0].max) * 100 + '%';
            progress.style.right = 100 - (maxRange / range[1].max) * 100 + '%';
            inputValue[0].value = minRange;
            inputValue[1].value = maxRange;
        }
    })
})


// Add to favorite

const bookmark = document.querySelectorAll(".fa-bookmark, .add-to-favorite");
const item_total = document.querySelector(".favorite-icon .item_total");
// const boomark_text = document.querySelectorAll(".add-to-favorite span");

bookmark.forEach(x => {
    x.addEventListener('click', () => {
        if (x.classList.contains("active")) {
            x.classList.remove("active");
            decrementValue();
        } else {
            x.classList.add("active");
            incrementValue();
        }
    });
});


var text = "أضف إلى المفضلة";
var boomark_text = document.querySelectorAll('.add-to-favorite span');

boomark_text.forEach(x => {
    console.log(x.parentElement);
    x.parentElement.addEventListener('click', () => {
        if (x.textContent === text) {
            x.textContent = "إزالة من المفضلة";
        } else {
            x.textContent = "أضف إلى المفضلة";
        }
    });
});


// function changeText_add() {
//     var boomark_text = "إزاله من المفضلة";
//     document.querySelector('.add-to-favorite span').textContent = boomark_text;
// }

// function changeText_remove() {
//     var boomark_text = "أضف إلى المفضلة";
//     document.querySelector('.add-to-favorite span').textContent = boomark_text;
// }

function incrementValue() {
    var value = parseInt(document.querySelector('.favorite-icon .item_total').textContent);
    value = isNaN(value) ? 0 : value;
    value++;
    document.querySelector('.favorite-icon .item_total').textContent = value;

}

function decrementValue() {
    var value = parseInt(document.querySelector('.favorite-icon .item_total').textContent);
    value = isNaN(value) ? 0 : value;
    if (value > 0) {
        value--;
        document.querySelector('.favorite-icon .item_total').textContent = value;
    }

}

// Fixing navigation with anchor links

// const navigationHeight = document.querySelector('.header-top').offsetHeight;

// document.documentElement.style.setProperty('--scroll-padding', navigationHeight - 1 + "px");

// window.onscroll = function() {
//     myFunction();
// };

// var header = document.getElementById("myHeader");
// var navbar = document.getElementById("navbar");
// var sticky = header.offsetTop;

// function myFunction() {
//     if (window.pageYOffset > sticky) {
//         header.classList.add("sticky");
//         navbar.classList.add("scrolledNav");
//     } else {
//         header.classList.remove("sticky");
//         navbar.classList.remove("scrolledNav");
//     }
// }


// Navigation tabs

// $(".nav li a").on("click", function() {
//     $(".nav li a").removeClass("active show");
//     $(this).addClass("active show");
//     $(".tab-content .tab-pane").removeClass("active show");
//     $().addClass("");
// });