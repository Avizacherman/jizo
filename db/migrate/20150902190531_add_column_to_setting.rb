class AddColumnToSetting < ActiveRecord::Migration
  def change
    add_column :settings, :custom_location, :string
    remove_column :users, :default_location
  end
end
