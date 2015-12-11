var Queue = require('bee-queue');
//var queue = new Queue('example');
var job;
var arr = [12, 502, 63];

createJob(12);
createJob(502);
createJob(63);

//arr.forEach(function (data, index) {
//    createJob(data);
//});



function createJob(d) {
    var queue = new Queue(d);
    job = queue.createJob({ x: d }).save(function (err, job) {
        if (err) {
            var _job = job;
        }
    });
    
    job.on('succeeded', function (result) {
        console.log('Received result for job ' + job.id + ': ' + result);
    });
    
    job.on('failed', function (result) {
        console.log('Received Failed for job ' + job.id + ': ' + result);
    });
    
    // Process jobs from as many servers or processes as you like 
    queue.process(function (job, done) {
        console.log('Processing job ' + job.id);
        //return done(Error('error'), job.data.x);
        return done(null, job.data.x);

    });
}