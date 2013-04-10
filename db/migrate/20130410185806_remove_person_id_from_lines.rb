class RemovePersonIdFromLines < ActiveRecord::Migration
  def up
    remove_column :lines, :person_id
  end

  def down
    add_column :lines, :person_id, :integer
  end
end
