const kue = require('kue');

const blacklistedNumbers = ['4153518780', '4153518781'];

const queue = kue.createQueue({ concurrency: 2 });

function sendNotification(phoneNumber, message, job, done) {
    job.progress(0, 100);

    if (blacklistedNumbers.includes(phoneNumber)) {
        job.failed(new Error(`Phone number ${phoneNumber} is blacklisted`));
        return done();
    }

    job.progress(50, 100);

    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

    done();
}

queue.process('push_notification_code_2', 2, (job, done) => {
    const { phoneNumber, message } = job.data;
    
    sendNotification(phoneNumber, message, job, done);
});

console.log('Worker is ready to process jobs...');
