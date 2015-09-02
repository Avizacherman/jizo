class SessionsController < ApplicationController
	

	# Handshake sent to FB, response with access token for the app
def set_session
	access_token = request.env['omniauth.auth']['credentials']['token']
	# Sets access toekn as a session cookie
	session[:access_token] = access_token

	# Associates access token with a user in the DB
   attach_user                                                                                                                                        
	redirect_to '/events'

end

# Alerts when there is a CSRF error
def session_error
	flash[:error] = "Authentication Error"
	puts flash[:error]
	redirect_to URI(request.referer).path
end

# Logs user out of session
def end_session
	reset_session
	redirect_to '/'
end

private


	def attach_user

		# Gets user information
		facebook_data = HTTParty.get("https://graph.facebook.com/me?access_token=#{session[:access_token]}&fields=picture,id,name").parsed_response 

		# If the user already exists in the DB, updates their access token
		if !User.find_by({:access_token => session[:access_token]}) && User.find_by({:fb_id => facebook_data["id"]})		

		user = User.find_by({:fb_id => facebook_data["id"]})
		user.update({:access_token => session[:access_token]})		

		# If the user does not already exist in the DB creates them
		elsif !User.find_by({:fb_id => facebook_data["id"]}) 		
			user = User.create({:access_token => session[:access_token], :fb_id => facebook_data["id"], :fb_name => facebook_data['name'], :fb_pic => facebook_data['picture']['data']['url']})
		end

	end


end