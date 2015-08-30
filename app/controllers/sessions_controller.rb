class SessionsController < ApplicationController



def set_session
	access_token = User.authorize_token(request.env['omniauth.auth']['credentials'])
	session[:access_token] = access_token
	redirect_to request.referer 
end

def end_session
	session[:access_token] = nil
end

end