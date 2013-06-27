class ChangeDataTypesInPerson < ActiveRecord::Migration
  def up
    change_column :people, :start_time, :datetime
    change_column :people, :stop_time, :datetime
  end

  def down
    change_column :people, :start_time, :date
    change_column :people, :stop_time, :date
  end
end
