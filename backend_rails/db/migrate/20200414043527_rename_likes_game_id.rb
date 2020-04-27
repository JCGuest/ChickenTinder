class RenameLikesGameId < ActiveRecord::Migration[5.2]
  def change
    rename_column :likes, :game_id, :user_id
  end
end
