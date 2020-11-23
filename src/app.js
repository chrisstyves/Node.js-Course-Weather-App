const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

app.set('view engine', 'hbs')

// express defaults to checking for the 'views' directory for hbs files,
// but we can change that.
app.set('views', path.join(__dirname, '../templates/views'))

hbs.registerPartials(path.join(__dirname, '../templates/partials'))

// serve up the 'public' folder 
// express checks this folder first before 'get' calls below
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    // matches name of template in views folder
    res.render('index', {
        title: 'Weather App',
        name: 'Christopher'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'help message',
        name: 'Yo'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecastData,
                location
            })
        })
    })
})

// example: grab query params from request object
app.get('/products', (req, res) => {
    // search term is required
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

// Error page for missing help files
app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'That help file was not found.',
        title: '404',
        name: 'Chris'
    })
})

// Error page (404 page)
// match everything not listed above
app.get('*', (req, res) => {
    res.render('404', {
        message: 'That page was not found.',
        title: '404',
        name: 'Chris'
    })
})

// start the server
app.listen(3000, () => {
    console.log('Web server up and running on port 3000.')
})

//console.log(path.join(__dirname, '../public'))

// root folder
// this won't run with the 'use' command in use above
// app.get('', (req, res) => {
//     // How do we respond to a request for the root folder?
//     // HTML example
//     res.send('<h1>Hello express!</h1>')
// })

// some subfolders
// app.get('/help', (req, res) => {
//     // example of sending JSON
//     res.send([{
//         name: 'Chris',
//         age: 41
//     },
//     {
//         name: 'Clementine'
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>The about page</h1>')
// })