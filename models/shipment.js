/**
 * Created by Vivek Reddy on 10-Jul-17.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const ShipmentSchema = mongoose.Schema({
    shipmentid: {
        type: String
    },
    domain: {
        type: String
    },
    carrier: {
        type: String
    },
    sourceid: {
        type: String
    },
    sourcecity: {
        type: String
    },
    destid: {
        type: String
    },
    destcity: {
        type: String
    },
    vehnum: {
        type: String
    },
    vehtype: {
        type: String
    },
    active: {
        type: String
    },
    shipstatus: {
        type: String
    },
    startdatetime: {
        type: String
    },
    enddatetime: {
        type: String
    },
    totaldist: {
        type: String
    },
    distcompl: {
        type: String
    },
    totalduration: {
        type: String
    },
    tracompl: {
        type: String
    },
    totalweight: {
        type: String
    },
    currweight: {
        type: String
    },
    totalvolume: {
        type: String
    },
    currvolume: {
        type: String
    },
    totalpallets: {
        type: String
    },
    totalitres: {
        type: String
    },
    tempcontrol: {
        type: String
    },
    hazardous: {
        type: String
    },
    accident: {
        type: String
    },
    repvehnum: {
        type: String
    },
    drivername: {
        type: String
    },
    caputil: {
        type: String
    },
    volutil: {
        type: String
    },
    currcaputil: {
        type: String
    },
    currvolutil: {
        type: String
    },
    status:{
      type: String
    },
    insdate: {
        type: String``
    },
    upddate: {
        type: String
    }
});

const Shipment = module.exports = mongoose.model('Shipment', ShipmentSchema);
module.exports.addshipment = function(newintransit, callback){
    newintransit.save(callback)
}
module.exports.getShipmentsByStatus = function(status, callback){
    if(status) {
        const query = {status: status}
        Shipment.find(query, callback);
    }else{
        Shipment.find(callback);
    }
}
module.exports.getgoogletrack = function(shipmentstatus, callback) {
    // var query = {shipment: shipment}
    Shipment.findOne({status:shipmentstatus},[],{sort:{_id: 1}}, callback);
}
