import Carts from "../models/cartsModel.js";

// Get all items in cart
export const getCartItemsController = async (req, res) => {
  try {
    const cartItems = await Carts.find({});
    res.status(200).json(cartItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Add an item to cart
export const addCartItemsController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check if product already exists in cart
    const existingItem = await Carts.findOne({ productId });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      res.status(200).json(existingItem);
    } else {
      const newItem = new Carts({
        productId,
        quantity,
      });
      await newItem.save();
      res.status(201).json(newItem);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update an item in cart
export const updateCartItemsController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Find the item in cart and update its quantity
    const updatedItem = await Carts.findOneAndUpdate(
      { productId },
      { quantity },
      { new: true }
    );

    if (updatedItem) {
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Remove an item from cart
export const deleteCartItemsController = async (req, res) => {
  try {
    const { productId } = req.body;

    // Find the item in cart and remove it
    const deletedItem = await Carts.findOneAndDelete({ productId });

    if (deletedItem) {
      res.status(200).json(deletedItem);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
