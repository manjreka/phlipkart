const {
  addAddressService,
  getAddressService,
} = require("../services/address.services");

const addAddress = async (req, res) => {
  try {
    const { decoded } = req;
    const userId = decoded.id;
    const details = req.body;
    details.userId = userId;
    // add JOI validations
    const response = await addAddressService(details);
    return res.status(200).json({ message: response });
  } catch (err) {
    if (err.isJoi) {
      return res.status(400).json({ error: err.details[0].message });
    }

    return res.status(500).json({ error: err.message });
  }
};

const getAddresses = async (req, res) => {
  try {
    const { decoded } = req;
    const userId = decoded.id;
    const response = await getAddressService(userId);
    return res.status(200).json({ message: response });
  } catch (err) {
    if (err.isJoi) {
      return res.status(400).json({ error: err.details[0].message });
    }

    return res.status(500).json({ error: err.message });
  }
};

module.exports = { addAddress, getAddresses };
