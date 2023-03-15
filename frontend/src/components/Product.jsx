import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FormItem from 'antd/lib/form/FormItem';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Modal, Select, Table, message } from 'antd';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [popModal, setPopModal] = useState(false);

  const handlerToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity: 1 },
    });
    setPopModal(false);
  };

  const { Meta } = Card;

  return (
    <Card
      hoverable
      style={{ width: 240, marginBottom: 30 }}
      cover={
        <img alt={product.name} src={product.image} style={{ height: 200 }} />
      }
      onClick={() => {
        setPopModal(true);
      }}
    >
      <Meta title={product.name} description={`$${product.price}`} />
      <div className="product-btn">
        <Button onClick={() => handlerToCart()}>Add To Cart</Button>
      </div>
      {popModal && (
        <Modal
          title="Add Modifiers"
          visible={popModal}
          onCancel={() => {
            setPopModal(false);
          }}
          footer={false}
        >
          <Form layout="vertical" onFinish={handlerToCart}>
            <FormItem name="modifier" label="Modifier">
              <Input />
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
