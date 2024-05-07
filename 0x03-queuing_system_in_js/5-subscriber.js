import { createClient, print } from "redis";

const client = createClient();

client
  .on("connect", () => {
    console.log("Redis client connected to the server");
  })
  .on("error", (error) => {
    console.log(`Redis client not connected to the server: ${error}`);
  });

client.subscribe('holberton school');
client.on('message', (channel, message) => {
  console.log(`Message received on channel ${channel}: ${message}`);
    
    // Unsubscribe and quit if message is "KILL_SERVER"
    if (message === 'KILL_SERVER') {
        client.unsubscribe();
        client.quit();
    }
});