const express = require("express");
const authRouter = require("./routes/auth");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
