const kue = require('kue');

const queue = kue.createQueue();

queue.process('push_notification_code', (job, done) => {
    setTimeout(() => {
        console.log(`Notification job completed for Job ID: ${job.id}`);
        
        done();
    }, 2000); 
});

console.log('Worker is ready to process jobs...');
