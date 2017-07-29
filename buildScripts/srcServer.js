import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import mongodb from 'mongodb';
import {} from 'dotenv/config';

const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;

const port = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'src')));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/welcome', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/welcome.html'));
});

app.get('/getFruits', function(req, res) {
  const connectionStr = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_HOST}`;
  MongoClient.connect(connectionStr, (error, database) => {
    if (error) {
      console.error('Can\'t connect to MongoDB');
      return;
    }
    const fruitsDB = database.collection('fruits');

    fruitsDB.distinct('fruits').then((data) => {
      res.send(data);
    });
  });
});

app.post('/updateFruit', function(req, res) {
  const connectionStr = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds139352.mlab.com:39352/myfruits`;
  MongoClient.connect(connectionStr, (error, database) => {
    if (error) {
      console.error('Can\'t connect to MongoDB');
      return;
    }
    const fruitsDB = database.collection('fruits');

    fruitsDB.update(
      { "_id" : ObjectId("595333d4734d1d29afb777f0")},
      { $set: { "fruits" : req.body.fruits } }
   );
  });
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
