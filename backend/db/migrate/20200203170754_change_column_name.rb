class ChangeColumnName < ActiveRecord::Migration[6.0]
  def change
    rename_column :reviews, :product_id, :beer_id
  end
end
