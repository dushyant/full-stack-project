const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FruitSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  colors: {
    type: Array,
    required: true
  }
});

const Fruit = mongoose.model('fruit', FruitSchema);

module.exports = Fruit;
