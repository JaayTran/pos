import express from "express";
import {
  getCartItemsController,
  addCartItemsController,
  updateCartItemsController,
  deleteCartItemsController,
} from "../controllers/cartsController.js";

const cartsRouter = express.Router();

cartsRouter.get("/getcartitems", getCartItemsController);

cartsRouter.post("/addcartitems", addCartItemsController);

cartsRouter.put("/updatecartitems", updateCartItemsController);

cartsRouter.post("/deletecartitems", deleteCartItemsController);

export default cartsRouter;
