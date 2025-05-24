const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinates = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
     try{
        const response = await axios.get(url);
        if(response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        }else{
            throw new Error(`Error fetching coordinates: ${response.data.status}`);
        }
     }catch (error) {
        console.error('Error fetching coordinates:', error);
        throw new Error('Error fetching coordinates');
}}

module.exports.getDistanceTime = async (origin, destination) => {
    if(!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try{
        const response = await axios.get(url);
        if(response.data.status === 'OK') {
            
            if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No results found for the given origin and destination');
            }

            return response.data.rows[0].elements[0];
            // if(element.status === 'OK') {
            //     return {
            //         distance: element.distance.text,
            //         duration: element.duration.text
            //     };
            // } else {
            //     throw new Error(`Error fetching distance and time: ${element.status}`);
            // }
        } else {
            throw new Error(`Error fetching distance and time: ${response.data.status}`);
        }
    }catch (error) {
        console.error('Error fetching distance and time:', error);  
}}

module.exports.getAutoCompleteSuggestions = async (input) => {
    if(!input) {
        throw new Error('query is required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try{
        const response = await axios.get(url);
        if(response.data.status === 'OK') {
            return response.data.predictions.map(prediction => ({
                description: prediction.description,
                placeId: prediction.place_id
            }));
        } else {
            throw new Error(`Error fetching suggestions: ${response.data.status}`);
        }

    }catch (error) {
        console.error('Error fetching suggestions:', error);
        throw new Error('Error fetching suggestions');
    }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
    //radius in km
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371] // radius in km
            }
        }
    }); 
    return captains;
}