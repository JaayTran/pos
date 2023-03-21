import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FormItem from "antd/lib/form/FormItem";
import { Button, Card, Form, Input, Modal } from "antd";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [popModal, setPopModal] = useState(false);
  const [modifier, setModifier] = useState("");

  const handlerToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...product,
        modifier,
        productCartID: crypto.randomUUID(),
        quantity: 1,
      },
    });
    setPopModal(false);
  };

  const { Meta } = Card;

  return (
    <Card hoverable style={{ width: 200 }}>
      <Meta
        title={product.name}
        description={`$${product.price}`}
        onClick={() => {
          setPopModal(true);
        }}
      />
      {/* <div className="product-btn">
        <Button onClick={() => handlerToCart()}>Add To Cart</Button>
      </div> */}
      {popModal && (
        <Modal
          title="Add Modifiers"
          visible={popModal}
          onCancel={() => setPopModal(false)}
          footer={false}
        >
          <Form layout="vertical" onFinish={handlerToCart}>
            <FormItem name="modifier" label="Modifier">
              <Input onChange={(e) => setModifier(e.target.value)} />
            </FormItem>
            <div className="form-btn-add">
              <Button htmlType="submit" className="add-new">
                Add to cart
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </Card>
  );
};

export default Product;
