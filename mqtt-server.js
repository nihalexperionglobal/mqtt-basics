const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
// const server = createServer(aedes);
const port = 1883;

aedes.on('client', function (client) {
    console.log(`[CLIENT_CONNECTED] Client ${(client ? client.id : client)} connected to broker ${aedes.id}`)
})

// emitted when a client disconnects from the broker
aedes.on('clientDisconnect', function (client) {
    console.log(`[CLIENT_DISCONNECTED] Client ${(client ? client.id : client)} disconnected from the broker ${aedes.id}`)
})

// emitted when a client subscribes to a message topic
aedes.on('subscribe', function (subscriptions, client) {
    console.log(`[TOPIC_SUBSCRIBED] Client ${(client ? client.id : client)} subscribed to topics: ${subscriptions.map(s => s.topic).join(',')} on broker ${aedes.id}`)
})

// emitted when a client unsubscribes from a message topic
aedes.on('unsubscribe', function (subscriptions, client) {
    console.log(`[TOPIC_UNSUBSCRIBED] Client ${(client ? client.id : client)} unsubscribed to topics: ${subscriptions.join(',')} from broker ${aedes.id}`)
})

// emitted when a client publishes a message packet on the topic
aedes.on('publish', async function (packet, client) {
    if (client) {
        console.log(`[MESSAGE_PUBLISHED] Client ${(client ? client.id : 'BROKER_' + aedes.id)} has published message on ${packet.topic} to broker ${aedes.id}`)
    }
})

aedes.publish({topic: 'hello', payload:'broker'})

server.listen(port, function () {
    console.log(`MQTT Broker running on port: ${port} and broker id is: ${aedes.id}`); 
});

aedes.client = (client)=> console.log(`[CLIENT_CONNECTED] Client ${(client ? client.id : client)} connected to broker ${aedes.id}`)
// var mosca = require('mosca');
// var settings = {
// 		port:1883
// 		}

// var server = new mosca.Server(settings);

// server.on('ready', function(){
// console.log("ready");
// });