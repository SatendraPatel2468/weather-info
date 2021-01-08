const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 8000;
const ejs = require('ejs')
const geocode = require('./src/utils/geocode')
const forecast = require('./src/utils/forecast')

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, './public')


//Setup EJS engine and views location
app.set('view engine', 'ejs')



//Setup static directory to server
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Satenra'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is help Weather page',
        name: 'satendra'
    })
})


app.get('/help/*', (req, res) => {
    res.render(' help', {
        title: '404',
        name: 'satendra',
        msg: 'Article related help not found'
    })
})





app.get('/about', (req, res) => {
    res.render('about', {
        title: 'This is about weather app',
        name: 'satenra'
    })
})

app.get('', (req, res) => {

})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You should must provide a address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.error({ error })
            }
            res.send({
                forecast: forecastData,
                address: req.query.address,
                location
            })
        })
    })

})


app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search terms'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Satendra Patel',
        msg: 'Page not found...'
    })
})


app.listen(port, () => {
    console.log(`Listening to the port ${port}`)
})