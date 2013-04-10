class CreateLines < ActiveRecord::Migration
  def change
    create_table :lines do |t|
      t.string :name
      t.string :longitude
      t.string :latitude
      t.string :street
      t.string :country
      t.string :city
      t.integer :person_id

      t.timestamps
    end
  end
end
