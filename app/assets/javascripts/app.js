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
				heightMagic();
				$saveButton = $('<button class="tiny facebook right">')
				$saveButton.text('Save Directions')
				$saveButton.on('click', function () {
					$.post('/save_directions', {
						origin: yourLat + "," + yourLng,
						destination: lat + "," + lng,
						directions_data: $('#event-directions-display').html()
					})
					$saveButton.addClass("hide");
				})
				$saveContainer = $(".panel.start")
				$saveContainer.append($saveButton)
			})
		})
	})

	//FORMAT DATE AND TIMES
	$(".start-date-value").each(function () {
		initialValue = $(this).text()
		formatedValue = moment(initialValue).tz(jstz.determine().name()).format('LL')
		$(this).text(formatedValue)
	})

	$(".start-time-value").each(function () {
		initialValue = $(this).text()
		formatedValue = moment(initialValue).tz(jstz.determine().name()).format('ha z')
		$(this).text(formatedValue)

	})

	$(".end-time-value").each(function () {
		initialValue = $(this).text()
		formatedValue = moment(initialValue).tz(jstz.determine().name()).format('ha z')
		$(this).text(formatedValue)

	})

	//SHIFT OMITTED RESULTS TO TOP
	$eventListAccordion = $("ul.accordion.height-magic");
	$omittedAlert = $(".alert-box.omitted");
	$($eventListAccordion).prepend($omittedAlert);

	//COUNT WORDS IN DESCRIPTION
	$('.description').each(function (i) {
		var iTotalWords = $(this).text().split(' ').length;
		if (iTotalWords > 100) {
			var showMore = $(this).parent().append('<p class="show-more"><a href="#"><b>' + iTotalWords + ' words </b></a></p>');
			$('.show-more').on("click", function () {
				$('.show-more').closest('.description').css({
					'max-height': '100%'
				})
			}
		)}
	});

	//AUTOLOAD PRIVACY MODAL
	if (window.location.hash === "#privacy") {
		$('#privacy-policy').foundation('reveal', 'open')
	}

//SETTINGS

	$('#submitSettings').click(function() {	
	var params = {transportation: $("input[name=transportation]:checked").val(), location: $("input[name=location]:checked").val()};
	if ($("input[name=location]:checked").val() == "enter_location"){
		params["customLocation"] = $("#custom_location").val();
	}
	$.post("/settings", params).done(function(){
		$('#settingsModal').foundation('reveal', 'close')
	});
})

	settings = $.get('/settings/load').done(function(){
		if(settings) {
		set = settings.responseJSON.settings[0] 
		console.log(set)
		$('input[value=' + set.transportation+ ']').attr('checked', 'true')
		$('input[value=' + set.location+ ']').attr('checked', 'true')
		if (set.location === 'enter_location'){
					$(".text").removeClass("hide");
					$('.text').val(set.custom_location)
		}

		}
	})



}
//END OF INITIALIZE


//EVENT LIST FULL HEIGHT - HEIGHT MAGIC
function heightMagic() {
	if ($('.height-magic') < 1) {
		return;
	}
	var resizeFunc = function () {
		var content = $('.height-magic');
		var header = $('header')
		var header_height = $(header).outerHeight(true);

		var h2 = $("#events-body-content h2")
		var h2_height = $(h2).outerHeight(true);

		content.css({
			'display': 'none'
		});
		var wrapper = $(content).closest('#events-body-content');
		var wrapper_height = $(wrapper).outerHeight(true);
		var height = (wrapper_height - header_height - h2_height) - 15;
		content.css({
			'height': height + 'px',
			'display': 'block',
			'overflow-y': 'auto'
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
	$($eventContainer).prepend($("<div class='panel start clearfix'><strong>Starting Trip.</strong></div>"));
	$($eventContainer).append($("<div class='panel end'><strong>You have reached your desination.</strong></div>"));
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

//SETTINGS

	$('#submitSettings').click(function(e) {
	e.preventDefault()

	var params = {transportation: $("input[name=transportaion]:checked").val(), location: $("input[name=location]:checked").val()};
	if ($("input[name=location]:checked").val() == "enter_location"){
		params["customLocation"] = $("#cutom_location").val();
	}
	
	$.post("/settings", params);

})
