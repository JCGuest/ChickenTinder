class RemoveMatchesFromGames < ActiveRecord::Migration[5.2]
  def change
    remove_column :games, :matches
  end
end
