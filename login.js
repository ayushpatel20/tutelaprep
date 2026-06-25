var type;
var sendotp;
function other(){
	val = $("#r-curriculam").val();
	if(val === "Indian State Board:" || val === "Other:"){
		$("#other-wrapper").show();
	}
	else{
		$("#other-wrapper").hide();
		$("#other").val("");
	}
}
function logintype(){
	$(".logintype").hide();
	$("#"+$('input[name=logintype]:checked').val()).show();
	if($('input[name=logintype]:checked').val() === "email"){
		$("#email-text").show();
	}
	else{
		$("#email-text").hide();
	}
}
other();
logintype();
$("#r-curriculam").on("change", function() {
	other();
});
$("input[name=logintype]").on("change", function() {
	logintype();
});
$("#resend-otp").on("click", function() {
	resend_otp(sendotp);
});
function resend_btn(){
	setTimeout(function() {
		$("#resend-otp").prop("disabled", false);
		$("#resend-otp").html("Resend OTP");
	}, 120000);
}
function resend_otp(email){
	$.LoadingOverlay("show");
	var param = {};
	if($('input[name=logintype]:checked').val() === 'mobile'){
		url = "gpa-otp?t=4";
		param.phone = email;
	}
	else{
		url = "gpa-otp?type=0";
		param.email = email;
	}
	$.ajax({
		url:url,
		dataType:"json",
		type:"post",
		contentType: "application/json",
		data: JSON.stringify(param),
		processData: false,
		success: function(data) {
			if (data.success == true) {
				$.LoadingOverlay("hide");
				$("#otp").val("");
				$("#otp-modal .modal-title").html(data.message);
				$("#otp-modal").modal("show");
				$("#otp-form")[0].reset();
				$("#resend-otp").prop("disabled", true);
				$("#resend-otp").html("Resend OTP after <span class='otp-counter'></span>");
				var timer2 = "2:00";
				var interval = setInterval(function() {
					var timer = timer2.split(':');
					var minutes = parseInt(timer[0], 10);
					var seconds = parseInt(timer[1], 10);
					--seconds;
					minutes = (seconds < 0) ? --minutes : minutes;
					if (minutes < 0) clearInterval(interval);
					seconds = (seconds < 0) ? 59 : seconds;
					seconds = (seconds < 10) ? '0' + seconds : seconds;
					$('.otp-counter').html(minutes + ':' + seconds);
					timer2 = minutes + ':' + seconds;
				}, 1000);
				resend_btn();
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
}
function register(){
	$.LoadingOverlay("show");
	var param = {};
	param.name = $("#r-name").val();
	param.email = $("#r-email").val();
	param.country = $("#rcountry option:selected").text();
	param.countrycode = $("#rcountry option:selected").attr("code");
	param.phone = $("#r-phone").val();
	param.standard = $("#r-standard").val();
	param.school = $("#r-school").val();
	param.curriculam = $("#r-curriculam").val()+" "+$("#r-other").val();
	param.otp = $("#otp").val();
	param.formcheck = $("#formcheck").val();
	$.ajax({
		url:"login-data",
		dataType:"json",
		type:"post",
		contentType: "application/json",
		data: JSON.stringify(param),
		processData: false,
		success: function(data) {
			if (data.success === true) {
				$.LoadingOverlay("hide");
				$(location).attr("href",redirect);
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
}
function login(){
	$.LoadingOverlay("show");
	var param = {};
	param.email = $("#email").val();
	param.phone = $("#phone").val();
	param.logintype = $('input[name=logintype]:checked').val();
	param.otp = $("#otp").val();
	param.formcheck = $("#formcheck").val();
	$.ajax({
		url:"login-data",
		dataType:"json",
		type:"post",
		contentType: "application/json",
		data: JSON.stringify(param),
		processData: false,
		success: function(data) {
			if (data.success === true) {
				$.LoadingOverlay("hide");
				$(location).attr("href",redirect);
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
}
$.validate({
	form : "#login-form",
	borderColorOnError : false,
	modules : "security",
	onSuccess : function($form) {
		type = "login";
		if($('input[name=logintype]:checked').val() === 'mobile'){
			sendotp = $("#phone").val();
		}
		else{
			sendotp = $("#email").val()
		}
		resend_otp(sendotp);
		return false;
	}
});
$.validate({
	form : "#register-form",
	borderColorOnError : false,
	modules : "security, logic",
	onSuccess : function($form) {
		type = "register";
		sendotp = $("#r-email").val();
		resend_otp(sendotp);
		return false;
	}
});
$.validate({
	form : "#otp-form",
	borderColorOnError : false,
	modules : "security",
	onSuccess : function($form) {
		if(type === "login"){
			login();
		}
		else{
			register();
		}
		return false;   
	}
});
$(document).on("change", "#r-country", function(e){
	$("#r-code").text($("#r-country option:selected").attr("code"));
});