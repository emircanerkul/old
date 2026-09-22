$(function () {
	$.ajax({
		url: 'core/ajax.php',
		type: 'POST',
		data: {
			text: "x"
		},
		success: function (data, textStatus, xhr) {
			var wave = "";
			JSON.parse(data).forEach(function (element, index) {

				if (index % 3 == 0 && index != 0) {
					$("#result").append('<div class="row">' + wave + "</div>");
					wave = "";
				}
				wave += '<div class="columns four style-box"><input id="style_' + Object.keys(element) + '" class="u-full-width cutted" type="text" readonly><button class="copy" type="button" data-clipboard-target="#style_' + Object.keys(element) +
					'">📝</button></div>';
			});

			var clipboard = new Clipboard('.copy');
		}
	});

	$("#main").keyup(function (e) {
		$.ajax({
			url: 'core/ajax.php',
			type: 'POST',
			data: {
				text: $("#main").val()
			},
			success: function (data, textStatus, xhr) {
				if (data != "")
					JSON.parse(data).forEach(function (entry) {
						$("#style_" + Object.keys(entry)).val(Object.values(entry));
					});
				else $("input").val("");
			}
		});
	});
});
