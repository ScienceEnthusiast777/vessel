const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const rulesSchema = new Schema({
  name: String, 
  explanation: String, 
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Rules = mongoose.model('Rules', rulesSchema);
module.exports = Rules; 