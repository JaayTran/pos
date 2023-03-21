import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LayoutApp from "../../components/Layout";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Table, message } from "antd";
import FormItem from "antd/lib/form/FormItem";

const Tables = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [editTable, setEditTable] = useState(false);

  const getAllTables = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get("/api/tables/gettables");
      setTableData(data);
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(data);
    } catch (error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTables();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlerDelete = async (record) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post("/api/tables/deletetables", {
        tableId: record._id,
      });
      message.success("Table Deleted Successfully!");
      getAllTables();
      setPopModal(false);
      dispatch({
        type: "HIDE_LOADING",
      });
    } catch (error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      message.error("Error!");
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Table Number",
      dataIndex: "tableNum",
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <DeleteOutlined
            className="cart-action"
            onClick={() => handlerDelete(record)}
          />
          <EditOutlined
            className="cart-edit"
            onClick={() => {
              setEditTable(record);
              setPopModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  const handlerSubmit = async (value) => {
    //console.log(value);
    if (editTable === null) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios.post("/api/tables/addtables", value);
        message.success("Tables Added Successfully!");
        getAllTables();
        setPopModal(false);
        dispatch({
          type: "HIDE_LOADING",
        });
      } catch (error) {
        dispatch({
          type: "HIDE_LOADING",
        });
        message.error("Error!");
        console.log(error);
      }
    } else {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios.put("/api/tables/updatetables", {
          ...value,
          tableId: editTable._id,
        });
        message.success("Table Updated Successfully!");
        getAllTables();
        setPopModal(false);
        dispatch({
          type: "HIDE_LOADING",
        });
      } catch (error) {
        dispatch({
          type: "HIDE_LOADING",
        });
        message.error("Error!");
        console.log(error);
      }
    }
  };

  return (
    <LayoutApp>
      <h2>All Tables </h2>
      <Button
        className="add-new"
        onClick={() => {
          setPopModal(true);
          setEditTable(null);
        }}
      >
        Add New
      </Button>
      <Table dataSource={tableData} columns={columns} bordered />

      {popModal && (
        <Modal
          title={`${editTable !== null ? "Edit Table" : "Add New Table"}`}
          visible={popModal}
          onCancel={() => {
            setEditTable(null);
            setPopModal(false);
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={editTable}
            onFinish={handlerSubmit}
          >
            <FormItem name="tableNum" label="Table Number">
              <Input />
            </FormItem>
            <div className="form-btn-add">
              <Button htmlType="submit" className="add-new">
                Done
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </LayoutApp>
  );
};

export default Tables;
