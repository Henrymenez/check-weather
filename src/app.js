const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

//Define paths for express config
const publicPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');
//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicPath));


app.get('/', (req,res)=>{
    res.render('index',{
        title: "Weather Forecast",
        name: "Henry Menez"
    });

});

app.get('/about', (req,res)=>{
    res.render('about',{
        title: "About Me",
        name: "Henry Menez"
    });

});

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        message: 'This is the help page',
        name: "Menez"
    });
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
        const address = req.query.address;
        geoCode(address,(error,{ laditude, longitude, location} = {})=>{
            if(error){
            return res.send({ error })
            } 

            forecast(laditude,longitude, (error, forecastData)=>{
                if(error){
                    return res.send({error});
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: address
                })
            })

        })

});

app.get('/help/*',(req,res)=>{
      res.render('404',{
        title: '404 Page',
        message: '404 - Help Page not found ',
        name: 'Menez'

    });
})
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404 Page',
        message: '404 - Page not found',
        name: 'Menez'

    });
});


app.listen(3000, ()=>{
    console.log('Server is up on port 3000.');
})