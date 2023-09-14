const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OfferSchema = new Schema(
  {
    id: String,
    offerName: String,
    languageId: String,
    validityDays: Number,
    packageGroupId: Number,
    description: String,
    imageURL: String,
  },
  { collection: "offers" }
);

module.exports = mongoose.model("Offer", OfferSchema);
