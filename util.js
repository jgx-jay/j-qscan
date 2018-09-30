const shelljs = require('shelljs');

const getDevices = () =>
  shelljs
    .exec('adb devices -l', {
      silent: true
    })
    .stdout.split('\n')
    .slice(1)
    .filter(item => !!item)
    .map(line => {
      let [serial, type, usb, product, model, device, transport_id] = line
          .split(' ')
          .filter(item => !!item)
          .map(
            (item, index) =>
              index && item.indexOf(':') > -1 ? item.split(':') : item
          ),
        obj = {
          serial,
          type,
          usb,
          product,
          model,
          device,
          transport_id
        };
      Object.keys(obj).forEach(key => {
        if (Array.isArray(obj[key])) {
          obj[key] = obj[key][1];
        }
        obj.name = `${obj.model} (${obj.serial}) [ ${
          obj.type
        } ] < ${obj.transport_id || -1} >`;
      });
      return obj;
    });

const APPIUM_CLI = shelljs
  .exec('which appium', {
    silent: true
  })
  .stdout.replace('\n', '');

module.exports = {
  getDevices,
  APPIUM_CLI
};
