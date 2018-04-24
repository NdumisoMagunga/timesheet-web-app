const router = require('express').Router();
const Timesheet = require('../models/Timesheet');

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


router.post('/time-out', (req,res,next)=>{
    Timesheet.find({user:req.user,
                    date:req.date,
                    venue:req.venue}, (err, sheet)=>{
                        if (err) return next(err);

                        res.json({message:'You Have been Checked-out'})
                    })

});


module.exports= router;
