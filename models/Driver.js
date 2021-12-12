const mongoose = require("mongoose");
const { Schema } = mongoose;

const driverSchema = new Schema(
  {
    name: String,
    number: { type: Number, default: 0 },
    team: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);