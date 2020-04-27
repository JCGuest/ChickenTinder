document.addEventListener('DOMContentLoaded', () => {
HOME = "http://localhost:3000"
const term = document.querySelector("#term")
const loc = document.querySelector("#location")
const btnNext = document.querySelector("button#next")
const players = document.querySelector("input#players")
const userInfo = document.querySelector('form#user-info')
// toggle for testing
userInfo.style['display'] = 'none'
const readyBtn = document.querySelector('button#ready')
readyBtn.style['display'] = 'none'
const yelps = document.querySelector('div#yelp-wrap')
// toggle for testing
yelps.style['display'] = 'none'
// const yelpInfo = document.querySelector('div#yelp-info')
const newPromp = document.querySelector('a#new-user')
newPromp.addEventListener('click', prompter)
// const deleteProm = document.querySelector('a#delete')
// deleteProm.addEventListener('click', deleter)
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
    };
})

// function deleter(e){
//     e.preventDefault()
//     let user = prompt('Enter the name of the account you would like to delete.')
//     if (user) {
//         const userConfig = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'}
//                 };
//                 fetch(`${HOME}/users/delete?name=${user}`, userConfig)
//                 .then(resp => {
//                     return resp.json()
//                 })
//                 .then(json => {
//                     if (json['message']) {
//                     alert(json['message'])
//                     }
//                 }).catch(err => {
//                     console.log(err)
//                 })
//     };
//     e.target.removeEventListener('click', deleter)
// };

function prompter(e){
    e.preventDefault()
    let user = prompt('Welcome to Chicken Tinder. Its basically a game for choosing where to eat. Below you can enter a search term and location just like you would on Yelp, select the number of players, and vote on each result. Each result that gets voted for by each player will be shown after all players have gone. Please enter a username here that is unique because I chose not to use passwords. You will then use that name when prompted after the search is submitted.')
if (user) {
    const userConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'}
            };
    fetch(`${HOME}/users/create?&user[name]=${user}`, userConfig)
    .then(resp => {
        return resp.json()
    })        
    .then(json => {
        let errs = json['data']['attributes']['errors']['name']
        if (errs) {
            errs.forEach(e => {
            alert(`Name ${e}. Please click "New here?" again to enter a new name.`)
                })
            } else {
                alert(`You have created username: ${json['data']['attributes']['name']}.\nPlease remember this for the player entry after you have entered your search.`)
            }
        });
    }
    e.target.removeEventListener('click', prompter)
  };

function createGame() {
    fetch(`${HOME}/games/new`)
    .then( resp => {
        return resp.json()
    })
    .then( json => {
        GAMEID = json["data"]["attributes"]['id']
    })
    .catch(err => {
        console.log(err)
    })
    findUsers()
}

function findUsers() {
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
    const playBtn = document.createElement('button')
    playBtn.id = 'next'
    playBtn.innerHTML = "Play"
    userParent.appendChild(playBtn)
    USERARY = []
    playBtn.addEventListener('click', function playFunc() {
        const loginNames = document.querySelectorAll('input.login')
        const invalid = []
        loginNames.forEach(function(x) {
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
        for (let i = 1; i <= NUMPLAYERS; i++){
            let name = document.querySelector(`input#player-${i}-name`).value
                fetch(`${HOME}/users/login?&user[name]=${name}&user[game_id]=${GAMEID}`, userConfig)
                .then(response => {
                    return response.json()
                    })
                .then(json => {
                    USERARY.push(json['data']['attributes']['name'])
                    return i 
                })
                .then( i => {
                    if (i === NUMPLAYERS){
                        toggleYelps();
                        yelpFetch();
                    }
                })
                .catch(err => {
                    console.log(err)
                    });
            };
        }
        playBtn.removeEventListener('click', playFunc)
    });

};

function yelpFetch() {
    const yelpConfig = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'}
    };
    fetch(`${HOME}/games/search?term=${TERM}&location=${LOC}`, yelpConfig)
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
    });
    
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
    };
        static all = []
        static gameId = 0

        static matches(numPlayers) {
            const filterMatch = Yelp.all.filter( y => y.likes === numPlayers)
                return filterMatch
        };

        static destroyAll() {
            Yelp.all = []
        };
};

function yelpRender(i, player) {
    result = Yelp.all[i]
    toggleYelpOn()
    const playerNum = document.querySelector('h1#player')
    playerNum.innerHTML = `${USERARY[player-1]}`
    const title = document.querySelector('h1#title')
    title.innerHTML = result.name
    const img = document.querySelector('div#image')
    img.style = `background-image: url(${result.img});`
    const phone = document.querySelector('td#phone')
    phone.innerHTML = result.phone
    const address = document.querySelector('td#address')
    address.innerHTML = result.address
    const rating = document.querySelector('td#rating')
    rating.innerHTML = `${result.rating}/5`
    const price = document.querySelector('td#price')
    price.innerHTML = result.price
    const url = document.querySelector('a#url')
    url.innerHTML = `Go to ${result.name}'s website`
        url.addEventListener('click', e => {
            e.preventDefault()
            window.open(result.url)
        });

        const thUp = document.querySelector('img#thumb-up')
        const thDown = document.querySelector('img#thumb-down')
        thUp.addEventListener('click', like)
        thDown.addEventListener('click', dislike)

        function like(e) {
            thDown.removeEventListener('click', dislike)
            e.target.removeEventListener('click', like)
             result.likes = (result.likes + 1)            
             const likeConfig = {
                 method: "POST",
                 headers: {
                     'Content-Type': 'application/json'}
             };
             fetch(`${HOME}/likes?username=${USERARY[player-1]}&name=${result.name}&yelp_id=${result.id}`, likeConfig)
             .then(resp => {
                 return resp.json()
             })
             .then(json => {
                newOrRender(i, player)
                return json 
             })
             .catch(err => {
                 console.log(err)
             });;
        };

        function newOrRender(i, player) {
            if (i === Yelp.all.length -1 ) {
                newPlayer(player)
            } else {
                yelpRender(i+1,player)
            };
        };

        function dislike(e) {
            e.target.removeEventListener('click', dislike)
            thUp.removeEventListener('click', like)
            if (i === Yelp.all.length -1 ) {
                newPlayer(player)
            } else {
                yelpRender(i+1,player)
            };

        };    
};


function newPlayer(player) {
    toggleYelpOff()
    if (player === NUMPLAYERS) {
        renderMatches();
    } else { 
    const playerNum = document.querySelector('h1#player')
    playerNum.innerHTML = `${USERARY[player]}, ready?`
    readyBtn.addEventListener('click', e => {
        yelpRender(0, player+1)
        });
    };
};

function renderMatches() {
    getAllLikes();
    const matches = Yelp.matches(NUMPLAYERS)
    if (!matches[0]){
        noMatch()
    } else { 
        let ready = document.querySelector('button#ready')
        ready.style['display'] = "none"
        ifMatch()
        function ifMatch(){
            const y = matches[0]
            const matchParent = document.querySelector('div#match-parent')
            matchParent.style['display'] = "block"
            const winners = document.querySelector('div#match')
            const message = document.querySelector('h1#player')
            message.innerHTML = "Your Matches"

            const img = document.querySelector('div#match-img')
            img.style = `background-image: url(${y.img});`
            const title = document.querySelector('h2#title')
            title.innerHTML = y.name
            const location = document.querySelector('p#location')
            location.innerHTML = y.address
            const price = document.querySelector('p#price')
            price.innerHTML = y.price 
            const rating = document.querySelector('p#rating')
            rating.innerHTML = `${y.rating}/5`
            const url = document.querySelector('a#result-url')
            url.innerHTML = `Go to ${y.name}'s Yelp page`
            url.href = y.url
            if (matches.length > 1) {ifMatches(winners, matchParent)}
        }

        function ifMatches(winners, matchParent) {
            for (let i = 1; i < matches.length; i++) {
                let y = matches[i]
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
            };
        };
    };
};

function noMatch() {
    const matchMess = document.querySelector("#player")
    matchMess.innerHTML = "No Matches!"
    const ready = document.querySelector('button#ready')
    ready.style['display'] = "block"
    ready.innerHTML = 'Try again'
    ready.addEventListener('click', () => {
        location.reload()
    });
};

function getAllLikes() {
    fetch(`${HOME}/games/${GAMEID}/likes`)
    .then(resp => {
        return resp.json()
    })
    .then(json => {
        megaList(json['likes'])
    })
};

function megaList(allLikes) {
    const sorted = allLikes.slice().sort()
    const names = []
    for (let i = 0; i < sorted.length - 1; i++ ){
        if (sorted[i+1] === sorted[i]){
            names.push(sorted[i])
        };
    };

    if (names[0]) {
        const megaDiv = document.querySelector('div#mega')
        const megaH2 = document.querySelector('h2#mega')
        megaH2.innerHTML = `A list of all businesses ${nameParse(USERARY)} and ${USERARY.slice(-1)[0]} have all liked on Chicken Tinder... `
        for (let i = 0; i <= names.length - 1; i++){
        let megaP = document.createElement('p')
        megaP.innerHTML = names[i]
        megaDiv.appendChild(megaP)
        };
    };
};

function nameParse(arry) {
    sent = ""
    for (let i=0; i < arry.length-1; i++) {
        sent = sent + arry[i] + ", "
    }
    return sent      
};


function toggleYelpOff() {
    readyBtn.style['display'] = 'block'
    const title = document.querySelector('h1#title')
    title.style['display'] = 'none'
    const img = document.querySelector('div#image')
    img.style['display'] = 'none'
    const table = document.querySelector('table#menu')
    table.style['display'] = 'none'
    const url = document.querySelector('a#url')
    url.style['display'] = 'none'

    const thUp = document.querySelector('img#thumb-up')
    thUp.style['display'] = 'none'
    const thDown = document.querySelector('img#thumb-down')
    thDown.style['display'] = 'none'
};

function toggleYelpOn() {
    readyBtn.style['display'] = 'none'
    const title = document.querySelector('h1#title')
    title.style['display'] = ''
    const img = document.querySelector('div#image')
    img.style['display'] = ''
    const table = document.querySelector('table#menu')
    table.style['display'] = ''
    const url = document.querySelector('a#url')
    url.style['display'] = ''

    const thUp = document.querySelector('img#thumb-up')
    thUp.style['display'] = ''
    const thDown = document.querySelector('img#thumb-down')
    thDown.style['display'] = ''
};
});
