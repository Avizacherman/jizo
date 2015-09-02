$(document).ready(initialize);
$(document).on('page:load', initialize);

function initialize() {
	verticalMagic();
if(window.location.hash === "#privacy") {
		$('#privacy-policy').foundation('reveal', 'open')
	}}

//HOMEPAGE CENTERING - VERTICAL MAGIC
function verticalMagic() {
	if ($('.vertical-magic') < 1) {
		return;
	}
	var resizeFunc = function () {
		var content = $('.vertical-magic');
		var wrapper = $(content).closest('#hero-body-wrapper');
		var content_height = $(content).outerHeight(false);
		var wrapper_height = $(wrapper).outerHeight(true);
		var height = ((wrapper_height - content_height) / 2) - 15;
		content.css({
			'margin-top': height + 'px',
			'visibility': 'visible'
		});
	};
	resizeFunc();
	$(window).resize(function () {
		resizeFunc();
	});
}


//MODAL AUTOLOADer
