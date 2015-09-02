class Event < ActiveRecord::Base
	belongs_to :direction, :dependent => :destroy
end