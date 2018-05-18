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
                 user.save(function(err, savedUser){
                     if(err){return next(err);}
                     req.login(savedUser, (err)=>{
                         if (err) return next(err);

                         res.redirect('/')
                     })
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

          
           req.logIn(user,(err)=>{
               if (err) return next(err);
              
               res.redirect('/');
           })
           
        }
        
    })(req, res, next);
});

router.get('/user/logout',function(req,res,next){
req.logout();
res.redirect('/');
})

router.get('/get-current-user', (req,res,next)=>{
  
    if(req.user){
        
        return res.json({"user":req.user});
    }else{
        res.json({"user":false})
    }
    
})

router.get('/users', (req,res,next)=>{
    User.find({})
    .populate('venues')
    .exec((err, users)=>{
        if (err) return next(err);
        res.json(users)
    })
})

router.post('/edit-profile', function(req, res, next){
    User.findById(req.params.id).exec((err, user)=>{
        
        if(req.body.firstname)
            user.firstname = req.body.firstname;

        if(req.body.lastname)
            user.lastname = req.body.lastname;

        if(req.body.email)
            user.email = req.body.email;

        user.save(function(err){
            if(err) return next(err);

            req.json('success', 'Successfully edited your profile');
            return res.redirect('/profile');

        });
    });
});

module.exports = router;