$(document).ready(function () {
    verticalMagic();
});
//HOMEPAGE CENTERING
function verticalMagic() {
    if ($('.vertical-magic') < 1) {
        return;
    } 
    var resizeFunc = function () {
        var header = $('#header-wrapper');
        var content = $('.vertical-magic');
        var wrapper = $(content).closest('#hero-body-wrapper');
        var content_height = $(content).outerHeight(false);
        var wrapper_height = $(wrapper).outerHeight(true);
        var header_height = $(header).outerHeight(true);
        var height = (wrapper_height - header_height - content_height) / 2;

        content.css({
            'margin-top': height + 'px',
            'visibility': 'visible'
        });
    };

    resizeFunc();
    $(window).resize(function () { resizeFunc(); });
}

//FACEBOOK
window.fbAsyncInit = function() {
	FB.init({
		appId      : 1611819945738454,
		xfbml      : true,
		version    : 'v2.4'
	});
};

(function(d, s, id){
	 var js, fjs = d.getElementsByTagName(s)[0];
	 if (d.getElementById(id)) {return;}
	 js = d.createElement(s); js.id = id;
	 js.src = "//connect.facebook.net/en_US/sdk.js";
	 fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));