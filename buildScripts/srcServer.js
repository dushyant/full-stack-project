import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import mongoose from 'mongoose';
import routes from './routes/routes';
import {} from 'dotenv/config';

const port = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);
const connectionStr = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_HOST}`;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'src')));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

mongoose.Promise = global.Promise;
mongoose.connect(connectionStr);

routes(app);

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
