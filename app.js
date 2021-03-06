const express = require("express");
const app = express();
const cors = require("cors");
const PORT_ = process.env.PORT || 5001;
const mongoose = require("mongoose");
const { MONGO_URI } = require("./env");
const UserRouter = require("./routes/User");
const GigRouter = require("./routes/Gig");
const multer = require("multer");
app.use(cors());
app.use(multer().array("blog_image", 100));
app.use(express.json());

mongoose.connect(
  MONGO_URI,
  {
    keepAlive: true,
    useNewUrlParser: true,
  },
  (err, client) => {
    if (err) {
      console.log("Error while connecting to mongodb", err);
    } else if (client) {
      app.listen(PORT_, () => {
        console.log("Connected to mongodb service");
        console.log("Server is Running on PORT:", PORT_);
      });
    }
  }
);
app.get("/", (req, res) => {
  res.send("Hello, this is gigsman api!");
});
app.use(UserRouter);
app.use(GigRouter);
app.use(require("./routes/Blog"));
app.use(require("./routes/formData"));
app.use(require("./routes/websiteLeads"));
