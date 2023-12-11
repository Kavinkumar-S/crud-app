import React, { useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { IoIosClose } from "react-icons/io";
function Editform({ closeModal, modalIsOpen, editdata, refresh, setRefresh }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleEditEmployee = async (data) => {
    try {
      let datas = { ...data, id: editdata.id };
      let response = axios.put(
        `${process.env.REACT_APP_API_URL}/employees/${editdata && editdata.id}`,
        datas
      );
      console.log(" edit response ", response);
      setTimeout(() => setRefresh(!refresh), 1000);
      closeModal();
      toast.success("Employee Updated Successfully");
    } catch (error) {
      console.log("error", error);
      toast.error("Employee Updated Successfully");
    }
  };

  useEffect(() => {
    setValue("name", editdata?.name);
    setValue("email", editdata?.email);
    setValue("id", editdata?.id);
    setValue("mobile", editdata?.mobile);
    setValue("role", editdata?.role);
  }, [modalIsOpen]);

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Modal"
        className={{
          base: "modal-base",
          afterOpen: "modal-base_after-open",
          beforeClose: "modal-base_before-close",
        }}
        overlayClassName={{
          base: "overlay-base",
          afterOpen: "overlay-base_after-open",
          beforeClose: "overlay-base_before-close",
        }}
        shouldCloseOnOverlayClick={false}
      >
        <div className="d-flex justify-content-end mt-2 mb-2">
          <button
            style={{ padding: "0px 4px" }}
            className="btn btn-secondary"
            onClick={closeModal}
          >
            {/* close */}
            <IoIosClose />
          </button>
        </div>

        <div>
          <form className="mb-3" onSubmit={handleSubmit(handleEditEmployee)}>
            <div class="row mb-3">
              <div class="col">
                <label for="exampleInputEmail1">Name : </label>

                <input
                  type="text"
                  class="form-control"
                  defaultValue={editdata && editdata.name}
                  {...register("name", {
                    //   required: true,

                    maxLength: 15,
                    minLength: 3,
                  })}
                  placeholder="Enter Name"
                />
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
              <div class="col">
                <label for="exampleInputPassword1">Email : </label>
                <input
                  type="email"
                  class="form-control"
                  {...register(
                    "email"
                    //  { required: true, }
                  )}
                  defaultValue={editdata && editdata.email}
                />
              </div>
              <div class="col">
                <label for="exampleInputPassword1">Employee Id : </label>
                <input
                  type="number"
                  class="form-control"
                  disabled={true}
                  defaultValue={editdata && editdata.id}
                  {...register(
                    "id"
                    // { required: true, }
                  )}
                />
              </div>
            </div>
            <div class="row mb-3">
              <div class="col">
                <label for="exampleInputEmail1">Mobile Number</label>
                <input
                  type="text"
                  class="form-control"
                  defaultValue={editdata && editdata.mobile}
                  {...register(
                    "mobile"
                    //    { required: true, }
                  )}
                />
              </div>
              <div class="col">
                <label for="exampleInputPassword1">Job Role :</label>
                <input
                  type="text"
                  class="form-control"
                  {...register(
                    "role"
                    //    { required: true, }
                  )}
                  defaultValue={editdata && editdata.role}
                />
              </div>
              <div className="col"></div>
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Editform;
