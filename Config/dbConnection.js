const mongoose = require("mongoose");

const dbconnection = async () => {
  try {
    const connect = await mongoose.connect(process.env.db_url);

    console.log("connection is done", connect.connection.host);
  } catch (error) {
    console.log("connection failed");
    process.exit(1);
  }
};
module.exports = dbconnection;
