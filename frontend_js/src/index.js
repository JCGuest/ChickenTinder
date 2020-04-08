const term = document.querySelector("#term")
const loc = document.querySelector("#location")
const btn = document.querySelector("button")
const players = document.querySelector("#players")

btn.addEventListener('click', (e) => {
    e.preventDefault()
    const searchTerm = term.value
    const searchLocation = loc.value
    const numPlayers = players.value
    const name = "Name"
     
    // fetch(`http://localhost:3000/games/search?term=${searchTerm}&location=${searchLocation}`)
    const gameConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'}
    }

    const userConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'}
    }
//create game
    fetch('http://localhost:3000/games/create', gameConfig)
    .then(response => {
        return response.json()
    })
    .then(json => {
        let gameId  = json['data']['id']
        return gameId
    })
//create user
    .then(gameId => {
        fetch(`http://localhost:3000/users/create?game_id=${gameId}&name=${name}`, userConfig)
        .then(response => {
            return response.json()
        })
        .then(json => {
            console.log(json)
        })
    })
    

})

    class Game {
        constructor(players, yelps) {
            this.players = players
            this.yelps = yelps
        }
    }

