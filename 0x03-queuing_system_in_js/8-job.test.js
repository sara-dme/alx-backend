const kue = require('kue');
const { expect } = require('chai');
const createPushNotificationsJobs = require('./createPushNotificationsJobs');

describe('createPushNotificationsJobs', () => {
    let queue;

    before(() => {
        kue.createQueue({ disableSearch: true });
        kue.app.set('title', 'Test Queue');
        queue = kue.createQueue();
        queue.testMode.enter();
    });

    after(() => {
        queue.testMode.exit();
    });

    it('display an error message if jobs is not an array', () => {
        expect(() => createPushNotificationsJobs('not an array')).to.throw('Jobs is not an array');
    });

    it('create two new jobs to the queue', () => {
        const jobs = [
            { phoneNumber: '1234567890', message: 'Test message 1' },
            { phoneNumber: '0987654321', message: 'Test message 2' }
        ];
        
        createPushNotificationsJobs(jobs);

        const jobsInQueue = queue.testMode.jobs;
        expect(jobsInQueue.length).to.equal(2);
        expect(jobsInQueue[0].type).to.equal('push_notification_code');
        expect(jobsInQueue[1].type).to.equal('push_notification_code');
        expect(jobsInQueue[0].data.phoneNumber).to.equal('1234567890');
        expect(jobsInQueue[1].data.phoneNumber).to.equal('0987654321');
    });
});
