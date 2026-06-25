$("#course, #timezone").select2({
	placeholder: ""
});
$.validate({
	form : "#contact-form",
	borderColorOnError : false,
	modules : "security",
	onSuccess : function($form) {
		$.LoadingOverlay("show");
		var param = {};
		param.name = $("#name").val();
		param.email = $("#email").val();
		param.source = $("#source").val();
		param.country = $("#country option:selected").attr("country");
		param.phone = $("#country option:selected").attr("code")+" "+$("#mobile").val();
		param.phone1 = $("#mobile").val();
		param.course = $("#course").val();
		param.query = $("#query").val();
		param.grade = $("#grade").val();
		param.school = $("#school").val();
		param.captcha = $("#captcha").val();
		param.date = $("#date").val();
		param.time = $("#time").val();
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
					$("#contact-form")[0].reset();
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
$.validate({
	form : "#partner-form",
	borderColorOnError : false,
	modules : "security",
	onSuccess : function($form) {
		$.LoadingOverlay("show");
		var param = {};
		param.name = $("#pname").val();
		param.email = $("#pemail").val();
		param.phone = $("#pcountry option:selected").attr("code")+" "+$("#pmobile").val();
		param.company = $("#pcompany").val();
		param.country = $("#pcountry option:selected").attr("country");
		param.type = $("#ptype").val();
		param.query = $("#pquery").val();
		param.captcha = $("#pcaptcha").val();
		param.formcheck = $("#formcheck").val();
		$.ajax({
			url:"/partner-with-us-data",
			dataType:"json",
			type:"post",
			contentType: "application/json",
			data: JSON.stringify(param),
			processData: false,
			success: function(data) {
				if (data.success == true) {
					$("#partner-form")[0].reset();
					$.LoadingOverlay("hide");
					$(location).attr("href","thank-you");
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