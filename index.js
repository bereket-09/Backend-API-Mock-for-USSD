const express = require("express");
const mongoose = require("mongoose");
const Package = require("./models/package");
const Customer = require("./models/customer");

const app = express();
app.use(express.json()); // Add middleware for parsing JSON data

// const uri =
// "mongodb+srv://eshop-admin:admin%40eshop@e-shope.txsjiod.mongodb.net/TibcoTest?retryWrites=true&w=majority";

const uri = "mongodb://localhost:27017/TibcoTest";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ QUERY Offers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.post("/offers", async (req, res) => {
  const { serviceId, useCase, serviceSpecification } = req.body;

  try {
    // Get accountBalance value for the current serviceId
    const customer = await Customer.findOne({ serviceId });
    if (!customer) {
      const message = "Customer not found for the given Service ID";
      console.error(message);
      return res.status(408).json({ code: 408, message });
    }
    const { accountBalance, languageId: customerLanguageId } = customer;

    const spec = serviceSpecification.reduce(
      (acc, obj) => ({ ...acc, [obj.name]: obj.value }),
      {}
    );

    // Check if packageGroupId is missing in the request
    if (!spec.packageGroupId) {
      const message = "packageGroupId is missing in the request";
      console.error(message);
      return res.status(409).json({ code: 409, message });
    }

    const { languageId: requestLanguageId, packageGroupId } = spec;
    // Get priority languageId
    const languageId = requestLanguageId || customerLanguageId;

    // Get offers array by filtering the packages collection
    const offers = await Package.find({
      languageId,
      packageGroupId: spec.packageGroupId,
    });
    // const offers = await Package.find({ languageId, packageGroupId });
    console.log("Offers:", offers);
    if (offers.length === 0) {
      const message = "No offers found for the given specifications";
      console.error(message);
      return res.status(404).json({ code: 404, message });
    }

    // Construct response body containing code, message, account object, and offers array
    const response = {
      code: 200,
      message: "Success",
      serviceId: serviceId,
      accountBalance,
      offers,
    };

    // Send response
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ADD Subscription ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.post("/subscriptions/add", async (req, res) => {
  const { offerId, serviceId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(offerId)) {
    return res.status(400).json({
      code: 400,
      status: "error",
      message: "Invalid offer ID",
    });
  }
  const validOfferId = new mongoose.Types.ObjectId(offerId);

  try {
    const packageOffer = await Package.findById(validOfferId);
    if (!packageOffer) {
      return res
        .status(200)
        .json({ code: 604, status: "Error", message: "Offer not found" });
    }

    const user = await Customer.findOne({ serviceId });
    if (!user) {
      return res
        .status(200)
        .json({ code: 608, status: "Error", message: "Customer not found" });
    }

    // Check if account balance is sufficient to subscribe to the offer

    if (user.accountBalance < packageOffer.price) {
      return res.status(200).json({
        code: 607,
        status: "Error",
        message: "Insufficient account balance",
      });
    }

    // Check if user has already subscribed to offer
    if (user.CurrentOffers.some((offer) => offer.id === offerId)) {
      return res.status(200).json({
        code: 609,
        status: "Error",
        message: "Offer already subscribed",
      });
    } else {
      user.CurrentOffers.push(packageOffer);
      user.accountBalance -= packageOffer.price;
      await user.save();
    }

    // Add package offer to user's current offers array and deduct price from account balance
    // user.CurrentOffers.push(packageOffer);
    // user.accountBalance -= packageOffer.price;
    // await user.save();

    // Return success response with updated user data and package offer details
    return res.json({
      code: 200,
      status: "success",
      message: "Offer subscribed",
      serviceId: user.serviceId,
      accountBalance: user.accountBalance,
      data: packageOffer,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ code: 500, status: "error", message: "Internal Server error" });
  }
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Check Balance API ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.get("/balance/:serviceId", async (req, res) => {
  const serviceId = req.params.serviceId;

  try {
    const user = await Customer.findOne({ serviceId });

    if (!user) {
      return res.status(200).json({
        code: 604,
        status: "error",
        message: "User not found",
      });
    }

    // Get the total price of all the subscribed packages
    const totalSubscribedPrice = user.CurrentOffers.reduce(
      (acc, curr) => acc + curr.price,
      0
    );

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "User balance and subscription status retrieved successfully",
      data: {
        serviceId: user.serviceId,
        accountBalance: user.accountBalance,
        subscribedPackages: user.CurrentOffers,
        totalSubscribedPrice,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Internal server error",
    });
  }
});

// Start the server
app.listen(3000, () => console.log("Server started on port 3000"));
