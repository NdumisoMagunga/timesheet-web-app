const router = require('express').Router();
const async = require('async');
const Venue = require('../models/Venue');
const User = require('../models/User');


router.post('/venue', (req,res,next)=>{

    console.log('venue', req.body)
   let newVenue = new Venue({
       address: req.body.address,
    //    location: [req.body.longitude,req.body.latitude],
       altitude: req.body.altitude,
       name: (req.body.name).toUpperCase(),
   })

   newVenue.save((err)=>{
       if (err) return next(err);
       res.json({message:"New Venue Created"});
   })

});

router.put('/remove-user/:venue', (req,res,next)=>{

    Venue.findById(req.params.venue, (err, venue)=>{
        if (err) return next(err);
        venue.assignedPeople = venue.assignedPeople.splice(venue.assignedPeople.indexOf(req.body.user)-1,venue.assignedPeople.indexOf(req.body.user) );
        venue.save((err)=>{
            if (err) return next(err);
            User.findById(req.body.user, (err, user)=>{
                if (err) return next(err);
                user.venues = user.venues.splice(user.venues.indexOf(req.params.venue)-1,user.venues.indexOf(req.params.venue));

                user.save(err =>{
                    if (err) return next(err);
                   return res.status(200).json({"message":"user successfully removed from venue"})
                })
            });
           

        })
    })
})

router.put('/assign-user', (req,res,next)=>{
    async.waterfall([
        (callback)=>{
            Venue.findOne({_id:req.body.venue}, (err, venue)=>{
                if (err) return next(err);

                if (!venue){
                     return  res.status(204).json({"message":"Venue does not exist"})
                }

                callback(null, venue);
            })
        },
        (venue, callback)=>{
            User.findById(req.body.user, (err, user)=>{
                if (err) return next(err);

                if (!user){
                    return res.status(204).json({message:"user does not exist"})
                }

                venue.assignedPeople.push(req.body.user)
                venue.save((err , savedVenue)=>{
                    if (err) return next(err);
                    user.venues.push(savedVenue._id);
                    user.save(err=>{
                        if (err) return next(err);
                    })
                    res.json({message:user.firstname +' '+user.lastname +' has been assgined to '+ venue.name})
                    
                })
            })
        }
    ])
})


router.delete('/remove-venue/:id', (req,res,next)=>{
  Venue.findByIdAndRemove(req.params.id, (err)=>{
      if(err){return next(err)}
      res.json({response: "venue deleted"})
  })
});

router.put('/update-venue/:id', (req,res,next)=>{
  Venue.findById(req.params.id).exec((err, venue)=>{
      if(err){return next(err)}

      venue.address = req.body.address,
     // venue.location = [parseFloat(req.body.longitude), parseFloat(req.body.latitude)],
      venue.altitude = req.body.altitude,
      venue.name = req.body.name;

      venue.save((err, venue)=>{
        if (err) return next(err);
        res.json({response: "venue updated"})
      })
   
  })
});


router.get('/venue',(req,res,next)=>{
   Venue.find({})
   .populate('assignedPeople')
   .exec((err, venues)=>{
       if(err)return next(err);
       res.json(venues)
   })
});


router.get('/venue/:id', (req,res,next)=>{
  Venue.findById(req.params.id, (err, venue)=>{
      if(err){return next(err)}
      res.json(venue)
  })
});

module.exports = router;

