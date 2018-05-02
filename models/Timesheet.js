const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');


const TimeSheetSchema = new Schema({
    "user":{type:Schema.Types.ObjectId, ref:'User'},
    "timeIn":String,
    "timeOut":String,
    "comment":String,
    "inReview":{type:Boolean, default:false},
    "isActive":{type:Boolean, default:true},
    "date":{type: String ,default: moment().format('L') },
    "venue":{type:Schema.Types.ObjectId, ref:'Venue'}
});

module.exports = mongoose.model('Timesheet', TimeSheetSchema)