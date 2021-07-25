const express = require('express');
const cors = require('cors');
const cookies = require("cookie-parser");
const path = require('path')



const port = 8000;


const app = express();


app.use(cors({
    credentials: true,
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
}));


app.use(express.json());
app.use(cookies());

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});



require('./server/config/mongoose');

require('./server/routes/routes')(app);

app.use(express.static('client/build'))

app.get('*', (req, res) => {
    const index = path.join(__dirname, 'build', 'index.html');
    res.sendFile(index);
});


app.listen(process.env.PORT || port, () => {
    console.log("Listening at Port", port)
})