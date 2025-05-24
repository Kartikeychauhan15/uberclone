const rideService = require('../services/ride.service');

const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const {sendMessageToSocketId} = require('../socket');
const rideModel = require('../models/ride.model');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination } = req.body;

    if (!userId || !pickup || !destination) {
        return res.status(400).json({ error: 'userId, pickup and destination are required' });
    }

    try {
        const ride = await rideService.createRide({user: req.user._id, pickup, destination,vehicleType});
         res.status(201).json(ride);

        const pickupCoordinates = await mapService.getAddressCoordinates(pickup);
        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng,2); // Assuming 5 km radius

        ride.otp = ""

        const rideWithUser = await rideModel.findOne({_id : ride._id}).populate("user");

        captainsInRadius.map(captain =>{
            sendMessageToSocketId(captain.socketId, {
                event: "new-ride",
                data: rideWithUser
            });
        })
        // console.log('Captains in the radius:', captainsInRadius);
    } catch (error) {
        console.error('Error creating ride:', error);
        return res.status(500).json({ error: 'Error creating ride' });
    }
}   

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    if (!pickup || !destination) {
        return res.status(400).json({ error: 'pickup and destination are required' });
    }

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (error) {
        console.error('Error getting fare:', error);
        return res.status(500).json({ error: 'Error getting fare' });
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    if (!rideId) {
        return res.status(400).json({ error: 'rideId is required' });
    }

    try {
        const ride = await rideService.confirmRide({rideId, captain: req.captain._id});
        sendMessageToSocketId(ride.user.socketId, {
            event: "ride-confirmed",
            data: ride
        });
        return res.status(200).json(ride);
    } catch (error) {
        console.error('Error confirming ride:', error);
        return res.status(500).json({ error: 'Error confirming ride' });
    }
}

module.exports.startRide = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {rideId, otp} = req.query;

    try{
        const ride = await rideService.startRide({rideId, otp, captain: req.captain})

        sendMessageToSocketId(ride.user.socketId,{
            event: "ride-started",
            data: ride
        })
        return res.status(200).json(ride);
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

module.exports.endRide = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.send(400).json({errors: errors.array()});
    }

    const {rideId} = req.body;

    try{
        const ride = await rideService.endRide({rideId, captain: req.captain})

        sendMessageToSocketId(ride.user.socketId,{
            event: "ride-ended",
            data:ride
        })

        
        return res.send(200).json(ride);
    }catch(err){
        return res.send(500).json({message: err.message})
    }
}