class User < ActiveRecord::Base
	 
	 def authorize_token(auth)
		 	access_token = auth['token']
	 		return access_token
 		end
end
