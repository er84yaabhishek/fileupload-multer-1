//Import area
//const something = require('somelib');

const express = require("express");
const app = express();
const multer = require("multer");
require("dotenv").config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, Math.floor(Math.random() * 1000) + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/fileupload", upload.single("myfile"), (req, resp) => {
  console.log(req.file);
  resp.status(200).json({
    msg: "file upload successfully",
  });
});

let port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
