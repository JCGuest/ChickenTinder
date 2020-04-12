let term = document.querySelector("#term")
let loc = document.querySelector("#location")
const btnNext = document.querySelector("button#next")
let players = document.querySelector("input#players")
const userInfo = document.querySelector('form#user-info')
userInfo.style['display'] = 'none'
const yelps = document.querySelector('div#yelp-wrap')
// yelps.style['display'] = 'none'
const yelpInfo = document.querySelector('div#yelp-info')

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
    TERM = term.value
    LOC = loc.value
    const playersInput = players.value

//create game
    const gameConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'}
        };

    fetch(`http://localhost:3000/games/create`, gameConfig)
    .then(response => {
        return response.json()
        })
    .then(json => {
        const gameId  = json['data']['id']
        Yelp.gameId = gameId
        return gameId
        })
    .then(gameId => {
        createGame(gameId, playersInput)
        })
    

})

function createGame(gameId, numPlayers) {
    toggleUserName()
    let playersArr = []
    const userParent = document.querySelector('div#parent')
    for (let i=1; i<= numPlayers-1; i++) {
        let userInfo = document.querySelector('form#user-info')
        let copy = userInfo.cloneNode(true)
        userParent.appendChild(copy)
        copy.querySelector('input').placeholder = ` player ${i+1}` 
        copy.querySelector('input').id = `player-${i+1}-name`
        playersArr.push(i)
        };
    let playBtn = document.createElement('button')
    playBtn.innerHTML = "Play"
    userParent.appendChild(playBtn)
    playBtn.addEventListener('click', e => {
        const userConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'}
        };
    for (let i=1; i <= playersArr.length + 1; i++){
        let name = document.querySelector(`input#player-${i}-name`).value
        fetch(`http://localhost:3000/users/create?game_id=${gameId}&name=${name}`, userConfig)
        .then(response => {
            return response.json()
            })
        .then(json => {
            console.log("user json =>", json)
         })
        .catch(err => {
            console.log(err)
            });
        };
    toggleYelps();
    yelpFetch();
    });

};

function yelpFetch() {
    const yelpConfig = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'}
    };
    fetch(`http://localhost:3000/games/search?term=${TERM}&location=${LOC}`, yelpConfig)
    .then(response => {
        return response.json()
        })
    .then(json => {
        return json['businesses']
        })
    .then(data => {
        data.forEach( yelp => {
            new Yelp(yelp['id'], yelp['name'],yelp['url'],yelp['image_url'],yelp['price'],yelp['location']['address1'],yelp['phone'],yelp['rating'])
            })  
        yelpRender()       
            })
    .catch(err => {
        console.log(err)
    })
};
//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

class Yelp {
    constructor(id, name, url, img, price, address, phone, rating ){
        this.id = id
        this.name = name
        this.url = url 
        this.img = img 
        this.price = price 
        this.address = address
        this.phone = phone
        this.rating = rating
        Yelp.all.push(this)
    }
        static all = []
        static gameId = 0
}

function yelpRender(i, player) {
    if (!i) {i = 0}

    result = Yelp.all[i]

    let playerNum = document.querySelector('h1#player')
    playerNum.innerHTML = `Player #${player}`
    let title = document.querySelector('h1#title')
    title.innerHTML = result.name
    let img = document.querySelector('div#image')
    img.style = `background-image: url(${result.img});`
    let phone = document.querySelector('td#phone')
    phone.innerHTML = result.phone
    let address = document.querySelector('td#address')
    address.innerHTML = result.address
    let rating = document.querySelector('td#rating')
    rating.innerHTML = `${result.rating}/5`
    let price = document.querySelector('td#price')
    price.innerHTML = result.price
    let url = document.querySelector('a#url')
    url.addEventListener('click', e => {
        e.preventDefault()
        window.open(result.url)
    })
    let yelpDiv = document.querySelector('div#yelp-info')

    let thUp = document.querySelector('img#thumb-up')
    let thDown = document.querySelector('img#thumb-down')

    thUp.addEventListener('click', e => {
        const matchConfig = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'}
        };
        fetch(`http://localhost:3000/likes?game_id=100&name=${result.name}&yelp_id=${result.id}`, matchConfig)
        .then(resp => {
            return resp.json()
        })
        .then(json => {
            console.log(json)
        })
        if (i === Yelp.all.length -1 ) {
            newPlayer()
        } else {yelpRender(i+1,1)}
    })
    thDown.addEventListener('click', e => {
        if (i === Yelp.all.length -1 ) {
            newPlayer()
        } else {yelpRender(i+1,1)}
        })

};

function fetchy() {
    const yelpConfig = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'}
    };
    fetch(`http://localhost:3000/games/search?term=italian&location=new york, ny`, yelpConfig)
    .then(response => {
        return response.json()
        })
    .then(json => {
        return json['businesses']
        })
    .then(data => {
        // let resutlsLength = Object.keys(data).length
        data.forEach( yelp => {
            new Yelp(yelp['id'], yelp['name'],yelp['url'],yelp['image_url'],yelp['price'],yelp['location']['address1'],yelp['phone'],yelp['rating'])
            })  
    yelpRender(0, 1)       
        })
    .catch(err => {
        console.log(err)
    })
    return "fetchy"
};

function newPlayer() {
    let playerNum = document.querySelector('h1#player')
    playerNum.innerHTML = `Next Player, ready?`
    let title = document.querySelector('h1#title')
    title.style['display'] = 'none'
    let img = document.querySelector('div#image')
    img.style['display'] = 'none'
    let table = document.querySelector('table#menu')
    table.style['display'] = 'none'
    let url = document.querySelector('a#url')
    url.addEventListener('click', e => {
        e.preventDefault()
        window.open(result.url)
    })
    let yelpDiv = document.querySelector('div#yelp-info')

    let thUp = document.querySelector('img#thumb-up')
    th
    // let thDown = document.querySelector('img#thumb-down')
}