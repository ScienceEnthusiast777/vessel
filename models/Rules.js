const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const rulesSchema = new Schema({
  name: String,
  explanation: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  extensions: [
    {
      extension: String,
      extendedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      approved: {
        type : Boolean,
        default : false
      }
    },
  ],
});

const Rules = mongoose.model("Rules", rulesSchema);
module.exports = Rules;
