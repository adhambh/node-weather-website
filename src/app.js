const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs',) //this to hbs and configure it , the secons part is telling the handle bar where are our partials
const app = express()

const port = process.env.PORT || 3000

// define path for express config:

const publicDirectory = path.join(__dirname, '../public');
const viewspah = path.join(__dirname, '../templates/views');
const partialspath = path.join(__dirname, '../templates/partials')
//********** */ how to set a different views path instead of current default views:
// first set a path const viewspath = path.join(__dirname, '../name of the new views)
// then you have to set the views path by: app.set('views', viewspath)************



// setup handlebars engine and view location:

app.set('view engine', 'hbs');
app.set('views', viewspah);
hbs.registerPartials(partialspath)


//setup static directory to server:

app.use(express.static(publicDirectory)) //express.static is a function we calling it and pass its valueto app.use
//  
app.get('', (req, res) => {
    res.render('index', {
        title: 'andrew Mead',
        name: 'weather app'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'andrew mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        message: 'how can i help you'
    })
})







app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: ' address must be provided'
        })

        
    }

    geocode(req.query.address, (error,{longitude,latitude,location} = {}) => {

        
        if (error) {
            return res.send({error})
        }

    forecast(longitude,latitude,(error,foredata)=> {


            if (error) {
                return res.send({error})
            }
            
            res.send({
            
                forcastData: foredata,
                location,
                address: req.query.address  
            })
           
        })
  
    })
})





    //  this sets the error after the page
    app.get('/help/*', (req, res) => {
        res.render('404', {
            message: 'help article not found'
        })
    })

    // setting up 400 page need to come last main  page

    app.get('*', (req, res) => {
        res.render('404', {
            message: ' Page not found'
        })
    })

    // the get methos takes two arguments (one is the home url and the second is a function that describe what to do when sb visit the route (in this case '' local host but it also can be www.laremontpharmacy.com.au)
    // the function contains two arguments req which is an object information about the incoming request coming to server and second response conatins a punch of methos allow us to customise what we are going to send back 
    // to the requester
    // res.send we could read data from database or create html
    // console.log(__dirname) provides the path for the folder name in this case c/...src
    // console.log(__filename) provided the path for the file name c/.../scr/app.js- it uses two aurgumentsone id the --dirname and the second isthe file u wnt to join such as .. goes up to folder and same for file
    // console.log(path.join(__dirname, './public'))
    //  best use to get paths path.join core module
    // app.get('',(req, res)=>{
    // res.send('<h1>Hello world</h1>') because the path is set to html.index for the main page this console lof will not work and therefore needed to be commented out

    // })

    // app.get('/help', (rew, res)=>{
    // res.send({
    // name: 'Andrew',
    // age: 27

    // })
    // })

    // app.get('/about', (req, res)=>{
    // res.send(' <h1>All about weather</h1>')
    // })


    //  this method start up the server and liten on the port

    app.listen(port, () => {
        console.log('server is running on port'+ port)
    })