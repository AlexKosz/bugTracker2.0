const mongoose = require("mongoose");
const db_name = "bug_tracker"

mongoose.connect(`mongodb://https://pacific-everglades-12315.herokuapp.com/${db_name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong", err));