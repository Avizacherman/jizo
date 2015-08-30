class SessionsController < ApplicationController

def set_session
	access_token = User.
end

def end_session
	session[:access_token] = nil
end

end