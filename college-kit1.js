$("#schoolquery-wrapper").hide();
$("#ap-subject").select2({
	multiple: true,
	dropdownParent: $("#detail-modal"),
	width: "100%",
	ajax: {
		url: "college-kit-ap",
		dataType: "json",
		delay: 350,
		data: function(params){
			return {
				search: params.term,
				formcheck: $("#formcheck").val()
			};
		},
		processResults: function (response) {
			return {
				results: response
			};
		},
		cache: true
	},
	escapeMarkup: function(markup) {
		return markup;
	},
	templateResult: function(data) {
		return data.html;
	},
	templateSelection: function(data) {
		return data.text;
	}
});
$(document).on("click", ".view-btn", function(e){
	$(".popover-data").hide();
	$("#"+$(this).attr("data-id")).show();
	$("#detail-modal").modal("show");
});
$(document).ready(function() {
	if(p !== ""){
		if($("#"+p).length != 0) {
			$(".popover-data").hide();
			$("#"+p).show();
			$("#detail-modal").modal("show");
		}
	}
	
});
$("#ap-error").addClass("d-none");
$(document).on("click", ".addtocart-btn", function(e){
	e.preventDefault();
	flag = 0;
	pack = $(this).attr("data-pack")
	if($(this).attr("data-kitid") === "104"){
		if($("#ap-subject").val().length === 0){
			flag = 1;
		}
		else{
			pack = $("#ap-subject").val();
		}
	}
	if(flag === 0){
		$.LoadingOverlay("show", {
			image : "/assets/images/hex-loader.svg",
			imageAnimation : "",
			imageColor : ""
		});
		$("#detail-modal").modal("hide");
		var param = {};
		param.kitid = $(this).attr("data-kitid");
		param.pack = pack;
		param.formcheck = $("#formcheck").val();
		$.ajax({
			url:"college-kit-data?t=0",
			dataType:"json",
			type:"post",
			contentType: "application/json",
			data: JSON.stringify(param),
			processData: false,
			success: function(data) {
				$(location).attr("href","/checkout");
				if (data.success === true) {
					$("#cart-counter").html(data.total);
					$("#cart-wrapper").html(data.message);
					$(".modal-cart", $("#cart-modal")).html(data.message);
					$.LoadingOverlay("hide");
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
	else{
		$("#ap-error").removeClass("d-none");
	}
	
});
$(document).ready(function() {
	function count($this){
		var current = parseInt($this.html(), 10);
		current = current + 4;
		$this.html(++current);
		if(current > $this.data("count")){
			$this.html($this.data("count"));
		} else {
			setTimeout(function(){count($this)}, 50);
		}
	}
	$(".stat-count").each(function() {
		$(this).data('count', parseInt($(this).html(), 10));
		$(this).html('0');
		count($(this));
	});
});