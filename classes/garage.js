const bacnet = require('bacstack');

module.exports = class Garage {

    constructor(ip, deviceInstance, bvInstance) {
      this.ip = ip;
      this.deviceInstance = deviceInstance;
      this.bvInstance = bvInstance;
      this.client = new bacnet();
    }
  
    writeBvPresentValue(value, callback) {
      this.client.writeProperty(this.ip, {type: 5, instance: this.bvInstance}, 85, [
        {type: bacnet.enum.ApplicationTags.BACNET_APPLICATION_TAG_ENUMERATED, value: value}
      ], {priority: 16}, callback);
    }
  
    startTriggerDoor(callback) {
      this.writeBvPresentValue(0, callback);
    }
  
    async triggerDoor(callback) {
      this.startTriggerDoor(callback);
    }
  
}