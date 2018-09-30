const shelljs = require('shelljs');
const logger = require('./logger');
const wd = require('wd');
const { admin_auth } = require('./config');
const qscanCfg = require('./qscan_6.7.2');

const { CONST } = qscanCfg;
const auth_username = 'connorj',
  auth_password = 'connorj.';

const doLogin = function(driver) {
  logger.info('开始登录');
  driver
    .setImplicitWaitTimeout(30000)
    .elementByXPath(CONST.INDEX_LOGIN_BTN.xpath)
    .click()
    .elementByXPath(CONST.USE_USER_AND_PASSWORD.xpath)
    .click()
    .elementByXPath(CONST.USERNAME_INPUT.xpath)
    .sendKeys(auth_username)
    .elementByXPath(CONST.PASSWORD_INPUT.xpath)
    .sendKeys(auth_password)
    .elementByXPath(CONST.DO_LOGIN_BTN.xpath)
    .click()
    .elementByXPath(CONST.AB_YES.xpath)
    .click()
    .then(() => {
      doScan(driver);
    });
};

const checkIndexLogin = function(driver, cb) {
  driver
    .setImplicitWaitTimeout(2000) // 于检查登录时间相关
    .hasElementByXPath(CONST.INDEX_LOGIN_BTN.xpath)
    .then(ret => {
      if (!ret) {
        driver.resetApp().then(() => {
          cb(driver);
        });
      } else {
        cb(driver);
      }
    });
};

const doScan = function(driver) {
  logger.info('开始扫码');
  driver
    .setImplicitWaitTimeout(30000)
    .waitForElementByXPath(CONST.THE_MORE_BTN.xpath)
    .click()
    .elementByXPath(CONST.THE_SCAN_BTN.xpath)
    .click();
};

const checkWxUser = function(driver) {
  logger.info('检查登录账户是否一致');
  driver
    .elementByXPath(CONST.TAB_4.xpath)
    .click()
    .elementByXPath(CONST.WX_USERNAME.xpath)
    .text()
    .then(text => {
      if (text === '微信号：' + auth_username) {
        logger.success('一致! 可扫码');
        doScan(driver);
      } else {
        logger.success('不一致! 重新登录');
        checkIndexLogin(driver, doLogin);
      }
    });
};

const run = function() {
  console.log(process.argv);
  const wdDriver = wd.promiseChainRemote({
    host: '127.0.0.1',
    port: process.argv[2] || 4723
  });

  const opt = {
    platformName: 'Android',
    deviceName: 'Android',
    appPackage: 'com.tencent.mm',
    appActivity: '.ui.LauncherUI',
    noReset: 'true',
    udid: process.argv[3] || ''
  };

  let driver = wdDriver.init(opt);

  // 检查是否已经登录
  driver
    .setImplicitWaitTimeout(8000) // 于检查登录时间相关
    .hasElementByXPath(CONST.TAB_4.xpath)
    .then(ret => {
      if (ret) {
        logger.info('已登录');
        checkWxUser(driver);
      } else {
        logger.info('未登录');
        checkIndexLogin(driver, doLogin);
      }
    });
};

const queue = require('queue');

const taskQueue = queue({
  concurrency: 3,
  timeout: 2 * 60 * 1000,
  autostart: true
});

taskQueue.on('timeout', (next, job) => {
  logger.warn('任务超时。');
  if (job.stop) {
    job.stop();
  }
  next();
});

run();

