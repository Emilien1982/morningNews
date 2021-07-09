const mongoose = require('mongoose');

const options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology : true
};

mongoose.connect(
  process.env.DB_CONNECTION_URL,
  options,
  (err) => {
    err? console.log(err) : console.log('DB connectée. OK');
  }
)
