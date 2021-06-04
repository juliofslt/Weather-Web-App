const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoianVsaW9mc2x0IiwiYSI6ImNrb2l5dGNlNTA0MXkydm8wM3V5dWJmYXkifQ.ZME2ybYIShL8sZuL6-jppA&limit=1`

    request({url: url, json: true}, (err, {body} = res) => {
        if(err){
            callback('Unable to connect to location service', undefined)
        }
        else if(body.features.length === 0){
            callback('No matching results. Please enter a valid location.', undefined)
        }
        else{
            const geocodeData = {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            }

            callback(undefined, geocodeData)
        }
    })
}

module.exports = geocode