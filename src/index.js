const mongoose = require("mongoose");
const config = require("./config/config");
const app = require("./app");

//Mongo connection and get the express app to listen on config.port
mongoose
    .connect(config.mongoose.url, {
        autoIndex: false,
    })
    .then(() => console.log("Connected to MongoDB, url:", config.mongoose.url));

app.listen(config.port, () => {
    console.log("Server started on port:", config.port);
});
