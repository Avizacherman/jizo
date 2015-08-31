	Rails.application.config.middleware.use OmniAuth::Builder do
	  provider :facebook, ENV['JIZO_APP_ID'], ENV['JIZO_APP_SECRET'], {:scope => 'user_about_me,user_events'}
		  
	end
