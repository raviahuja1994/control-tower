/**
 * Created by Vivek Reddy on 05-Jul-17.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const IntransitSchema = mongoose.Schema({
    shipmentid: {
        type: String
    },
    powerunit: {
        type: String
    },
    lat: {
        type: String,
        required: true
    },
    lng: {
        type: String,
        required: true
    },
    eventdate: {
        type: String,
        required: true
    },
    insertdate: {
        type: String,
        required: true
    }
});

const Intransit = module.exports = mongoose.model('Intransit', IntransitSchema);


module.exports.addIntransit = function(newInTransit, callback){
             newInTransit.save(callback)
}

module.exports.getOneIntransitByShipment = function(shipmentid, callback){
    var query = {shipmentid:shipmentid}
    Intransit.findOne(query, callback);
}

module.exports.getIntransitByShipment = function(shipmentid, callback) {
    // var query = {shipment: shipment}
    Intransit.find({shipmentid:shipmentid},[],{sort:{_id: 1}}, callback);
}

module.exports.getTrackByShipmentId = function(shipmentid, callback){

     Intransit.find({shipmentid:shipmentid},[],{sort:{eventdate: -1}}, callback).limit(1);
    // Intransit.aggregate(
    //     [
    //         { $sort: { shipmentid: 1, eventdate: 1 } },
    //         {
    //             $group:
    //                 {
    //                     _id: "$shipmentid",
    //                     lastDate: { $last: "$eventdate" }
    //                 }
    //         }
    //     ], callback
    // );
    }

module.exports.getTrackByShipmentIdandStatus = function(shipmentid, status, callback){
    shipment.find({$or:[{shipmentid: shipmentid,status:staus}]}),[],{sort:{eventdate:-1}},callback.limit(1);
}
