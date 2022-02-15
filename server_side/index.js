const express = require('express')
const cors = require('cors')
const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1347919",
    key: "41ecc8d2b3063b40aa74",
    secret: "6efb2d67c14055f7a22a",
    cluster: "ap2",
    useTLS: true
});

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
}))

app.use(express.json())

app.post('/api/messages', async (req, res) => {
    const respose = await pusher.trigger('serverside', 'message', {
        username: req.body.username,
        message: req.body.message
    });

    res.json(respose);
})

console.log('listening to port 8000');
app.listen(8000)