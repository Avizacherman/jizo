class SessionsController < ApplicationController
	
def set_session
	access_token = request.env['omniauth.auth']['credentials']['token']

	session[:access_token] = access_token
	puts "session - #{session[:access_token]}"
   attach_user                                                                                                                                        
	if URI(request.referer).path == '/' 
		redirect_to '/events'
	else
		redirect_to URI(request.referer).path
	end
end

def session_error
	flash[:error] = "Authentication Error"
	puts flash[:error]
	redirect_to URI(request.referer).path
end

def end_session
	reset_session
	redirect_to '/'
end

private
	def attach_user
		facebook_data = HTTParty.get("https://graph.facebook.com/me?access_token=#{session[:access_token]}&fields=picture,id,name").parsed_response 

		if !User.find_by({:access_token => session[:access_token]}) && User.find_by({:fb_id => facebook_data["id"]})		
		user = User.find_by({:fb_id => facebook_data["id"]})
		user.update({:access_token => session[:access_token]})		
	elsif !User.find_by({:fb_id => facebook_data["id"]}) 		
		user = User.create({:access_token => session[:access_token], :fb_id => facebook_data["id"], :fb_name => facebook_data['name'], :fb_pic => facebook_data['picture']['data']['url']})
		end
	end


end