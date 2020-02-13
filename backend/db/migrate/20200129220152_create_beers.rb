class CreateBeers < ActiveRecord::Migration[6.0]
  def change
    create_table :beers do |t|
      t.string(:name)
      t.string(:image)
      t.string(:style)
      t.string(:description)
      t.string(:abv)
      t.string(:ibu)
    end
  end
end
