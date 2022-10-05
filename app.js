const express = require("express");
const app = express();
const cors = require("cors");
const PORT_ = process.env.PORT || 5001;
const mongoose = require("mongoose");
const { MONGO_URI } = require("./env");
const UserRouter = require("./routes/User");
const GigRouter = require("./routes/Gig");
const ArticleRouter = require("./routes/article");

var cloudinary = require("cloudinary").v2;

// const corsOpts = {
//   origin: "*",

//   methods: ["GET", "POST"],

//   allowedHeaders: ["Content-Type"],
// };
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
    console.log("req is serving from cors");
    return res.status(200).json({});
  }
  next();
});
app.use(express.json());

// app.use(multer().array("blog_image", 100));

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
cloudinary.config({
  cloud_name: "yashraj28",
  api_key: "426877626417987",
  api_secret: "8UFaKWdmg_e-lMX29zd9r-kpSeM",
  secure: true,
});
app.get("/", (req, res) => {
  res.send("Hello, this is gigsman api!");
});

app.use(UserRouter);
app.use(GigRouter);
app.use(ArticleRouter);
app.use(require("./routes/Blog"));
app.use(require("./routes/formData"));
app.use(require("./routes/websiteLeads"));
