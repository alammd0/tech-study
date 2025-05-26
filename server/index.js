const express = require("express");
const app = express();

const userRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const courseRoutes = require("./routes/course");
const sectionRoutes = require("./routes/section");
const subSectionRoutes = require("./routes/subSection");

const database = require("./config/db");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

//cloudinary connection
cloudinaryConnect;

//routes
app.use("/api/auth", userRoutes);
app.use("/api/categries", categoryRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/section", sectionRoutes);
app.use("/api/sub-section", subSectionRoutes);

//def route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
