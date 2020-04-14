class User < ApplicationRecord
    belongs_to :game
    has_many :likes
    validates :name, presence: :true
    # validates :name, uniqueness: :true

    def game_attributes
        self.game = Game.find_or_create_by(game_attributes)
    end
end
