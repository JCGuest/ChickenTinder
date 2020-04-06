Rails.application.routes.draw do
resources :games, controller: 'games', only: [:new]
# get "/games/newgame", to: "#games#new"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
