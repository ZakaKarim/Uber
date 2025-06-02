import "dotenv/config";
import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";
import cors from "cors";

// Calling the DataBase Function
connectDB();

// Middleware Setup
app.use(cors());
app.use(express.json({ limit: "30kb" }));
app.use(express.urlencoded({ extended: true, limit: "30kb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World..");
});

//Importing Routes
import userRoute from "./routes/user.routes.js";
import captainRoute from "./routes/captain.routes.js"
import mapsRoute from "./routes/maps.routes.js";
import ridesRoute from "./routes/ride.routes.js";

//Routes Declaration
app.use("/user", userRoute);
app.use("/captain", captainRoute)
app.use("/maps", mapsRoute);
app.use("/rides", ridesRoute)

app.listen(process.env.PORT || 4000, () => {
  console.log(`⚙️ Server is Started on Port : ${process.env.PORT}⚙️`);
});
