const express = require('express')
const router = express.Router()
const testcontrol = require('../controllers/test-controller');

router.get("/twilio-wa", (req,res)=>{
  testcontrol.sendmessagewithtwilio(req, res); 
    })     

router.get("/twilio-sms", (req,res)=>{
  testcontrol.sendsmswithtwilio(req, res); 
    })     

router.get("/mbird", (req,res)=>{
  testcontrol.sendmessagewithmsgbird(req, res); 
})

router.get("/readcsv", (req,res)=>{
  testcontrol.readcsvtoboj(req, res); 
  });

router.get("/writecsv", (req,res)=>{
  testcontrol.writecsvtoboj(req, res); 
 
})


router.get("/appendoncsv", (req,res)=>{
  testcontrol.appendoncsv(req, res); 
})

module.exports = router











