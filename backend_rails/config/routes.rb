Rails.application.routes.draw do
# games
post '/games/search', to: 'games#search'
post '/games/business', to: 'games#business'
get '/games/new', to: 'games#new'
get '/games/:id/likes', to: 'games#likes'
get 'games/:id', to: 'games#show'

#user
post '/users/create', to: 'users#create'
post '/users/login', to: 'users#login'
patch '/users/:id', to: 'users#update'
# post '/users/delete', to: 'users#delete'

# #likes 
post '/likes', to: 'likes#create'

end
