const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const cardSchema = new Schema({
  createdBy : String,
  imageData: Buffer
});

const Card = mongoose.model('Card', cardSchema);
module.exports = Card; 