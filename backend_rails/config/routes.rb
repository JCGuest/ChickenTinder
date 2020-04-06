Rails.application.routes.draw do
get 'games/newgame', to: '#games#new_game'
  # get '/search', to: 'options#search'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
