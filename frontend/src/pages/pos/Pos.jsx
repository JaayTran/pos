import React, { useState, useEffect } from "react";
import axios from "axios";
import LayoutApp from "../../components/Layout";
import { Row, Col } from "antd";
import Product from "../../components/Product";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useNavigate } from "react-router-dom";

const Pos = () => {
  const dispatch = useDispatch();

  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Appetizers");
  const categories = [
    {
      name: "Appetizers",
      imageUrl:
        "https://i.pinimg.com/originals/89/33/63/893363f5e6be7fb5742f7cbcc3bb391b.png",
    },
    {
      name: "Mains",
      imageUrl:
        "https://cdn.pixabay.com/photo/2022/01/04/23/00/fast-food-6916101_960_720.png",
    },
    {
      name: "Drinks",
      imageUrl:
        "https://images.vexels.com/media/users/3/246333/isolated/preview/9626dce3278f72220ea2736de64e6233-pink-cocktail-color-stroke.png",
    },
  ];

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get("/api/products/getproducts");
        setProductData(data);
        dispatch({
          type: "HIDE_LOADING",
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllProducts();
  }, [dispatch]);

  const [subTotal, setSubTotal] = useState(0);
  const [billPopUp, setBillPopUp] = useState(false);

  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.rootReducer);

  const handlerIncrement = (record) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  const handlerDecrement = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "UPDATE_CART",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };

  const handlerDelete = (record) => {
    dispatch({
      type: "DELETE_FROM_CART",
      payload: record,
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Modifiers",
      dataIndex: "modifier",
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "65px",
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      width: "150px",
      render: (id, record) => (
        <div>
          <MinusCircleOutlined
            className="cart-minus"
            onClick={() => handlerDecrement(record)}
          />
          <strong className="cart-quantity">{record.quantity}</strong>
          <PlusCircleOutlined
            className="cart-plus"
            onClick={() => handlerIncrement(record)}
          />
          <DeleteOutlined
            className="cart-action"
            onClick={() => handlerDelete(record)}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    let temp = 0;
    cartItems.forEach(
      (product) => (temp = temp + product.price * product.quantity)
    );
    setSubTotal(temp);
  }, [cartItems]);

  const handlerSubmit = async (value) => {
    //console.log(value);
    try {
      const newObject = {
        ...value,
        cartItems,
        subTotal,
        tax: Number(((subTotal / 100) * 13).toFixed(2)),
        totalAmount: Number(
          (
            Number(subTotal) + Number(((subTotal / 100) * 13).toFixed(2))
          ).toFixed(2)
        ),
        userId: JSON.parse(localStorage.getItem("auth"))._id,
      };
      await axios.post("/api/bills/addbills", newObject);
      message.success("Bill Generated!");
      navigate("/bills");
      dispatch({
        type: "CART_CLEAR",
      });
    } catch (error) {
      message.error("Error!");
      console.log(error);
    }
  };

  return (
    <LayoutApp>
      <div className="cart-and-pos">
        <div className="cartscreen">
          <h2>Table Number: A11</h2>
          <Table dataSource={cartItems} columns={columns} bordered />
          <div className="subTotal">
            <h2>
              Sub Total: <span>$ {subTotal.toFixed(2)}</span>
            </h2>
            <Button onClick={() => setBillPopUp(true)} className="add-new">
              Payment
            </Button>
          </div>
          <Modal
            title="Create Invoice"
            visible={billPopUp}
            onCancel={() => setBillPopUp(false)}
            footer={false}
          >
            <Form layout="vertical" onFinish={handlerSubmit}>
              <FormItem name="tableNumber" label="Table Number">
                <Input />
              </FormItem>
              <Form.Item name="paymentMethod" label="Payment Method">
                <Select>
                  <Select.Option value="cash">Cash</Select.Option>
                  <Select.Option value="Card">Card</Select.Option>
                </Select>
              </Form.Item>
              <div className="total">
                <span>SubTotal: ${subTotal.toFixed(2)}</span>
                <br />
                <span>Tax: ${((subTotal / 100) * 13).toFixed(2)}</span>
                <h3>
                  Total: $
                  {(
                    Number(subTotal) +
                    Number(((subTotal / 100) * 13).toFixed(2))
                  ).toFixed(2)}
                </h3>
              </div>
              <div className="form-btn-add">
                <Button htmlType="submit" className="add-new">
                  Print Bill
                </Button>
              </div>
            </Form>
          </Modal>
        </div>
        <div className="pos">
          <div className="category">
            {categories.map((category) => (
              <div
                key={category.name}
                className={`categoryFlex ${
                  selectedCategory === category.name && "category-active"
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <h3 className="categoryName">{category.name}</h3>
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  height={60}
                  width={60}
                />
              </div>
            ))}
          </div>
          <Row>
            {productData
              .filter((i) => i.category === selectedCategory)
              .map((product) => (
                <Col>
                  <center>
                    <Product key={product.id} product={product} />
                  </center>
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </LayoutApp>
  );
};

export default Pos;
