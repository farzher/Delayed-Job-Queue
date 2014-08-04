// Generated by LiveScript 1.2.0
var q, async, _;
q = require('../index');
async = require('async');
_ = require('prelude-ls-extended');
q.process('test', {
  limit: 1,
  attempts: 3
}, function(task){
  var sendMail, data;
  sendMail = function(data, cb){
    return setTimeout(function(){
      return cb(data.subject === 'fail' ? 'asked to fail' : void 8);
    }, 1000);
  };
  data = task.data;
  console.log('attempting to send email now');
  return sendMail({
    subject: data.subject,
    message: data.message
  }, function(err){
    console.log('sendMail finished with err', err);
    return task.done(err);
  });
});
q.listen(1337);
return;
q.process('mx', function(data, task){
  task.log('whatever');
  return task.done();
});
q.process('mx', function(data, task){
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
    return task.done();
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
}, function(data, task){
  if (iDontWantToSendNow) {
    return task.delay(60);
  }
  task.log('attempting to send email now');
  return sendEmail({
    subject: data.subject,
    message: data.message
  }, function(success){
    if (!success) {
      task.done('failed to send email');
    }
    return task.done();
  });
});
q.process('email', 'http://mysite.com/webhook');
q.listen(1337);