$(document).ready(initialize);
$(document).on('page:load', initialize);

function initialize() {

	var yourLat;
	var yourLng;
	var bKey = 'AIzaSyDXo_-3dpRQz_yvYHP6yEaYUA1_vYlxglM';

	//GET LOCATION

	navigator.geolocation.getCurrentPosition(function (pos) {
		yourLat = pos.coords.latitude;
		yourLng = pos.coords.longitude;
		if (yourLng) {
			clearInterval(progressBar);
			$(".meter").css({
				"width": "100%"
			});
			$(".progress").addClass("hide");
			$("#events-body-content").addClass("show-block");
			heightMagic();

			baseMap = new google.maps.Map($('#map')[0], {
				center: {
					lat: yourLat,
					lng: yourLng
				},
				zoom: 15
			});
			baseMarker = new google.maps.Marker({
				position: {
					lat: yourLat,
					lng: yourLng
				},
				label: "U",
				map: baseMap
			});
		}
	})

	//CREATES MAP AND CENTERS ON CURRENT LOCATION


	if ($(".meter")) {
		var progress = 0;
		var progressBar = setInterval(function () {
			progress += 1;
			console.log(progress);
			$(".meter").css({
				"width": progress + '%'
			});
			if (progress >= 100) {
				clearInterval(progressBar);
				$(".progress").addClass("hide");
				$("#events-body-content").addClass("show-block")
				heightMagic();
			}
		}, 40);
	}

	//PASSES INFO FROM 
	$(".hasLocation").each(function () {
		var lat = parseFloat($(this).attr("lat"))
		var lng = parseFloat($(this).attr("lng"))
		$(this).on("click", function () {
			map = new google.maps.Map($('#map')[0], {
				center: {
					lat: lat,
					lng: lng
				},
				zoom: 15
			});

			marker = new google.maps.Marker({
				position: {
					lat: lat,
					lng: lng
				},
				label: "E",
				map: map
			})


			var directionsService = new google.maps.DirectionsService;
			var directionsDisplay = new google.maps.DirectionsRenderer;
			directionsDisplay.setMap(map);

			calculateAndDisplayRoute(directionsService, directionsDisplay, {
				lat: yourLat,
				lng: yourLng
			}, {
				lat: lat,
				lng: lng
			})

			directions = $.get('/get_directions', {
				origin: yourLat + "," + yourLng,
				destination: lat + "," + lng
			}).done(function () {
				giveDirections(directions.responseJSON.directions)
			})

		})
	})

//Format Dates and Times

$(".start-date-value").each(function(){
    initialValue = $(this).text()
    console.log(initialValue)
    formatedValue = moment(initialValue).format('LL')
    $(this).text(formatedValue)
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
	$(window).resize(function () {
		resizeFunc();
	});
}
//EVENT LIST FULL HEIGHT - HEIGHT MAGIC
function heightMagic() {
	if ($('.height-magic') < 1) {
		return;
	}
	var resizeFunc = function () {

		var content = $('.height-magic');

		var header = $('header')
		var header_height = $(header).outerHeight(true);

		content.css({
			'display': 'none'
		});

		var wrapper = $(content).closest('#events-body-content');
		var wrapper_height = $(wrapper).outerHeight(true);
		var height = (wrapper_height - header_height - 15);

		content.css({
			'height': height + 'px',
			'display': 'block',
			'overflow-y': 'scroll'
		});
	};

	resizeFunc();

	$(window).resize(function () {
		resizeFunc();
	});
}


//GOOGLE MAPS GET AND DISPLAY ROUTE
function calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination) {
	directionsService.route({
		origin: origin,
		destination: destination,
		travelMode: google.maps.TravelMode.DRIVING
	}, function (response, status) {
		if (status === google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		} else {
			window.alert('Directions request failed due to ' + status);
		}
	});
}

//FACEBOOK
window.fbAsyncInit = function () {
	FB.init({
		appId: 1611819945738454,
		xfbml: true,
		version: 'v2.4'
	});
};

(function (d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {
		return;
	}
	js = d.createElement(s);
	js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
