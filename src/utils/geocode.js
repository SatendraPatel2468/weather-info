const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2F0ZW5kcmFwYXRlbCIsImEiOiJja2poM2JyNW8weHZmMzdudmcxa2t3ZHJnIn0.hHTb0m9bSncbOHpZ1Hf-Kg&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unanle to connect to the location', undefined)
        } else if (body.features.lenght === 0) {
            callback('Unable to find location .Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })

}

module.exports = geocode