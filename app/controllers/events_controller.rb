class EventsController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
	layout "events"
	
	def index

		@title = "Jizo - My Events"

	end

	def get_events
		events = HTTParty.get("https://graph.facebook.com/me/events?access_token=#{session[:access_token]}").parsed_response['data']
	end

end
