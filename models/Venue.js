const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const venueSchema = new Schema({
    "address":String,
    "location":[Number],
    "altitude":{type:Number, default:0},
    "name":{type:String, unique:true},
    "assignedPeople":[{type:Schema.Types.ObjectId, ref:"User"}]

})

module.exports = mongoose.model('Venue', venueSchema);