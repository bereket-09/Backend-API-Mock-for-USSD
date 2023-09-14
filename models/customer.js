const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new mongoose.Schema(
  {
    id: String,
    serviceId: String,
    profileType: String,
    languageId: String,
    accountBalance: Number,
    CurrentOffers: [
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
    ],
  },
  { collection: "customers" }
); // <-- Specify the collection name here

module.exports = mongoose.model("User", customerSchema);
