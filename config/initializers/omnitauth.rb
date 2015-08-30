	Rails.application.config.middleware.use OmniAuth::Builder do
	  provider :facebook, ENV['JIZO_APP_ID'], ENV['JIZO_APP_SECRET'], {:scope => 'user_about_me,user_events'}
		  
	end

OmniAuth::Strategies::OAuth2::CallbackError.module_eval do


	def call
		      Rack::Response.new(['302 Moved'], 302, 'Location' => '/').finish
	end



end
