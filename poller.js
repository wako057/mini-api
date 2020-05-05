"use strict";


var amqp = require('amqplib/callback_api');

amqp.connect('amqp://admin:admin123@rabbitmq-orders.back.wako057.net', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'orders';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            /* HERE goes consume call received */
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});
