const path = require('path');
const fs = require('fs');

const { CONFIG } = process.env;

let file = path.join(__dirname, './config.json');

if (CONFIG) {
  if (path.isAbsolute(CONFIG)) {
    file = CONFIG;
  } else {
    file = path.join(process.cwd(), CONFIG);
  }
}

const data = fs.readFileSync(file);

let config = {};

try {
  config = JSON.parse(data);
} catch (e) {
  throw new Error(e);
}

module.exports = config[process.env.NODE_ENV];
