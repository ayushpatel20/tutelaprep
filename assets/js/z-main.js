new WOW().init();
$(window).bind('scroll', function () {
	if ($(window).scrollTop() > 250) {
		$('.main-header').addClass('sticky');
	} else {
		$('.main-header').removeClass('sticky');
	}
});
$(".testimonial-carousel").owlCarousel({
	loop:false,
	margin:15,
	dots:false,
	nav:true,
	navText: ["<img src='/assets/images/arrow-left.svg'>","<img src='/assets/images/arrow-right.svg'>"],
	autoplay: true,
	autoplayHoverPause: true,
	dotsEach: 7,
	responsive:{
		0:{
			items:1,
			nav:false
		},
		600:{
			items:2
		},
		1000:{
			items:3
		}
	}
});
$('.video-carousel').owlCarousel({
	loop:true,
	center: true,
	margin:20,
	dots:false,
	nav:true,
	navText: ["<img src='/assets/images/arrow-left.svg'>","<img src='/assets/images/arrow-right.svg'>"],
	stagePadding: 200,
	autoplay: false,
	responsive:{
		0:{
			items:1,
			stagePadding: 10,
			dots:true,
			nav:false,
		},
		600:{
			items:2,
			stagePadding: 10,
			stagePadding: 10,
		},
		1000:{
			items:3
		}
	}
});
 $(".connect-carousel").owlCarousel({
	loop:true,
	dots:true,
	nav:false,
	navText: ["<img src='/assets/images/arrow-left.svg'>","<img src='/assets/images/arrow-right.svg'>"],
	responsive:{
		0:{
			items:1,
		},
		600:{
			items:1
		},
		1000:{
			items:1
		}
	}
});

$(document).on("click",".toogle-testimonial",function (){
	if($(this).text() === "Read More"){
		$(this).text("Show Less");
		$("#"+$(this).attr("data-href")).show();
	}
	else{
		$(this).text("Read More");
		$("#"+$(this).attr("data-href")).hide();
	}
});
document.addEventListener("DOMContentLoaded", function () {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const menuIcon = navbarToggler.querySelector(".menu-icon");
    const closeIcon = navbarToggler.querySelector(".close-icon");
    navbarToggler.addEventListener("click", function () {
      menuIcon.classList.toggle("d-none");
      closeIcon.classList.toggle("d-none");
    });
});
$(document).ready(function() { 
	if(popup === 0){
		setTimeout(function() {
			$("#contact-modal").modal("show");
		}, 5000);
	}
});
$("#modalcourse").select2({
	placeholder: "",
	dropdownParent: $("#contact-modal"),
	width: "100%"
});
$.validate({
	form : "#modalcontact-form",
	borderColorOnError : false,
	modules : "security",
	onSuccess : function($form) {
		$.LoadingOverlay("show");
		var param = {};
		param.name = $("#modalname").val();
		param.email = $("#modalemail").val();
		param.source = $("#modalsource").val();
		param.country = $("#modalcountry option:selected").attr("country");
		param.phone = $("#modalcountry option:selected").attr("code")+" "+$("#modalmobile").val();
		param.phone1 = $("#modalmobile").val();
		param.course = $("#modalcourse").val();
		param.query = $("#modalquery").val();
		param.grade = $("#modalgrade").val();
		param.school = $("#modalschool").val();
		param.captcha = $("#modalcaptcha").val();
		param.workshop = 0;
		param.link = "";
		param.formcheck = $("#formcheck").val();
		param.pagesource = $(location).attr('href');
		$.ajax({
			url:"/contact-us-data?t=0",
			dataType:"json",
			type:"post",
			contentType: "application/json",
			data: JSON.stringify(param),
			processData: false,
			success: function(data) {
				if (data.success == true) {
					$("#modalcontact-form")[0].reset();
					$("#contact-modal").modal("hide");
					$.LoadingOverlay("hide");
					$(location).attr("href","/thank-you");
				} 
				else {
					$(".modal-body", $("#confirmation-modal")).html(data.message);
					$("#confirmation-modal").modal("show");
					$.LoadingOverlay("hide");
				}
			},
			error: function(errorThrown) {
				$(".modal-body", $("#confirmation-modal")).html("Failed to submit due to internal server error!");
				$("#confirmation-modal").modal("show");
				$.LoadingOverlay("hide");
			}
		});
		return false;   
	}
});
$("#zcourse, #ztimezone").select2();
$.validate({
	form : "#zcontact-form",
	borderColorOnError : false,
	modules : "security",
	onSuccess : function($form) {
		$.LoadingOverlay("show");
		var param = {};
		param.name = $("#zname").val();
		param.email = $("#zemail").val();
		param.source = $("#zsource").val();
		param.country = $("#zcountry option:selected").attr("country");
		param.phone = $("#zcountry option:selected").attr("code")+" "+$("#zmobile").val();
		param.phone1 = $("#zmobile").val();
		param.course = $("#zcourse").val();
		param.query = $("#zquery").val();
		param.grade = $("#zgrade").val();
		param.school = $("#zschool").val();
		param.captcha = $("#zcaptcha").val();
		param.workshop = 0;
		param.link = "";
		param.date = $("#zdate").val();
		param.time = $("#ztime").val();
		param.formcheck = $("#formcheck").val();
		param.pagesource = $(location).attr('href');
		$.ajax({
			url:"/contact-us-data?t=0",
			dataType:"json",
			type:"post",
			contentType: "application/json",
			data: JSON.stringify(param),
			processData: false,
			success: function(data) {
				if (data.success == true) {
					$("#zcontact-form")[0].reset();
					$("#contact-modal").modal("hide");
					$.LoadingOverlay("hide");
					$(location).attr("href","/thank-you");
				} 
				else {
					$(".modal-body", $("#confirmation-modal")).html(data.message);
					$("#confirmation-modal").modal("show");
					$.LoadingOverlay("hide");
				}
			},
			error: function(errorThrown) {
				$(".modal-body", $("#confirmation-modal")).html("Failed to submit due to internal server error!");
				$("#confirmation-modal").modal("show");
				$.LoadingOverlay("hide");
			}
		});
		return false;   
	}
});
$(document).on("click", ".remove-product", function() {
	$.LoadingOverlay("show", {
		image : "/assets/images/hex-loader.svg",
		imageAnimation : "",
		imageColor : ""
	});
	var param = {};
	param.kitid = $(this).attr("data-kitid");
	param.pack = $(this).attr("data-pack");
	param.formcheck = $("#formcheck").val();
	$.ajax({
		url:"/college-kit-data?t=1",
		dataType:"json",
		type:"post",
		contentType: "application/json",
		data: JSON.stringify(param),
		processData: false,
		success: function(data) {
			if (data.success === true) {
				location.reload();
			} 
			else{
				$(".modal-body", $("#confirmation-modal")).html(data.message);
				$("#confirmation-modal").modal("show");
				$.LoadingOverlay("hide");
			}
		},
		error: function(errorThrown) {
			$(".modal-body", $("#confirmation-modal")).html("Failed to submit due to internal server error!");
			$("#confirmation-modal").modal("show");
			$.LoadingOverlay("hide");
		}
	});
});
$(document).on("click", ".refresh-btn", function(e){
	e.preventDefault();
	$(".captcha-val").val("");
	$(".captcha-img").attr("src","/captcha/captchagen?formcheck="+$("#formcheck").val()+"&_="+(new Date()).getTime());
});
$(document).on("change",".consultation-date",function (e){
	timeid = $(this).attr("data-id");
	timezone = $(this).attr("data-timezone");
	date = $(this).attr("data-date");
	if($("#"+date).val() !== "" && $("#"+timezone).val() !== ""){
		$.LoadingOverlay("show");
		var param = {};
		param.date = $("#"+date).val();
		param.timezone = $("#"+timezone).val();
		param.formcheck = $("#formcheck").val();
		$.ajax({
			url:"/fetch-availability",
			dataType:"json",
			type:"post",
			contentType: "application/json",
			data: JSON.stringify(param),
			processData: false,
			success: function(data) {
				$(".modal-body", $("#confirmation-modal")).html(data.message);
				$.LoadingOverlay("hide");
				if (data.success == true) {
					$("#"+timeid).html(data.option);
				} 
				else{
					$("#"+timeid).html("");
					$("#confirmation-modal").modal("show");
				}
				
			},
			error: function(errorThrown) {
				$(".modal-body", $("#confirmation-modal")).html("Failed to submit due to internal server error!");
				$("#confirmation-modal").modal("show");
				$.LoadingOverlay("hide");
			}
		});
	}
});