const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and location
app.set('view engine', 'hbs')  
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup common variables used in rendered objects
const name = 'Julio Fasolato'


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        message: "Use this site to get your weather!",
        name
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        message: "To use this app, simply write a location in the input box and click search to know the current weather of that place!",
        name
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: "Error - Provided address is not valid"
        })
    }

    // It was not necessary to destructure the object within the parameters, but did it anyways
    geocode(address, (error, data = {}) => {
        if(error){
            return res.send({error})
        }
        else{
            forecast(data, (error, data) => {
                if(error){
                    return res.send({error})
                }
                else{
                    return res.send({
                        data,
                        address
                    })
                }
            })
        }
    })
})

app.get('/products', (req, res) => {
    
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error_page', {
        title: '404',
        message: "The requested article doesn't exists",
        name
    })
})

app.get('*', (req, res) => {
    res.render('error_page', {
        title: '404',
        message: 'Page requested not found',
        name
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}` )
})