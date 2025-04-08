const Address = require("../models/address.model");

const addAddressService = async (details) => {
  try {
    // allow user to add more than one address but avoid duplicates
    const duplicateAddress = await Address.findOne(details);
    if (duplicateAddress) {
      return "User already has an address";
    }
    await Address.create(details);
    return "Address created successfully!!";
  } catch (err) {
    throw err;
  }
};

const getAddressService = async (userId) => {
  try {
    const listAddress = await Address.find({ userId }).select("-userId");
    if (listAddress.length === 0) {
      return "No address added yet";
    }
    return listAddress;
  } catch (err) {
    throw err;
  }
};

module.exports = { addAddressService, getAddressService };
