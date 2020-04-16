# Chicken Tinder

This is a "Tinder-style" application that would be used as a game for multiple people to play. It uses the Yelp "Fusion API" that gets Yelp results for the user, creates player names and asks the users to each vote one at a time for each result. Each result that was voted for by all players is then shown in a list of matches with information and links to the results Yelp pages.

## Getting Started

The Rails backend is rendering a JSON format API that is fetched by the JavaScripted frontend. To start Rails run command ```bundle install``` from directory ```ChickenTinder/backend_rails```. Before running the migrations for the database and starting a server using the ```rails s``` command you will need to obtain a key to be used in the ```app/models/game.rb``` class for the external API. Visit [yelp.com/fusion](https://www.yelp.com/fusion) and click "get started". You will need to also load environment variables and change the ```/backend_rails/config/environments/database.yml``` as needed with your own information.

### Prerequisites

'ruby 2.6.5'
'rails (~> 5.2.4, >= 5.2.4.2)'
'BUNDLED WITH 2.1.2'

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
