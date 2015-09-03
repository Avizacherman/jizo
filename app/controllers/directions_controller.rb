class DirectionsController < ApplicationController

def get_directions
	
	# if request.xhr? 
		origin = params[:origin]
		destination = params[:destination]
		user = User.find_by(:access_token => session[:access_token])
		directions = HTTParty.get("https://maps.googleapis.com/maps/api/directions/json?origin=#{origin}&destination=#{destination}&key=#{ENV['JIZO_MAP_S_KEY']}&mode=#{user.settings[0].transportation}").parsed_response["routes"][0]["legs"][0]["steps"]

		render json:  {:directions => directions}
	# end
end
def save_directions 
	if request.xhr?
		user = User.find_by({:access_token => session[:access_token]})
		directions = Direction.create({:origin => params[:origin], :destination => params[:destination], :user_id => user.id, :directions_data => params[:directions_data]})
		puts directions
		render nothing: true
	end
end
end