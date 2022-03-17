var mqtt = require('mqtt');
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
var client = mqtt.connect("mqtt://localhost:1883",{clientId,
clean: true,
connectTimeout: 4000,
username: 'emqx',
password: 'public',
reconnectPeriod: 1000,
});

client.on('connect', function (){

    client.publish("/nfkt", "Hello from Nihal");
    console.log("Message Sent")
})