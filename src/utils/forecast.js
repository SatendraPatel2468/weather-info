const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d9df7592d2e69cb022338350ac5e4371&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the service', undefined)
        } else if (body.error) {
            callback('Unable to find Location', undefined)
        } else {
            callback(undefined,
                body.current.weather_descriptions[0] + `. The temperature is ` + body.current.temperature + ' today'
            )
        }

    })
}

module.exports = forecast