class AddHomeLocationToUser < ActiveRecord::Migration
  def change
  	add_column :users, :default_location, :string
  end
end
