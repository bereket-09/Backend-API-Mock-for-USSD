const mongoose = require("mongoose");
const packages = [
  {
    id: "1",
    packageName: "50 Minutes Voice Package (1 day)",
    languageId: "1",
    packageGroupId: 1,
    price: 50,
    minuteAmount: 50,
  },
  {
    id: "2",
    packageName: "180 Minutes Voice Package (7 day)",
    languageId: "1",
    packageGroupId: 1,
    price: 100,
    minuteAmount: 180,
  },
  {
    id: "3",
    packageName: "Unlimited voice & Text Package (30 days)",
    languageId: "1",
    packageGroupId: 1,
    price: 1650,
    minuteAmount: null,
  },
  {
    id: "4",
    packageName: "500MB Data Package (7 days)",
    languageId: "1",
    packageGroupId: 2,
    price: 25,
    dataAmount: 500,
  },
  {
    id: "5",
    packageName: "1GB Data Package (7 days)",
    languageId: "1",
    packageGroupId: 2,
    price: 50,
    dataAmount: 1000,
  },
  {
    id: "6",
    packageName: "2GB Data + Unlimited voice & Text Package (7 days)",
    languageId: "1",
    packageGroupId: 2,
    price: 540,
    dataAmount: 2000,
  },
  {
    id: "7",
    packageName: "5GB Data Package (30 days)",
    languageId: "1",
    packageGroupId: 2,
    price: 200,
    dataAmount: 5000,
  },
  {
    id: "8",
    packageName: "50GB Data + Unlimited Calls & Texts Package (30 days)",
    languageId: "1",
    packageGroupId: 2,
    price: 2300,
    dataAmount: 50000,
  },
  {
    id: "9",
    packageName: "50 SMS Package (30 days)",
    languageId: "1",
    packageGroupId: 3,
    price: 50,
    smsAmount: 50,
  },
  {
    id: "10",
    packageName: "100 SMS/Day Package (30 days)",
    languageId: "1",
    packageGroupId: 3,
    price: 75,
    smsAmount: 2800,
  },
  {
    id: "11",
    packageName: "Unlimited SMS Package (30 days)",
    languageId: "1",
    packageGroupId: 3,
    price: 225,
    smsAmount: null,
  },
  {
    id: "12",
    packageName: "Unlimited SMS + 10GB Data Package (30 days)",
    languageId: "1",
    packageGroupId: 3,
    price: 335,
    smsAmount: null,
    dataAmount: 10000,
  },
  {
    id: "13",
    packageName: "Unlimited SMS, Calls & 50GB Data Package (30 days)",
    languageId: "1",
    packageGroupId: 3,
    price: 1350,
    smsAmount: null,
    minuteAmount: null,
    dataAmount: 50000,
  },
  {
    id: "14",
    packageName: "የድምጽ 50 ደቂቃ ፓኬጅ (30 ቀን)",
    languageId: "2",
    packageGroupId: 1,
    price: 50,
    minuteAmount: 50,
  },
  {
    id: "15",
    packageName: "የድምጽ 180 ደቂቃ ፓኬጅ (30 ቀን)",
    languageId: "2",
    packageGroupId: 1,
    price: 1850,
    minuteAmount: 180,
  },
  {
    id: "16",
    packageName: "ያልተገደበ የድምጽ እና መልዕክት የድምጽ ፓኬጅ (30 ቀን)",
    languageId: "2",
    packageGroupId: 1,
    price: 650,
    minuteAmount: null,
  },
  {
    id: "17",
    packageName: "500MB ዳታ ፓኬጅ (1 ቀን)",
    languageId: "2",
    packageGroupId: 2,
    price: 25,
    dataAmount: 500,
  },
  {
    id: "18",
    packageName: "1GB ዳታ ፓኬጅ (1 ቀን)",
    languageId: "2",
    packageGroupId: 2,
    price: 50,
    dataAmount: 1000,
  },
  {
    id: "19",
    packageName: "2GB ዳታ ፓኬጅ (7 ቀን)",
    languageId: "2",
    packageGroupId: 2,
    price: 140,
    dataAmount: 2000,
  },
  {
    id: "20",
    packageName: "5GB ዳታ ፓኬጅ (30 ቀን)",
    languageId: "2",
    packageGroupId: 2,
    price: 200,
    dataAmount: 5000,
  },
  {
    id: "21",
    packageName: "50GB ዳታ ፓኬጅ (30 ቀን)",
    languageId: "2",
    packageGroupId: 2,
    price: 1000,
    dataAmount: 50000,
  },
  {
    id: "22",
    packageName: "50 ኤስኤምኤስ  ፓኬጅ (ለ24 ሰዓት)",
    languageId: "2",
    packageGroupId: 3,
    price: 50,
    smsAmount: 50,
  },
  {
    id: "23",
    packageName: "100 ኤስኤምኤስ/ቀን  ፓኬጅ (ለ24 ሰዓት)",
    languageId: "2",
    packageGroupId: 3,
    price: 75,
    smsAmount: 2800,
  },
  {
    id: "24",
    packageName: "ያልተገደበ ኤስኤምኤስ ፓኬጅ ለ24 ሰዓት (1 ቀን)",
    languageId: "2",
    packageGroupId: 3,
    price: 100,
    smsAmount: null,
  },
  {
    id: "25",
    packageName: "ያልተገደበ ኤስኤምኤስ + 1GB ዳታ ፓኬጅ ለ7 ቀን",
    languageId: "2",
    packageGroupId: 3,
    price: 335,
    smsAmount: null,
    dataAmount: 10000,
  },
  {
    id: "26",
    packageName: "ያልተገደበ ኤስኤምኤስ, መልካም አዲስ ዓመት ገላጭ እና 50GB ዳታ ፓኬጅ (30 ቀን)",
    languageId: "2",
    packageGroupId: 3,
    price: 2300,
    smsAmount: null,
    minuteAmount: null,
    dataAmount: 50000,
  },
];

// const offers = [
//   {
//     "id": "offer-1",
//     "offerName": "100 Extra Minutes with a Voice Package",
//     "languageId": "1",
//     "validityDays": 30,
//     "packageGroupId": 1,
//     "description": "Get 100 extra minutes with any voice package purchased",
//     "imageURL": "https://example.com/offer-a.png"
//   },
//   {
//     "id": "offer-2",
//     "offerName": "100 Extra MB with a Data Package",
//     "languageId": "1",
//     "validityDays": 30,
//     "packageGroupId": 2,
//     "description": "Get 100 extra MB with any data package purchased",
//     "imageURL": "https://example.com/offer-b.png"
//   },
//   {
//     "id": "offer-3",
//     "offerName": "50 Extra SMS with an SMS Package",
//     "languageId": "1",
//     "validityDays": 30,
//     "packageGroupId": 3,
//     "description": "Get 50 extra SMS with any SMS package purchased",
//     "imageURL": "https://example.com/offer-c.png"
//   }
// ];

// Replace with your MongoDB connection string
const uri =
  "mongodb+srv://eshop-admin:admin%40eshop@e-shope.txsjiod.mongodb.net/TibcoTest?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    const Package = require("../package");
    // const Offer = require("./models/offer");
    Promise.all(
      packages.map((packageData) => new Package(packageData).save())
      // offers.map((offerData) => new Offer(offerData).save())
    )
      .then(() => console.log("Data inserted successfully"))
      .catch((error) => console.error(`Error inserting data: ${error}`))
      .finally(() => mongoose.disconnect());
  })
  .catch((error) =>
    console.error(`Error connecting to MongoDB Atlas: ${error}`)
  );
