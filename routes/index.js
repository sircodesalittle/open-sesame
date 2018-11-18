const express = require('express');
const router = express.Router();
const Garage = require('../classes/garage.js');

const GARAGE_IP = '192.168.1.42'
const GARAGE_INSTANCE = 520401;
const GARAGE_OPENER_BV_INSTANCE = 42

const garage = new Garage(GARAGE_IP, GARAGE_INSTANCE, GARAGE_OPENER_BV_INSTANCE);

router.get('/trigger-door', function(req, res, next) {
  garage.triggerDoor((error, value) => {
    if (value) {
      res.json({'status': 'success'})
    }
    else {
      console.error('Unable to trigger door: ' + error);
      res.json({'status': 'failure'})
    }
  });
});


module.exports = router;
