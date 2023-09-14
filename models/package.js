const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PackageSchema = new Schema(
  {
    id: String,
    packageName: String,
    languageId: String,
    packageGroupId: Number,
    price: Number,
    minuteAmount: Number,
    dataAmount: Number,
    smsAmount: Number,
  },
  { collection: "packages" }
);

module.exports = mongoose.model("Package", PackageSchema);
