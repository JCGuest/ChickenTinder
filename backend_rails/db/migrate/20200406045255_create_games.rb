class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.string :matches
      
      t.timestamps
    end
  end
end
# results
# players
# yelps