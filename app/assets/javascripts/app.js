$(document).ready(initialize);
$(document).on('page:load', initialize);

function initialize() {
	
	var yourLat
	var yourLng
	
	var bKey = 'AIzaSyDXo_-3dpRQz_yvYHP6yEaYUA1_vYlxglM';

	//GET LOCATION
	navigator.geolocation.getCurrentPosition(function(pos){
        yourLat = pos.coords.latitude
		yourLng = pos.coords.longitude

	})
	
	//CREATES MAP AND CENTERS ON CURRENT LOCATION
	setTimeout( function(){ 
		baseMap = new google.maps.Map($('#map')[0], {
			center: {lat:  yourLat, lng: yourLng},
			zoom: 15
		}); 
		baseMarker = new google.maps.Marker({
			position: {lat:  yourLat, lng: yourLng},
			label: "U",
			map: baseMap
		})
	}, 4000)

	//PASSES INFO FROM 
	$(".hasLocation").each(function(){
		var lat = parseFloat($(this).attr("lat"))
		var lng = parseFloat($(this).attr("lng"))
		$(this).on("click", function(){
			map = new google.maps.Map($('#map')[0], {
				center: {lat:  lat, lng: lng},
				zoom: 15
			}); 

			marker = new google.maps.Marker({
				position: {lat:  lat, lng: lng},
				label: "E",
				map: map
			})
			
//			$.get('https://maps.googleapis.com/maps/api/directions/json?origin=' + yourLat + ',' + yourLng + '&destination=' + lat + ',' + lng + '&key=' + bKey, function(data){
//				console.log(data);
//			});

			var directionsService = new google.maps.DirectionsService;
			var directionsDisplay = new google.maps.DirectionsRenderer; 
			directionsDisplay.setMap(map); 
			
			calculateAndDisplayRoute(directionsService,directionsDisplay,{lat: yourLat, lng: yourLng}, {lat: lat, lng: lng})
			
		})
	}) 

	verticalMagic();
}

//HOMEPAGE CENTERING - VERTICAL MAGIC
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


//GOOGLE MAPS GET AND DISPLAY ROUTE
function calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination) {
	directionsService.route({
		origin: origin,
		destination: destination,
		travelMode: google.maps.TravelMode.DRIVING
	}, function(response, status) {
		if (status === google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		} else {
			window.alert('Directions request failed due to ' + status);
		}
	});
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