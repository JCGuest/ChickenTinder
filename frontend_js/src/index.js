const term = document.querySelector("#term")
const loc = document.querySelector("#location")
const btn = document.querySelector("body > form > button")
const players = document.querySelector("#players")

btn.addEventListener('click', (e) => {
    e.preventDefault()
    let searchTerm = term.value
    let searchLocation = loc.value
    let numPlayers = players.value
     
    // fetch(`http://localhost:3000/games/search?term=${searchTerm}&location=${searchLocation}`)
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'}
    }
    fetch('http://localhost:3000/games/create', config)
    .then(response => {
        return response.json()
    })
    .then(json => {
        console.log(json)
    })
    

    
    })

    class Game {
        constructor(players, yelps) {
            this.players = players
            this.yelps = yelps
        }
    }

