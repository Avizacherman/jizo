class UsersController < ApplicationController

	def delete
		puts "Referer #{request.referer}"
		puts "Params #{params}"
	end

end