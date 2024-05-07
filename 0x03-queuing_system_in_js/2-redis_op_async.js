const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

client.on('error', (err) => {
    console.error('Redis client not connected to the server:', err);
});

async function setNewSchool(schoolName, value) {
    await setAsync(schoolName, value);
    console.log('Reply: OK');
}

async function displaySchoolValue(schoolName) {
    try {
        const value = await getAsync(schoolName);
        console.log(value);
    } catch (error) {
        console.error(error);
    }
}

(async () => {
    console.log('Redis client connected to the server');
    await displaySchoolValue('Holberton');
    await setNewSchool('HolbertonSanFrancisco', '100');
    await displaySchoolValue('HolbertonSanFrancisco');
    client.quit();
})();
