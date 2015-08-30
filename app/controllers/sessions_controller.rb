class SessionsController < ApplicationController



def set_session
	access_token = authorize_token(request.env['omniauth.auth']['credentials'])
	session[:access_token] = access_token
	facebook_data = HTTParty.get("https://graph.facebook.com/me?fields=name,id,picture&access_token=#{session[:access_token]}").parsed_response['data']
	if !User.find_by(:access_token => session[:access_token])
		puts facebook_data
	end

	if URI(request.referer).path == '/' 
		redirect_to '/events'
	else
		redirect_to URI(request.referer).path
	end
end

def end_session
	session[:access_token] = nil
end

private 
	 def authorize_token(auth)
		 	access_token = auth['token']
	 		return access_token
 		end


end