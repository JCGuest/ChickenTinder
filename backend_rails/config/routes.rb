Rails.application.routes.draw do
# games
post '/games/search', to: 'games#search'
#user
post '/users/create', to: 'users#create'
patch '/users/:id', to: 'users#update'
get '/users/likes', to: 'users#likes'
#likes 
post '/likes', to: 'likes#create'
end
