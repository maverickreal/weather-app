const path = require('path'),
    express = require('express'),
    hbs = require('hbs'),
    geocode = require('./utils/geocode'),
    forecast = require('./utils/forecast');

const app = express();
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public'),
    viewsPath = path.join(__dirname, '../templates/views'),
    partialsPath = path.join(__dirname, '../templates/partials'),
    port = process.env.PORT || 3000;
// Setup handlebars engine and views location
app.set('view engine', 'hbs'),
    app.set('views', viewsPath),
    hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/help', (req, res) => {
    res.render('help');
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.status(404).send({
            error: 'You must provide an address!'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.status(409).send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.status(409).send({ error });
            }

            res.status(200).send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('*', (req, res) => {
    res.render('404');
});

app.listen(port);