class User < ApplicationRecord
    belongs_to :game

    def game_attributes
        self.game = Game.find_or_create_by(game_attributes)
    end
end
