const express = require('express');
const AWS = require('aws-sdk');
const cluster = require('cluster');
const Memcached = require('memcached')

const router = express.Router();
const memcached = new Memcached('memcached:11211');

router.get('/image',function(req,res){
  console.log(`[${cluster.worker.id}] [PID ${cluster.worker.process.pid}] Request`);

  memcached.get('location', function (err, data) {
    if (err) { console.log("err", err); }

    console.log("get data =", data);
    let location = data;

    if (!location) {
      console.log("set location value.")
      // DB から location を取得する処理.
      location = 'back_graund1.jpg'
      memcached.set('location', location, 30, function (err, data) {
        if (err) { console.log("set err", err); }
        console.log("set success!")
      })
    }

    AWS.config.update({
      "accessKeyId": process.env.ACCESS_KEY_ID,
      "secretAccessKey":process.env.SECRET_ACCESS_KEY,
      "region": process.env.REGION
    });

    const params = {
      Bucket: process.env.BUCKET,
      Key: location,
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

});

module.exports = router;
