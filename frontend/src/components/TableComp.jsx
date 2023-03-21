import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FormItem from "antd/lib/form/FormItem";
import { Button, Card, Form, Input, Modal } from "antd";

const TableComp = ({ table }) => {
  const dispatch = useDispatch();
  const [selectedTableNumber, setSelectedTableNumber] = useState("");

  const handlerTableNumber = () => {
    dispatch({
      type: "SELECT_TABLE",
      payload: {
        selectedTableNumber,
      },
    });
    console.log("Selected table number:", selectedTableNumber);
  };

  const { Meta } = Card;

  return (
    <Button
      onClick={() => {
        setSelectedTableNumber(table.tableNum);
        handlerTableNumber();
      }}
      style={{ width: 200, height: 200, padding: 60 }}
    >
      <Meta title={table.tableNum} />
    </Button>
  );
};

export default TableComp;
