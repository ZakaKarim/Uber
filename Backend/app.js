import "dotenv/config";
import express from "express";
const app = express();
import connectDB from "./db/db.js";
import cors from "cors";

// Calling the DataBase Function
connectDB();

// Middleware Setup
app.use(express.json({ limit: "30kb" }));
app.use(express.urlencoded({ extended: true, limit: "30kb" }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World..");
});

//Importing Routes
import userRoute from "./routes/user.routes.js";

//Routes Declaration
app.use("/user", userRoute);

app.listen(process.env.PORT || 4000, () => {
  console.log(`⚙️ Server is Started on Port : ${process.env.PORT}⚙️`);
});
