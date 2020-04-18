document.addEventListener('DOMContentLoaded', () => {
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
    };
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
    const playBtn = document.createElement('button')
    playBtn.id = 'next'
    playBtn.innerHTML = "Play"
    userParent.appendChild(playBtn)
    USERARY = []
    playBtn.addEventListener('click', function playFunc() {
        const validateNames = document.querySelectorAll('input.validate')
        const invalid = []
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

        function like() {
            thDown.removeEventListener('click', dislike)

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
                console.log(USERARY[player-1] + result.name + result.id)
                return json 
             })
             .catch(err => {
                 console.log(err)
             });
             function newOrRender(i, player) {
                if (i === Yelp.all.length -1 ) {
                    newPlayer(player)
                } else {
                    yelpRender(i+1,player)
                };
            };
            thUp.removeEventListener('click', like)
        };

        function dislike() {
            thUp.removeEventListener('click', like)
            if (i === Yelp.all.length -1 ) {
                newPlayer(player)
            } else {
                yelpRender(i+1,player)
            };
            thDown.removeEventListener('click', dislike)
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
    const matches = Yelp.matches(NUMPLAYERS)
    console.log(Yelp.matches(NUMPLAYERS) + "Yelp.matches(NUMPLAYERS)")
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
            for (let i = 1; i <= NUMPLAYERS-1; i++) {
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
    getAllLikes();
};

function noMatch() {
    const matchDiv = document.querySelector("#match")
    matchDiv.style['display'] = 'none'
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
    const allLikes = []
    USERARY.forEach( user => {
        fetch(`http://localhost:3000/users/likes?name=${user}`)
                .then(response => {
                    return response.json()
                    })
                .then(json => {
                    json['data']['attributes']['likes'].forEach( like => {
                        allLikes.push(like.yelp_id)
                    })
                    return user
                })
                .then(user => {
                    if (user == USERARY.slice(-1)) {
                        renderMegamatch(allLikes)
                    }
                })
                .catch(err => {
                    console.log(err)
                    }); 
    });
};

function renderMegamatch(allLikes) {
    let count = {}
    let megaId = []
    allLikes.forEach( like => { count[like] = (count[like]||0) + 1;});

    for (key in count) {
        if (count[key] === NUMPLAYERS){
        megaId.push(key)
        }
    }

    const likesConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"}
    };
    const megaNames = []
    megaId.forEach( id => {
    fetch(`http://localhost:3000/games/business?business_id=${id}`, likesConfig)
        .then(resp => {
            return resp.json()
        })
        .then(json => {
            megaNames.push(json["name"])
            return id
        })
        .then( id => {
            if (id == megaId.slice(-1)) {
                megaList(megaNames)
            }
        })
        .catch(err => {
            console.log(err)
        });
    });
    function megaList(megaNames) {
        function nameParse(arry) {
            sent = ""
            for (let i=0; i < arry.length-1; i++) {
                sent = sent + arry[i] + ", "
            }
            return sent      
        };

    if (megaNames[0]) {
        const megaDiv = document.querySelector('div#mega')
        // megaDiv.style['display'] = "block"
        
        const megaH2 = document.querySelector('h2#mega')
        const megaP = document.querySelector('p#mega')
        megaH2.innerHTML = `A list of all businesses ${nameParse(USERARY)} and ${USERARY.slice(-1)} have all liked on Chicken Tinder... `
        megaP.innerHTML = megaNames[0]
        for (let i=1; i < NUMPLAYERS; i++){
        let copy = megaP.cloneNode(true)
        copy.innerHTML = megaNames[i]
        megaDiv.appendChild(copy)
        }
        };
    };
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
