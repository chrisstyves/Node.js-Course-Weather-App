const postman = require('postman-request')

// Geocoding (lat/lon <-> location)
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + 
    encodeURIComponent(address) + ".json" + 
     "?access_token=" + "pk.eyJ1IjoiY3N0eXZlcyIsImEiOiJja2hkdWYyNWcwNjNwMnlvOHFucW84eTJ0In0.rNjVuPh4mGXAMLa9nTDXnA" + 
     "&limit=" + "1"

     postman({ url, json: true}, (error, { body }) => {
         if (error) {
            callback('Unable to connect to location service.', undefined)
         } else if (body.features.length === 0) {
            callback('No results found for that query.', undefined)
         } else {
             callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
             })
         }
     })
}

module.exports = geocode