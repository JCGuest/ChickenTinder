class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.belongs_to :game, class_name: "game", foreign_key: "game_id"

      t.timestamps
    end
  end
end
