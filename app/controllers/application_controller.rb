class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  
  def validate_facebook(token)
  	HTTParty.get("https://graph.facebook.com/debug_token?input_token=#{token}&#{app_token}").parsed_response["data"]["is_valid"]
  end

private 

  def app_token
  	 HTTParty.get("https://graph.facebook.com/oauth/access_token?client_id=#{ENV["JIZO_APP_ID"]}&client_secret=#{ENV["JIZO_APP_SECRET"]}&grant_type=client_credentials")

  end
end
