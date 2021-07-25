const express = require('express');
const cors = require('cors');
const cookies = require("cookie-parser");
const path = require('path')



const port = 8000;


const app = express();


app.use(cors({
    credentials: true, origin: 'http://localhost:3000'
}));


app.use(express.json());
app.use(cookies());



require('./server/config/mongoose');

require('./server/routes/routes')(app);

app.use(express.static('client/build'))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});


app.listen(process.env.PORT || port, () => {
    console.log("Listening at Port", port)
})