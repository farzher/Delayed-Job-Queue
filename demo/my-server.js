// Generated by LiveScript 1.2.0
var _, request, express, app, bodyParser, router;
_ = require('prelude-ls-extended');
request = require('request');
express = require('express');
app = express();
bodyParser = require('body-parser');
app.use(bodyParser.json());
router = express.Router();
router.all('/create-campaign', function(req, res){
  var queries, job;
  queries = ['pokemon', 'fish', 'nuts'];
  job = {
    data: {
      type: 'campaign',
      queries: queries
    }
  };
  request.post('http://localhost:5672/job', {
    json: job
  }, function(err, response, body){
    res.send(body);
  });
});
router.all('/send-email', function(req, res){
  var data;
  data = req.body.data;
  console.log(req.body);
  (function(it){
    return setTimeout(it, 2000);
  })(function(){
    request.post('http://localhost:5672/job/update', {
      json: {
        _id: req.body._id,
        progress: 50
      }
    }, function(err, response, body){
      (function(it){
        return setTimeout(it, 2000);
      })(function(){
        var response;
        response = "Sending email to: " + data.to + "\nSubject: " + data.subject + "\nMessage: " + data.message;
        res.send(response);
      });
    });
  });
});
app.use('/', router);
app.listen(8080);