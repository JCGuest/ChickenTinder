const term = document.querySelector("#term")
const loc = document.querySelector("#location")
const btn = document.querySelector("body > form > button")
const players = document.querySelector("#players")

btn.addEventListener('click', (e) => {
    e.preventDefault()
    let searchTerm = term.value
    let searchLocation = loc.value
    let numPlayers = players.value
    let game = new Game(numPlayers, 
    fetch(`http://localhost:3000/games/new?term=${searchTerm}&location=${searchLocation}`)
    .then(response => {
        return response.json()
        // console.log(response)
    })
    .then(json => {
        console.log(Object.values(json))
    })
    )

    
    })

    class Game {
        constructor(players, yelps) {
            this.players = players
            this.yelps = yelps
        }
    }

