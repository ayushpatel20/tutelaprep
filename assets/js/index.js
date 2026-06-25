$(".media-carousel").owlCarousel({
	loop:true,
	margin:15,
	dots:false,
	nav:false,
	autoplay: true,
	slideTransition: "linear",
	autoplayTimeout: 4000,
	autoplaySpeed: 4000,
	autoplayHoverPause: true, 
	responsive:{
		0:{
			items:3,
			margin:10,
		},
		600:{
			items:4
		},
		1000:{
			items:6
		}
	}
});
$(".score-carousel").owlCarousel({
	loop:true,
	margin:15,
	dots:false,
	nav:false,
	stagePadding:50,
	autoplay: true,
	slideTransition: "linear",
	autoplayTimeout: 4000,
	autoplaySpeed: 4000,
	autoplayHoverPause: true, 
	responsive:{
		0:{
			items:1
		},
		600:{
			items:1
		},
		1000:{
			items:2
		}
	}
});
$(".bannerscore-carousel").owlCarousel({
	loop:true,
	margin:25,
	dots:false,
	nav:false,
	stagePadding:0,
	stagePadding:20,
	autoplay: true,
	slideTransition: "linear",
	autoplayTimeout: 4000,
	autoplaySpeed: 4000,
	autoplayHoverPause: true, 
	responsive:{
		0:{
			items:1,
			margin:15,
			stagePadding:100,
		},
		600:{
			items:2
		},
		1000:{
			items:2
		}
	}
});
$(".college-carousel").owlCarousel({
	loop:true,
	margin:20,
	dots:false,
	nav:false,
	stagePadding:0,
	autoplay: true,
	slideTransition: "linear",
	autoplayTimeout: 4000,
	autoplaySpeed: 4000,
	autoplayHoverPause: true, 
	responsive:{
		0:{
			items:3,
			stagePadding:30,
			margin:0,
			center:false
		},
		600:{
			items:5
		},
		1000:{
			items:8
		}
	}
});
$(".owl-carousel5").owlCarousel({
	loop:true,
	center: false,
	margin:15,
	dots:false,
	nav:true,
	navText: ["<img src='/assets/images/caret-left-fill.svg'>","<img src='/assets/images/caret-right-fill.svg'>"],
	stagePadding: 60,
	responsive:{
		0:{
			items:1
		},
		600:{
			items:1
		},
		1000:{
			items:1
		}
	}
});
function count($this){
	var current = parseInt($this.html(), 10);
	current = current + 1;
	$this.html(++current);
	if(current > $this.data("count")){
		$this.html($this.data("count"));
	} else {
		setTimeout(function(){count($this)}, 50);
	}
}
setInterval(function() {
    $("#courseloop").text($(".course-btn").eq(Math.floor(Math.random() * $(".course-btn").length)).text());
}, 2000);
$(window).scroll(function() {
	var scrollPosition = $(window).scrollTop();
	$(".timeline-container span").each(function() {
		var $this = $(this);
		var sectionTop = $(this).offset().top;
		var sectionHeight = $(this).outerHeight();
		if (scrollPosition >= sectionTop - 500 && scrollPosition < sectionTop + sectionHeight) {
			if(!$(this).hasClass("bg-white")){
				$(this).addClass("bg-white text-dark");
			}
		}
	});
});
