const mongoose = require("mongoose");
const db_name = "bug_tracker"

mongoose.connect(`mongodb+srv://user123:allie110419@cluster0.k15zg.mongodb.net/bug?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong", err)); 4