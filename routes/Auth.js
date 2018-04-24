const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');
const passportConf = require('../configs/passport');

router.post('/user/signup',(req,res,next)=>{
    var user = new User({
        email: (req.body.email).toLowerCase(),
        password: req.body.password,
        firstname: (req.body.firstname).toUpperCase(),
        lastname: (req.body.lastname).toUpperCase(),
        
    });

    User.findOne({ email: req.body.email }, function(err, existingUser) {
            if (err) { 
                return next(err);
             }else{
                 if(existingUser){
                res.send({ errors: 'Account with that email address already exists' });
                 }
                 user.save(function(err){
                     if(err){return next(err);}
                     res.json({response: "User profile added", user: user});
                 });
             }  
        });

})


router.post('/user/login', function(req,res,next){
    passport.authenticate('local-login',function(err,user,info){
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/');
        }else{

           // return res.json(user);
           req.logIn(user,(err)=>{
               if (err) return next(err);
               console.log('user to log in',req.user )
               res.redirect('/');
           })
           
        }
        
    })(req, res, next);
});

router.get('/logout',function(req,res,next){
req.logout();
res.redirect('/');
})





router.get('/get-current-user', (req,res,next)=>{
    console.log(req.user);
    if(req.user){
        
        return res.json({"user":req.user});
    }else{
        res.json({"user":false})
    }
    
})

module.exports = router;