class RemoveWinnerFromGame < ActiveRecord::Migration[5.2]
  def change
    remove_column :games, :winner
  end
end
