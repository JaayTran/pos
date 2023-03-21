import React, { useState, useEffect } from "react";
import axios from "axios";
import LayoutApp from "../../components/Layout";
import { Row, Col } from "antd";
import Product from "../../components/Product";
import { useDispatch, useSelector } from "react-redux";
import TableComp from "../../components/TableComp";

const Home = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);

  const tableNumber = useSelector((state) => state.tableNumber);

  useEffect(() => {
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
        console.log(error);
      }
    };

    getAllTables();
  }, [dispatch]);

  return (
    <LayoutApp>
      <h3>Table: {tableNumber}</h3>
      <div className="pos">
        <div className="category">
          <Row>
            {tableData.map((table) => (
              <Col>
                <center>
                  <TableComp key={table.id} table={table} />
                </center>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </LayoutApp>
  );
};

export default Home;
