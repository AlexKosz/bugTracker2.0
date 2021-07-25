const express = require('express');
const cors = require('cors');
const cookies = require("cookie-parser");



const port = 8000;


const app = express();


app.use(cors({
    credentials: true, origin: 'pacific-everglades-12315.herokuapp.com/'
}));


app.use(express.json());
app.use(cookies());



require('./server/config/mongoose');

require('./server/routes/routes')(app);




const root = require('path').join(__dirname, 'client', 'build')
app.use(express.static(root));
app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})





app.listen(process.env.PORT || port, () => {
    console.log("Listening at Port", port)
})