// Generated by LiveScript 1.2.0
var q, async, _;
q = require('../index');
async = require('async');
_ = require('prelude-ls-extended');
q.init({
  connect: 'mongodb://farzher:testing@kahana.mongohq.com:10017/queue'
}, function(){
  q.process('test', {
    limit: 1,
    attempts: 3
  }, function(job){
    var sendMail, data;
    sendMail = function(data, cb){
      return setTimeout(function(){
        return cb(data.subject === 'fail' ? 'asked to fail' : void 8);
      }, 1000);
    };
    data = job.data;
    job.log('attempting to send email now');
    return sendMail({
      subject: data.subject,
      message: data.message
    }, function(err){
      job.log("sendMail finished with err " + err);
      return job.done(err);
    });
  });
  q.create('test', {
    subject: 'hey 1',
    message: 'sup'
  }, {
    priority: -1
  });
  q.listen(1337);
  return;
  q.process('mx', function(data, job){
    job.log('whatever');
    return job.done();
  });
  q.process('mx', function(data, job){
    var results, i$, ref$, len$, domain_id, functions, domain_ids;
    results = {};
    for (i$ = 0, len$ = (ref$ = data.domain_ids).length; i$ < len$; ++i$) {
      domain_id = ref$[i$];
      results[domain_id] = {};
    }
    functions = [];
    for (i$ = 0, len$ = (ref$ = data.domain_ids).length; i$ < len$; ++i$) {
      domain_id = ref$[i$];
      (fn$.call(this, domain_id));
    }
    for (i$ = 0, len$ = (ref$ = _.batch(10, data.domain_ids)).length; i$ < len$; ++i$) {
      domain_ids = ref$[i$];
      (fn1$.call(this, domain_ids));
    }
    return async.parallel(functions, function(err, res){
      console.log(results);
      return job.done();
    });
    function fn$(domain_id){
      functions.push(function(cb){
        results[domain_id].twitter = 999;
        return cb();
      });
    }
    function fn1$(domain_ids){
      functions.push(function(cb){
        var i$, ref$, len$, domain_id;
        for (i$ = 0, len$ = (ref$ = domain_ids).length; i$ < len$; ++i$) {
          domain_id = ref$[i$];
          results[domain_id].moz = 888;
        }
        return cb();
      });
    }
  });
  q.process('email', {
    limit: 1,
    attempts: 1,
    backoff: 0
  }, function(data, job){
    if (iDontWantToSendNow) {
      return job.delay(60);
    }
    job.log('attempting to send email now');
    return sendEmail({
      subject: data.subject,
      message: data.message
    }, function(success){
      if (!success) {
        job.done('failed to send email');
      }
      return job.done();
    });
  });
  q.process('email', 'http://mysite.com/webhook');
  return q.listen(1337);
});