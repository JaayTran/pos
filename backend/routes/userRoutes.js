import express from "express";
import {
  loginController,
  registerController,
  getUsersController,
  updateUserController,
  deleteUserController,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", loginController);

userRouter.post("/register", registerController);

userRouter.put("/updateuser", updateUserController);

userRouter.get("/getusers", getUsersController);

userRouter.post("/deleteuser", deleteUserController);

export default userRouter;
