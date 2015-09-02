$(document).ready(initialize);
$(document).on('page:load', initialize);

function initialize() {

	//	var yourLat;
	//	var yourLng;
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

			//CREATES MAP AND CENTERS ON CURRENT LOCATION
			//CREATES MAP FRAME
			baseMap = new google.maps.Map($('#map')[0], {
				center: {
					lat: yourLat,
					lng: yourLng
				},
				zoom: 15
			});
			//CREATES MAP MARKER
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

	//IF LOADING METER EXISTS, RUN LOAD METER
	if ($(".meter")) {
		var progress = 0;
		var progressBar = setInterval(function () {
			progress += 1;
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

	//PASSES INFO FROM EVENTS LIST TO MAPS AND DIRECTIONS
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

			//SET MAP MARKER
			marker = new google.maps.Marker({
				position: {
					lat: lat,
					lng: lng
				},
				label: "E",
				map: map
			})

			//
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

			//CALL AJAX GET DIRECTIONS ROUTE AND DISPLAY DIRECTIONS 
			directions = $.get('/get_directions', {
				origin: yourLat + "," + yourLng,
				destination: lat + "," + lng
			}).done(function () {
				giveDirections(directions.responseJSON.directions)
				$saveButton = $('<button>')
				$saveButton.text('Save')
				$saveButton.on('click', function(){
					$.post('/save_directions', {
						origin: yourLat + "," + yourLng,
						destination: lat + "," + lng,
						directions_data: $('#event-directions-display').html()
					 })
				})
				$eventContainer = $("#event-directions-display")
				$eventContainer.append($saveButton)
	
				})
			})
		})
	

//FORMAT DATE AND TIMES
	$(".start-date-value").each(function () {
		initialValue = $(this).text()
		formatedValue = moment(initialValue).format('LL')
		$(this).text(formatedValue)
	})
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
		var height = (wrapper_height - header_height - 60);
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

//TAKES DIRECTION OBJECT AND APPENDS THE DIRECTIONS TO DOM
function giveDirections(obj) {
	$eventContainer = $("#event-directions-display")
	$eventContainer.html("")
	obj.forEach(function (o, index) {
		var stepNo = index + 1;
		$div = $('<div class="panel">').attr("id", "step-" + stepNo).html("Go " + o.distance.text + " " + o.html_instructions + " approximately " + o.duration.text)
		$eventContainer.append($div)
			})


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
