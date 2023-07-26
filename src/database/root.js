const mongoose = require('mongoose');

const username = "admin";
const password = "admin";

const uri = `mongodb+srv://${username}:${password}@e-commerce.oyfnkci.mongodb.net/?retryWrites=true&w=majority`;

const connect = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected"))
    .catch((err) => console.log(`Something went wrong ${err}`));
};

connect()

module.exports = connect