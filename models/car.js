/**
 * Created by Vivek Reddy on 09-Jul-17.
 */
/**
 * Created by Vivek Reddy on 05-Jul-17.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const Car = mongoose.Schema({
    vin: {
        type: String
    },
    year: {
        type: String
    },
    brand: {
        type: String,
    },
    color: {
        type: String,
    }
});

const Car = module.exports = mongoose.model('Car', CarSchema);


module.exports.getCarsSmall = function(callback) {
    // var query = {shipment: shipment}
    Car.find({},[], callback);
}



