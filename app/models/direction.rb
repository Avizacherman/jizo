class Direction < ActiveRecord::Base
	belongs_to :user, :dependent => :destroy 
	has_one :event
end