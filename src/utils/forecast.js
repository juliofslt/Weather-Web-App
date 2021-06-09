const request = require('postman-request')
const keys = require('../keys/keys.js')

// destructuring response parameter object
const forecast = ({longitude, latitude, location: geocodeLocation} = coordinates, callback) => {

    const weather_access_key = keys.forecast_access_key
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
            const {temperature, feelslike: feelsLike, weather_descriptions: weatherDescription, wind_speed: windSpeed, humidity, uv_index: uvIndex, visibility} = body.current

            const forecastResponse = `<strong>Forecast:</strong> ${weatherDescription[0]}.<br><strong>Temperature:</strong> ${temperature}C˚.<br><strong>Real feel:</strong> ${feelsLike}C˚.<br><strong>Wind speed:</strong> ${windSpeed} Km/h.<br><strong>Humidity:</strong> ${humidity}%.<br><strong>UV Index:</strong> ${uvIndex}.<br><strong>Visibility:</strong> ${visibility} Km.<br><strong>Location:</strong> ${geocodeLocation}.`
            
            callback(undefined, forecastResponse)
        }
    })
}

module.exports = forecast