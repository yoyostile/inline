class RemoveAddressFieldsFromLine < ActiveRecord::Migration
  def up
    remove_column :lines, :street
    remove_column :lines, :country
    remove_column :lines, :city
    add_column :lines, :address, :string
  end

  def down
  end
end
