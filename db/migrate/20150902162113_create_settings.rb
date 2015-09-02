class CreateSettings < ActiveRecord::Migration
  def change
    create_table :settings do |t|
        t.string :transporation
        t.string :location
        t.integer :user_id

    end
end
end
