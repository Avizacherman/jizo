class User < ActiveRecord::Base
	has_many :directions
    has_many :settings
end
