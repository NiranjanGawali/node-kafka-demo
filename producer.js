const { client } = require('./client');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const init = async () => {
  const producer = client.producer();

  console.log('Connecting producer...');

  await producer.connect();

  console.log('Producer connected successfully...');

  rl.setPrompt('Enter name and location (e.g., Niranjan NORTH): ');
  rl.prompt();

  rl.on('line', async (line) => {
    try {
      const [name, loc] = line.split(' ');
      if (!name || !loc) {
        console.log('Please provide both name and location!');
        rl.prompt();
        return;
      }

      const partition = loc.toLowerCase() === 'north' ? 0 : 1;
      const message = { name, loc };

      await producer.send({
        topic: 'rider-status-2',
        messages: [
          {
            partition,
            key: 'location-status-1',
            value: JSON.stringify(message),
          },
        ],
      });

      console.log(`Message sent to partition ${partition}:`, message);
    } catch (error) {
      console.error('Error sending message:', error.message);
    } finally {
      rl.prompt();
    }
  });

  rl.on('close', async () => {
    console.log('Disconnecting producer...');
    await producer.disconnect();
    console.log('Producer disconnected. Goodbye!');
  });
};

init();
