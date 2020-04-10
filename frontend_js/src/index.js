const term = document.querySelector("input#term")
const loc = document.querySelector("input#location")
const btnNext = document.querySelector("button#next")
const players = document.querySelector("input#players")
const userInfo = document.querySelector('div#user-info')
userInfo.style['display'] = 'none'
const yelps = document.querySelector('div#yelp-wrap')
yelps.style['display'] = 'none'

function toggleUserName() {
    if (userInfo.style['display'] == 'none') {
        userInfo.style['display'] = 'block'
    } else {
        userInfo.style['display'] = 'none'
    }
}
function toggleYelps() {
    if (yelps.style['display'] == 'none') {
        yelps.style['display'] = 'block'
    } else {
        yelps.style['display'] = 'none'
    }
}


btnNext.addEventListener('click', (e) => {
    e.preventDefault()
    const searchTerm = term.value
    const searchLocation = loc.value
    const numPlayers = players.value
     
    // fetch(`http://localhost:3000/games/search?term=${searchTerm}&location=${searchLocation}`)
    // .then(response => {
    //     return response.json()
    // })
    // .then(json => {
    //     return json['data']
    //     // console.log(json)
    // })
    // .then(data => {
    //  console.log(data)
    // })
    // .catch(err => {
    //     console.log(err)
    // })
//////////////////////////////////////////////////////

//create game
const gameConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'}
    }
    fetch(`http://localhost:3000/games/create`, gameConfig)
    .then(response => {
        return response.json()
    })
    .then(json => {
        const gameId  = json['data']['id']
        return gameId
    })
    .then(gameId => {
        console.log(gameId)
        createUsers(gameId, numPlayers)
    })
    

})

function createUsers(gameId, numPlayers) {
    toggleUserName()
    let playersArr = []
    const parent = document.querySelector('div#parent')
    for (let i=1; i<= numPlayers-1; i++) {
    let userInfo = document.querySelector('div#user-info')
    let copy = userInfo.cloneNode(true)
    parent.appendChild(copy)
    copy.querySelector('input').placeholder = ` player ${i+1}` 
    copy.querySelector('input').id = `player-${i+1}-name`
    playersArr.push(i)
    }
    let playBtn = document.createElement('button')
    playBtn.innerHTML = "Play"
    parent.appendChild(playBtn)
    playBtn.addEventListener('click', e => {
        const userConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'}
        }
    for (let i=1; i <= playersArr.length; i++){
        let name = document.querySelector(`input#player-${i}-name`).value
        fetch(`http://localhost:3000/users/create?game_id=${gameId}&name=${name}`, userConfig)
        .then(response => {
            return response.json()
        })
        .then(json => {
            console.log(json)
        })
        .catch(err => {
            console.log(err)
        })
        toggleYelps()
        fetch(`http://localhost:3000/games/search?term=${term}&location=${loc}`)
    .then(response => {
        return response.json()
    })
    .then(json => {
        return json['data']
        // console.log(json)
    })
    .then(data => {
     console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
    }


    })

}
