(function($) {

	"use strict";
	AOS.init({
            offset:100,
            duration:800,
            easing: 'ease-in-out',
            anchorPlacement:'top-bottom',
            mirror:true
        });

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	var carousel = function() {
		$('.featured-carousel').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:30,
	    nav:true,
	    dots: false,
	    autoplayHoverPause: false,
	    pauseHoverPause: true,
	    items: 2,
	    navText : ["<span class='ion-ios-arrow-back'></span>","<span class='ion-ios-arrow-forward'></span>"],
	    responsive:{
	      0:{
	        items:2
	      },
	      600:{
	        items:2
	      },
	      1000:{
	        items:3
	      }
	    }
		});

		$('.album-carousel').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:30,
	    nav:true,
	    dots: false,
	    autoplayHoverPause: false,
	    pauseHoverPause: true,
	    items: 2,
	    navText : ["<span class='ion-ios-arrow-back'></span>","<span class='ion-ios-arrow-forward'></span>"],
	    responsive:{
	      0:{
	        items:2
	      },
	      600:{
	        items:2
	      },
	      1000:{
	        items:3
	      }
	    }
		});

	};
	carousel();

})(jQuery);


const menuBtn = document.querySelector(".icon");

menuBtn.addEventListener('click',()=>{
	menuBtn.classList.toggle("active");
})
