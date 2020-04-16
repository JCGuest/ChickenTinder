let term = document.querySelector("#term")
let loc = document.querySelector("#location")
const btnNext = document.querySelector("button#next")
let players = document.querySelector("input#players")
const userInfo = document.querySelector('form#user-info')
// toggle for testing
userInfo.style['display'] = 'none'
let readyBtn = document.querySelector('button#ready')
readyBtn.style['display'] = 'none'
const yelps = document.querySelector('div#yelp-wrap')
// toggle for testing
yelps.style['display'] = 'none'
const yelpInfo = document.querySelector('div#yelp-info')

function toggleUserName() {
    if (userInfo.style['display'] == 'none') {
        userInfo.style['display'] = 'block'
    } else {
        userInfo.style['display'] = 'none'
        }
};
function toggleYelps() {
    if (yelps.style['display'] == 'none') {
        yelps.style['display'] = 'block'
    } else {
        yelps.style['display'] = 'none'
        }
};

btnNext.addEventListener('click', function nex() {
    let what = document.querySelector("#term")
    let where = document.querySelector("#location")
    if (!what.value) { 
        alert("Search term can not be blank. Use whatever you would type in to Yelp.")
    } else if  (!where.value) {
        alert("Search location can not be blank. Use city, zipcode etc...")
    } else if (players.value < 1) {
        alert("Enter the number of players. At least two.")
    } else {
        btnNext.removeEventListener('click', nex)
        TERM = term.value
        LOC = loc.value
        NUMPLAYERS = parseInt(players.value)
        createGame()
        //create game
        // const gameConfig = {
        // method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json'}
        //     };
        // fetch(`http://localhost:3000/games/create`, gameConfig)
        // .then(response => {
        //     return response.json()
        //     })
        // .then(json => {
        //     const gameId  = json['data']['id']
        //     Yelp.gameId = gameId
        //     return gameId
        //     })
        // .then(gameId => {
        //     createGame(gameId)
        //     })
    }
})

function createGame() {
    toggleUserName()
    const userParent = document.querySelector('div#user-parent')
    for (let i=1; i<= NUMPLAYERS-1; i++) {
        let userInfo = document.querySelector('form#user-info')
        let copy = userInfo.cloneNode(true)
        userParent.appendChild(copy)
        let input =  copy.querySelector('input')
        input.placeholder  = ` player ${i+1}`
        input.id = `player-${i+1}-name`
        };
    let playBtn = document.createElement('button')
    playBtn.id = 'next'
    playBtn.innerHTML = "Play"
    userParent.appendChild(playBtn)
    USERARY = []
    playBtn.addEventListener('click', function playFunc() {
        let validateNames = document.querySelectorAll('input.validate')
        let invalid = []
        validateNames.forEach(function(x) {
            if (!x.value) {invalid.push(x)}
            })
        if (invalid[0]) {
            alert(`Player name can not blank`)
             invalid = []
        } else {
            const userConfig = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'}
                };
        for (let i=1; i <= NUMPLAYERS; i++){
            let name = document.querySelector(`input#player-${i}-name`).value
                fetch(`http://localhost:3000/users/create?&name=${name}`, userConfig)
                .then(response => {
                    return response.json()
                    })
                .then(json => {
                    USERARY.push(json['data']['attributes']['name'])
                })
                .catch(err => {
                    console.log(err)
                    });
            };
            playBtn.removeEventListener('click', playFunc)
            toggleYelps();
            yelpFetch();
        }
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
        Yelp.destroyAll()
        data.forEach( yelp => {
            new Yelp(yelp['id'], yelp['name'],yelp['url'],yelp['image_url'],yelp['price'],yelp['location']['address1'],yelp['phone'],yelp['rating'], 0)
            })  
        yelpRender(0,1)       
            })
    .catch(err => {
        console.log(err)
    })
    
};

class Yelp {
    constructor(id, name, url, img, price, address, phone, rating, likes ){
        this.id = id
        this.name = name
        this.url = url 
        this.img = img 
        this.price = price 
        this.address = address
        this.phone = phone
        this.rating = rating
        this.likes = likes
        Yelp.all.push(this)
    }
        static all = []
        static gameId = 0

        static matches(numPlayers) {
            const filterMatch = Yelp.all.filter( y => y.likes === numPlayers)
                return filterMatch
        }

        static destroyAll() {
            Yelp.all = []
        }
}

function yelpRender(i, player) {
    result = Yelp.all[i]
    toggleYelpOn()
    let playerNum = document.querySelector('h1#player')
    playerNum.innerHTML = `${USERARY[player-1]}`
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
    url.innerHTML = `Go to ${result.name}'s website`
        url.addEventListener('click', e => {
            e.preventDefault()
            window.open(result.url)
        })

        let thUp = document.querySelector('img#thumb-up')
        let thDown = document.querySelector('img#thumb-down')
        thUp.addEventListener('click', like)
        thDown.addEventListener('click', dislike)

        function like() {
             result.likes = (result.likes + 1)            
             const likeConfig = {
                 method: "POST",
                 headers: {
                     'Content-Type': 'application/json'}
             };
             fetch(`http://localhost:3000/likes?username=${USERARY[player-1]}&name=${result.name}&yelp_id=${result.id}`, likeConfig)
             .then(resp => {
                 return resp.json()
             })
             .then(json => {
                 newOrRender(i, player)
                return json 
             })
             .catch(err => {
                 console.log(err)
             })
             function newOrRender(i, player) {
                if (i === Yelp.all.length -1 ) {
                    thUp.removeEventListener('click', like)
                    thDown.removeEventListener('click', dislike)
                    newPlayer(player)
                } else {
                    thUp.removeEventListener('click', like)
                    thDown.removeEventListener('click', dislike)
                    yelpRender(i+1,player)
                }
            }
        }

        function dislike() {
            if (i === Yelp.all.length -1 ) {
                thUp.removeEventListener('click', like)
                thDown.removeEventListener('click', dislike)
                newPlayer(player)
            } else {
                thUp.removeEventListener('click', like)
                thDown.removeEventListener('click', dislike)
                yelpRender(i+1,player)
            }
        }    
};


function newPlayer(player) {
    toggleYelpOff()
    if (player === NUMPLAYERS) {
        renderMatches();
    } else { 
    let playerNum = document.querySelector('h1#player')
    playerNum.innerHTML = `${USERARY[player]}, ready?`
    readyBtn.addEventListener('click', e => {
        yelpRender(0, player+1)
        })
    }
};

function renderMatches() {
    let matches = Yelp.matches(NUMPLAYERS)
    if (!matches[0]){
        noMatch()
    } else { 
        let ready = document.querySelector('button#ready')
        ready.style['display'] = "none"
        if (matches) {ifMatch()}

        function ifMatch(){
            let y = matches[0]
            let matchParent = document.querySelector('div#match-parent')
            matchParent.style['display'] = "block"
            let winners = document.querySelector('div#match')
            let message = document.querySelector('h1#player')
            message.innerHTML = "Your Matches"

            let img = document.querySelector('div#match-img')
            img.style = `background-image: url(${y.img});`
            let title = document.querySelector('h2#title')
            title.innerHTML = y.name
            let location = document.querySelector('p#location')
            location.innerHTML = y.address
            let price = document.querySelector('p#price')
            price.innerHTML = y.price 
            let rating = document.querySelector('p#rating')
            rating.innerHTML = `${y.rating}/5`
            let url = document.querySelector('a#result-url')
            url.innerHTML = `Go to ${y.name}'s Yelp page`
            url.href = y.url
            if (matches.length > 1) {ifMatches(winners, matchParent)}
        }

        function ifMatches(winners, matchParent) {
            for (let i = 1; i < NUMPLAYERS; i++) {
                let y = matches[i]
                // matchParent.style['display'] = "block"
                let copy = winners.cloneNode(true)
                matchParent.appendChild(copy)
                let img = copy.querySelector('div#match-img')
                img.style = `background-image: url(${y.img});`
                let title = copy.querySelector('h2#title')
                title.innerHTML = y.name
                let location = copy.querySelector('p#location')
                location.innerHTML = y.address
                let price = copy.querySelector('p#price')
                price.innerHTML = y.price 
                let rating = copy.querySelector('p#rating')
                rating.innerHTML = `${y.rating}/5`
                let url = copy.querySelector('a#result-url')
                url.innerHTML = `Go to ${y.name}'s Yelp page`
                url.href = y.url 
            }
        }
    }
    // getAllLikes()
};

function noMatch() {
    let matchDiv = document.querySelector("#match")
    matchDiv.style['display'] = 'none'
    let matchMess = document.querySelector("#player")
    matchMess.innerHTML = "No Matches!"
    let ready = document.querySelector('button#ready')
    ready.style['display'] = "block"
    ready.innerHTML = 'Try again'
    ready.addEventListener('click', () => {
        location.reload()
    })
}

function getAllLikes() {
    let allLikes = []
    USERARY.forEach( (x, i) => {
        fetch(`http://localhost:3000/users/likes?name=${x}`)
                .then(response => {
                    return response.json()
                    })
                .then(json => {
                    json['data']['attributes']['likes'].forEach( like => {
                        allLikes.push(like.yelp_id)
                    })
                    return i
                })
                .then(i => {
                    if (i === NUMPLAYERS - 1) {renderMegamatch(allLikes)}
                })
                .catch(err => {
                    console.log(err)
                    }); 
    })
};

function renderMegamatch(allLikes) {
    console.log(allLikes)
    let count = {};
    allLikes.forEach(function(i) { count[i] = (count[i]||0) + 1;});
    console.log(count)
}

function toggleYelpOff() {
    readyBtn.style['display'] = 'block'
    let title = document.querySelector('h1#title')
    title.style['display'] = 'none'
    let img = document.querySelector('div#image')
    img.style['display'] = 'none'
    let table = document.querySelector('table#menu')
    table.style['display'] = 'none'
    let url = document.querySelector('a#url')
    url.style['display'] = 'none'

    let thUp = document.querySelector('img#thumb-up')
    thUp.style['display'] = 'none'
    let thDown = document.querySelector('img#thumb-down')
    thDown.style['display'] = 'none'
};

function toggleYelpOn() {
    readyBtn.style['display'] = 'none'
    let title = document.querySelector('h1#title')
    title.style['display'] = ''
    let img = document.querySelector('div#image')
    img.style['display'] = ''
    let table = document.querySelector('table#menu')
    table.style['display'] = ''
    let url = document.querySelector('a#url')
    url.style['display'] = ''

    let thUp = document.querySelector('img#thumb-up')
    thUp.style['display'] = ''
    let thDown = document.querySelector('img#thumb-down')
    thDown.style['display'] = ''
};

////////////
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