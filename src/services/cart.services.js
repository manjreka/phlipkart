const Cart = require("../models/cart.model");

const configureCartServices = async (userId, cartDetails) => {
  try {
    const existingCart = await Cart.findOne({ userId });
    const products = cartDetails?.products;
    const cartData = { userId, products: cartDetails };
    if (!existingCart) {
      await Cart.create(cartData);
      return "Cart created successfully!!";
    }

    const cartId = existingCart?._id;
    await Cart.findByIdAndUpdate({ _id: cartId }, cartData);
    return "Cart updated successfully!!";
  } catch (err) {
    throw err;
  }
};

const getCartService = async (userId) => {
  try {
    const cartDetails = await Cart.findOne({ userId })
      .populate({
        path: "products.productId",
        select: "title images price -_id",
      })
      .lean()
      .select("products -_id");
    return cartDetails;
  } catch (err) {
    throw err;
  }
};

module.exports = { configureCartServices, getCartService };

/* updating the product qty, product details and all the buisness logic is written in react.
In backend we will only send snaps which will check if cart id cartId exist or will create a 
new cart if cartId not specified. 
*/
