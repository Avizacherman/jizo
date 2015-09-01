class CreateDirection < ActiveRecord::Migration
  def change
    create_table :directions do |t|
      t.string :directions_data
      t.integer :user_id
      t.string :origin
      t.string :destination
    end
  end
end
