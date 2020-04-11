class CreateLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :likes do |t|
      t.string :name
      t.string :yelp_id
      t.integer :game_id, foreign_key: true
    end
  end
end
