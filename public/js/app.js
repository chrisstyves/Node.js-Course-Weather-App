// Client side - runs in the brower!

console.log('Client side js file loaded')

// this hosts some randomly generated dummy JSON
// fetch('http://puzzle.mead.io/puzzle').then((res) => {
//     // wait for JSON data
//     res.json().then((data) => {
//         console.log(data)
//     })
// })

// grab form from the document
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

// listen for the form submit
weatherForm.addEventListener('submit', (e) => {
    // don't let browser refresh the whole page on submit
    e.preventDefault()
    const location = search.value
    console.log(location)

    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch('/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
                message2.textContent = ''
                //console.log(data.error)
            }
            else {
                message1.textContent = data.location
                message2.textContent = data.forecastData
                //console.log(data.location)
                //console.log(data.forecastData)
            }
        })
    })
})