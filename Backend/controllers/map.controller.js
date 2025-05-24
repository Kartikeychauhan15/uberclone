const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res, next) => {
       const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });}

    const { address } = req.query;
    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        const coordinates = await mapService.getAddressCoordinates(address);
        return res.status(200).json(coordinates);
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return res.status(500).json({ error: 'Error fetching coordinates' });
    }
}

module.exports.getDistanceTime = async (req, res, next) => {

    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { origin, destination } = req.query;
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json({
           distanceTime
        });

    }catch(err){
        console.error('Error fetching distance and time:', error);
        return res.status(500).json({ error: 'Error fetching distance and time' });
    }
}

module.exports.getAutoCompleteSuggestions = async (req, res,next) => {

    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { input } = req.query;
        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json({
            suggestions
        });

    }catch(err){
        console.error('Error fetching autocomplete suggestions:', err);
        return res.status(500).json({ error: 'Error fetching autocomplete suggestions' });
    }
}