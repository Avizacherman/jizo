class DirectionsController < ApplicationController

def get_directions
	
	if request.xhr? 
		origin = params[:origin]
		destination = params[:destination]
		
		directions = HTTParty.get("https://maps.googleapis.com/maps/api/directions/json?origin=#{origin}&destination=#{destination}&key=#{ENV['JIZO_MAP_S_KEY']}").parsed_response["routes"][0]["legs"][0]["steps"]

		render json:  {:directions => directions}
	end
end

end