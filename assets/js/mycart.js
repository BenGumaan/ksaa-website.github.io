/*
 * jQuery myCart - v1.9 - 2020-12-03
 * http://asraf-uddin-ahmed.github.io/
 * Copyright (c) 2017 Asraf Uddin Ahmed; Licensed None
 */

(function($) {

    "use strict";

    // Go to cart movement
    var goToCartIcon = function($addTocartBtn) {
        var $cartIcon = $(".my-cart-icon");
        var $image = $('<img width="30px" height="30px" src="' + $addTocartBtn.data("image") + '"/>').css({ "position": "fixed", "z-index": "999" });
        $addTocartBtn.prepend($image);
        var position = $cartIcon.position();
        $image.animate({
            top: position.top,
            left: position.left
        }, 500, "linear", function() {
            $image.remove();
        });
    }

    // CUSTOM OPTIONS
    var OptionManager = (function() {
        var objToReturn = {};

        var _options = null;

        var DEFAULT_OPTIONS = {
            currencySymbol: '$',
            classCartIcon: 'my-cart-icon', // Assign this 'class_name' to the a tag of the icon 
            classCartBadge: 'my-cart-badge', // Assign this 'class_name' to the icon 
            classCartProduct: 'navbar-cart-product',
            classProductQuantity: 'my-product-quantity',
            classProductRemove: 'my-product-remove',
            classCheckoutCart: 'my-cart-checkout',
            affixCartIcon: true,
            showCheckoutModal: true,
            numberOfDecimals: 2,
            cartItems: [
                // {id: 1, name: 'product 1', summary: 'summary 1', price: 10, quantity: 2, image: 'images/img_1.png'},
                // {id: 2, name: 'product 2', summary: 'summary 2', price: 20, quantity: 3, image: 'images/img_2.png'},
                // {id: 3, name: 'product 3', summary: 'summary 3', price: 30, quantity: 5, image: 'images/img_3.png'}
            ],

            clickOnAddToCart: function($addTocart) {
                goToCartIcon($addTocart);
            },

            afterAddOnCart: function(products, totalPrice, totalQuantity) {
                var duration = 3000; // 3 seconds
                var alert_message = `
                <div class="d-block px-xl-7 pt-5 pb-3 pb-lg-6 container-fluid" id="addToCartAlert">
                    <div class="mb-4 mb-lg-5 alert alert-success fade show" role="alert">
                        <div class="d-flex align-items-center pr-3">
                            <p class="mb-0">White Tee have been added to your cart.<br class="d-inline-block d-lg-none">
                                <a class="text-reset text-decoration-underline ml-lg-3" href="/cart">View Cart</a>
                            </p>
                        </div>
                        <button class="close close-absolute close-centered opacity-10 text-inherit" type="button" aria-label="Close">X</button>
                    </div>
                </div>
                `;
                $('.header-absolute').append(alert_message);
                window.setTimeout(() => { $("#alert-message").slideUp(300).alert('close'); }, duration);
                $(window).scrollTop(0);
                console.log("afterAddOnCart", products, totalPrice, totalQuantity);
            },

            clickOnCartIcon: function($cartIcon, products, totalPrice, totalQuantity) {
                console.log("cart icon clicked", $cartIcon, products, totalPrice, totalQuantity);
            },

            checkoutCart: function(products, totalPrice, totalQuantity) {
                var checkoutString = "Total Price: " + totalPrice + "\nTotal Quantity: " + totalQuantity;
                checkoutString += "\n\n id \t name \t summary \t price \t quantity \t image path";
                $.each(products, function() {
                    checkoutString += ("\n " + this.id + " \t " + this.name + " \t " + this.summary + " \t " + this.price + " \t " + this.quantity + " \t " + this.image);
                });
                alert(checkoutString)
                console.log("checking out", products, totalPrice, totalQuantity);
            },

            getDiscountPrice: function(products, totalPrice, totalQuantity) {
                console.log("calculating discount", products, totalPrice, totalQuantity);
                return totalPrice * 0.5;
            }

        };

        var loadOptions = function() {
            _options = $.extend({}, DEFAULT_OPTIONS); // We put an empty object at first to indicate that we want to preserve both of the original objects 
        };

        var getOptions = function() {
            return _options; // return the options variable (including everything)
        };

        objToReturn.loadOptions = loadOptions;
        objToReturn.getOptions = getOptions;
        return objToReturn;
    }());

    // MATH HELPER
    var MathHelper = (function() {
        var objToReturn = {};
        var getRoundedNumber = function(number) {
            if (isNaN(number)) {
                throw new Error('Parameter is not a Number');
            }
            number = number * 1;
            var options = OptionManager.getOptions();
            return number.toFixed(options.numberOfDecimals);
        };
        objToReturn.getRoundedNumber = getRoundedNumber;
        return objToReturn;
    }());

    // CART OPERATIONS (Add, Remove, Edit, Set, Get)
    var ProductManager = (function() {
        var objToReturn = {};

        /*
        PRIVATE
        */
        const STORAGE_NAME = "CustomerCart";
        localStorage[STORAGE_NAME] = localStorage[STORAGE_NAME] ? localStorage[STORAGE_NAME] : "";

        // Get the index of the product
        var getIndexOfProduct = function(id) {
            var productIndex = -1;
            var products = getAllProducts();
            $.each(products, function(index, value) {
                if (value.id == id) {
                    productIndex = index;
                    return;
                }
            });
            return productIndex;
        };

        // Add all products into Storage as a string
        var setAllProducts = function(products) {
            localStorage[STORAGE_NAME] = JSON.stringify(products);
        };

        // Add a product 
        var addProduct = function(id, name, summary, price, quantity, image) {
            var products = getAllProducts();
            products.push({
                id: id,
                name: name,
                summary: summary,
                price: price,
                quantity: quantity,
                image: image
            });
            setAllProducts(products);
        };

        /*
        PUBLIC
        */

        // Retrieve all products from Storage as JSON 
        var getAllProducts = function() {
            try {
                var products = JSON.parse(localStorage[STORAGE_NAME]);
                return products;
            } catch (e) {
                return [];
            }
        };

        // Update quantity of a product
        var updatePoduct = function(id, quantity, increaseQuantity) {
            var productIndex = getIndexOfProduct(id);
            if (productIndex < 0) {
                return false;
            }
            var products = getAllProducts();
            if (increaseQuantity) {
                products[productIndex].quantity = products[productIndex].quantity * 1 + (typeof quantity === "undefined" ? 1 : quantity * 1);
            } else {
                products[productIndex].quantity = typeof quantity === "undefined" ? products[productIndex].quantity * 1 + 1 : quantity * 1;
            }
            // or instead of above if statement >> do it with one line
            // products[productIndex].quantity = typeof quantity === "undefined" ? products[productIndex].quantity * 1 + 1 : quantity;
            setAllProducts(products);
            return true;
        };

        // Check if the product (button tag) have all attributes
        var setProduct = function(id, name, summary, price, quantity, image) {
            if (typeof id === "undefined") {
                console.error("id required");
                return false;
            }
            if (typeof name === "undefined") {
                console.error("name required");
                return false;
            }
            if (typeof image === "undefined") {
                console.error("image required");
                return false;
            }
            if (!$.isNumeric(price)) {
                console.error("price is not a number");
                return false;
            }
            if (!$.isNumeric(quantity)) {
                console.error("quantity is not a number");
                return false;
            }
            summary = typeof summary === "undefined" ? "" : summary;

            if (!updatePoduct(id, quantity, true)) {
                addProduct(id, name, summary, price, quantity, image);
            }
        };

        // Clear the cart
        var clearProduct = function() {
            setAllProducts([]);
        };

        // Remove a product
        var removeProduct = function(id) {
            var products = getAllProducts();
            products = $.grep(products, function(value, index) {
                return value.id != id;
            });
            setAllProducts(products);
        };

        // Get total quantity of products
        var getTotalQuantity = function() {
            var total = 0;
            var products = getAllProducts();
            $.each(products, function(index, value) {
                total += value.quantity * 1;
            });
            return total;
        };

        var getTotalPrice = function() {
            var products = getAllProducts();
            var total = 0;
            $.each(products, function(index, value) {
                total += value.quantity * value.price;
                total = MathHelper.getRoundedNumber(total) * 1;
            });
            return total;
        };

        objToReturn.getAllProducts = getAllProducts;
        objToReturn.updatePoduct = updatePoduct;
        objToReturn.setProduct = setProduct;
        objToReturn.clearProduct = clearProduct;
        objToReturn.removeProduct = removeProduct;
        objToReturn.getTotalQuantity = getTotalQuantity;
        objToReturn.getTotalPrice = getTotalPrice;
        return objToReturn;
    }());

    // LOADING THE CART
    var loadMyCartEvent = function() {

        var options = OptionManager.getOptions();
        var $cartIcon = $("." + options.classCartIcon);
        var $cartBadge = $("." + options.classCartBadge);
        var classCartProduct = options.classCartProduct;
        var classProductQuantity = options.classProductQuantity;
        var classProductRemove = options.classProductRemove;
        var classCheckoutCart = options.classCheckoutCart;

        var idCartModal = 'search-result';
        var idCartTable = 'my-cart-table';
        var idCartTBody = 'my-cart-tbody';
        var idCartFooter = 'my-cart-footer';
        var idCartDiscount = 'sidebar-cart-discount';
        var idGrandTotal = 'my-cart-grand-total';
        var idEmptyCartMessage = 'my-cart-empty-message';
        var idDiscountPrice = 'my-cart-discount-price';
        var classProductTotal = 'my-product-total';
        var classAffixMyCartIcon = 'my-cart-icon-affix';


        if (options.cartItems && options.cartItems.constructor === Array) {
            $.each(options.cartItems, function() {
                ProductManager.setProduct(this.id, this.name, this.summary, this.price, this.quantity, this.image);
            });
        }

        // It will put the number of products on the badge of the cart
        $cartBadge.text(ProductManager.getTotalQuantity());

        var drawTable = function() {
            var $cartModal = $("." + idCartModal);
            var $cartTable = $("#" + idCartTable);
            var $cartTBody = $("#" + idCartTBody);
            var $cartFooter = $("#" + idCartFooter);
            $cartTBody.empty();
            $cartFooter.empty();


            // Create the table of the cart items
            if (!$($cartTable).length) {
                console.log('If');

                // var table = `<table id="${idCartTable}">
                //                     <thead>
                //                         <tr>
                //                             <th>Products</th>        
                //                             <th>Quantity</th>        
                //                             <th>Subtotal</th>        
                //                         </tr>    
                //                     </thead>
                //                     <tbody class="table-body" id="${idCartTBody}">
                //                     </tbody>         
                //                 </table>
                //                 <div class="total-price" id="${idCartFooter}">
                //                     <table>

                //                     </table>                
                //                 </div>
                //                 `;
                var table = `
                <div class="post">
                <div class="row post-container">
                    <div class="col-sm-8 my-auto post-img">

                        <div class="row post-content">
                            <div class="col-3 col-sm-2">
                                <div class="img-container circled-border" style="width: fit-content;">
                                    <img src="images/user-2(circle).png" alt="" style="
                                        border-radius: 50%;
                                        width: 80px;
                                        height: 80px;">
                                </div>
                            </div>
                            <div class="col-9 col-sm-10 post-info">
                                <a href="projects - details.html" class="row post-title">ترجمة ملفات من العربية إلى الإنجليزية</a>
                                <div class="row user-info">
                                    <div class="col-4 d-flex align-items-center poster-name" style="padding: 0;">
                                        <i class="fa-solid fa-user"></i>
                                        <p class="">عبدالله الشهراني</p>
                                    </div>
                                    <div class="col-4 d-flex align-items-center post-time" style="padding: 0;">
                                        <i class="fa-solid fa-clock"></i>
                                        <p class="">منذ ساعة</p>
                                    </div>
                                    <div class="col-4 post-bids" style="padding: 0;">
                                        <p class="">(3 عروض)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="col-sm-4 my-auto post-content sm-hide">

                        <div class="row">

                            <div class="col-4">
                                <div class="col-12 post-delivery">
                                    <p class="row">مدة التنفيذ</p>
                                    <p class="row delivery-time">3-1 أيام</p>
                                </div>
                            </div>

                            <div class="col-8">
                                <div class="col-12 post-actions">
                                    <a href="#_" class="add-to-favorite d-flex align-items-center">
                                        <span>أضف إلى المفضلة</span>
                                    </a>
                                    <a href="#_" class="post-details">
                                        <span>تفاصيل</span>
                                    </a>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
                `;

                $cartModal.append(table);
            } else {
                console.log('Else');

                var products = ProductManager.getAllProducts();
                $.each(products, function() {
                    var total = this.quantity * this.price;
                    $('#' + idCartTBody).append(
                        '<tr class="prod-row ' + classCartProduct + '" title="' + this.summary + '" data-id="' + this.id + '" data-price="' + this.price + '">' +
                        '<td>' +
                        '<div class="cart-info">' +
                        '<img src="' + this.image + '" alt="">' +
                        '<div>' +
                        '<p>' + this.name + '</p>' +
                        '<small>Unit Price: $' + this.price + ' </small>' +
                        '<br>' +
                        '<a href="#_" class="' + classProductRemove + '">Remove</a>' +
                        '</div>' +
                        '</div>' +
                        '</td>' +
                        '<td><input type="number" min="1" class="' + classProductQuantity + '" value="' + this.quantity + '"/></td>' +
                        '<td class="' + classProductTotal + '">' + options.currencySymbol + MathHelper.getRoundedNumber(total) + '</td>' +
                        '</tr>');
                });

                var discountPrice = options.getDiscountPrice(products, ProductManager.getTotalPrice(), ProductManager.getTotalQuantity());

                $cartFooter.append(products.length && discountPrice !== null ?

                    '<table>' +
                    '<tr class="subtotal">' +
                    '<td>Subtotal</td>' +
                    '<td><strong class="float-right subtotal" id="' + idGrandTotal + '"></strong></td>' +
                    '</tr>' +
                    // '<tr class="tax">'+
                    //     '<td>Tax</td>'+
                    //     '<td>$35.00</td>'+
                    // '</tr>'+
                    '<tr class="total">' +
                    '<td>Total (including discount)</td>' +
                    '<td><strong class="float-right subtotal" id="' + idDiscountPrice + '"></strong></td>' +
                    '</tr>' +
                    '</table>' :
                    '<div style="margin:auto; padding:50px"><h1>Your Cart Is Empty!</h1></div>'
                );

            }

            showGrandTotal();
            showDiscountPrice();
        };

        var showModal = function() {
            drawTable();
        };

        var updateCart = function() {
            $.each($("." + classProductQuantity), function() {
                var id = $(this).closest("tr").data("id");
                ProductManager.updatePoduct(id, $(this).val());
            });
        };

        var showGrandTotal = function() {
            $("#" + idGrandTotal).text(options.currencySymbol + MathHelper.getRoundedNumber(ProductManager.getTotalPrice()));
        };

        var showDiscountPrice = function() {
            $("#" + idDiscountPrice).text(options.currencySymbol + MathHelper.getRoundedNumber(options.getDiscountPrice(ProductManager.getAllProducts(), ProductManager.getTotalPrice(), ProductManager.getTotalQuantity())));
        };

        /*
        EVENT
        */
        if (options.affixCartIcon) {
            var cartIconBottom = $cartIcon.offset().top * 1 + $cartIcon.css("height").match(/\d+/) * 1;
            var cartIconPosition = $cartIcon.css('position');
            $(window).scroll(function() {
                $(window).scrollTop() >= cartIconBottom ? $cartIcon.addClass(classAffixMyCartIcon) : $cartIcon.removeClass(classAffixMyCartIcon);
            });
        }

        $cartIcon.click(function() {
            options.showCheckoutModal ? showModal() : options.clickOnCartIcon($cartIcon, ProductManager.getAllProducts(), ProductManager.getTotalPrice(), ProductManager.getTotalQuantity());
            // options.clickOnCartIcon(ProductManager.classCartIcon, ProductManager.getAllProducts(), ProductManager.getTotalPrice(), ProductManager.getTotalQuantity());
        });

        $(document).on("input", "." + classProductQuantity, function() {
            var price = $(this).closest("." + classCartProduct).data("price");
            var id = $(this).closest("." + classCartProduct).data("id");
            var quantity = $(this).val();

            $(this).parent().next("." + classProductTotal).text(options.currencySymbol + MathHelper.getRoundedNumber(price * quantity));
            ProductManager.updatePoduct(id, quantity);

            $cartBadge.text(ProductManager.getTotalQuantity());
            showGrandTotal();
            showDiscountPrice();
        });

        $(document).on('keypress', "." + classProductQuantity, function(evt) {
            if (evt.keyCode >= 48 && evt.keyCode <= 57) {
                return;
            }
            evt.preventDefault();
        });

        $(document).on('click', "." + classProductRemove, function() {
            var $tr = $(this).closest("." + classCartProduct);
            var id = $tr.data("id");
            $tr.hide(500, function() {
                ProductManager.removeProduct(id);
                drawTable();
                $cartBadge.text(ProductManager.getTotalQuantity());
            });
        });

        $(document).on('click', "." + classCheckoutCart, function() {
            var products = ProductManager.getAllProducts();
            if (!products.length) {
                $("#" + idEmptyCartMessage).fadeTo('fast', 0.5).fadeTo('fast', 1.0);
                return;
            }
            updateCart();
            var isCheckedOut = options.checkoutCart(ProductManager.getAllProducts(), ProductManager.getTotalPrice(), ProductManager.getTotalQuantity());
            if (isCheckedOut !== false) {
                ProductManager.clearProduct();
                $cartBadge.text(ProductManager.getTotalQuantity());
                // $("#" + idCartTable).hide();
            }
        });

        $('.my-cart-btn').on('click', function() {
            var $target = $(this);
            options.clickOnAddToCart($target);

            var id = $target.data('id');
            var name = $target.data('name');
            var summary = $target.data('summary');
            var price = $target.data('price');
            var quantity = $target.data('quantity');
            var image = $target.data('image');

            ProductManager.setProduct(id, name, summary, price, quantity, image);
            $cartBadge.text(ProductManager.getTotalQuantity());
            options.afterAddOnCart(ProductManager.getAllProducts(), ProductManager.getTotalPrice(), ProductManager.getTotalQuantity());
        });

        showModal();
    };

    // var products = ProductManager.getAllProducts();
    // $.each(products, function () {
    //     var total = this.quantity * this.price;
    //     $('.table-body').append(
    //         '<tr class="prod-row ' + this.summary + '" title="' + this.summary + '" data-id="' + this.id + '" data-price="' + this.price + '">'+
    //             '<td>'+
    //                 '<div class="cart-info">'+
    //                     '<img src="' + this.image + '" alt="">'+
    //                     '<div>'+
    //                         '<p>' + this.name +'</p>'+
    //                         '<small>Price: $50.00</small>'+
    //                         '<br>'+
    //                         '<a href="">Remove</a>'+
    //                     '</div>'+
    //                 '</div>'+
    //             '</td>'+
    //             '<td><input type="number" min="1" style="width: 40px;" class="' + this.summary + '" value="' + this.quantity + '"/></td>'+
    //             '<td>$' + this.price +' + ' + total +'</td>'+
    //         '</tr>');
    //         console.log('Table Body');
    // });

    // CART RUN
    $.fn.myCart = function() {
        OptionManager.loadOptions(); // Load them
        loadMyCartEvent(); // Run them
        return this;
    };

})(jQuery);


$(".my-cart-btn").myCart();