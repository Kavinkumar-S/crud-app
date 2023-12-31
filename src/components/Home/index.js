import React, { useEffect } from "react";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Editform from "./Editform";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Deleteform from "./Deleteform";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editdata, setEditdata] = useState();
  const [Isdelete, setIsdelete] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const getEmployee = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/employees`
      );
      // console.log("response", response.data);
      setData(response.data);
    } catch (error) {
      console.log("getEmployee-error", error);
    }
  };

  useEffect(() => {
    getEmployee();
  }, [refresh]);

  const handleAddEmployee = async (data) => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}/employees`,
        data
      );

      // setData([...data,data])

      setRefresh(!refresh);
      reset();
      toast.success("New Employee Added Successfully");
    } catch (error) {
      console.log("handleAddEmployee-error", error);
      toast.error("New Employee Not Added Successfully");
      setRefresh(!refresh);
    }
  };

  const openModal = (data) => {
    setEditdata(data);
    setIsOpen(true);
  };
  function closeModal() {
    setIsOpen(false);
    setEditdata();
  }

  const deleteIsOpen = (data) => {
    console.log("dele", data);
    setDeleteId(data);
    setIsdelete(!Isdelete);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="container mt-5">
          <div className="new-employee-container">
            <h4 className="text-success">Add a New Employee</h4>
            <form
              className="mb-4 pb-4"
              onSubmit={handleSubmit(handleAddEmployee)}
            >
              <div class="row mb-3">
                <div class="col-md-4">
                  <label for="exampleInputEmail1">Name : </label>
                  <input
                    type="text"
                    class="form-control"
                    {...register("name", {
                      required: true,
                      maxLength: 15,
                      minLength: 3,
                    })}
                    placeholder="Enter Name"
                  />
                  {errors?.name?.type === "required" && (
                    <p className="error-message">This field is required</p>
                  )}
                  {errors?.name?.type === "maxLength" && (
                    <p className="error-message">
                      Characters should been less than 15
                    </p>
                  )}
                  {errors?.name?.type === "minLength" && (
                    <p className="error-message">
                      Characters should been greater than 3
                    </p>
                  )}
                </div>
                <div class="col-md-4">
                  <label for="exampleInputPassword1">Email : </label>
                  <input
                    type="email"
                    class="form-control"
                    {...register("email", { required: true })}
                    placeholder="Enter Email"
                  />
                  {errors?.email?.type === "required" && (
                    <p className="error-message">This field is required</p>
                  )}
                </div>
                <div class="col-md-4">
                  <label for="exampleInputPassword1">Employee Id : </label>
                  <input
                    type="number"
                    class="form-control"
                    id="exampleInputPassword1"
                    {...register("id", { required: true })}
                    placeholder="Enter Employee Id"
                  />
                  {errors?.id?.type === "required" && (
                    <p className="error-message">This field is required</p>
                  )}
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-4">
                  <label for="exampleInputEmail1">Mobile Number</label>
                  <input
                    type="text"
                    //  pattern="[0-9]*"
                    class="form-control"
                    {...register("mobile", {
                      required: true,
                      maxLength: 10,
                      pattern: {
                        value: /\d+/,
                      },
                    })}
                    placeholder="Enter Mobile Number"
                  />
                  {errors?.mobile?.type === "required" && (
                    <p className="error-message">This field is required</p>
                  )}

                  {errors?.mobile?.type === "maxLength" && (
                    <p className="error-message">
                      Characters should been less than 10
                    </p>
                  )}
                  {errors?.mobile?.type === "pattern" && (
                    <p className="error-message">Characters should be Number</p>
                  )}
                </div>
                <div class="col-md-4">
                  <label for="exampleInputPassword1">Job Role :</label>
                  <input
                    type="text"
                    class="form-control"
                    {...register("role", { required: true })}
                    placeholder="Enter Job Role"
                  />
                  {errors?.role?.type === "required" && (
                    <p className="error-message">This field is required</p>
                  )}
                </div>
                <div className="col-md-4"></div>
              </div>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          </div>

          <table class="table mt-4 table-striped table-bordered">
            <thead>
              <tr>
                {/* <th scope="col">Id</th> */}
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Job Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((employee, index) => (
                  <tr key={employee.id}>
                    {/* <th scope="row">{employee.id}</th> */}
                    <td>{index + 1}</td>

                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.mobile}</td>
                    <td>{employee.role}</td>
                    <td>
                      <div className="d-flex">
                        <button
                          className="btn btn-primary"
                          style={{ marginRight: "10px", padding: "2px 4px" }}
                          onClick={() => openModal(employee)}
                        >
                          <MdEdit />
                        </button>
                        <button
                          className="btn btn-danger"
                          style={{
                            marginRight: "10px",
                            padding: "2px 4px",
                          }}
                          onClick={
                            () => deleteIsOpen(employee.id)
                            // handleDelete(employee.id)
                          }
                        >
                          <MdDelete />
                        </button>
                        <Link to={`/emp/${employee.id}`}>
                          <button
                            className="btn btn-secondary"
                            style={{
                              // background: "red",
                              // border: "1px solid red",
                              padding: "2px 4px",
                            }}
                          >
                            <FaEye />
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}

              {data && data.length == 0 && (
                <tr
                  style={{
                    height: "100px",
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  <td colSpan={6}>No data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <Deleteform
          Isopen={Isdelete}
          deleteIsOpen={deleteIsOpen}
          deleteId={deleteId}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </div>

      <Editform
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        editdata={editdata}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        limit={1}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Home;
