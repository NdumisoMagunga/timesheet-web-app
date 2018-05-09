const router = require('express').Router();
const Timesheet = require('../models/Timesheet');



router.get('/my-timesheet/:user', (req,res,next)=>{
    Timesheet.find({user:req.params.user})
    .populate('venue')
    .exec((err, shifts)=>{
        if (err) return next(err);

        res.json(shifts);
    })
});

router.get('/timesheets', (req,res,next)=>{
    Timesheet.find({}, (err, timesheets)=>{
        if (err) return next(err);
        res.json(timesheets)
    });
})

router.post('/time-in', (req,res,next)=>{
  let shift = new Timesheet({
      user: req.body.user,
      timeIn: req.body.timeIn,
      venue:req.body.venue,
      date:req.body.date
  })

  shift.save(err =>{
      if (err) return next(err);
      res.json({message:'You Have Been Checked-in'});
  })
});


router.post('/time-out',(req,res,next)=>{
    Timesheet.findOne({_id:req.body._id,}, (err, shift)=>{
                        if (err) return next(err);
                        shift.timeOut= req.body.timeOut;
                        shift.isActive = false;

                        shift.save((err)=>{
                            if (err) return next(err);
                            res.json({message:'You Have been Checked-out'})
                        })
                        
                       
                    })

});


module.exports= router;
