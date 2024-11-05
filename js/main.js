(function($) {	
	"use strict";

    //Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.loader-wrap').length){
			$('.loader-wrap').delay(1000).fadeOut(500);
		}
	}

	if ($(".preloader-close").length) {
        $(".preloader-close").on("click", function(){
            $('.loader-wrap').delay(200).fadeOut(500);
        })
    }
    //End Hide Loading Box (Preloader)

	//Search Popup
	if($('#search-popup').length){
		
		//Show Popup
		$('.search-toggler').on('click', function() {
			$('#search-popup').addClass('popup-visible');
		});
		$(document).keydown(function(e){
	        if(e.keyCode === 27) {
	            $('#search-popup').removeClass('popup-visible');
	        }
	    });
		//Hide Popup
		$('.close-search,.search-popup .overlay-layer').on('click', function() {
			$('#search-popup').removeClass('popup-visible');
		});
	}
	//End Search Popup

    //Update Header Style and Scroll to Top
    function headerStyle() {
        if($('.main-header').length){
            var windowpos = $(window).scrollTop();
            var siteHeader = $('.main-header');
            var scrollLink = $('.scroll-top');
            if (windowpos >= 150) {
                siteHeader.addClass('fixed-header');
                scrollLink.addClass('open');
            } else {
                siteHeader.removeClass('fixed-header');
                scrollLink.removeClass('open');
            }
        }
    }
    headerStyle();

    //Submenu Dropdown Toggle
    if($('.main-header li.dropdown ul').length){
        $('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><i class="flaticon-right-chevron"></i></div>');
    }

    //Mobile Nav Hide Show
    if($('.mobile-menu').length){
        var mobileMenuContent = $('.main-header .menu-area .main-menu').html();
        $('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
        $('.sticky-header .main-menu').append(mobileMenuContent);
        
        //Dropdown Button
        $('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
            $(this).toggleClass('open');
            $(this).prev('ul').slideToggle(500);
        });
        //Dropdown Button
        $('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
            $(this).prev('.megamenu').slideToggle(900);
        });
        //Menu Toggle Btn
        $('.mobile-nav-toggler').on('click', function() {
            $('body').addClass('mobile-menu-visible');
        });

        //Menu Toggle Btn
        $('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
            $('body').removeClass('mobile-menu-visible');
        });
    }

	//Hidden Sidebar
	if($('.hidden-sidebar').length){
		var animButton = $(".sidemenu-nav-toggler"),
	        hiddenBar = $(".hidden-sidebar"),
	        navOverlay = $(".nav-overlay"),
	        hiddenBarClose = $(".hidden-sidebar-close");

	    function showMenu() {
	        TweenMax.to(hiddenBar, 0.6, {
	            force3D: false,
	            left: "0",
	            ease: Expo.easeInOut
	        });
	        hiddenBar.removeClass("close-sidebar");
	    	navOverlay.fadeIn(500);
	    }
	    function hideMenu() {
	        TweenMax.to(hiddenBar, 0.6, {
	            force3D: false,
	            left: "-480px",
	            ease: Expo.easeInOut
	        });
	        hiddenBar.addClass("close-sidebar");
	        navOverlay.fadeOut(500);
	    }
	    animButton.on("click", function() {
	        if (hiddenBar.hasClass("close-sidebar")) showMenu();
	        else hideMenu();
	    });
	    navOverlay.on("click", function() {
	    	hideMenu();
	    });
	    hiddenBarClose.on("click", function() {
	    	hideMenu();
	    });
	}

	//LightBox / Fancybox
	if($('.lightbox-image').length) {
		$('.lightbox-image').fancybox({
			openEffect  : 'fade',
			closeEffect : 'fade',
			helpers : {
				media : {}
			}
		});
	}

	// Banner Style Six
	$(document).ready(function() {

		var sync1 = $("#sync1");
		var sync2 = $("#sync2");
		var slidesPerPage = 3; //globaly define number of elements per page
		var syncedSecondary = true;
	
		sync1.owlCarousel({
			items: 1,
			nav: true,
			autoplay: 6000, 
			dots: true,
			loop: true,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			active: true,
			smartSpeed: 1000,
			responsiveRefreshRate: 200,
			navText: [ '<i class="flaticon-right-chevron"></i>', '<i class="flaticon-right-chevron"></i>' ],
		}).on('changed.owl.carousel', syncPosition);
	
		sync2
			.on('initialized.owl.carousel', function() {
				sync2.find(".owl-item").eq(0).addClass("current");
			})
			.owlCarousel({
				items: slidesPerPage,
				dots: true,
				nav: true,
				smartSpeed: 200,
				slideSpeed: 500,
				slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
				responsiveRefreshRate: 100
			}).on('changed.owl.carousel', syncPosition2);
	
		function syncPosition(el) {
			//if you set loop to false, you have to restore this next line
			//var current = el.item.index;
	
			//if you disable loop you have to comment this block
			var count = el.item.count - 1;
			var current = Math.round(el.item.index - (el.item.count / 2) - .5);
	
			if (current < 0) {
				current = count;
			}
			if (current > count) {
				current = 0;
			}
	
			//end block
	
			sync2
				.find(".owl-item")
				.removeClass("current")
				.eq(current)
				.addClass("current");
			var onscreen = sync2.find('.owl-item.active').length - 1;
			var start = sync2.find('.owl-item.active').first().index();
			var end = sync2.find('.owl-item.active').last().index();
	
			if (current > end) {
				sync2.data('owl.carousel').to(current, 100, true);
			}
			if (current < start) {
				sync2.data('owl.carousel').to(current - onscreen, 100, true);
			}
		}
	
		function syncPosition2(el) {
			if (syncedSecondary) {
				var number = el.item.index;
				sync1.data('owl.carousel').to(number, 100, true);
			}
		}
	
		sync2.on("click", ".owl-item", function(e) {
			e.preventDefault();
			var number = $(this).index();
			sync1.data('owl.carousel').to(number, 300, true);
		});
	});
	// End Banner Style Six

    // Banner Carousel
	if ($('.banner-carousel').length) {
        $('.banner-carousel').owlCarousel({
            loop:true,
			margin:0,
			nav:true,
			animateOut: 'fadeOut',
    		animateIn: 'fadeIn',
    		active: true,
			smartSpeed: 1000,
			autoplay: 6000,
            navText: [ '<i class="flaticon-right-chevron"></i>', '<i class="flaticon-right-chevron"></i>' ],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                800:{
                    items:1
                },
                1024:{
                    items:1
                }
            }
        });
    }
    // End Banner Carousel

    //Contact Form Validation
	if($('#contact-form').length){
		$('#contact-form').validate({
			rules: {
				username: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				phone: {
					required: true
				},
				subject: {
					required: true
				},
				message: {
					required: true
				}
			}
		});
	}

	//Services One Carousel
	if ($('.service-carousel').length) {
		$('.service-carousel').owlCarousel({
			loop:true,
			margin:40,
			nav:true,
			smartSpeed: 2000,
			autoplay: 1000,
			navText: [ '<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:1
				},
				1200:{
					items:1
				},
				1320:{
					items:1
				}
			}
		});    		
	}

    //One Item Carousel
	if ($('.testimonials-slide').length) {
		$('.testimonials-slide').owlCarousel({
			loop:true,
			margin:40,
			nav:true,
			smartSpeed: 500,
			autoplay: 1000,
			navText: [ '<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:1
				},
				1200:{
					items:1
				},
				1320:{
					items:1
				}
			}
		});    		
	}

	//One Item Carousel
	if ($('.testimonials-slide-six').length) {
		$('.testimonials-slide-six').owlCarousel({
			loop:true,
			margin:40,
			nav:true,
			smartSpeed: 500,
			autoplay: 1000,
			navText: [ '<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:2
				},
				1200:{
					items:1
				},
				1600:{
					items:2
				}
			}
		});
	}

	//One Item Carousel
	if ($('.blog-slide').length) {
		$('.blog-slide').owlCarousel({
			loop:true,
			margin:40,
			nav:true,
			smartSpeed: 500,
			autoplay: 1000,
			navText: [ '<span class="fas fa-angle-left"></span> Prev Post', 'Next Post<span class="fas fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:2
				},
				1200:{
					items:2
				},
				1600:{
					items:2
				}
			}
		});
	}

	//One Item Carousel
	if ($('.one-item-carousel').length) {
		$('.one-item-carousel').owlCarousel({
			loop:true,
			margin:40,
			nav:true,
			smartSpeed: 500,
			autoplay: 1000,
			navText: [ '<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:1
				},
				1200:{
					items:1
				},
				1320:{
					items:1
				}
			}
		});    		
	}

	//One Item Carousel
	if ($('.premium-service-slide').length) {
		$('.premium-service-slide').owlCarousel({
			loop:true,
			margin:40,
			nav:true,
			smartSpeed: 500,
			autoplay: 1000,
			navText: [ '<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:1
				},
				1200:{
					items:1
				},
				1320:{
					items:1
				}
			}
		});    		
	}

	//Six Item Carousel
	if ($('.six-item-carousel').length) {
		$('.six-item-carousel').owlCarousel({
			loop:true,
			margin:40,
			nav:true,
			smartSpeed: 500,
			autoplay: 1000,
			navText: [ '<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				200:{
					items:2
				},
				400:{
					items:3
				},
				600:{
					items:3
				},
				800:{
					items:4
				},
				1200:{
					items:5
				},
				1320:{
					items:6
				}
			}
		});    		
	}

	//three-item-carousel
	if ($('.testimonial-block-slide').length) {
		$('.testimonial-block-slide').owlCarousel({
			loop:true,
			margin:40,
			nav:true,
			smartSpeed: 500,
			autoplay: 1000,
			navText: [ '<i class="flaticon-left-chevron"></i>', '<i class="flaticon-chevron"></i>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:2
				},
				1200:{
					items:2
				},
				1320:{
					items:3
				}
			}
		});    		
	}

	//three-item-carousel
	if ($('.testimonial-block-slide-2').length) {
		$('.testimonial-block-slide-2').owlCarousel({
			loop:true,
			margin:40,
			nav:true,
			smartSpeed: 500,
			autoplay: 1000,
			navText: [ '<i class="flaticon-left-chevron"></i>', '<i class="flaticon-chevron"></i>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:1
				},
				1320:{
					items:2
				},
				3000:{
					items:3
				}
			}
		});    		
	}

	//three-item-carousel
	if ($('.project-block-slide').length) {
		$('.project-block-slide').owlCarousel({
			loop:true,
			margin:40,
			nav:true,
			smartSpeed: 500,
			autoplay: 1000,
			navText: [ '<i class="flaticon-left-chevron"></i>', '<i class="flaticon-chevron"></i>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				800:{
					items:2
				},
				1200:{
					items:3
				},
				1320:{
					items:5
				}
			}
		});    		
	}

	//three-item-carousel
	if ($('.project-block-four').length) {
		$('.project-block-four').owlCarousel({
			loop:true,
			margin:40,
			nav:true,
			smartSpeed: 500,
			autoplay: 1000,
			navText: [ '<i class="flaticon-left-chevron"></i>', '<i class="flaticon-chevron"></i>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				800:{
					items:2
				},
				1200:{
					items:3
				},
				1320:{
					items:4
				}
			}
		});    		
	}

	//Fact Counter + Text Count
	if($('.count-box').length){
		$('.count-box').appear(function(){
	
			var $t = $(this),
				n = $t.find(".count-text").attr("data-stop"),
				r = parseInt($t.find(".count-text").attr("data-speed"), 10);
				
			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".count-text").text(this.countNum);
					}
				});
			}			
		},{accY: 0});
	}

	//Accordion Box
	if($('.accordion-box').length){
		$(".accordion-box").on('click', '.acc-btn', function() {			
			var outerBox = $(this).parents('.accordion-box');
			var target = $(this).parents('.accordion');			
			if($(this).hasClass('active')!==true){
				$(outerBox).find('.accordion .acc-btn').removeClass('active');
			}			
			if ($(this).next('.acc-content').is(':visible')){
				return false;
			}else{
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);	
			}
		});	
	}

	// Progress Bar
	if ($('.count-bar').length) {
		$('.count-bar').appear(function(){
			var el = $(this);
			var percent = el.data('percent');
			$(el).css('width',percent).addClass('counted');
		},{accY: -50});
	}

	//Tabs Box
	if($('.tabs-box').length){
		$('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).is(':visible')){
				return false;
			}else{
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
				$(target).fadeIn(300);
				$(target).addClass('active-tab');
			}
		});
	}

    // Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
		   // animate
		   $('html, body').animate({
			   scrollTop: $(target).offset().top
			 }, 1000);	
		});
	}
    // End Scroll to a Specific Div

	// pieChart RoundCircle
	function expertizeRoundCircle () {
		var rounderContainer = $('.piechart');
		if (rounderContainer.length) {
			rounderContainer.each(function () {
				var Self = $(this);
				var value = Self.data('value');
				var size = Self.parent().width();
				var color = Self.data('fg-color');

				Self.find('span').each(function () {
					var expertCount = $(this);
					expertCount.appear(function () {
						expertCount.countTo({
							from: 1,
							to: value*100,
							speed: 3000
						});
					});

				});
				Self.appear(function () {					
					Self.circleProgress({
						value: value,
						size: 100,
						thickness: 8,
						emptyFill: '#BDBDBD',
						animation: {
							duration: 3000
						},
						fill: {
							color: color
						}
					});
				});
			});
		};
	}

	// Nice Select
	$(document).ready(function() {
		$('select:not(.ignore)').niceSelect();
	});
	// End Nice Select

    // Elements Animation
	if($('.wow').length){
		var wow = new WOW({
		mobile:       false
		});
		wow.init();
	}
    // End Elements Animation


	if ($('.testimonial-section .bxslider').length) {
		$('.testimonial-section .bxslider').bxSlider({
	        nextText: '<i class="fal fa-angle-right"></i>',
	        prevText: '<i class="fal fa-angle-left"></i>',
	        mode: 'fade',
	        auto: 'true',
	        speed: '700',
	        pagerCustom: '.testimonial-section .slider-pager .thumb-box'
	    });
	};

	if ($('.testimonial-section-three .bxslider').length) {
		$('.testimonial-section-three .bxslider').bxSlider({
	        mode: 'fade',
	        auto: 'true',
	        speed: '700',
	        pagerCustom: '.testimonial-section-three .slider-pager .thumb-box'
	    });
	};

	// Split Scroll	
	if($('#scroll-container').length){
		$('#scroll-container').multiscroll({
			navigation: true,
			css3:true
		});
	}

	//Parallax Scene for Icons
	if($('.parallax-scene-1').length){
		var scene = $('.parallax-scene-1').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-2').length){
		var scene = $('.parallax-scene-2').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-3').length){
		var scene = $('.parallax-scene-3').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-4').length){
		var scene = $('.parallax-scene-4').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-5').length){
		var scene = $('.parallax-scene-5').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-6').length){
		var scene = $('.parallax-scene-6').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-7').length){
		var scene = $('.parallax-scene-7').get(0);
		var parallaxInstance = new Parallax(scene);
	}

	/* ==========================================================================
    When document is Scrollig, do
    ========================================================================== */
	
	$(window).on('scroll', function() {
		headerStyle();
	});  
    
    /* ==========================================================================
    When document is loaded, do
    ========================================================================== */
	
	$(window).on('load', function() {
		handlePreloader();
		expertizeRoundCircle ();
	});
	
})(window.jQuery);