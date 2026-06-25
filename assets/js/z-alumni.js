var executed = false;
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
function load_batch(){
	$("#batch-wrapper").load("/index-fetch?module=batch&batch="+$("#batch").val()+"&formcheck="+$("#formcheck").val(), function() {
		$(window).scroll(function() {
			if ($(window).scrollTop() >= $("#batch-wrapper").offset().top - 800 && !executed) { 
				executed = true;
				$("#batch-wrapper .count").each(function() {
					$(this).data("count", parseInt($(this).html(), 10));
					$(this).html("0");
					count($(this));
				});
			}
		});
		$.LoadingOverlay("hide");
	});
}
load_batch();
$(document).on("change","#batch",function (){
	$.LoadingOverlay("show");
	load_batch()
});
$(".owl-carousel1").owlCarousel({
	loop:true,
	center: false,
	margin:15,
	dots:false,
	nav:true,
	autoplay: true,
	slideTransition: "linear",
	autoplayTimeout: 4000,
	autoplaySpeed: 4000,
	autoplayHoverPause: true, 
	navText: ["<img src='/assets/images/arrow-left.svg'>","<img src='/assets/images/arrow-right.svg'>"],
	stagePadding: 30,
	responsive:{
		0:{
			items:2,
			nav:false,
		},
		600:{
			items:3
		},
		1000:{
			items:4
		}
	}
});