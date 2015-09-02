class CreateEvent < ActiveRecord::Migration
  def change
    create_table :events do |t|
    	t.string :event_description
    	t.integer :direction_id
    	t.string :event_name
    	t.string :event_date
    	t.string :start_time
    end
  end
end
