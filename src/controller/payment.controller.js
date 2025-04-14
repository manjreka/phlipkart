// backend/controllers/paymentController.js
require("dotenv").config();
const stripe = require("stripe")(process.env.KEY);
const Payment = require("../models/payment.model");
const Order = require("../models/order.models");

const makePaymentUsingStrip = async (req, res) => {
  try {
    const { decoded } = req;
    const userId = decoded.id;
    const cartDetails = req.body;

    // Calculate order summary
    const orderedAmt = cartDetails.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
    const gstAmt = Number((orderedAmt * 0.18).toFixed(2));
    const totalAmt = orderedAmt + gstAmt;

    // Create order
    const newOrder = await Order.create({
      userId,
      products: [], // You can link Cart or copy cart data here
      shippingAddress: "662adexampleid", // Get from req later
      status: "pending",
      billingDetails: {
        orderedAmt,
        gstAmt,
        totalAmt,
      },
    });

    console.log("order created successfully!!");

    const lineItems = cartDetails.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      metadata: {
        userId,
        orderId: newOrder._id.toString(),
      },
    });

    console.log(session.id);

    res.json({ id: session.id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const stripeWebhookHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { userId, orderId } = session.metadata;

    try {
      await Payment.create({
        userId,
        order: orderId,
        paymentMethod: "card",
        paymentStatus: "completed",
        transactionId: session.payment_intent,
      });
    } catch (error) {
      console.error("Error saving payment to DB:", error);
    }
  }

  res.status(200).send("Received");
};

module.exports = {
  makePaymentUsingStrip,
  stripeWebhookHandler,
};
