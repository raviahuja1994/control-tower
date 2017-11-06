const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Intransit = require('../models/intransit');
const Shipment = require('../models/shipment');



// Register
router.post('/register', function(req, res, next) {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

User.addUser(newUser, function(err, user) {
    if(err){
        res.json({success: false, msg:'Failed to register user'});
    } else {
        res.json({success: true, msg:'User registered'});
}
});
});

// Authenticate
router.post('/authenticate', function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (!user) {
            return res.json({success: false, msg: 'User not found'});
        }
        User.comparePassword(password, user.password, function (err, isMatch) {
            if (err) {
                console.log(err);
            }
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800  //1 week
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: "Wrong Password"});
            }
        });
    });

});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), function(req, res, next) {
    res.json({user: req.user})
});


// Add Intransit update
router.post('/addintransit', passport.authenticate('jwt', {session:false}), function(req, res, next) {
    var shipments = req.body.intransit;
    for(var i = 0; i < shipments.length; i++) {
        var shipment = shipments[i];

        let newIntransit = new Intransit({
            shipmentid: shipment.shipmentid,
            lat: shipment.lat,
            lng: shipment.lng,
            eventdate: shipment.eventdate,
            insertdate: shipment.insertdate
        });

        Intransit.addIntransit(newIntransit, function (err, user) {
            if (err) {
                res.json({success: false, msg: 'Failed to add intransit'});
            } else {
                res.json({success: true, msg: 'Intransit added'});
            }
        });
    }
});
var xmlparser = require('express-xml-bodyparser');

router.use(xmlparser());

// Add Shipment update
router.post('/addshipment', function(req, res, next) {

    var shipments = req.body.shipments;
    console.log(shipments);
    console.log(shipments.shipment);
    console.log(shipments.shipment.length);
    for(var i = 0; i < shipments.shipment.length; i++) {
        var shipment = shipments.shipment[i];
        let newIntransit = new Shipment({
            shipmentid: shipment.shipmentid,
            domain: shipment.domain,
            carrier: shipment.carrier,
            sourceid: shipment.sourceid,
            sourcecity: shipment.sourcecity,
            destid: shipment.destid,
            destcity: shipment.destcity,
            vehnum: shipment.vehnum,
            vehtype: shipment.vehtype,
            active: shipment.active,
            shipstatus: shipment.shipstatus,
            startdatetime: shipment.startdatetime,
            enddatetime: shipment.enddatetime,
            totaldist: shipment.totaldist,
            distcompl: shipment.distcompl,
            totalduration: shipment.totalduration,
            tracompl: shipment.tracompl,
            totalweight: shipment.totalweight,
            currweight: shipment.currweight,
            totalvolume: shipment.totalvolume,
            currvolume: shipment.currvolume,
            totalpallets: shipment.totalpallets,
            totallitres: shipment.totallitres,
            tempcontrol: shipment.tempcontrol,
            hazardous: shipment.hazardous,
            accident: shipment.accident,
            repvehnum: shipment.repvehnum,
            drivername: shipment.drivername,
            caputil: shipment.caputil,
            volutil: shipment.volutil,
            currcaputil: shipment.currcaputil,
            currvolutil: shipment.currvolutil,
            status: shipment.status,
            insertdate: shipment.insertdate,
            updatedate: shipment.updatedate
        });

        Shipment.addshipment(newIntransit, function (err, user) {
            if (err) {
                res.json({success: false, msg: 'Failed to add Shipment'});
            } else {
                res.json({success: true, msg: 'Shipment added'});
            }
        });
    }
});
//Get One Instransit
router.post('/getoneintransit', passport.authenticate('jwt', {session:false}), function(req, res, next) {
    const shipmentid = req.body.shipmentid;

    Intransit.getOneIntransitByShipment(shipmentid, function (err, intransit) {
        if (err) {
            console.log(err);
        }
        if (!shipmentid) {
            return res.json({success: false, msg: 'User not found'+shipment});
        }

            res.json({
                success: true,
                //token: 'JWT ' + token,
                intransit: {
                    shipmentid: intransit.shipmentid,
                    lat: intransit.lat,
                    lgn: intransit.lng,
                    eventdate: intransit.eventdate,
                    insertdate: intransit.insertdate
                }
            });
    });

});

//Get Instransit
router.post('/getintransit', function(req, res, next) {
    const shipmentid = req.body.shipmentid;
    Intransit.getIntransitByShipment(shipmentid, function (err, intransit) {
        if (err) {
            console.log(err);
        }
        if (!shipmentid) {
            return res.json({success: false, msg: 'User not found'+shipment});
        }
        res.json({
            success: true,
            intransit: intransit
        });
    });

});

//google track
router.post('/googletrack',function(req,res,next) {
    const shipmentstatus = req.body.trackbystatus;
    Shipment.getgoogletrack(shipmentstatus,function(err,shipment){
       if(err){
           console.log(err);
       }if(!shipmentstatus){
           return res.json({success:false, msg:'Shipment not found'+shipment});
        }

        res.json({
            success:true,
            shipment:shipment
        });
    });
});
module.exports = router;
