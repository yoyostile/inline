class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.date :start_time
      t.date :stop_time
      t.integer :line_id

      t.timestamps
    end
    add_index :people, :line_id
  end
end
