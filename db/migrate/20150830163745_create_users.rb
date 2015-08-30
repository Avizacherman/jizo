class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.bigint :fb_id
      t.string :fb_name
      t.string :fb_pic
      t.string :access_token

      t.timestamps null: false
    end
  end
end
