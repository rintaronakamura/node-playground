const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const cluster = require('cluster');

router.get('/image',function(req,res){
  console.log(`[${cluster.worker.id}] [PID ${cluster.worker.process.pid}] Request`);

  AWS.config.update({
    "accessKeyId": process.env.ACCESS_KEY_ID,
    "secretAccessKey":process.env.SECRET_ACCESS_KEY,
    "region": process.env.REGION
  });

  const params = {
    Bucket: process.env.BUCKET,
    Key: process.env.KEY,
    Expires: Number(process.env.EXPIRES)
  };

  const s3 = new AWS.S3();
  const url = s3.getSignedUrl('getObject', params);
  console.log("The URL is", url);

  res.header('Content-Type', 'image/jpg');
  res.header('Content-Disposition', 'inline; filename=back_graund1.jpg');
  res.header('X-Accel-Redirect', '/s3');
  res.header('X-Reproxy-URL', url);
  res.sendStatus(200);

  /* nginx 上にある画像を返却する版.
  res.header('Content-Type', 'image/jpg');
  res.header('Content-Disposition', 'inline; filename=back_graund1.jpg');
  res.header('X-Accel-Redirect', '/media/back_graund1.jpg');
  res.sendStatus(200);
  */
});

module.exports = router;
