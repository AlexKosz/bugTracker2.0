const express = require('express');
const cors = require('cors');
const cookies = require("cookie-parser");
const path = require('path')



const port = 8000;


const app = express();


app.use(cors({
    credentials: true
}));


app.use(express.json());
app.use(cookies());



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