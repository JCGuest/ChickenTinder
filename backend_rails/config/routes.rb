Rails.application.routes.draw do
resources :games, controller: 'games', only: [:create, :update, :search, :show]
resources :users, controller: 'users', only: [:create, :update, :destroy] 
# get "/games/newgame", to: "#games#new"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
