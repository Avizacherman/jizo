class User < ActiveRecord::Base
	 access_token = auth['token']
    facebook = Koala::Facebook::API.new(access_token)
    info = facebook.get_object("me?fields=id,picture,events")
 		return info, access_token
end
