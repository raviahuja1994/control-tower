/**
 * Created by Vivek Reddy on 10-Jul-17.
 */

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Intransit = require('../models/intransit');
const Shipment = require('../models/shipment');


// Enroute Shipments
router.post('/getshipments', function(req, res, next) {
    const status = req.body.status;
    Shipment.getShipmentsByStatus(status, function (err, shipment) {
        if (err) {
            console.log(err);
        }
        if (!shipment) {
            return res.json({success: false, msg: 'Shipments not found for status:'+status});
        }
        res.json({
            success: true,
            shipments:shipment
        });
    });

});


//Track
router.post('/track', function(req, res, next) {
    const shipmentid = req.body.shipmentid;
    Intransit.getTrackByShipmentId(shipmentid, function (err, intransit) {
        if (err) {
            console.log(err);
        }
        if (!shipmentid) {
            return res.json({success: false, msg: 'User not found'+shipmentid});
        }
        res.json({
            success: true,
            intransit: intransit
        });
    });

});


module.exports = router;