class CreateReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :reviews do |t|
      t.integer(:score)
      t.integer(:product_id)
      t.integer(:user_id)
    end
  end
end
