const createOrder = async (req, res) => {
  /*
    1. get userId from middleware and find corresponding cart details as per userId 
    2. if products array in cart is empty or if cart details are not in DB then throw ERROR 
    3. if cart is found then find the corresponding product details from it 
    4. will display all address which user have saved in DB and allow user to choose one in UI. which means address details will 
       be passed in req body.
    5. using userId get payment details 
    5. using hook get billing details (better to have this hook in ui as we can display the details also in UI without making api call) 
       so which means that billing details will come in req body. 
    6. now create an order using this details 
    7. once order is created clear the cart products list 
*/
};

const getOrders = async (req, res) => {};

module.exports = { createOrder, getOrders };
