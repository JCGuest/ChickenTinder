class User < ApplicationRecord
    belongs_to :game, class_name: "game", foreign_key: "game_id"
end
