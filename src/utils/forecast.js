const request = require('postman-request')

// destructuring response parameter object
const forecast = ({longitude, latitude, location: geocodeLocation} = coordinates, callback) => {

    const weather_access_key = '9753c32e6eaa33f7142c6d93eae9319b'
    const weatherCoordinates = `${latitude},${longitude}`

    const weatherUrl = `http://api.weatherstack.com/current?access_key=${weather_access_key}&query=${weatherCoordinates}`

    request({url: weatherUrl, json: true}, (err, {body} = res) => {
        
        if(err){
            callback('Unable to connect to weather service', undefined)
        }
        else if(body.error){
            callback(`Error -> ${body.error.info}`, undefined)
        }
        else{

            // Variable declaration from the response object
            const {temperature, feelslike: feelsLike, weather_descriptions: weatherDescription} = body.current

            callback(undefined, `${weatherDescription[0]}. It's currently ${temperature}C˚ degrees out. It feels like ${feelsLike}C˚ out in ${geocodeLocation}.`)
        }
    })
}

module.exports = forecast