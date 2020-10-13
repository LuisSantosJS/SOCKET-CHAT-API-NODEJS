const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const port = 3333;




app.use(express.json());
app.use(cors());



const server = http.createServer(app);
const io = require('socket.io')(server);


var messages = [];

io.on('connection', (client) => {
    client.on('message', msm => {
        messages.push(msm);
        io.emit('message', msm);
    })
});

app.get('/messages/index', (req, res) => {
    res.json({ value: messages });
})

app.post('/messages/create', (req, res) => {
    const { message, name } = req.body;
    const msm = {
        message,
        name
    };
    messages.push(msm);
    io.emit('message', msm);
    res.send('ok');
})



server.listen(port, () => console.log(`Server is running on port ${port}`));