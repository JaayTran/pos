import { Table, message, Button, Modal, Form, Input, Radio } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import LayoutApp from '../../components/Layout';
import FormItem from 'antd/lib/form/FormItem';

const Users = () => {
  const dispatch = useDispatch();
  const [usersData, setUsersData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [editUser, setEditUser] = useState(false);

  const getAllUsers = async () => {
    try {
      dispatch({
        type: 'SHOW_LOADING',
      });
      const { data } = await axios.get('/api/users/getusers');
      setUsersData(data);
      dispatch({
        type: 'HIDE_LOADING',
      });
      console.log(data);
    } catch (error) {
      dispatch({
        type: 'HIDE_LOADING',
      });
      console.log(error);
    }
  };

  const handlerDelete = async (record) => {
    try {
      dispatch({
        type: 'SHOW_LOADING',
      });
      await axios.post('/api/users/deleteuser', {
        userId: record._id,
      });
      message.success('User Deleted Successfully!');
      getAllUsers();
      setPopModal(false);
      dispatch({
        type: 'HIDE_LOADING',
      });
    } catch (error) {
      dispatch({
        type: 'HIDE_LOADING',
      });
      message.error('Error!');
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Login',
      dataIndex: 'loginNumber',
    },
    {
      title: 'Admin',
      dataIndex: 'isAdmin',
      render: (isAdmin) => {
        if (isAdmin === true) {
          return 'Yes';
        }

        return 'No';
      },
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (id, record) => (
        <div>
          <DeleteOutlined
            className="cart-action"
            onClick={() => handlerDelete(record)}
          />
          <EditOutlined
            className="cart-edit"
            onClick={() => {
              setEditUser(record);
              setPopModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  const handlerSubmit = async (value) => {
    //console.log(value);
    if (editUser === null) {
      try {
        dispatch({
          type: 'SHOW_LOADING',
        });
        await axios.post('/api/users/register', value);
        message.success('User Added Successfully!');
        getAllUsers();
        setPopModal(false);
        dispatch({
          type: 'HIDE_LOADING',
        });
      } catch (error) {
        dispatch({
          type: 'HIDE_LOADING',
        });
        message.error('Error!');
        console.log(error);
      }
    } else {
      try {
        dispatch({
          type: 'SHOW_LOADING',
        });
        await axios.put('/api/users/updateuser', {
          ...value,
          userId: editUser._id,
        });
        message.success('User Updated Successfully!');
        getAllUsers();
        setPopModal(false);
        dispatch({
          type: 'HIDE_LOADING',
        });
      } catch (error) {
        dispatch({
          type: 'HIDE_LOADING',
        });
        message.error('Error!');
        console.log(error);
      }
    }
  };

  return (
    <LayoutApp>
      <h2>All Users </h2>
      <Button
        className="add-new"
        onClick={() => {
          setPopModal(true);
          setEditUser(null);
        }}
      >
        Add New
      </Button>
      <Table dataSource={usersData} columns={columns} bordered />
      {popModal && (
        <Modal
          title={`${editUser !== null ? 'Edit User' : 'Add New User'}`}
          visible={popModal}
          onCancel={() => {
            setEditUser(null);
            setPopModal(false);
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={editUser}
            onFinish={handlerSubmit}
          >
            <FormItem name="name" label="Name">
              <Input />
            </FormItem>
            <FormItem name="loginNumber" label="Login Number">
              <Input />
            </FormItem>
            <FormItem name="password" label="Password">
              <Input type="password" />
            </FormItem>
            <FormItem name="isAdmin" label="Administrator Account?">
              <Radio.Group>
                <Radio.Button value="true">Yes</Radio.Button>
                <Radio.Button value="false">No</Radio.Button>
              </Radio.Group>
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

export default Users;
