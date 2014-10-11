class ChangeColumnLongitude < ActiveRecord::Migration
  def change
    remove_column :users, :longitude
    add_column :users, :longitude, :integer
  end
end
