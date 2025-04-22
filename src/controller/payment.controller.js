// backend/controllers/paymentController.js
require("dotenv").config();
const stripe = require("stripe")(process.env.KEY);
const Payment = require("../models/payment.model");
const Order = require("../models/order.models");
const Cart = require("../models/cart.model");

const makePaymentUsingStrip = async (req, res) => {
  try {
    const { decoded } = req;
    const userId = decoded.id;
    const cartDetails = req.body;

    const { products, shippingAddress } = cartDetails;

    // Calculate order summary
    const orderedAmt = products.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
    const gstAmt = Number((orderedAmt * 0.18).toFixed(2));
    const totalAmt = orderedAmt + gstAmt;

    // from cart details extract only productIds and qty

    const data = products.map((each) => ({
      productId: each.id,
      quantity: each.qty,
    }));

    // console.log(data, "***************");

    // Create order
    const newOrder = await Order.create({
      userId,
      products: data,
      shippingAddress,
      status: "pending",
      billingDetails: {
        orderedAmt,
        gstAmt,
        totalAmt,
      },
    });

    console.log("order created successfully!!");

    const lineItems = products.map((item) => ({
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
      // save payment
      await Payment.create({
        userId,
        order: orderId,
        paymentMethod: "card",
        paymentStatus: "completed",
        transactionId: session.payment_intent,
      });

      //update order status to paid
      await Order.findByIdAndUpdate(orderId, { status: "paid" });

      // clear user's cart
      await Cart.findOneAndUpdate({ userId }, { products: [] });

      console.log(
        `Payment recorded and order ${orderId} marked as paid. Cart cleared.`
      );
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

//You need the order ID ahead of time to store in Stripe's metadata, so you can track and link the payment later.

// That’s why it’s okay (and intentional) to create the order before payment.

// Then, once the payment completes (Stripe sends webhook), you:

// Create the Payment entry in DB

// Optionally update the Order status from "pending" to "paid" or "confirmed"

// at this point will clear the cart too

// regarding clearing redux, we can do this while unmounting step4 using return in useeffect

// clearinf redux wil clear indexedDB subsequently
