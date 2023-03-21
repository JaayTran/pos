import TableNumber from "../models/tableModel.js";

//for add or fetch
export const getTableController = async (req, res) => {
  try {
    const tables = await TableNumber.find();
    res.status(200).send(tables);
  } catch (error) {
    console.log(error);
  }
};

//for add
export const addTableController = async (req, res) => {
  try {
    const newTables = new TableNumber(req.body);
    await newTables.save();
    res.status(200).send("Table Created Successfully!");
  } catch (error) {
    console.log(error);
  }
};

//for update
export const updateTableController = async (req, res) => {
  try {
    await TableNumber.findOneAndUpdate({ _id: req.body.tableId }, req.body, {
      new: true,
    });
    res.status(201).json("Table Updated!");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

//for delete
export const deleteTableController = async (req, res) => {
  try {
    await TableNumber.findOneAndDelete({ _id: req.body.tableId });
    res.status(200).json("Table Deleted!");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};
