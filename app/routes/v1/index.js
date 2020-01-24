var express = require('express');
var router = express.Router();

router.get('/image',function(req,res){
  /*
  response["Content-Type"] = "image/png"
  response["Content-Disposition"] = "inline; filename={0}".format(
    photo_name)
  response['X-Accel-Redirect'] = "/media/{0}".format(photo.image)
  */
  res.header('Content-Type', 'image/jpg');
  res.header('Content-Disposition', 'inline; filename=back_graund1.jpg');
  res.header('X-Accel-Redirect', '/media/back_graund1.jpg');

  res.send(200);
});

module.exports = router;
