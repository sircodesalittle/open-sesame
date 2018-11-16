const bacnet = require('bacstack');
const express = require('express');
const router = express.Router();

const client = new bacnet();

const GARAGE_IP = '172.31.218.40'
const GARAGE_INSTANCE = 520401;
const GARAGE_OPENER_BV_INSTANCE = 42

function sleep(ms){
  return new Promise(resolve=>{
      setTimeout(resolve,ms)
  })
}

class Garage {

  constructor(ip, deviceInstance, bvInstance) {
    this.ip = ip;
    this.deviceInstance = deviceInstance;
    this.bvInstance = bvInstance;
    this.client = new bacnet();
  }

  writeBvPresentValue(value) {
    this.client.writeProperty(this.ip, {type: 5, instance: this.bvInstance}, 85, [
      {type: bacnet.enum.ApplicationTags.BACNET_APPLICATION_TAG_ENUMERATED, value: value}
    ], (err, value) => {
      console.log('value: ', value);
    });
  }

  startTriggerDoor() {
    this.writeBvPresentValue(0);
  }

  stopTriggerDoor() {
    this.writeBvPresentValue(1);
  }

  async triggerDoor() {
    this.startTriggerDoor();
    await sleep(2000);
    this.stopTriggerDoor();
  }

}


const garage = new Garage(GARAGE_IP, GARAGE_INSTANCE, GARAGE_OPENER_BV_INSTANCE);

router.get('/trigger-door', function(req, res, next) {
  garage.triggerDoor();
  res.json({'status': 'success'}) // TODO what do we want to return? - prolly want to make the triggerDoor return a promise
});


module.exports = router;
