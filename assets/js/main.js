(function ($) {

    'use strict';
    
    $.exists = function(selector) {
        return ($(selector).length > 0);
    }
    
    $('.text-component a > img').parent('a').addClass('has-img');
    $('.text-component__inner .twitter-tweet').parent('.media-wrapper').addClass('twitter-embed');

    swiperActivation();
    ms_header_menu();
    ms_page_transition();
    ms_stickyheader();  
    ms_theme_mode();
    ms_menu_default_mobile(); 
    ms_excerpt_gallery();
    ms_search_widget();
    ms_woo_quantity();  
    ms_footer_effect();

    function ms_footer_effect() {
        if ($('body').attr('data-footer-effect') == 'on') {
            var m_body = $('.ms-footer').height();
            $('.ms-main').css('margin-bottom', m_body);
            $(window).on("resize", function() {
                var m_body = $('.ms-footer').height();
                $('.ms-main').css('margin-bottom', m_body);
            });

        }
    }
    
    $(function() {
        $('.stars').find('a').on('click', function() {
            $(this).nextAll().removeClass('action');
        });
        $('.stars').find('a').mouseover(function() {

            $('.stars').find('a').each(function() {
                if ( $('.stars').find('a').hasClass('active')) {

                } else {
                    $(this).mouseover(function() {
                        $(this).addClass('action');
                        $(this).nextAll().removeClass('action');
                        $(this).prevAll().addClass('action');
                    });
                }
            });

        });

        $('.stars').find('a').mouseout(function() {
            
            $('.stars').find('a').each(function() {
                if ( $('.stars').find('a').hasClass('active')) {
                    $('.active').prevAll().addClass('action');
                    $('.active').removeClass('action').nextAll().removeClass('action');
                } else {
                    $('.stars').find('a').removeClass('action');
                }
            });
        });

    });

    function ms_search_widget() {

        $('.header__search-icon').on('click', function() {
            $('.header__search-modal').toggleClass('modal--is-visible');
        });
        
        $(document).on('click', '.modal--is-visible', function(e) {
            if (e.target == this) {
                $('.header__search-modal').toggleClass('modal--is-visible');
            }
        });

        $('.header__search--close-btn').on('click', function() {
            $('.header__search-modal').toggleClass('modal--is-visible');
        });

    }

   

    function ms_excerpt_gallery() {
        const swiper = new Swiper('.ms-post-media__gallery', {
            loop: true,
            speed: 600,
            navigation: {
                nextEl: '.ms-sp-btn__next',
                prevEl: '.ms-sp-btn__prev',
            },
        });
    }
   
    // Header menu
    function ms_header_menu() {
        if ($.exists('.js-main-header__nav-trigger')) {
            var mainHeader = document.getElementsByClassName('js-main-header')[0];
            if( mainHeader ) {
                var trigger = mainHeader.getElementsByClassName('js-main-header__nav-trigger')[0],
                    nav = mainHeader.getElementsByClassName('js-main-header__nav')[0];
                    //detect click on nav trigger
                    trigger.addEventListener("click", function(event) {
                        event.preventDefault();
                        var ariaExpanded = !Util.hasClass(nav, 'main-header__nav--is-visible');
                        //show nav and update button aria value
                        Util.toggleClass(nav, 'main-header__nav--is-visible', ariaExpanded);
                        trigger.setAttribute('aria-expanded', ariaExpanded);
                        if(ariaExpanded) { //opening menu -> move focus to first element inside nav
                            nav.querySelectorAll('[href], input:not([disabled]), button:not([disabled])')[0].focus();
                        }
                    });
            }
        }
        if ( $(window).width() > 1023 ){
           
            // Default Menu Style
            if ($.exists('.menu-default')) {
                var m_item = $('.navbar-nav').find(' > li.menu-item > a');

                $(m_item).each(function() {
                    $(this).html('<span>' + this.textContent + '</span>');
                    $(this).attr("title", this.textContent);
                });

                var menu_type = $("body").attr('data-menu');
                if (menu_type == 'fixed') {
                    var header = $(".main-header__layout").addClass('top');
                    $(window).scroll(function() {    
                        var scroll = $(window).scrollTop();
                    
                        if (scroll > 300) {
                            header.removeClass('top').addClass("action");
                        } else {
                            header.addClass('top').removeClass("action");
                        }
                    });
                }

            }

            $(window).scroll(function(){
                if ($(this).scrollTop() > 50) {
                   $('.main-header').addClass('show-bg');
                } else {
                   $('.main-header').removeClass('show-bg');
                }
            
            });

        }

    }
    
    // Mobile Menu
    function ms_menu_default_mobile() {

        if ($(window).width() < 1024) {
            $('.main-header__nav ').addClass('is_mobile');
        }
    
        var isAbove1024 = $(window).width() > 1024;
        $(window).on('resize', function(event){
            if( $(window).width() < 1077 && isAbove1024){
                isAbove1024 = false;
                $('.sub-menu').css('display', 'none');
                $('.main-header__nav ').addClass('is_mobile');
            }else if($(window).width() > 1077 && !isAbove1024){
                isAbove1024 = true;
                $('.sub-menu').css('display', 'block');
                $('.main-header__nav ').removeClass('is_mobile');
            }
        });

        $(document).on('click', '.is_mobile .navbar-nav > .menu-item-has-children > a', function(e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
               $(this).siblings('.sub-menu').slideUp(100);
            } else {
                $('.menu-item-has-children > a').removeClass('active');
                $(this).addClass('active');
                $('.sub-menu').slideUp(200);
                $(this).siblings('.sub-menu').slideDown(100);
            }
          });

         
    }

    // Sticky Header
    function ms_stickyheader() {
    
        if ($.exists('body[data-menu="sticky"]')) {
      
          var mainHeader = $('.main-header__layout'),
              belowNavHeroContent = $('.sub-nav-hero'),
              scrolling = false,
              previousTop = 0,
              scrollDelta = 5,
              scrollOffset = 100;
      
          $(window).on('scroll', function(){
          if( !scrolling ) {
            scrolling = true;
              (!window.requestAnimationFrame)
              ? setTimeout(autoHideHeader, 300)
              : requestAnimationFrame(autoHideHeader);
          }
          });
          function autoHideHeader() {
              var currentTop = $(window).scrollTop();
              ( belowNavHeroContent.length > 0 ) 
              ? checkStickyNavigation(currentTop) : checkSimpleNavigation(currentTop);
              previousTop = currentTop;
              scrolling = false;
          }
          function checkSimpleNavigation(currentTop) {
              if (previousTop - currentTop > scrollDelta) {
                  mainHeader.removeClass('is-hide');
              } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
                  mainHeader.addClass('is-hide');
              }
          }
      
          $(window).scroll(function(){
          if ($(this).scrollTop() > 50) {
             $('.main-header').addClass('show-bg');
          } else {
             $('.main-header').removeClass('show-bg');
          }
      
          });
      
        }
      
    }
    
    // Page Transition
    function ms_page_transition() {

        if ($.exists('#loaded')) {

        window.onpageshow = function (event) {
            if (event.persisted) {
                window.location.reload();
            }
        };

        window.onbeforeunload = function(){
            $('#loaded').css('display', 'block');
            gsap.to("#loaded",{ opacity:1, ease: "power4.inOut", duration:.3 });
        };

        function ms_page_loaded() {
                $('#loaded').css('display', 'none');
                $('body').attr('onunload','');
            }
            gsap.fromTo("#loaded",{opacity: 1}, {opacity: 0, ease: Power1.easeOut, onComplete:ms_page_loaded, duration: 1 });
            
        }

    }

     // Swiper Slider Options
    function swiperActivation($scope){
        var swiper = new Swiper(".swiper-container-h", {
            direction: "horizontal",
            effect: "slide",
            autoplay: true,
            parallax: true,
            speed: 1600,
            rtl: true,
            loop: true,
            loopFillGroupWithBlank: !0,
  
            mousewheel: {
              eventsTarged: ".swiper-slide",
              sensitivity: 1
            },
            keyboard: {
              enabled: true,
              onlyInViewport: true
            },
            scrollbar: {
              el: ".swiper-scrollbar",
              hide: false,
              draggable: true
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                type: "progressbar"
              }
          });
        var swiper = new Swiper(".swiper-container-h1", {
            direction: "horizontal",
            effect: "slide",
            autoplay: false,
            parallax: true,
            speed: 1600,
            rtl: true,
            loop: true,
            loopFillGroupWithBlank: !0,
            keyboard: {
              enabled: true,
              onlyInViewport: true
            },
            scrollbar: {
              el: ".swiper-scrollbar",
              hide: false,
              draggable: true
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                type: "bullets",
                clickable:"true"
              }
          });
    }
    
    // Run on initial load.
    msResponsiveEmbeds();

    // Run on resize.
    window.onresize = msResponsiveEmbeds;

    // Responsive Embeds
    function msResponsiveEmbeds() {
        var proportion, parentWidth;
    
        // Loop iframe elements.
        document.querySelectorAll( 'iframe' ).forEach( function( iframe ) {
            // Only continue if the iframe has a width & height defined.
            if ( iframe.width && iframe.height ) {
                // Calculate the proportion/ratio based on the width & height.
                proportion = parseFloat( iframe.width ) / parseFloat( iframe.height );
                // Get the parent element's width.
                parentWidth = parseFloat( window.getComputedStyle( iframe.parentElement, null ).width.replace( 'px', '' ) );
                // Set the max-width & height.
                iframe.style.maxWidth = '100%';
                iframe.style.maxHeight = Math.round( parentWidth / proportion ).toString() + 'px';
            }
        } );
    }
    
  

    // Theme Mode
    function ms_theme_mode() {
        if ($.exists('.ms_theme_mode')) {
            var td = $("#theme-dark"),
                tl = $("#theme-light"),
                s = $("#switcher");
    
            function setThemeMode(theme) {
                localStorage.setItem('theme-mode', theme);
            }
    
            function getThemeMode() {
                return localStorage.getItem('theme-mode');
            }
    
            function updateUITheme() {
                var currentTheme = getThemeMode();
                if (currentTheme === 'dark') {
                    $(td).addClass('toggler--is-active');
                    $(tl).removeClass('toggler--is-active');
                    $(s).prop('checked', false);
                    $('body').attr('data-theme', 'dark');
                } else {
                    $(td).removeClass('toggler--is-active');
                    $(tl).addClass('toggler--is-active');
                    $(s).prop('checked', true);
                    $('body').attr('data-theme', 'light');
                }
            }
    
            // Hide the content until the theme mode is set
            $('body').css('visibility', 'hidden');
    
            // Initialize the UI based on the stored theme mode
            updateUITheme();
    
            // Show the content after the theme mode is set
            $('body').css('visibility', 'visible');
    
            $(td).on("click", function() {
                setThemeMode('dark');
                updateUITheme();
            });
    
            $(tl).on("click", function() {
                setThemeMode('light');
                updateUITheme();
            });
    
            $(s).on("click", function() {
                var currentTheme = getThemeMode();
                var newTheme = (currentTheme === 'light') ? 'dark' : 'light';
                setThemeMode(newTheme);
                updateUITheme();
            });
        }
    }

    function ms_woo_quantity() {

        if ($.exists('.ms-quantity')) {
            $('body').on('click', '.button-plus, .button-minus', function(e) {
                const isNegative = $(e.target).closest('.button-minus').is('.button-minus');
                const input = $(e.target).closest('.ms-quantity').find('input');
                if (input.is('input')) {
                  input[0][isNegative ? 'stepDown' : 'stepUp']();
                  $('button[name="update_cart"]').prop('disabled', false);
                }
              });

        }

    }

 

})(jQuery);

// Utill
( function( window, factory ) {
    // universal module definition
    /* jshint strict: false */ /*globals define, module, require */
    if ( typeof define === 'function' && define.amd ) {
      // AMD
      define( [
          'isotope-layout/js/layout-mode'
        ],
        factory );
    } else if ( typeof exports === 'object' ) {
      // CommonJS
      module.exports = factory(
        require('isotope-layout/js/layout-mode')
      );
    } else {
      // browser global
      factory(
        window.Isotope.LayoutMode
      );
    }
  
    }( window, function factory( LayoutMode ) {
    'use strict';
  
    var CellsByRow = LayoutMode.create( 'cellsByRow' );
    var proto = CellsByRow.prototype;
  
    proto._resetLayout = function() {
      // reset properties
      this.itemIndex = 0;
      // measurements
      this.getColumnWidth();
      this.getRowHeight();
      // set cols
      this.cols = Math.floor( this.isotope.size.innerWidth / this.columnWidth );
      this.cols = Math.max( this.cols, 1 );
    };
  
    proto._getItemLayoutPosition = function( item ) {
      item.getSize();
      var col = this.itemIndex % this.cols;
      var row = Math.floor( this.itemIndex / this.cols );
      // center item within cell
      var x = ( col + 0.5 ) * this.columnWidth - item.size.outerWidth / 2;
      var y = ( row + 0.5 ) * this.rowHeight - item.size.outerHeight / 2;
      this.itemIndex++;
      return { x: x, y: y };
    };
  
    proto._getContainerSize = function() {
      return {
        height: Math.ceil( this.itemIndex / this.cols ) * this.rowHeight
      };
    };
  
    return CellsByRow;
  
    }));
  
    // Utility function
    function Util () {};

// class manipulation functions
Util.hasClass = function(el, className) {
    if (el.classList) return el.classList.contains(className);
    else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

Util.addClass = function(el, className) {
    var classList = className.split(' ');
    if (el.classList) el.classList.add(classList[0]);
    else if (!Util.hasClass(el, classList[0])) el.className += " " + classList[0];
    if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = function(el, className) {
    var classList = className.split(' ');
    if (el.classList) el.classList.remove(classList[0]);  
    else if(Util.hasClass(el, classList[0])) {
        var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
        el.className=el.className.replace(reg, ' ');
    }
    if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
    };

Util.toggleClass = function(el, className, bool) {
    if(bool) Util.addClass(el, className);
    else Util.removeClass(el, className);
    };

Util.setAttributes = function(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
};

    /* 
    DOM manipulation
    */
Util.getChildrenByClassName = function(el, className) {
    var children = el.children,
        childrenByClass = [];
    for (var i = 0; i < el.children.length; i++) {
        if (Util.hasClass(el.children[i], className)) childrenByClass.push(el.children[i]);
    }
    return childrenByClass;
};

    Util.is = function(elem, selector) {
    if(selector.nodeType){
        return elem === selector;
    }

    var qa = (typeof(selector) === 'string' ? document.querySelectorAll(selector) : selector),
        length = qa.length,
        returnArr = [];

    while(length--){
        if(qa[length] === elem){
        return true;
        }
    }

    return false;
    };

    /* 
    Animate height of an element
    */
    Util.setHeight = function(start, to, element, duration, cb) {
    var change = to - start,
        currentTime = null;

    var animateHeight = function(timestamp){  
        if (!currentTime) currentTime = timestamp;         
        var progress = timestamp - currentTime;
        var val = parseInt((progress/duration)*change + start);
        element.style.height = val+"px";
        if(progress < duration) {
            window.requestAnimationFrame(animateHeight);
        } else {
        cb();
        }
    };

    //set the height of the element before starting animation -> fix bug on Safari
    element.style.height = start+"px";
    window.requestAnimationFrame(animateHeight);
    };

     jarallax(document.querySelectorAll('.jarallax-img'), {
         speed: 0.7
     });

     jarallax(document.querySelectorAll('.footer-container'), {
         speed: 0.7
     });

    // isotop area

    $(document).ready(function(){

          
        var isotope = $(".main-isotop");

        if(isotope.length){
            var iso = new Isotope( '.filter', {
                itemSelector: '.element-item',
                layoutMode: 'fitRows'
              });
              
              // filter functions
              var filterFns = {
                // show if name ends with -ium
                ium: function( itemElem ) {
                  var name = itemElem.querySelector('.name').textContent;
                  return name.match( /ium$/ );
                }
              };
              
              // bind filter button click
              var filtersElem = document.querySelector('.filters-button-group');
              filtersElem.addEventListener( 'click', function( event ) {
                // only work with buttons
                if ( !matchesSelector( event.target, 'button' ) ) {
                  return;
                }
                var filterValue = event.target.getAttribute('data-filter');
                // use matching filter function
                filterValue = filterFns[ filterValue ] || filterValue;
                iso.arrange({ filter: filterValue });
              });
              
              // change is-checked class on buttons
              var buttonGroups = document.querySelectorAll('.button-group');
              for ( var i=0, len = buttonGroups.length; i < len; i++ ) {
                var buttonGroup = buttonGroups[i];
                radioButtonGroup( buttonGroup );
              }
              function radioButtonGroup( buttonGroup ) {
                buttonGroup.addEventListener( 'click', function( event ) {
                  // only work with buttons
                  if ( !matchesSelector( event.target, 'button' ) ) {
                    return;
                  }
                  buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
                  event.target.classList.add('is-checked');
                });
              }
        }

        if ($('.grid-masonary').length) {

            // image loaded portfolio init
            $('.grid-masonary').imagesLoaded(function() {
                $('.portfolio-filter').on('click', 'button', function() {
                    var filterValue = $(this).attr('data-filter');
                    $grid.isotope({
                        filter: filterValue
                    });
                });
                var $grid = $('.grid-masonary').isotope({
                    itemSelector: '.grid-item-p',
                    percentPosition: true,
                    masonry: {
                        columnWidth: '.grid-item-p',
                    }
                });
            });
        }
                
        // portfolio Filter
        $('.portfolio-filter button').on('click', function(event) {
            $(this).siblings('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
            event.preventDefault();
        });
        
        
    });




/* 
    Smooth Scroll
*/
//Animation curves
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};
Util.scrollTo = function(final, duration, cb) {
  var start = window.scrollY || document.documentElement.scrollTop,
      currentTime = null;
      
  var animateScroll = function(timestamp){
    if (!currentTime) currentTime = timestamp;        
    var progress = timestamp - currentTime;
    if(progress > duration) progress = duration;
    var val = Math.easeInOutQuad(progress, start, final-start, duration);
    window.scrollTo(0, val);
    if(progress < duration) {
        window.requestAnimationFrame(animateScroll);
    } else {
      cb && cb();
    }
  };

  window.requestAnimationFrame(animateScroll);
};

// Back to Top
(function() {
  var backTop = document.getElementsByClassName('js-back-to-top')[0];
  if( backTop ) {
    var scrollDuration = parseInt(backTop.getAttribute('data-duration')) || 0, //scroll to top duration
      scrollOffset = parseInt(backTop.getAttribute('data-offset')) || 10, //show back-to-top if scrolling > scrollOffset
      scrolling = false;
    
    //detect click on back-to-top link
    backTop.addEventListener('click', function(event) {
      event.preventDefault();
      (!window.requestAnimationFrame) ? window.scrollTo(0, 0) : Util.scrollTo(0, scrollDuration);
    });

  }

  var filter_price = $('.filter-price');
	if (filter_price.length) {
		var lowerSlider = document.querySelector('#lower');
		var upperSlider = document.querySelector('#upper');

		document.querySelector('#two').value = upperSlider.value;
		document.querySelector('#one').value = lowerSlider.value;

		var lowerVal = parseInt(lowerSlider.value);
		var upperVal = parseInt(upperSlider.value);

		upperSlider.oninput = function () {
			lowerVal = parseInt(lowerSlider.value);
			upperVal = parseInt(upperSlider.value);

			if (upperVal < lowerVal + 4) {
				lowerSlider.value = upperVal - 4;
				if (lowerVal == lowerSlider.min) {
					upperSlider.value = 4;
				}
			}
			document.querySelector('#two').value = this.value
		};

		lowerSlider.oninput = function () {
			lowerVal = parseInt(lowerSlider.value);
			upperVal = parseInt(upperSlider.value);
			if (lowerVal > upperVal - 4) {
				upperSlider.value = lowerVal + 4;
				if (upperVal == upperSlider.max) {
					lowerSlider.value = parseInt(upperSlider.max) - 4;
				}
			}
			document.querySelector('#one').value = this.value
		};
	}

}
());