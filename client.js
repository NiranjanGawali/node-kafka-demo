const { Kafka } = require('kafkajs');

exports.client = new Kafka({
  clientId: 'my-app',
  brokers: ['192.168.0.183:9092'],
});
