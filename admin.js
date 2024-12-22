const { client } = require('./client');

async function init() {
  const admin = client.admin();
  console.log('Admin connecting....');
  await admin.connect();
  console.log('Admin connection success...');

  // List existing topics
  const topics = await admin.listTopics();
  console.log('Existing topics:', topics);

  if (!topics.includes('rider-status-2')) {
    console.log('Creating topic [rider-status-2]');
    await admin.createTopics({
      topics: [
        {
          topic: 'rider-status-2',
          numPartitions: 2,
        },
      ],
    });
    console.log('Topic created successfully [rider-status-2]');
  } else {
    console.log('Topic [rider-status-2] already exists.');
  }

  console.log('Disconnecting admin...');
  await admin.disconnect();
}

init();
