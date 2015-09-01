
//Takes a direction object and appends the directions to the DOM
function giveDirections(obj){
	$eventContainer = $("#event-directions-content")
	$eventContainer.html("")

	obj.forEach(function(o, index){
		var stepNo = index + 1;

		$div = $('<div class="panel">').attr("id", "step-" + stepNo).html("Go " + o.distance.text + " " + o.html_instructions + " approximately " + o.duration.text)
		$eventContainer.append($div)

	})

}