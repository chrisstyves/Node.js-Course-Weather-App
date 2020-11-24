const postman = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = "http://api.weatherstack.com/current" + 
        "?access_key=" + "a9a7362d3bbe83185102144391fce631" + 
        "&query=" + latitude + "," + longitude +
        "&units=f"

    postman({ url, json: true }, (error, { body }) => {
        // not necessary when 'json' option used above. it does the parse for us.
        //const data = JSON.parse(response.body)
    
        if (error) {
            callback("Something went wrong with server request!", undefined)
        } else if (body.error) {
            callback("Server responded, but something went wrong with the query!", undefined)
        }
        else {
            callback(undefined, 'It is ' + body.current.weather_descriptions[0] + '.' + 
                ' It is ' + body.current.temperature + ' degrees F.' + 
                ' It feels like ' + body.current.feelslike + ' degrees F.' + 
                ' Humidity is ' + body.current.humidity + ' percent.')
        }
    })
}

module.exports = forecast