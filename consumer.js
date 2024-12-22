const { client } = require('./client');
const group = process.argv[2];

init = async () => {
  const consumer = client.consumer({ groupId: group });
  await consumer.connect();

  console.log('Subscribing the consumer...');

  await consumer.subscribe({ topics: ['rider-status-2'], fromBeginning: true });

  console.log('Running the consumer for each message...');

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(
        `${group}: [${topic}]: PART:${partition}:`,
        message.value.toString()
      );
    },
  });
};

init();
