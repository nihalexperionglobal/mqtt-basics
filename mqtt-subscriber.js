var mqtt = require('mqtt');
var app = require("express")();
var bodyParser = require("body-parser");
const http = require('http').Server(app);
const io = require('socket.io')(http);
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

var client = mqtt.connect("mqtt://localhost:1883", {
    clientId,
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 0,
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', function (req, res) {
    res.sendfile('index.html');
});

client.on('connect', () => console.log("Sucessfully Connected"))

io.on('connection', socket => {
    console.log('Connected');

    // mqtt weather event module
    socket.on('nfkt/weather', weatherModule);
    // socket.on('nfkt/led', qosCheckModule);
})


http.listen(3000, function () {
    console.log("app running on port 3000");
});

//mqtt events handler modules
const weatherModule = ({ isSubscribed }) => {
    if (isSubscribed) {
        client.subscribe("nfkt/weather", () => console.log("Successfully subscribed to nfkt/weather"));
        client.on('message', (topic, payload) => {
            console.log('Recieved message:', topic, payload.toString())

            io.emit('nfkt/weather', payload.toString())
        })
    } else {
        client.unsubscribe("nfkt/weather", () => console.log("Unsubscribed"));
    }
}














const qosCheckModule = () => {
    client.subscribe("nfkt/led", () => console.log("Subscribed to nfkt/led"));
    client.on('message', (topic, payload) => {
        console.log('Recieved message:', topic, payload.toString());
        io.emit('nfkt/led', payload.toString());
    })

}



/**
  ({ isSubscribed }) => {
        if (isSubscribed) {
            client.subscribe("nfkt/weather", () => console.log("Successfully subscribed to /nfkt"));
            client.on('message', (topic, payload) => {
                console.log('Recieved message:', topic, payload.toString())
                io.emit('/nfkt', payload.toString())
            })
        } else {
            client.unsubscribe("nfkt/weather", () => console.log("Unsubscribed"));
        }
 */