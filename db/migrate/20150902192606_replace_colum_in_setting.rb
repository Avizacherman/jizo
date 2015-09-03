class ReplaceColumInSetting < ActiveRecord::Migration
  def change
    remove_column :settings, :transporation
    add_column :settings, :transportation, :string
  end
end
