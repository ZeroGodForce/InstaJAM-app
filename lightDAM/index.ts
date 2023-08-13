import express, { Express } from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto';
const cors = require('cors');
const multer = require('multer');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// TODO: Temporary datastore switch to a proper solution
let images = [];

app.use(cors());

// Configure file storage [WIP]
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + '/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
})

const upload = multer({ storage: storage })

// Receive uploaded data
app.post('/upload', upload.single('image'), function (req, res) {
  console.log(req)
  console.log('=========== UPLOAD ===========');
  console.log('UPLOAD DATA', req);
  console.log('==============================');

  let data = {
    id: crypto.randomUUID(),
    title: req.body.title,
    description: req.body.description,
    imagePath: req.file.path
  };

  images.push(data);
  res.json({ message: "File(s) uploaded successfully", data: data });
});

// View all data
app.get('/data', (req, res) => {
  res.json(images);
});

app.listen(port, () => console.log(`App backend listening on port ${port}!`));
