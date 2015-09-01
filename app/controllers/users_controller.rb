class UsersController < ApplicationController

	def delete
		signed_request = params[:signed_request]
		encrypted_string = signed_request.split('.')[1]
		decrypted_id = Base64.decode64(encrypted_string).match('\\"user_id\\":\\"[0-9]+\\"').to_s.match(/[0-9]+/).to_s.to_i
		user = User.find_by(fb_id: decrypted_id)
		user.delete
		render nothing: true
	end

end