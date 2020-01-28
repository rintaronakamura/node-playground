require('dotenv').config();

const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  console.log('Master');

  // Worker を生成する.
  const numCPUs = os.cpus().length; // CPU のコア (スレッド) 数.
  for(let i = 0; i < numCPUs; i++) {
    console.log(`Master : Cluster Fork ${i}`);
    cluster.fork();
  }

  // Worker がクラッシュしたら再生成する.
  cluster.on('exit', (worker, code, signal) => {
    console.warn(`[${worker.id}] Worker died : [PID ${worker.process.pid}] [Signal ${signal}] [Code ${code}]`);
    cluster.fork();
  });
} else {
  console.log(`[${cluster.worker.id}] [PID ${cluster.worker.process.pid}] Worker`);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());


  const router = require('./routes/v1/');
  app.use('/api/v1/', router);

  const port = process.env.PORT || 8080;
  app.listen(port);
  console.log('Server Started: listen on port ' + port);
}
