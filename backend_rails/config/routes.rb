Rails.application.routes.draw do
resources :games, controller: 'games', only: [:create, :update, :search, :show]
post '/games/create', to: 'games#create'
patch '/games/:id', to: 'games#update'

resources :users, controller: 'users', only: [:create, :update, :destroy] 
post '/users/create', to: 'users#create'
patch '/users/:id', to: 'users#update'

# get "/games/newgame", to: "#games#new"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
