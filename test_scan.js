const scan = require('./do_scan');
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

(function() {
  taskQueue.push(scan);
})();

module.exports = function() {
  
}
