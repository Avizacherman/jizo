class WelcomeController < ApplicationController
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
	layout "hero"
	
	def index
		@title = "Jizo - Connect to Facebook and get directions to your events!"
	end
end
