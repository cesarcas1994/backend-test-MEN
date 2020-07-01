'use strict'

const rp = require('request-promise');
const access_token_mapbox = 'pk.eyJ1IjoiY2VzYXJjYXMiLCJhIjoiY2tjMjhybHZ3MDh3ZDJxbzF3bmtkZ3g3dCJ9._8cfcIvuu_KaN8qqvhq5dw';

async function connect_mapbox(adress_to_mapbox) {

    try {

        var options = {
            method: 'GET',
            uri: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + adress_to_mapbox + '.json?access_token=' + access_token_mapbox,                 
            json: true // Automatically stringifies the body to JSON
        };

        let response = await rp(options);

        if (response.hasOwnProperty('errcode') && body.errcode != 0) {
            return Promise.reject(response);
        }

        return Promise.resolve(response);

    }catch(error) {
        return Promise.reject(error);
    }
}

module.exports = { connect_mapbox };