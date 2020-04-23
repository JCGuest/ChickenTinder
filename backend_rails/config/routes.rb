Rails.application.routes.draw do
# games
post '/games/search', to: 'games#search'
post '/games/business', to: 'games#business'
get '/games/new', to: 'games#new'
get 'games/:id', to: 'games#show'

#user
post '/users/create', to: 'users#create'
post '/users/login', to: 'users#login'
patch '/users/:id', to: 'users#update'
get '/users/:name/likes', to: 'likes#index'
# post '/users/likes', to: 'users#likes'
# post '/users/delete', to: 'users#delete'

# #likes 
post '/likes', to: 'likes#create'
# get '/likes/:user/'

end
