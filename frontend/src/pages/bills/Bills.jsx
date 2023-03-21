import { Button, Modal, Table, DatePicker } from "antd";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import { EyeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import LayoutApp from "../../components/Layout";
import moment from "moment";

const { RangePicker } = DatePicker;

const Bills = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]); // Array of all bills
  const [popModal, setPopModal] = useState(false); // Whether or not to display the modal that shows the selected bill
  const [selectedBill, setSelectedBill] = useState(null); // The bill that the user has clicked on

  // Fetch all bills from the server
  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING", // Dispatch an action to show a loading spinner
      });
      const { data } = await axios.get("/api/bills/getbills"); // Fetch the bills from the server
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort the bills array in descending order by their creation date
      setBillsData(data); // Set the bills array in state
      dispatch({
        type: "HIDE_LOADING", // Dispatch an action to hide the loading spinner
      });
      console.log(data);
    } catch (error) {
      dispatch({
        type: "HIDE_LOADING", // Dispatch an action to hide the loading spinner
      });
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBills(); // Call the getAllBills function when the component mounts
  }, []);

  // Handle changes to the date range picker
  const [dateRange, setDateRange] = useState([]);

  const handleDateRangeChange = (dates) => {
    if (dates && dates.length === 2) {
      setDateRange(dates); // Set the date range in state
    } else {
      setDateRange([]); // Clear the date range
    }
  };

  // Filter the bills by the selected date range
  const filteredBills = dateRange.length
    ? billsData.filter((bill) =>
        moment(bill.createdAt).isBetween(dateRange[0], dateRange[1])
      )
    : billsData;

  // Define the columns for the bills table
  const columns = [
    {
      title: "DATE", // Column title
      dataIndex: "createdAt", // Data index of the corresponding value in the billsData array
      render: (billsData) => {
        // Render function to format the date
        return (
          <div>
            {/* // Format the date using Moment.js */}
            <p>{moment(billsData).format("YYYY-MM-DD HH:mm:ss")}</p>
          </div>
        );
      },
    },
    {
      title: "Table Number", // Column title
      dataIndex: "tableNumber", // Data index of the corresponding value in the billsData array
    },
    {
      title: "Sub Total", // Column title
      dataIndex: "subTotal", // Data index of the corresponding value in the billsData array
    },
    {
      title: "Tax", // Column title
      dataIndex: "tax", // Data index of the corresponding value in the billsData array
    },
    {
      title: "Total Amount", // Column title
      dataIndex: "totalAmount", // Data index of the corresponding value in the billsData array
    },
    {
      title: "Action", // Column title
      dataIndex: "_id", // Data index of the corresponding value in the billsData array
      render: (
        id,
        record // Render function to show an EyeOutlined icon that opens a modal to display the selected bill
      ) => (
        <div>
          <EyeOutlined
            className="cart-edit eye"
            onClick={() => {
              setSelectedBill(record); // Set the selected bill in state
              setPopModal(true); // Show the modal that displays the selected bill
            }}
          />
        </div>
      ),
    },
  ];

  // Define the handlePrint function using the useReactToPrint hook
  const handlePrint = useReactToPrint({
    content: () => componentRef.current, // Reference to the component that we want to print
  });

  // Return the JSX elements for the Bills component
  return (
    <LayoutApp>
      <h2>All Invoice </h2>
      {/* // Date range picker that calls the handleDateRangeChange function on change */}
      <RangePicker onChange={handleDateRangeChange} />
      {/* // Bills table that displays the bills data */}
      <Table dataSource={filteredBills} columns={columns} bordered />

      {/* // Modal that displays the selected bill */}
      {popModal && (
        <Modal
          title="Receipt"
          width={400}
          pagination={false}
          visible={popModal}
          onCancel={() => setPopModal(false)}
          footer={false}
        >
          <div className="card" ref={componentRef}>
            {/* // Reference to the component that we want to print */}
            <div className="cardHeader">
              <h2 className="logo">Restaurant</h2>
              <span>
                Number: <b>Phone Number</b>
              </span>
              <span>
                Address: <b>Address</b>
              </span>
            </div>
            <div className="cardBody">
              <div className="group">
                <span>Table Number:</span>
                <span>
                  {/* // Display the table number of the selected bill */}
                  <b>{selectedBill.tableNumber}</b>
                </span>
              </div>
              <div className="group">
                <span>Date Order:</span>
                <span>
                  {/* // Display the creation date of the selected bill */}
                  <b>{selectedBill.createdAt.toString().substring(0, 10)}</b>
                </span>
              </div>
              <div className="group">
                <span>Total Amount:</span>
                <span>
                  <b>${selectedBill.totalAmount}</b>
                </span>
              </div>
            </div>
            <div className="cardFooter">
              <h4>Your Order</h4>
              {selectedBill.cartItems.map((product) => (
                <>
                  <div className="footerCard">
                    <div className="group">
                      <span>Product:</span>
                      <span>
                        <b>{product.name}</b>
                      </span>
                    </div>
                    <div className="group">
                      <span>Modifiers:</span>
                      <span>
                        <b>{product.modifier}</b>
                      </span>
                    </div>
                    <div className="group">
                      <span>Qty:</span>
                      <span>
                        <b>{product.quantity}</b>
                      </span>
                    </div>
                    <div className="group">
                      <span>Price:</span>
                      <span>
                        <b>${product.price}</b>
                      </span>
                    </div>
                  </div>
                </>
              ))}
              <div className="footerCardTotal">
                <div className="group">
                  <h3>Total:</h3>
                  <h3>
                    <b>${selectedBill.totalAmount}</b>
                  </h3>
                </div>
              </div>
              <div className="footerThanks">
                <span>Thank You for buying from us</span>
              </div>
            </div>
          </div>
          <div className="bills-btn-add">
            <Button onClick={handlePrint} htmlType="submit" className="add-new">
              Print Bill
            </Button>
          </div>
        </Modal>
      )}
    </LayoutApp>
  );
};

export default Bills;
