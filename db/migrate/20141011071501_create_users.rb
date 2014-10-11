class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.text :username
      t.string :address
      t.integer :latitude
      t.string :longitude
      t.string :email
      t.text :password
      t.string :company_name

      t.timestamps
    end
  end
end
