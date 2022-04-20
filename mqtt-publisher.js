var mqtt = require('mqtt');
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
var client = mqtt.connect("mqtt://localhost:1883", {
    clientId,
    clean: false,
    connectTimeout: 4000,
    reconnectPeriod: 0,
    username:'guest',
    password:'guest'
});
client.on("connect", function () {
    setInterval(() => {
        console.log("Message Published");
        client.publish("nfkt", "test");
    }, [10000])
});
client.on('error', (err) => {
    console.log("Connection failed");
    // client.end();
});



// var wsClient = mqtt.connect("ws://localhost:8083", {clientId: "nihal123"});

// const connect = () => {
//     client.on("connect", function () { console.log(connection);  }); //client.end();

//     client.on('error', (err) => {
//         console.log(err);
//         client.end();
//     });

//     client.subscribe('mytopic', { qos: 0 });

// }

// connect();

// client.on("connect", function (connack) { console.log(connack)});
// wsClient.on("connect", function (connack) { console.log(connack)});
// wsClient.publish("/nfkt", "howdy");

// client.on("error", (err)=> {console.log(err); client.end()});

// app.post("/send-mqtt", function (req, res) {


//     client.publish("/nfkt", req.body.message);
//     console.log("Message Sent")

//     res.send("Message sent to mqtt");
// });

// app.post("/unsubscribe", (req, res)=>{
//     console.log("Unsubscribing...")
//     client.unsubscribe(req.body.topic, req.body.message);
//     console.log("Unsubscribed");

//     res.send("Unsubscribed");
// })

// app.post("/subscribe", (req, res)=>{
//     console.log("Subscribing...")
//     client.subscribe(req.body.topic, req.body.message);
//     console.log("Subscribed");

//     res.send("Subscribed");
// })

// app.get("/", (req, res)=>{
//     res.send("Welcome")
// })
// var server = app.listen(3000, function () {
//     console.log("app running on port.", server.address().port);
// });

