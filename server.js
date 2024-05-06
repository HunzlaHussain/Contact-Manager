const express = require("express");
const dotenv = require("dotenv").config();
const contactRoute = require("./Routes/ContactRoute");
const errorHandler = require("./Middleware/errorHandler");
const dbconnection = require("./Config/dbConnection");
const userRoute = require("./Routes/UserRoute");
const app = express();
dbconnection();
app.use(express.json()); // Middleware para

app.use("/api", contactRoute);
app.use("/api", userRoute);
app.use(errorHandler); //middleware error handler
// app.get("/api/contacts", (req, res) => {
//   res.status(200).json({ message: "That is Get Request of the Contacts " });
// });
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on this Port ${PORT}`);
});
