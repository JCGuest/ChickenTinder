Rails.application.routes.draw do
# games
post '/games/search', to: 'games#search'
post '/games/create', to: 'games#create'
patch '/games/:id', to: 'games#update'
get '/games/:id', to: 'games#show'

#user
post '/users/create', to: 'users#create'
patch '/users/:id', to: 'users#update'

#likes 
post '/likes', to: 'likes#create'

# matches
end
