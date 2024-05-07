const express = require('express');
const redis = require('redis');
const kue = require('kue');

const { promisify } = require('util');

const app = express();
const port = 1245;

const client = redis.createClient();

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

setAsync('available_seats', 50);

let reservationEnabled = true;

const queue = kue.createQueue();

async function reserveSeat(number) {
    await setAsync('available_seats', number);
}

async function getCurrentAvailableSeats() {
    const seats = await getAsync('available_seats');
    return parseInt(seats) || 0;
}

app.use(express.json());

app.get('/available_seats', async (req, res) => {
    const numberOfAvailableSeats = await getCurrentAvailableSeats();
    res.json({ numberOfAvailableSeats });
});

app.get('/reserve_seat', async (req, res) => {
    if (!reservationEnabled) {
        return res.json({ status: 'Reservation are blocked' });
    }

    const job = queue.create('reserve_seat').save((err) => {
        if (err) {
            return res.json({ status: 'Reservation failed' });
        }
        res.json({ status: 'Reservation in process' });
    });

    job.on('complete', (result) => {
        console.log(`Seat reservation job ${job.id} completed`);
    });

    job.on('failed', (errorMessage) => {
        console.log(`Seat reservation job ${job.id} failed: ${errorMessage}`);
    });
});

app.get('/process', async (req, res) => {
    res.json({ status: 'Queue processing' });

    queue.process('reserve_seat', async (job, done) => {
        const currentAvailableSeats = await getCurrentAvailableSeats();
        if (currentAvailableSeats === 0) {
            reservationEnabled = false;
            done(new Error('Not enough seats available'));
        } else {
            await reserveSeat(currentAvailableSeats - 1);
            if (currentAvailableSeats - 1 === 0) {
                reservationEnabled = false;
            }
            done();
        }
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
