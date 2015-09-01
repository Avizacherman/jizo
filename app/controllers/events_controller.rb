class EventsController < ApplicationController
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
	layout "events"
	before_action :is_logged_in, only: [:index]
	
	def index
		@title = "Jizo - My Events"
		@events = get_events
	end

	def get_events
		events = HTTParty.get("https://graph.facebook.com/me/events?access_token=#{session[:access_token]}").parsed_response['data']
		parse_events(events)
	end


	private

	def parse_events(events)
		parsed_events = Array.new

		events.each do |event| 
			parsed_event = event
			parsed_event['date'] = event['start_time'].match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/).to_s
			parsed_event['start_time'] = event['start_time'].match(/T[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}-[0-9]{4}/).to_s.gsub(/T/, '')
			parsed_events.push parsed_event
		end
		return parsed_events
	end
	
end
