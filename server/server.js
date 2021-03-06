const express = require('express');
const fetch = require('node-fetch');
var cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());


// API keys hidden in config
const keys = require('./config');


const googleMapsClient = require('@google/maps').createClient({
  key: keys.googleMaps
});
const util = require('@google/maps').util;

const token = util.placesAutoCompleteSessionToken();


app.get('/autocomplete/:id', (req, res) => {


  googleMapsClient.placesAutoComplete(
    {
      input: req.params.id,
      language: 'en',
      sessiontoken: token
    },
    (_, result) => {
      res.send(result.json.predictions);
    }
  );
});

app.get('/place/:id', (req, res) => {
  googleMapsClient.place(
    {
      placeid: req.params.id,
      language: 'en'
    },
    (_, result) => {

      res.send(result.json.result);
    }
  );
});



app.get('/weather/:lat/:long', (req, res) => {
  fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?location=${req.params.lat},${req.params.long}&aggregateHours=24&contentType=json&key=${keys.visualCrossing}`)
    .then(res => res.json())
    .then(json => res.json(json));
});


app.listen(port, () => console.log(`The Weather Server is running on ${port}!`));
