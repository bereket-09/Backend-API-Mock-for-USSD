const mongoose = require("mongoose");

// Replace with your MongoDB connection string
const uri =
  "mongodb+srv://eshop-admin:admin%40eshop@e-shope.txsjiod.mongodb.net/TibcoTest?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas");

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

    const Customer = mongoose.model("customer", customerSchema);

    const customers = [
      {
        id: "1",
        serviceId: "251711111111",
        profileType: "CBU",
        languageId: "1",
        accountBalance: 500,
        CurrentOffers: [
          {
            id: "1",
            packageName: "50 Minutes Voice Package (30 days)",
            languageId: "1",
            packageGroupId: 1,
            price: 50,
            minuteAmount: 50,
          },
          {
            id: "4",
            packageName: "500MB Data Package (30 days)",
            languageId: "1",
            packageGroupId: 2,
            price: 225,
            dataAmount: 500,
          },
        ],
      },
      {
        id: "2",
        serviceId: "251722222222",
        profileType: "EBU",
        languageId: "2",
        accountBalance: 1000,
        CurrentOffers: [
          {
            id: "2",
            packageName: "180 Minutes Voice Package (30 days)",
            languageId: "1",
            packageGroupId: 1,
            price: 1850,
            minuteAmount: 180,
          },
          {
            id: "5",
            packageName: "1GB Data Package (30 days)",
            languageId: "1",
            packageGroupId: 2,
            price: 500,
            dataAmount: 1000,
          },
        ],
      },
      {
        id: "3",
        serviceId: "251733333333",
        profileType: "CBU",
        languageId: "2",
        accountBalance: 750,
        CurrentOffers: [],
      },
      {
        id: "4",
        serviceId: "251744444444",
        profileType: "EBU",
        languageId: "1",
        accountBalance: 2000,
        CurrentOffers: [],
      },
      {
        id: "5",
        serviceId: "251755555555",
        profileType: "CBU",
        languageId: "2",
        accountBalance: 300,
        CurrentOffers: [
          {
            id: "6",
            packageName: "2GB Data + Unlimited Talk & Text Package (30 days)",
            languageId: "1",
            packageGroupId: 2,
            price: 540,
            dataAmount: 2000,
          },
        ],
      },
      {
        id: "6",
        serviceId: "251766666666",
        profileType: "CBU",
        languageId: "1",
        accountBalance: 100,
        CurrentOffers: [],
      },
      {
        id: "7",
        serviceId: "251777777777",
        profileType: "EBU",
        languageId: "2",
        accountBalance: 1500,
        CurrentOffers: [
          {
            id: "3",
            packageName: "Unlimited Talk & Text Package (30 days)",
            languageId: "1",
            packageGroupId: 1,
            price: 650,
            minuteAmount: null,
          },
        ],
      },
      {
        id: "8",
        serviceId: "251788888888",
        profileType: "CBU",
        languageId: "1",
        accountBalance: 50,
        CurrentOffers: [
          {
            id: "7",
            packageName: "5GB Data Package (30 days)",
            languageId: "1",
            packageGroupId: 2,
            price: 400,
            dataAmount: 5000,
          },
        ],
      },
      {
        id: "9",
        serviceId: "251799999999",
        profileType: "EBU",
        languageId: "2",
        accountBalance: 1200,
        CurrentOffers: [],
      },
      {
        id: "10",
        serviceId: "251710000000",
        profileType: "CBU",
        languageId: "1",
        accountBalance: 200,
        CurrentOffers: [
          {
            id: "11",
            packageName: "Unlimited SMS Package (30 days)",
            languageId: "1",
            packageGroupId: 3,
            price: 225,
            smsAmount: null,
          },
        ],
      },
    ];

    Customer.insertMany(customers)
      .then(() => console.log("Data inserted successfully"))
      .catch((error) => console.error(`Error inserting data: ${error}`))
      .finally(() => mongoose.disconnect());
  })
  .catch((error) =>
    console.error(`Error connecting to MongoDB Atlas: ${error}`)
  );
