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
        return gameId
        })
    .then(gameId => {
        console.log(gameId)
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
        yelpRender(2)       
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
}

function yelpRender(i) {
    if (!i) {
        result = Yelp.all[0]}
    else {
        result = Yelp.all[i]
    };
    let title = document.querySelector('h1#title')
    title.innerHTML = result.name
    let img = document.querySelector('div#image')
    img.style = `background-image: url(${result.img});`
    let phone = document.querySelector('th#phone')
    phone.innerHTML = result.phone
    let address = document.querySelector('th#address')
    address.innerHTML = result.address
    let rating = document.querySelector('th#rating')
    rating.innerHTML = `${result.rating}/5`
    let price = document.querySelector('th#price')
    price.innerHTML = result.price
    let url = document.querySelector('a#url')
    url.addEventListener('click', e => {
        e.preventDefault()
        window.open(result.url)
    })
    let yelpDiv = document.querySelector('div#yelp-info')


};

function fetchy() {
    const yelpConfig = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'}
    };
    fetch(`http://localhost:3000/games/search?term=coffee&location=austin`, yelpConfig)
    .then(response => {
        return response.json()
        })
    .then(json => {
        return json['businesses']
        })
    .then(data => {
        // console.log(data)
        data.forEach( yelp => {
            new Yelp(yelp['id'], yelp['name'],yelp['url'],yelp['image_url'],yelp['price'],yelp['location']['address1'],yelp['phone'],yelp['rating'])
            })  
    yelpRender(7)       
        })
    .catch(err => {
        console.log(err)
    })
    return "fetchy"
};