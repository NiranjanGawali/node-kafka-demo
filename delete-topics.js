const { client } = require('./client'); // Assuming your client setup is in a file named `client.js`

async function deleteTopic(topicName) {
  const admin = client.admin();

  console.log('Admin connecting....');
  await admin.connect();
  console.log('Admin connection success...');

  try {
    console.log(`Deleting topic [${topicName}]...`);
    await admin.deleteTopics({
      topics: [topicName],
    });

    console.log(`Topic [${topicName}] deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting topic [${topicName}]:`, error);
  }

  console.log('Disconnecting admin...');
  await admin.disconnect();
}

// Pass the topic name to delete
deleteTopic('rider-status-2');
