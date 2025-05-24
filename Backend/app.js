const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
const captainRoutes = require("./routes/captain.routes");
const mapssRoutes = require("./routes/maps.routes");
const rideRoutes = require("./routes/ride.routes");

connectToDb();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/users",userRoutes);
app.use("/captains",captainRoutes);
app.use("/maps",mapssRoutes);
app.use("/rides",rideRoutes);

app.get("/",(req,res)=>{
    res.send("Hello world");
});

module.exports= app;