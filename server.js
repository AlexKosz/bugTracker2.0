const express = require('express');
const cors = require('cors');
const cookies = require("cookie-parser");
const path = require('path')



const port = 8000;


const app = express();


app.use(cors({
    credentials: true, origin: 'pacific-everglades-12315.herokuapp.com/'
}));


app.use(express.json());
app.use(cookies());



require('./server/config/mongoose');

require('./server/routes/routes')(app);

app.get('*', (req, res) => {
    const index = path.join(__dirname, 'client', 'build', 'index.html');
    res.sendFile(index);
});


app.listen(process.env.PORT || port, () => {
    console.log("Listening at Port", port)
})