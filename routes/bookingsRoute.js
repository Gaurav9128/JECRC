const express = require('express');
const router = express.Router();

// Assuming you have a Booking model and a Room model
const Booking = require('../models/booking');
const Room = require('../models/room');

// Endpoint to handle room booking
router.post("/bookroom", async (req, res) => {
  const { room, 
    userid, 
    fromdate, 
    todate, 
    totaldays } = req.body

  try {
    
    const newbooking = new Booking({
      room: room.name,
      roomid :room._id,
      userid,
      fromdate,
      todate,
      totaldays,
      transactionId : '1234'
    })
 
       const booking =  await newbooking.save()
   
    
  } catch (error) {
    
  }
});

module.exports = router;
