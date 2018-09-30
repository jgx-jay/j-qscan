const Koa = require('koa');
const app = new Koa();
const logger = require('./logger');
const PORT = 4612;
const APPIUM_PORT = 4723;
const applescript = require('applescript');

// const scan = require('./do_scan');
const shelljs = require('shelljs');
const { APPIUM_CLI, getDevices } = require('./util');

const doAppleScript = function(script, cb) {
  applescript.execString(script, function(err, rtn) {
    if (err) {
      throw err;
    }

    if (cb) {
      cb();
    }
  });
};

const clearTerminal = function() {
  const closeTerminalScript = `tell application "System Events"
      if exists (application process "Terminal") then
        tell application "Terminal" to activate 
        key code 53 using {command down, option down}
        delay 0.5
        key code 76
        delay 0.5
        key code 76
      end if
    end tell`;

  doAppleScript(closeTerminalScript);
};

const killProcess = pids => {
  if (pids.length) {
    shelljs.exec(pids.map(pid => `kill -9 ${pid}`).join(' && '), {
      silent: true
    });
  }
};

const clearAllAppiumProcess = function() {
  const pids = shelljs
    .exec(`ps -A | awk '/appium/{print $1 " " $4}'`, {
      silent: true
    })
    .stdout.split('\n')
    .filter(t => {
      const l = t.trim().split(' ');
      if (l[1] === 'node') return l[0];
    });

  killProcess(pids);
};

const closeAppiumWithPort = port => {
  const pids = shelljs
    .exec(`ps -A | awk '/appium/{print $1 " " $7}'`, {
      silent: true
    })
    .stdout.split('\n')
    .filter(t => {
      const l = t.trim().split(' ');
      if (l[1] === port + '') return l[0];
    });

  killProcess(pids);
};

const startAppium = (port, uuid) => {
  closeAppiumWithPort(port);

  const script = `tell application "Terminal"
      activate
      do script ("${APPIUM_CLI} -p ${port} -U ${uuid}")
    end tell`;

  doAppleScript(script);
};
app.use(function() {
  const devices = getDevices();

  devices.forEach((device, i) => {
    const port = APPIUM_PORT + i;
    startAppium(port, device.serial);
  });

  // shelljs.exec('node do_scan ' + APPIUM_PORT + ' ' + device.serial, {
  //   async: true
  // });

  // setTimeout(() => {
  //   clearTerminal();
  // }, 5000);
});

app.listen(PORT, err => {
  if (err) {
    logger.error(err);
  } else {
    logger.info('==> 🐸  Server listening on port %s', PORT);
  }
});
