import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";

function Employee() {
  let { id } = useParams();
  console.log("id", id);
  const [data, setData] = useState();

  let getEmployee = async () => {
    let response = await axios.get(
      `${process.env.REACT_APP_API_URL}/employees/${id}`
    );
    console.log("response : ", response);
    setData(response.data);
  };

  useEffect(() => {
    getEmployee();
  }, [id]);

  console.log("data", data);

  return (
    <>
      <div className="container-fluid">
        <div className="container p-4">
          <div className="w-75 d-flex 
          p-4
          justify-content-between border border-success rounded" key={ data && data.id}>
            <p>{data && data.id}</p>
            <p>{data && data.name}</p>
            <p>{data && data.email}</p>
            <p>{data && data.mobile}</p>
            <p>{data && data.role}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Employee;
