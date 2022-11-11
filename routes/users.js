var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/register',
  //input validation
  body("email").trim().escape().isEmail(),
  body("password").trim(), upload.none()
  , async (req, res, next) => {
      
  

});

module.exports = router;
