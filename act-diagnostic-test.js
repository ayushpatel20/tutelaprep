$("#scourse").select2({
	placeholder: ""
});
$.validate({
	form : "#scontact-form",
	borderColorOnError : false,
	modules : "security",
	onSuccess : function($form) {
		$.LoadingOverlay("show");
		var param = {};
		param.name = $("#sname").val();
		param.email = $("#semail").val();
		param.source = "Free Resources";
		param.country = $("#scountry option:selected").attr("country");
		param.phone = $("#scountry option:selected").attr("code")+" "+$("#smobile").val();
		param.phone1 = $("#smobile").val();
		param.course = $("#scourse").val();
		param.query = $("#pagetile").text();
		param.grade = $("#sgrade").val();
		param.captcha = $("#scaptcha").val();
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
				$(".modal-body", $("#confirmation-modal")).html(data.message);
				$("#confirmation-modal").modal("show");
				$.LoadingOverlay("hide");
				if (data.success == true) {
					$("#scontact-form")[0].reset();
					$("#confirmation-modal").modal("hide");
					$.LoadingOverlay("hide");
					$(location).attr("href",link);
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