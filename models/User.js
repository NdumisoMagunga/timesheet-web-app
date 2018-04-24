
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    "firstname":String,
    "lastname":String,
    "email":String,
    "password":String,
    "picture":String,
    "isAdmin":{type:Boolean, default:false}
})

userSchema.pre('save', function(next){
    
        var user = this;
        if (!user.isModified('password')) {
            return next();
        }
        bcrypt.genSalt(10, function(err, salt){
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function(err, hash){
            if (err) {return next(err);}
            user.password = hash;	
            next();
            });
            
        });
    });

    userSchema.methods.comparePassword = function(password){
        return bcrypt.compareSync(password, this.password);
    }

module.exports =mongoose.model("User",userSchema);