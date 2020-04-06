let term = document.querySelector("#term")
let loc = document.querySelector("#location")
let btn = document.querySelector("body > form > button")

btn.addEventListener('click', (e) => {
    e.preventDefault()
    let searchTerm = term.value
    let searchLocation = loc.value
    fetch(`http://localhost:3000/options?term=${searchTerm}&location=${searchLocation}`)
    .then(response => {
        return response.json()
        // console.log(response)
    })
    .then(json => {
        console.log(Object.values(json))
    })
    
    })