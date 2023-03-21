import express from "express";
import {
  getTableController,
  addTableController,
  updateTableController,
  deleteTableController,
} from "../controllers/tableController.js";

const tableRouter = express.Router();

tableRouter.get("/gettables", getTableController);

tableRouter.post("/addtables", addTableController);

tableRouter.put("/updatetables", updateTableController);

tableRouter.post("/deletetables", deleteTableController);

export default tableRouter;
