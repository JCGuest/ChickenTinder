class RemoveGameIdFromUsersTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :game_id
  end
end
