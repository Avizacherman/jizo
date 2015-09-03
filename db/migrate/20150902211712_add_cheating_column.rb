class AddCheatingColumn < ActiveRecord::Migration
  def change
  	add_column :settings, :geocoded_location, :string
  end
end
