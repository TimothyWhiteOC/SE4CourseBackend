var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:courseNo', function(req, res, next) {
  //console.log(req.params);
  res.locals.connection.query("SELECT * FROM courses WHERE courseNo = '" + req.params.courseNo + "'", function(error, results, fields) {
    if (error) {
      res.status(500);
      res.send(JSON.stringify({ status: 500, error: error, response: null }));
      //If there is error, we send the error in the error section with 500 status
    } else {
      res.status(200);
      res.send(JSON.stringify(results));
      //If there is no error, all is good and response is 200OK.
    }
    res.locals.connection.end();
  });
});

module.exports = router;
