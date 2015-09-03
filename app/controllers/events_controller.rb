class EventsController < ApplicationController
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
	layout "events"
	before_action :is_logged_in, only: [:index]
	
	def index
		@title = "Jizo - My Events"
		@events = get_events
		@user = User.find_by(access_token: session[:access_token])
	end

	def get_events
		# HTTP Request to FB to get events
		events = HTTParty.get("https://graph.facebook.com/me/events?access_token=#{session[:access_token]}").parsed_response['data']
		
	end

end
