const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ae483ff9f2a07fa9ee097959b9613b47&query=' + latitude + ',' + longitude;

    //fetch & pass
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, 'It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.\nAlso wind speed is ' + body.current.wind_speed);
        }
    });
}

module.exports = forecast