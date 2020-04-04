let term = document.querySelector("#term")
let local = document.querySelector("#location")
let btn = document.querySelector("body > form > button")

btn.addEventListener('click', (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/search?term=${term}?location=${location}`)
    .then(response => {
        return response.json()
    })
    .then(json => {
        console.log(json)
    })
    })