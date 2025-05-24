const express = require('express');
const router = express.Router();
const {body,query} = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post("/create",authMiddleware.authUser,
    body("pickup").isString().isLength({min:3}).withMessage("pickup is required"),
    body("destination").isString().isLength({min:3}).withMessage("destination is required"),
    body("vehicleType").isString().isIn(["auto","car","moto"]).withMessage("vehicleType is required"),

    rideController.createRide,


)

router.get("/getFare",authMiddleware.authUser,
    query("pickup").isString().isLength({min:3}).withMessage("pickup is required"),
    query("destination").isString().isLength({min:3}).withMessage("destination is required"),
    rideController.getFare
);

router.post("/confirm",authMiddleware.authUser,
    body("rideId").isString().isLength({min:3}).withMessage("rideId is required"),
    rideController.confirmRide
);

router.get("/start-ride",
    authMiddleware.authCaptain,
    query("rideId").isMongoId().withMessage("Invalid ride Id"),
     query("otp").isString().isLength({min:6, max:6}).withMessage("Invalid otp"),
    rideController.startRide
)

router.post("/end-ride",authMiddleware.authCaptain,
    body("rideId").isMongoId().withMessage("Invalid rider Id"),
    rideController.endRide
)

module.exports = router;