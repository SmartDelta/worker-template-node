const path = require('path'),
  fs = require('fs');

const Worker = require('./');
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));

var worker = new Worker(config);

setInterval(async () => {
  const preview = await fs.promises.readFile(path.join(__dirname, 'preview.png'));
  worker.sendPreview(preview);
}, 5000);

setInterval(async () => {
  const telemetry = {
    id: worker.id,
    system_status: Math.floor(Math.random() * (3)),
    message: "Started",
    telemetry: [
      {
        name: "CPU Usage",
        value: process.cpuUsage().system,
      },
      {
        name: 'Disk bandwidth',
        value: 1
      },
      {
        name: 'Disk fps',
        value: 14
      }
    ],
  }

  worker.sendTelemetry(telemetry);
})
